import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import { SMARTPHONES } from "./src/data";
import { RecommendationRequest, RecommendationResponse, Reservation } from "./src/types";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());

const PORT = 3000;

// Store reservations in memory so we can show live reserved slots in the session
const reservations: Reservation[] = [
  {
    id: "res-101",
    phoneId: "iphone-16-pro-max",
    customerName: "Rohan Sharma",
    customerPhone: "9876543210",
    customerEmail: "rohan@gmail.com",
    timeSlot: "Today, 4:00 PM - 6:00 PM",
    status: "Confirmed",
    createdAt: new Date().toISOString(),
  },
  {
    id: "res-102",
    phoneId: "galaxy-s24-ultra",
    customerName: "Aiswarya Nair",
    customerPhone: "9123456789",
    customerEmail: "aiswarya@gmail.com",
    timeSlot: "Tomorrow, 11:00 AM - 1:00 PM",
    status: "Confirmed",
    createdAt: new Date().toISOString(),
  }
];

// Initialize Gemini Client safely
let ai: GoogleGenAI | null = null;
const apiKey = process.env.GEMINI_API_KEY;

if (apiKey && apiKey !== "MY_GEMINI_API_KEY") {
  try {
    ai = new GoogleGenAI({
      apiKey: apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        }
      }
    });
    console.log("Gemini API client initialized successfully.");
  } catch (error) {
    console.error("Failed to initialize Gemini API client:", error);
  }
} else {
  console.log("No valid GEMINI_API_KEY found. Recommender will fallback to rule-based engine.");
}

// 1. Health Endpoint
app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    hasAi: !!ai,
    time: new Date().toISOString(),
  });
});

// 1b. Image Generation Curation Card Endpoint
app.post("/api/generate-card-image", async (req, res) => {
  const { phoneId, persona } = req.body;
  if (!phoneId || !persona) {
    return res.status(400).json({ error: "Smartphone ID and Persona role are required." });
  }

  const phone = SMARTPHONES.find(p => p.id === phoneId);
  if (!phone) {
    return res.status(404).json({ error: "Smartphone handset not found in store catalog." });
  }

  if (!ai) {
    return res.status(503).json({ 
      error: "Gemini Image Generation is currently unconfigured. Please use the default high-quality device photo." 
    });
  }

  try {
    const prompt = `A premium, highly stylized modern smartphone recommendation artwork card designed for a ${persona}. The image should feature a futuristic, sleek representation of ${phone.name} smartphone in a creative showcase. Incorporate neat stylistic elements of ${persona}'s workflow or vibe (such as academic nodes, corporate glass panels, photographic lenses, or executive prestige). Minimalist flat vector design with sleek cybernetic accents and subtle 3D glassmorphism. Beautiful dark high-contrast color palette with vibrant neon accent lights, professional, highly polished digital art design. No text, no frames.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.1-flash-lite-image',
      contents: {
        parts: [{ text: prompt }]
      },
      config: {
        imageConfig: {
          aspectRatio: "1:1"
        }
      }
    });

    const parts = response.candidates?.[0]?.content?.parts || [];
    for (const part of parts) {
      if (part.inlineData) {
        const base64Data = part.inlineData.data;
        return res.json({ imageUrl: `data:image/png;base64,${base64Data}` });
      }
    }

    throw new Error("No inline image data returned from Gemini flash image model.");
  } catch (error: any) {
    console.error("Gemini Image generation failure:", error);
    res.status(500).json({ 
      error: error.message || "Failed to generate stylized image via Gemini. Please use default photo fallback." 
    });
  }
});

// 2. Reservations Endpoints
app.get("/api/reservations", (req, res) => {
  res.json(reservations);
});

app.post("/api/reserve", (req, res) => {
  const { phoneId, customerName, customerPhone, customerEmail, timeSlot } = req.body;

  if (!phoneId || !customerName || !customerPhone || !customerEmail || !timeSlot) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  // Check if smartphone exists
  const phone = SMARTPHONES.find((p) => p.id === phoneId);
  if (!phone) {
    return res.status(404).json({ error: "Smartphone not found" });
  }

  if (phone.stockStatus === "Out of Stock") {
    return res.status(400).json({ error: "Sorry, this smartphone is currently out of stock." });
  }

  // Create new reservation
  const newReservation: Reservation = {
    id: `res-${Math.floor(1000 + Math.random() * 9000)}`,
    phoneId,
    customerName,
    customerPhone,
    customerEmail,
    timeSlot,
    status: "Pending",
    createdAt: new Date().toISOString(),
  };

  reservations.unshift(newReservation);

  // Update mock stock in SMARTPHONES list for local interactivity (Optional but adds a lot of realism!)
  if (phone.stockQuantity > 0) {
    phone.stockQuantity -= 1;
    if (phone.stockQuantity === 0) {
      phone.stockStatus = "Out of Stock";
    } else if (phone.stockQuantity <= 3) {
      phone.stockStatus = "Limited Stock";
    }
  }

  res.status(201).json({
    success: true,
    message: `Reservation successful! Your reservation code is: ${newReservation.id}. Please present this at our physical store during your selected time slot.`,
    reservation: newReservation,
  });
});

// 3. AI Phone Recommender Endpoint using Gemini API
app.post("/api/recommend", async (req, res) => {
  const { budget, primaryUse, preferredBrand, otherSpecs } = req.body as RecommendationRequest;

  if (!budget || !primaryUse) {
    return res.status(400).json({ error: "Budget and Primary Use are required." });
  }

  // Fallback Rule-based engine if Gemini is not available
  const getRuleBasedRecommendation = (): RecommendationResponse => {
    // Basic filter of smartphones matching criteria
    let candidates = SMARTPHONES.filter(p => p.price <= budget);
    
    if (candidates.length === 0) {
      // If none under budget, get the cheapest ones
      candidates = [...SMARTPHONES].sort((a, b) => a.price - b.price);
    }

    if (preferredBrand && preferredBrand !== "Any") {
      const brandFiltered = candidates.filter(p => p.brand.toLowerCase() === preferredBrand.toLowerCase());
      if (brandFiltered.length > 0) candidates = brandFiltered;
    }

    // Sort candidates based on primaryUse matching specs
    const scoredCandidates = candidates.map(phone => {
      let score = 100;
      const specsStr = JSON.stringify(phone.specs).toLowerCase();
      
      if (primaryUse === "gaming" && specsStr.includes("snapdragon")) score += 20;
      if (primaryUse === "camera" && specsStr.includes("zoom")) score += 20;
      if (primaryUse === "battery" && (specsStr.includes("5000 mah") || specsStr.includes("5400 mah"))) score += 20;
      if (primaryUse === "business" && phone.brand === "Apple") score += 10;
      
      // Prefer instock
      if (phone.stockStatus === "In Stock") score += 15;
      if (phone.stockStatus === "Out of Stock") score -= 30;

      return { phone, score };
    }).sort((a, b) => b.score - a.score);

    const bestPhone = scoredCandidates[0].phone;
    const alternatives = scoredCandidates.slice(1, 3).map(item => item.phone.id);

    return {
      recommendedPhoneId: bestPhone.id,
      reason: `Based on your budget of ₹${budget.toLocaleString()} and preference for ${primaryUse}, we recommend the ${bestPhone.name}. It features ${bestPhone.specs.processor} which handles ${primaryUse} tasks excellently, combined with a robust specs profile of ${bestPhone.specs.camera}. Visit our store to try it out!`,
      matchScore: 92,
      alternativePhoneIds: alternatives,
    };
  };

  if (!ai) {
    console.log("Running rule-based recommender because Gemini is unconfigured.");
    return res.json(getRuleBasedRecommendation());
  }

  try {
    const phonesJson = JSON.stringify(SMARTPHONES.map(p => ({
      id: p.id,
      name: p.name,
      brand: p.brand,
      price: p.price,
      specs: p.specs,
      stockStatus: p.stockStatus
    })));

    const prompt = `You are the AI Smartphone Expert at 'SMART MOBILES Store' - a premium local physical shop. 
Your job is to recommend the single best smartphone from our catalog for a user based on their needs.

Here is our current smartphone catalog (JSON format):
${phonesJson}

User requirements:
- Budget: Up to ₹${budget} INR
- Primary Use / Focus: ${primaryUse}
- Preferred Brand: ${preferredBrand || "Any"}
- Additional customer notes / specifications requested: "${otherSpecs || "None"}"

Tasks:
1. Select the single absolute best smartphone from our catalog that fits their budget and needs. If there is no perfect fit, find the closest match.
2. Provide a clear, premium, human-like matching reason (1-2 sentences) explaining why it's a stellar fit, highlighting specifications like battery, processor, or camera. Keep it focused on encouraging them to visit SMART MOBILES Store to touch and feel it.
3. Calculate an appropriate Match Score (0 to 100) based on how well it meets their budget and criteria.
4. Select up to 2 alternative smartphone IDs from our catalog that are also good choices.

You MUST respond strictly with a valid JSON object matching this schema:
{
  "recommendedPhoneId": "string (the exact ID of the recommended smartphone from the catalog)",
  "reason": "string (the friendly explanation)",
  "matchScore": number (e.g. 95),
  "alternativePhoneIds": ["string", "string"] (list of IDs from the catalog)
}`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            recommendedPhoneId: { type: Type.STRING },
            reason: { type: Type.STRING },
            matchScore: { type: Type.NUMBER },
            alternativePhoneIds: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            }
          },
          required: ["recommendedPhoneId", "reason", "matchScore", "alternativePhoneIds"]
        }
      }
    });

    const resultText = response.text || "";
    const parsedResult = JSON.parse(resultText.trim()) as RecommendationResponse;
    
    // Ensure the ID exists in our dataset, otherwise fallback
    const exists = SMARTPHONES.some(p => p.id === parsedResult.recommendedPhoneId);
    if (!exists) {
      console.warn("Gemini recommended an invalid phone ID, falling back.");
      return res.json(getRuleBasedRecommendation());
    }

    res.json(parsedResult);
  } catch (error) {
    console.error("Failed to generate AI recommendation:", error);
    res.json(getRuleBasedRecommendation());
  }
});

// Serve Vite middleware or built production assets
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
    console.log("Vite development middleware mounted.");
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
    console.log("Serving static production assets from dist/");
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Express server running on port ${PORT}`);
  });
}

startServer();
