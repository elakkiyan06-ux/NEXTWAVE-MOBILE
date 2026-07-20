import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, RotateCw, Sparkles, Layers, Sun, Moon, Eye, Info, 
  Settings, Activity, Compass, Cpu, HelpCircle, Check, HelpCircle as HelpIcon
} from 'lucide-react';
import { Smartphone } from '../types';
import { SMARTPHONES } from '../data';

interface ArViewModelModalProps {
  isOpen: boolean;
  onClose: () => void;
  phone: Smartphone;
}

// Interactive Hotspots for the 3D model
interface Hotspot {
  id: string;
  name: string;
  description: string;
  xOffset: number; // 3D units offset
  yOffset: number;
  zOffset: number;
}

const PHONE_HOTSPOTS: Record<string, Hotspot[]> = {
  'iphone-16-pro-max': [
    { id: 'camera', name: '48MP Quad-Pixel Camera', description: 'Advanced tetraprism telephoto array with physical OIS sensor-shift.', xOffset: -0.8, yOffset: -1.8, zOffset: -0.4 },
    { id: 'screen', name: 'Super Retina XDR Display', description: 'Custom dynamic refresh ProMotion display supporting down to 1Hz.', xOffset: 0, yOffset: 0, zOffset: 0.4 },
    { id: 'chip', name: 'A18 Pro Core Silicon', description: '6-core neural cluster utilizing high-efficiency TSMC 3nm lithography.', xOffset: 0.2, yOffset: 0.5, zOffset: 0 },
    { id: 'battery', name: '4685mAh Recycled Battery', description: '100% recycled cobalt cell delivering up to 29 hours video loop time.', xOffset: -0.2, yOffset: 1.0, zOffset: 0 }
  ],
  'galaxy-s24-ultra': [
    { id: 'camera', name: '200MP ISOCELL Sensor', description: 'Extreme pixel-binning matrix combining 16 pixels for low light sharpness.', xOffset: -0.7, yOffset: -1.9, zOffset: -0.4 },
    { id: 'pen', name: 'S-Pen Integrated Silo', description: 'Low-latency electromagnetic resonance stylus with remote gesture controls.', xOffset: 1.1, yOffset: 2.2, zOffset: 0.2 },
    { id: 'titanium', name: 'Grade 2 Titanium Enclosure', description: 'High strength-to-weight structural alloy protecting critical boards.', xOffset: -1.4, yOffset: 0, zOffset: 0 }
  ],
  'pixel-9-pro': [
    { id: 'camera', name: 'Tensor Custom Camera Bar', description: 'Distinct horizontal visor housing custom dual-exposure PD sensors.', xOffset: 0, yOffset: -1.9, zOffset: -0.45 },
    { id: 'g4', name: 'Google Tensor G4 NPU', description: 'Deeply integrated co-processor running on-device Gemini Multimodal Nano.', xOffset: 0, yOffset: 0.2, zOffset: 0 }
  ]
};

const DEFAULT_HOTSPOTS: Hotspot[] = [
  { id: 'camera', name: 'Advanced Lens Module', description: 'High-fidelity lens elements designed to optimize dynamic exposure ranges.', xOffset: -0.5, yOffset: -1.5, zOffset: -0.3 },
  { id: 'screen', name: 'Fluid Display Panel', description: 'High-contrast responsive panel with ultra-slim outer bezels.', xOffset: 0, yOffset: 0, zOffset: 0.3 },
  { id: 'battery', name: 'High-Density Cell', description: 'Optimized chemistry designed for long lifecycle standards.', xOffset: 0, yOffset: 1.0, zOffset: 0 }
];

export default function ArViewModelModal({
  isOpen,
  onClose,
  phone
}: ArViewModelModalProps) {
  // 3D Canvas configuration state
  const [yaw, setYaw] = useState<number>(0.6); // Rotations in radians
  const [pitch, setPitch] = useState<number>(-0.4);
  const [zoomScale, setZoomScale] = useState<number>(1.2);
  const [isExploded, setIsExploded] = useState<boolean>(false);
  const [showBlueprint, setShowBlueprint] = useState<boolean>(false);
  const [lightingEnvironment, setLightingEnvironment] = useState<'studio' | 'neon' | 'sunset' | 'outdoors'>('studio');
  const [autoRotate, setAutoRotate] = useState<boolean>(true);
  
  // Custom Color Customization state (initialized to phone's default)
  const [chassisColor, setChassisColor] = useState<string>('#9E938A'); // Titanium/Silverish default
  const [selectedPresetColor, setSelectedPresetColor] = useState<string>('Default');
  
  // Active selected annotation hotspot
  const [activeHotspotId, setActiveHotspotId] = useState<string>('camera');

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isDraggingRef = useRef<boolean>(false);
  const dragStartPos = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const requestRef = useRef<number | null>(null);

  // Initialize specific chassis colors based on selected model
  useEffect(() => {
    if (phone.id.includes('iphone-16-pro')) {
      setChassisColor('#C0B3A3'); // Desert Titanium
      setSelectedPresetColor('Desert Titanium');
    } else if (phone.id.includes('iphone-16')) {
      setChassisColor('#4A6F8C'); // Ultramarine Blue
      setSelectedPresetColor('Ultramarine Blue');
    } else if (phone.id.includes('galaxy-s24-ultra')) {
      setChassisColor('#8C8A84'); // Titanium Gray
      setSelectedPresetColor('Titanium Gray');
    } else if (phone.id.includes('pixel-9')) {
      setChassisColor('#ECE6E0'); // Porcelain
      setSelectedPresetColor('Porcelain');
    } else {
      setChassisColor('#3A3D40'); // Slate Matte
      setSelectedPresetColor('Slate Matte');
    }
  }, [phone.id]);

  // Handle auto rotation animation tick
  useEffect(() => {
    if (!autoRotate) return;

    let lastTime = performance.now();
    const tick = (time: number) => {
      const delta = (time - lastTime) / 1000;
      lastTime = time;
      
      // Auto increment Yaw slowly
      setYaw(prev => (prev + delta * 0.2) % (Math.PI * 2));
      requestRef.current = requestAnimationFrame(tick);
    };

    requestRef.current = requestAnimationFrame(tick);
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [autoRotate]);

  // Color options based on model branding
  const getBrandedColorPresets = () => {
    if (phone.id.includes('iphone-16-pro')) {
      return [
        { label: 'Desert Titanium', hex: '#C0B3A3' },
        { label: 'Natural Titanium', hex: '#A5A29B' },
        { label: 'White Titanium', hex: '#F2F1ED' },
        { label: 'Black Titanium', hex: '#3C3D3A' }
      ];
    }
    if (phone.id.includes('galaxy-s24-ultra')) {
      return [
        { label: 'Titanium Gray', hex: '#8C8A84' },
        { label: 'Titanium Black', hex: '#3B3C3E' },
        { label: 'Titanium Violet', hex: '#585563' },
        { label: 'Titanium Yellow', hex: '#EBE2CD' }
      ];
    }
    if (phone.id.includes('pixel-9')) {
      return [
        { label: 'Porcelain', hex: '#ECE6E0' },
        { label: 'Obsidian', hex: '#2C2D30' },
        { label: 'Hazel', hex: '#878F85' },
        { label: 'Rose Quartz', hex: '#EFCAD3' }
      ];
    }
    return [
      { label: 'Emerald Green', hex: '#0B4533' },
      { label: 'Midnight Blue', hex: '#0F2042' },
      { label: 'Cosmic Slate', hex: '#2A2C30' },
      { label: 'Satin Crimson', hex: '#801121' }
    ];
  };

  const colorPresets = getBrandedColorPresets();
  const hotspots = PHONE_HOTSPOTS[phone.id] || DEFAULT_HOTSPOTS;
  const activeHotspot = hotspots.find(h => h.id === activeHotspotId) || hotspots[0];

  // Mouse / Touch Rotation controls
  const handleStartDrag = (clientX: number, clientY: number) => {
    isDraggingRef.current = true;
    setAutoRotate(false); // Stop auto rotation when user grabs the phone
    dragStartPos.current = { x: clientX, y: clientY };
  };

  const handleDragMove = (clientX: number, clientY: number) => {
    if (!isDraggingRef.current) return;
    const deltaX = clientX - dragStartPos.current.x;
    const deltaY = clientY - dragStartPos.current.y;
    
    // Scale motion vectors to radian increments
    setYaw(prev => prev + deltaX * 0.007);
    setPitch(prev => Math.max(-Math.PI / 2 + 0.1, Math.min(Math.PI / 2 - 0.1, prev + deltaY * 0.007)));
    
    dragStartPos.current = { x: clientX, y: clientY };
  };

  const handleStopDrag = () => {
    isDraggingRef.current = false;
  };

  // Main custom 3D projection rendering engine (Painters Algorithm)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set high-DPI scaling
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * 2;
    canvas.height = rect.height * 2;
    ctx.scale(2, 2);

    const cx = rect.width / 2;
    const cy = rect.height / 2;

    // Phone base box dimensions
    const phoneWidth = 2.4;
    const phoneHeight = 4.8;
    const phoneDepth = 0.22;

    // Helper to rotate a point in 3D
    const rotate3D = (x: number, y: number, z: number) => {
      // Rotate around X axis (pitch)
      const cosP = Math.cos(pitch);
      const sinP = Math.sin(pitch);
      const y1 = y * cosP - z * sinP;
      const z1 = y * sinP + z * cosP;
      const x1 = x;

      // Rotate around Y axis (yaw)
      const cosY = Math.cos(yaw);
      const sinY = Math.sin(yaw);
      const x2 = x1 * cosY + z1 * sinY;
      const z2 = -x1 * sinY + z1 * cosY;
      const y2 = y1;

      return { x: x2, y: y2, z: z2 };
    };

    // Helper to project rotated 3D coordinates to 2D screen coordinates
    const cameraDistance = 8;
    const baseScale = 85 * zoomScale;

    const project3D = (rotated: { x: number; y: number; z: number }) => {
      const factor = cameraDistance / (cameraDistance + rotated.z);
      return {
        x: cx + rotated.x * factor * baseScale,
        y: cy + rotated.y * factor * baseScale,
        z: rotated.z // keep for depth ordering
      };
    };

    // Environmental Lights definition based on user selection
    const getLightDirectionAndColor = () => {
      switch (lightingEnvironment) {
        case 'neon':
          return {
            dir: { x: 0.8, y: -0.5, z: 1.0 },
            ambient: { r: 15, g: 20, b: 40 },
            diffuse: { r: 190, g: 30, b: 240 } // Purple neon glow
          };
        case 'sunset':
          return {
            dir: { x: -0.7, y: -0.2, z: 0.8 },
            ambient: { r: 40, g: 25, b: 20 },
            diffuse: { r: 255, g: 110, b: 40 } // Deep orange amber
          };
        case 'outdoors':
          return {
            dir: { x: 0.2, y: -1.0, z: 0.5 },
            ambient: { r: 50, g: 50, b: 50 },
            diffuse: { r: 240, g: 240, b: 220 } // Bright sunlight
          };
        case 'studio':
        default:
          return {
            dir: { x: 0.5, y: -0.8, z: 1.0 },
            ambient: { r: 35, g: 35, b: 40 },
            diffuse: { r: 180, g: 180, b: 180 } // Professional soft studio light
          };
      }
    };

    const light = getLightDirectionAndColor();

    // Helper to shade polygons with Lambertian diffuse reflection + Ambient glow
    const calculateShading = (normal: { x: number; y: number; z: number }, baseRGB: { r: number; g: number; b: number }) => {
      // Calculate dot product between face normal and light vector
      const magNormal = Math.sqrt(normal.x ** 2 + normal.y ** 2 + normal.z ** 2);
      const magLight = Math.sqrt(light.dir.x ** 2 + light.dir.y ** 2 + light.dir.z ** 2);
      
      let dot = 0;
      if (magNormal > 0 && magLight > 0) {
        dot = (normal.x * light.dir.x + normal.y * light.dir.y + normal.z * light.dir.z) / (magNormal * magLight);
      }
      
      const diffuseIntensity = Math.max(0, dot);

      // Mix Ambient + Diffuse light
      const r = Math.min(255, Math.round(
        (light.ambient.r / 255) * baseRGB.r + (light.diffuse.r / 255) * baseRGB.r * diffuseIntensity
      ));
      const g = Math.min(255, Math.round(
        (light.ambient.g / 255) * baseRGB.g + (light.diffuse.g / 255) * baseRGB.g * diffuseIntensity
      ));
      const b = Math.min(255, Math.round(
        (light.ambient.b / 255) * baseRGB.b + (light.diffuse.b / 255) * baseRGB.b * diffuseIntensity
      ));

      return `rgb(${r}, ${g}, ${b})`;
    };

    // Parse the current chassis color hex to RGB
    const parseHexToRGB = (hex: string) => {
      const match = hex.replace('#', '').match(/.{1,2}/g);
      if (match && match.length === 3) {
        return {
          r: parseInt(match[0], 16),
          g: parseInt(match[1], 16),
          b: parseInt(match[2], 16)
        };
      }
      return { r: 158, g: 147, b: 138 };
    };

    const coreChassisRGB = parseHexToRGB(chassisColor);

    // Clear Canvas
    ctx.clearRect(0, 0, rect.width, rect.height);

    // Render a high-tech radial shadow below the phone to anchor it
    const shadowGrad = ctx.createRadialGradient(cx, cy + 180, 5, cx, cy + 180, 160);
    shadowGrad.addColorStop(0, 'rgba(0, 0, 0, 0.45)');
    shadowGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = shadowGrad;
    ctx.beginPath();
    ctx.ellipse(cx, cy + 180, 100, 12, 0, 0, Math.PI * 2);
    ctx.fill();

    // Setup phone part coordinates. If Exploded is true, parts have 3D offsets.
    const backOffsetZ = isExploded ? -1.4 : 0;
    const midFrameOffsetZ = 0;
    const screenOffsetZ = isExploded ? 1.4 : 0;

    // Define 3D Components of the phone to project:
    // We render 3 key layers: Back Plate (with cameras), Midframe (chassis sides), Screen glass panel
    const partsList: Array<{
      type: 'back' | 'midframe' | 'screen' | 'hotspot';
      avgZ: number;
      draw: () => void;
    }> = [];

    // --- PART 1: MIDFRAME CHASSIS ---
    // The side panels connecting front and back
    const w = phoneWidth / 2;
    const h = phoneHeight / 2;
    const d = phoneDepth / 2;

    const vertices = [
      { x: -w, y: -h, z: -d + midFrameOffsetZ }, // 0: Back Top Left
      { x:  w, y: -h, z: -d + midFrameOffsetZ }, // 1: Back Top Right
      { x:  w, y:  h, z: -d + midFrameOffsetZ }, // 2: Back Bottom Right
      { x: -w, y:  h, z: -d + midFrameOffsetZ }, // 3: Back Bottom Left
      { x: -w, y: -h, z:  d + midFrameOffsetZ }, // 4: Front Top Left
      { x:  w, y: -h, z:  d + midFrameOffsetZ }, // 5: Front Top Right
      { x:  w, y:  h, z:  d + midFrameOffsetZ }, // 6: Front Bottom Right
      { x: -w, y:  h, z:  d + midFrameOffsetZ }  // 7: Front Bottom Left
    ];

    const rotatedVerts = vertices.map(v => {
      const rot = rotate3D(v.x, v.y, v.z);
      return { rot, proj: project3D(rot) };
    });

    // Define the side faces
    const sideFaces = [
      { indices: [0, 1, 5, 4], normal: { x: 0, y: -1, z: 0 }, type: 'top' },
      { indices: [3, 7, 6, 2], normal: { x: 0, y: 1, z: 0 }, type: 'bottom' },
      { indices: [0, 4, 7, 3], normal: { x: -1, y: 0, z: 0 }, type: 'left' },
      { indices: [1, 2, 6, 5], normal: { x: 1, y: 0, z: 0 }, type: 'right' }
    ];

    sideFaces.forEach(face => {
      const faceRotatedZ = face.indices.reduce((sum, idx) => sum + rotatedVerts[idx].rot.z, 0) / 4;
      partsList.push({
        type: 'midframe',
        avgZ: faceRotatedZ,
        draw: () => {
          // Draw metallic side face
          ctx.beginPath();
          ctx.moveTo(rotatedVerts[face.indices[0]].proj.x, rotatedVerts[face.indices[0]].proj.y);
          for (let i = 1; i < 4; i++) {
            ctx.lineTo(rotatedVerts[face.indices[i]].proj.x, rotatedVerts[face.indices[i]].proj.y);
          }
          ctx.closePath();

          // Fill with chassis shade
          const rotNormal = rotate3D(face.normal.x, face.normal.y, face.normal.z);
          ctx.fillStyle = calculateShading(rotNormal, coreChassisRGB);
          ctx.fill();

          // Render high-tech line overlays in blueprint wireframe mode
          if (showBlueprint) {
            ctx.strokeStyle = 'rgba(56, 189, 248, 0.6)';
            ctx.lineWidth = 1;
            ctx.stroke();
          } else {
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }

          // Draw fine details (Buttons on left/right edges)
          if (face.type === 'left' && !showBlueprint) {
            // Volume rockers
            const b1_rot = rotate3D(-w - 0.05, -0.6, 0);
            const b1_proj = project3D(b1_rot);
            const b2_rot = rotate3D(-w - 0.05, -0.2, 0);
            const b2_proj = project3D(b2_rot);

            ctx.fillStyle = '#1e293b';
            ctx.beginPath();
            ctx.arc(b1_proj.x, b1_proj.y, 3, 0, Math.PI * 2);
            ctx.arc(b2_proj.x, b2_proj.y, 3, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      });
    });

    // --- PART 2: BACK GLASS & CAMERA SETUP ---
    // Facing -Z direction
    const backCenterRot = rotate3D(0, 0, -d + backOffsetZ);
    partsList.push({
      type: 'back',
      avgZ: backCenterRot.z,
      draw: () => {
        // Project 4 corners of backplate
        const bp0 = project3D(rotate3D(-w, -h, -d + backOffsetZ));
        const bp1 = project3D(rotate3D(w, -h, -d + backOffsetZ));
        const bp2 = project3D(rotate3D(w, h, -d + backOffsetZ));
        const bp3 = project3D(rotate3D(-w, h, -d + backOffsetZ));

        ctx.beginPath();
        ctx.moveTo(bp0.x, bp0.y);
        ctx.lineTo(bp1.x, bp1.y);
        ctx.lineTo(bp2.x, bp2.y);
        ctx.lineTo(bp3.x, bp3.y);
        ctx.closePath();

        // Shading the back matte glass
        const backNormal = rotate3D(0, 0, -1);
        ctx.fillStyle = calculateShading(backNormal, coreChassisRGB);
        ctx.fill();

        if (showBlueprint) {
          ctx.strokeStyle = '#38bdf8';
          ctx.lineWidth = 1.5;
          ctx.stroke();
        } else {
          ctx.strokeStyle = 'rgba(0, 0, 0, 0.2)';
          ctx.lineWidth = 1;
          ctx.stroke();
        }

        // DRAW BACKPLATE DETAIL EXTRAS (Camera Visor or Camera Bump)
        if (!showBlueprint) {
          if (phone.id.includes('pixel-9')) {
            // Google Horizontal Camera Bar visor
            const cb0 = project3D(rotate3D(-w + 0.15, -1.8, -d - 0.1 + backOffsetZ));
            const cb1 = project3D(rotate3D(w - 0.15, -1.8, -d - 0.1 + backOffsetZ));
            const cb2 = project3D(rotate3D(w - 0.15, -1.3, -d - 0.1 + backOffsetZ));
            const cb3 = project3D(rotate3D(-w + 0.15, -1.3, -d - 0.1 + backOffsetZ));

            ctx.beginPath();
            ctx.moveTo(cb0.x, cb0.y);
            ctx.lineTo(cb1.x, cb1.y);
            ctx.lineTo(cb2.x, cb2.y);
            ctx.lineTo(cb3.x, cb3.y);
            ctx.closePath();
            ctx.fillStyle = '#1e293b'; // Shiny metal obsidian
            ctx.fill();
            ctx.strokeStyle = '#64748b';
            ctx.stroke();

            // Lenses on pixel visor
            const l1 = project3D(rotate3D(-0.5, -1.55, -d - 0.12 + backOffsetZ));
            const l2 = project3D(rotate3D(0, -1.55, -d - 0.12 + backOffsetZ));
            const l3 = project3D(rotate3D(0.5, -1.55, -d - 0.12 + backOffsetZ));

            ctx.fillStyle = '#020617';
            ctx.beginPath();
            ctx.arc(l1.x, l1.y, 5, 0, Math.PI * 2);
            ctx.arc(l2.x, l2.y, 5, 0, Math.PI * 2);
            ctx.arc(l3.x, l3.y, 5, 0, Math.PI * 2);
            ctx.fill();

            // Inner glass pupil reflections
            ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
            ctx.beginPath();
            ctx.arc(l1.x - 2, l1.y - 2, 1.5, 0, Math.PI * 2);
            ctx.arc(l2.x - 2, l2.y - 2, 1.5, 0, Math.PI * 2);
            ctx.arc(l3.x - 2, l3.y - 2, 1.5, 0, Math.PI * 2);
            ctx.fill();
          } else {
            // Apple/Samsung Square or isolated lenses bump
            // Camera bump container
            const cb0 = project3D(rotate3D(-w + 0.2, -h + 0.2, -d - 0.08 + backOffsetZ));
            const cb1 = project3D(rotate3D(-0.1, -h + 0.2, -d - 0.08 + backOffsetZ));
            const cb2 = project3D(rotate3D(-0.1, -0.6, -d - 0.08 + backOffsetZ));
            const cb3 = project3D(rotate3D(-w + 0.2, -0.6, -d - 0.08 + backOffsetZ));

            ctx.beginPath();
            ctx.moveTo(cb0.x, cb0.y);
            ctx.lineTo(cb1.x, cb1.y);
            ctx.lineTo(cb2.x, cb2.y);
            ctx.lineTo(cb3.x, cb3.y);
            ctx.closePath();
            ctx.fillStyle = 'rgba(0, 0, 0, 0.15)';
            ctx.fill();
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
            ctx.stroke();

            // 3 distinctive phone camera lenses
            const lensPositions = [
              { rx: -w + 0.5, ry: -h + 0.6 },
              { rx: -w + 0.5, ry: -1.0 },
              { rx: -0.5, ry: -1.3 }
            ];

            lensPositions.forEach(lens => {
              const lensRot = rotate3D(lens.rx, lens.ry, -d - 0.1 + backOffsetZ);
              const lensProj = project3D(lensRot);
              
              // Outer metallic ring
              ctx.strokeStyle = '#475569';
              ctx.lineWidth = 1.5;
              ctx.beginPath();
              ctx.arc(lensProj.x, lensProj.y, 6, 0, Math.PI * 2);
              ctx.stroke();

              // Dark optics center
              ctx.fillStyle = '#090d16';
              ctx.beginPath();
              ctx.arc(lensProj.x, lensProj.y, 4.5, 0, Math.PI * 2);
              ctx.fill();

              // Highlight reflection dot
              ctx.fillStyle = 'rgba(125, 211, 252, 0.6)';
              ctx.beginPath();
              ctx.arc(lensProj.x - 1.5, lensProj.y - 1.5, 1.5, 0, Math.PI * 2);
              ctx.fill();
            });
          }

          // Subtle brand text label
          const labelRot = rotate3D(0, 1.2, -d + backOffsetZ);
          const labelProj = project3D(labelRot);
          ctx.fillStyle = 'rgba(255, 255, 255, 0.25)';
          ctx.font = 'black 8px font-mono';
          ctx.textAlign = 'center';
          ctx.fillText(phone.brand.toUpperCase(), labelProj.x, labelProj.y);
        }
      }
    });

    // --- PART 3: SCREEN DISPLAY CLASS PANEL ---
    // Facing +Z direction (Front face)
    const frontCenterRot = rotate3D(0, 0, d + screenOffsetZ);
    partsList.push({
      type: 'screen',
      avgZ: frontCenterRot.z,
      draw: () => {
        // Project front screen corners
        const sc0 = project3D(rotate3D(-w, -h, d + screenOffsetZ));
        const sc1 = project3D(rotate3D(w, -h, d + screenOffsetZ));
        const sc2 = project3D(rotate3D(w, h, d + screenOffsetZ));
        const sc3 = project3D(rotate3D(-w, h, d + screenOffsetZ));

        // Screen bezel (slightly larger than active panel)
        ctx.beginPath();
        ctx.moveTo(sc0.x, sc0.y);
        ctx.lineTo(sc1.x, sc1.y);
        ctx.lineTo(sc2.x, sc2.y);
        ctx.lineTo(sc3.x, sc3.y);
        ctx.closePath();
        ctx.fillStyle = '#090d16'; // Deep sleek black border bezel
        ctx.fill();

        if (showBlueprint) {
          ctx.strokeStyle = '#38bdf8';
          ctx.lineWidth = 1.5;
          ctx.stroke();
        } else {
          ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
          ctx.lineWidth = 1;
          ctx.stroke();
        }

        // DRAW ACTIVE INNER GLOWING DISPLAY SCREEN
        if (!showBlueprint) {
          const innerW = w - 0.08;
          const innerH = h - 0.08;

          const panel0 = project3D(rotate3D(-innerW, -innerH, d + 0.01 + screenOffsetZ));
          const panel1 = project3D(rotate3D(innerW, -innerH, d + 0.01 + screenOffsetZ));
          const panel2 = project3D(rotate3D(innerW, innerH, d + 0.01 + screenOffsetZ));
          const panel3 = project3D(rotate3D(-innerW, innerH, d + 0.01 + screenOffsetZ));

          ctx.beginPath();
          ctx.moveTo(panel0.x, panel0.y);
          ctx.lineTo(panel1.x, panel1.y);
          ctx.lineTo(panel2.x, panel2.y);
          ctx.lineTo(panel3.x, panel3.y);
          ctx.closePath();

          // Render a vibrant gradient representing phone wallpaper
          const scGrad = ctx.createLinearGradient(panel0.x, panel0.y, panel2.x, panel2.y);
          if (phone.id.includes('iphone')) {
            scGrad.addColorStop(0, '#fca5a5'); // Desert Gold Apple
            scGrad.addColorStop(0.5, '#4f46e5'); // Deep Blue Accent
            scGrad.addColorStop(1, '#000000');
          } else if (phone.id.includes('pixel')) {
            scGrad.addColorStop(0, '#34d399'); // Teal Green Pixel
            scGrad.addColorStop(0.5, '#1e1b4b');
            scGrad.addColorStop(1, '#060606');
          } else {
            scGrad.addColorStop(0, '#a5b4fc'); // Blue Violet S24
            scGrad.addColorStop(0.5, '#4338ca');
            scGrad.addColorStop(1, '#090514');
          }

          ctx.fillStyle = scGrad;
          ctx.fill();

          // Draw Dynamic Island / Camera hole-punch cutout
          const cutoutRot = rotate3D(0, -innerH + 0.25, d + 0.02 + screenOffsetZ);
          const cutoutProj = project3D(cutoutRot);
          ctx.fillStyle = '#000000';
          ctx.beginPath();
          if (phone.id.includes('iphone-16-pro')) {
            // Draw custom oval pill cut
            ctx.ellipse(cutoutProj.x, cutoutProj.y, 14, 5, 0, 0, Math.PI * 2);
          } else {
            // Samsung / Pixel single small dot punch
            ctx.arc(cutoutProj.x, cutoutProj.y, 4, 0, Math.PI * 2);
          }
          ctx.fill();

          // Simulated glossy surface reflection overlay
          ctx.beginPath();
          ctx.moveTo(panel0.x, panel0.y);
          ctx.lineTo(panel1.x, panel1.y);
          ctx.lineTo(panel1.x - (panel1.x - panel0.x) * 0.45, panel2.y);
          ctx.lineTo(panel0.x, panel2.y);
          ctx.closePath();
          
          const glassRefGrad = ctx.createLinearGradient(panel0.x, panel0.y, panel1.x, panel2.y);
          glassRefGrad.addColorStop(0, 'rgba(255, 255, 255, 0.18)');
          glassRefGrad.addColorStop(0.4, 'rgba(255, 255, 255, 0.05)');
          glassRefGrad.addColorStop(1, 'rgba(255, 255, 255, 0)');
          ctx.fillStyle = glassRefGrad;
          ctx.fill();

          // Render digital hud/text elements onto the screen
          const textRot = rotate3D(0, 0.5, d + 0.02 + screenOffsetZ);
          const textProj = project3D(textRot);
          ctx.fillStyle = 'rgba(255, 255, 255, 0.85)';
          ctx.font = '800 11px font-sans';
          ctx.textAlign = 'center';
          ctx.fillText(phone.name, textProj.x, textProj.y);

          ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
          ctx.font = '500 8px font-mono';
          ctx.fillText('ACTIVE AR 3D MODEL', textProj.x, textProj.y + 14);
        }
      }
    });

    // --- PART 4: INTERACTIVE 3D HOTSPOT PINPOINTS ---
    // Render pinpoint targets hovering around relevant 3D components
    hotspots.forEach(hot => {
      const hotRot = rotate3D(hot.xOffset, hot.yOffset, hot.zOffset);
      
      partsList.push({
        type: 'hotspot',
        avgZ: hotRot.z,
        draw: () => {
          const pt = project3D(hotRot);
          const isActive = hot.id === activeHotspotId;

          // Drawing interactive 3D pinpoint rings
          ctx.beginPath();
          ctx.arc(pt.x, pt.y, isActive ? 12 : 7, 0, Math.PI * 2);
          ctx.fillStyle = isActive ? 'rgba(249, 115, 22, 0.25)' : 'rgba(56, 189, 248, 0.25)';
          ctx.fill();

          ctx.beginPath();
          ctx.arc(pt.x, pt.y, isActive ? 5 : 3.5, 0, Math.PI * 2);
          ctx.fillStyle = isActive ? '#F97316' : '#0284c7';
          ctx.fill();

          ctx.strokeStyle = '#ffffff';
          ctx.lineWidth = isActive ? 1.5 : 1;
          ctx.beginPath();
          ctx.arc(pt.x, pt.y, isActive ? 12 : 7, 0, Math.PI * 2);
          ctx.stroke();

          // Draw pinpoint tags on hover/active
          if (isActive) {
            ctx.fillStyle = 'rgba(15, 23, 42, 0.9)';
            ctx.strokeStyle = '#F97316';
            ctx.lineWidth = 1;
            
            // Text size calculation
            const textWidth = ctx.measureText(hot.name).width;
            const padX = 8;
            const padY = 5;
            const boxW = textWidth + padX * 2;
            const boxH = 18;

            ctx.beginPath();
            ctx.roundRect(pt.x - boxW / 2, pt.y - 34, boxW, boxH, 4);
            ctx.fill();
            ctx.stroke();

            // Label text
            ctx.fillStyle = '#ffffff';
            ctx.font = '900 8.5px font-sans';
            ctx.textAlign = 'center';
            ctx.fillText(hot.name, pt.x, pt.y - 22);
          }
        }
      });
    });

    // --- PAINTERS DEPTH SORTING AND DRAW Ticks ---
    // Sort all layers based on deep rotated Z value to avoid clipping artifacts
    partsList.sort((a, b) => b.avgZ - a.avgZ); // Sort descending to draw deepest parts first (smaller Z value is furthest)
    partsList.forEach(part => part.draw());

    // Connect Exploded blueprints with faint vertical vector cables
    if (isExploded) {
      // Top Center Connectors
      const ptBack = project3D(rotate3D(0, -1.8, -d + backOffsetZ));
      const ptMid = project3D(rotate3D(0, -1.8, midFrameOffsetZ));
      const ptFront = project3D(rotate3D(0, -1.8, d + screenOffsetZ));

      ctx.strokeStyle = 'rgba(56, 189, 248, 0.35)';
      ctx.lineWidth = 1;
      ctx.setLineDash([4, 4]);
      
      ctx.beginPath();
      ctx.moveTo(ptBack.x, ptBack.y);
      ctx.lineTo(ptMid.x, ptMid.y);
      ctx.lineTo(ptFront.x, ptFront.y);
      ctx.stroke();
      ctx.setLineDash([]); // Reset
    }

  }, [yaw, pitch, zoomScale, isExploded, showBlueprint, lightingEnvironment, chassisColor, activeHotspotId, phone]);

  // Click handler on canvas to detect hotspot selector hitpoints
  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;

    // Projected sizes variables
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const phoneWidth = 2.4;
    const phoneHeight = 4.8;
    const phoneDepth = 0.22;
    const w = phoneWidth / 2;
    const h = phoneHeight / 2;
    const d = phoneDepth / 2;
    const baseScale = 85 * zoomScale;
    const cameraDistance = 8;
    const screenOffsetZ = isExploded ? 1.4 : 0;

    const rotate3D = (x: number, y: number, z: number) => {
      const cosP = Math.cos(pitch);
      const sinP = Math.sin(pitch);
      const y1 = y * cosP - z * sinP;
      const z1 = y * sinP + z * cosP;
      const x1 = x;

      const cosY = Math.cos(yaw);
      const sinY = Math.sin(yaw);
      const x2 = x1 * cosY + z1 * sinY;
      const z2 = -x1 * sinY + z1 * cosY;
      const y2 = y1;

      return { x: x2, y: y2, z: z2 };
    };

    const project3D = (rotated: { x: number; y: number; z: number }) => {
      const factor = cameraDistance / (cameraDistance + rotated.z);
      return {
        x: cx + rotated.x * factor * baseScale,
        y: cy + rotated.y * factor * baseScale
      };
    };

    // Find if user clicked within 15px bounding range of any annotation point
    let foundHotspot = false;
    hotspots.forEach(hot => {
      const rot = rotate3D(hot.xOffset, hot.yOffset, hot.zOffset);
      const pt = project3D(rot);
      const dist = Math.sqrt((pt.x - clickX) ** 2 + (pt.y - clickY) ** 2);
      
      if (dist < 18) {
        setActiveHotspotId(hot.id);
        foundHotspot = true;
      }
    });

    if (!foundHotspot) {
      // Toggle rotation animation trigger on outer click
      setAutoRotate(prev => !prev);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Main Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-950/90 backdrop-blur-md z-[160] cursor-pointer"
          />

          {/* Fullscreen 3D Workshop Panel */}
          <div className="fixed inset-0 z-[161] flex items-center justify-center p-3 sm:p-5 md:p-6 overflow-y-auto pointer-events-none">
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 210 }}
              className="bg-slate-900 border border-slate-800 text-slate-100 rounded-[32px] shadow-2xl w-full max-w-6xl h-auto xl:h-[88vh] flex flex-col md:grid md:grid-cols-12 overflow-hidden pointer-events-auto select-none"
            >
              {/* LEFT COLUMN: Customizer Controls (Col-3) */}
              <div id="ar-view-left-controls" className="md:col-span-3 border-b md:border-b-0 md:border-r border-slate-800/90 p-5 md:p-6 flex flex-col justify-between space-y-6 bg-slate-950/70 overflow-y-auto max-h-[35vh] md:max-h-none">
                <div className="space-y-6">
                  {/* Header title */}
                  <div>
                    <span className="text-[10px] font-black text-brand-orange uppercase tracking-widest bg-brand-orange/10 px-2.5 py-1 rounded-full border border-brand-orange/25 inline-flex items-center gap-1.5 mb-2">
                      <Compass className="w-3.5 h-3.5 animate-spin-slow" /> Real-time CAD Engine
                    </span>
                    <h3 className="font-display font-black text-white text-lg tracking-tight">AR Design Studio</h3>
                    <p className="text-[11px] text-slate-400 mt-1 leading-normal">
                      Inspect structural engineering layouts, customized materials, and physical device specifications.
                    </p>
                  </div>

                  {/* Preset Colors selector */}
                  <div className="space-y-2.5">
                    <label className="text-[10px] font-black uppercase text-slate-400 tracking-wider flex items-center gap-1.5">
                      <Layers className="w-3.5 h-3.5 text-slate-500" /> Chassis Shell Options
                    </label>
                    <div className="grid grid-cols-2 gap-1.5">
                      {colorPresets.map((color) => (
                        <button
                          key={color.label}
                          type="button"
                          onClick={() => {
                            setChassisColor(color.hex);
                            setSelectedPresetColor(color.label);
                          }}
                          className={`p-2 rounded-xl text-left text-[10.5px] font-bold transition-all border flex flex-col justify-between items-start gap-3 cursor-pointer ${
                            selectedPresetColor === color.label
                              ? 'bg-slate-800 text-white border-brand-orange shadow-md'
                              : 'bg-slate-900/40 border-slate-800/60 text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
                          }`}
                        >
                          {/* Colored circular pill */}
                          <div className="flex items-center gap-1.5">
                            <span 
                              className="w-3.5 h-3.5 rounded-full border border-white/20 shadow-inner block shrink-0"
                              style={{ backgroundColor: color.hex }}
                            />
                            <span className="truncate max-w-[55px] block">{color.label.split(' ')[0]}</span>
                          </div>
                          {selectedPresetColor === color.label && <Check className="w-3 h-3 text-brand-orange stroke-[3] self-end mt-[-10px]" />}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Manual Hex color input customizer */}
                  <div className="space-y-2 bg-slate-900/60 p-3 rounded-2xl border border-slate-800/50">
                    <span className="text-[9px] font-bold uppercase text-slate-400 tracking-wider block">Custom Anodized Hex</span>
                    <div className="flex items-center gap-2">
                      <input
                        type="color"
                        value={chassisColor}
                        onChange={(e) => {
                          setChassisColor(e.target.value);
                          setSelectedPresetColor('Custom');
                        }}
                        className="w-7 h-7 bg-transparent border-0 rounded cursor-pointer"
                      />
                      <input
                        type="text"
                        value={chassisColor.toUpperCase()}
                        onChange={(e) => {
                          if (e.target.value.startsWith('#') && e.target.value.length <= 7) {
                            setChassisColor(e.target.value);
                            setSelectedPresetColor('Custom');
                          }
                        }}
                        className="flex-1 bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1 text-xs font-mono font-bold text-slate-200 focus:outline-none focus:border-brand-orange text-center"
                      />
                    </div>
                  </div>

                  {/* Viewport Lighting options */}
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase text-slate-400 tracking-wider flex items-center gap-1.5">
                      <Sun className="w-3.5 h-3.5 text-slate-500" /> Dynamic HDR Environments
                    </label>
                    <div className="grid grid-cols-2 gap-1.5">
                      {[
                        { key: 'studio', label: 'Studio Soft', icon: <Cpu className="w-3 h-3" /> },
                        { key: 'neon', label: 'Neon Glow', icon: <Layers className="w-3 h-3" /> },
                        { key: 'sunset', label: 'Sunset Amber', icon: <Moon className="w-3 h-3" /> },
                        { key: 'outdoors', label: 'Daylight Sky', icon: <Sun className="w-3 h-3" /> }
                      ].map((env) => (
                        <button
                          key={env.key}
                          type="button"
                          onClick={() => setLightingEnvironment(env.key as any)}
                          className={`px-2.5 py-2 rounded-xl text-[10.5px] font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                            lightingEnvironment === env.key
                              ? 'bg-slate-800 text-brand-orange border border-brand-orange/40 shadow-sm font-black'
                              : 'bg-slate-900/40 border border-slate-800/30 text-slate-400 hover:text-slate-200'
                          }`}
                        >
                          {env.icon}
                          <span>{env.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Left panel foot stats */}
                <div className="pt-4 border-t border-slate-800/60 hidden md:block">
                  <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800 flex items-start gap-2">
                    <Info className="w-3.5 h-3.5 text-brand-orange shrink-0 mt-0.5" />
                    <p className="text-[10px] text-slate-400 leading-normal">
                      Drag or pinch inside the viewport to inspect customized reflections, structural alignment vectors, and curves.
                    </p>
                  </div>
                </div>
              </div>

              {/* CENTER COLUMN: 3D Render Viewport (Col-6) */}
              <div className="md:col-span-6 p-4 sm:p-5 md:p-6 flex flex-col justify-between bg-slate-950 overflow-hidden relative">
                {/* HUD Top panel indicators */}
                <div className="flex items-center justify-between pb-3 relative z-10">
                  <div className="flex items-center gap-2">
                    <span className="flex h-1.5 w-1.5 relative">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
                    </span>
                    <span className="text-[9.5px] font-mono font-bold text-slate-400 tracking-widest uppercase">
                      3D MULTI-AXIS PIPELINE ACTIVE
                    </span>
                  </div>

                  {/* Quick Preset Positions */}
                  <div className="flex gap-1">
                    <button
                      type="button"
                      onClick={() => { setYaw(0); setPitch(0); setAutoRotate(false); }}
                      className="px-2 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 text-[9px] font-mono font-bold cursor-pointer transition-colors"
                      title="Face Screen View"
                    >
                      FRONT
                    </button>
                    <button
                      type="button"
                      onClick={() => { setYaw(Math.PI); setPitch(0); setAutoRotate(false); }}
                      className="px-2 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 text-[9px] font-mono font-bold cursor-pointer transition-colors"
                      title="Camera Module View"
                    >
                      BACK
                    </button>
                    <button
                      type="button"
                      onClick={() => { setYaw(0.6); setPitch(-0.4); }}
                      className="px-2 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 text-[9px] font-mono font-bold cursor-pointer transition-colors"
                      title="Restore Isometric Angle"
                    >
                      RESET
                    </button>
                  </div>
                </div>

                {/* Primary interactive 3D Canvas element */}
                <div className="relative aspect-video w-full rounded-[24px] overflow-hidden bg-slate-900 border border-slate-800 shadow-inner flex items-center justify-center cursor-grab active:cursor-grabbing">
                  {/* Backdrop glowing grid coordinates overlay */}
                  <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:20px_20px] opacity-40" />

                  {/* 3D Canvas rendering layout */}
                  <canvas
                    ref={canvasRef}
                    onClick={handleCanvasClick}
                    onMouseDown={(e) => handleStartDrag(e.clientX, e.clientY)}
                    onMouseMove={(e) => handleDragMove(e.clientX, e.clientY)}
                    onMouseUp={handleStopDrag}
                    onTouchStart={(e) => e.touches[0] && handleStartDrag(e.touches[0].clientX, e.touches[0].clientY)}
                    onTouchMove={(e) => e.touches[0] && handleDragMove(e.touches[0].clientX, e.touches[0].clientY)}
                    onTouchEnd={handleStopDrag}
                    className="absolute inset-0 w-full h-full object-contain"
                  />

                  {/* Compass HUD Widget floating overlay */}
                  <div className="absolute bottom-4 left-4 bg-slate-950/80 backdrop-blur-md p-2 rounded-xl border border-slate-800 pointer-events-none text-[9px] font-mono space-y-1 text-slate-400">
                    <div className="flex justify-between gap-4">
                      <span>YAW (Y-ROTATION):</span>
                      <span className="font-bold text-white">{(yaw * (180 / Math.PI)).toFixed(0)}°</span>
                    </div>
                    <div className="flex justify-between gap-4">
                      <span>PITCH (X-ROTATION):</span>
                      <span className="font-bold text-white">{(pitch * (180 / Math.PI)).toFixed(0)}°</span>
                    </div>
                    <div className="flex justify-between gap-4">
                      <span>EXPLODED MATRIX:</span>
                      <span className={`font-bold ${isExploded ? 'text-brand-orange' : 'text-slate-500'}`}>
                        {isExploded ? 'ON (+2.8 Z)' : 'OFF'}
                      </span>
                    </div>
                  </div>

                  {/* Manual Zoom buttons floating overlay */}
                  <div className="absolute bottom-4 right-4 flex flex-col gap-1 z-10">
                    <button
                      type="button"
                      onClick={() => setZoomScale(p => Math.min(2.0, p + 0.15))}
                      className="w-7 h-7 bg-slate-950/90 hover:bg-slate-900 border border-slate-800 rounded-lg text-white font-mono text-sm font-black flex items-center justify-center cursor-pointer transition-colors shadow"
                      title="Zoom In"
                    >
                      +
                    </button>
                    <button
                      type="button"
                      onClick={() => setZoomScale(p => Math.max(0.6, p - 0.15))}
                      className="w-7 h-7 bg-slate-950/90 hover:bg-slate-900 border border-slate-800 rounded-lg text-white font-mono text-sm font-black flex items-center justify-center cursor-pointer transition-colors shadow"
                      title="Zoom Out"
                    >
                      -
                    </button>
                  </div>
                </div>

                {/* Viewport HUD bottom controls */}
                <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-800/60 mt-4 relative z-10">
                  {/* Exploded View Toggle button */}
                  <button
                    type="button"
                    onClick={() => {
                      setIsExploded(!isExploded);
                      setAutoRotate(false); // Disable auto rotate so they can inspect exploded detail
                    }}
                    className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
                      isExploded
                        ? 'bg-brand-orange text-slate-950 shadow-lg shadow-brand-orange/15 font-black'
                        : 'bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-200'
                    }`}
                  >
                    <Layers className="w-4 h-4" />
                    <span>{isExploded ? 'Collapse Parts' : 'Exploded View (3D Assembly)'}</span>
                  </button>

                  {/* Blueprint Layout Wireframe mode */}
                  <button
                    type="button"
                    onClick={() => setShowBlueprint(!showBlueprint)}
                    className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
                      showBlueprint
                        ? 'bg-sky-500/15 text-sky-400 border border-sky-500/55 font-black shadow-inner'
                        : 'bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-200'
                    }`}
                  >
                    <Eye className="w-4 h-4" />
                    <span>{showBlueprint ? 'Standard Shaded' : 'Blueprint Wireframe'}</span>
                  </button>

                  {/* Auto-orbit rotation switcher */}
                  <button
                    type="button"
                    onClick={() => setAutoRotate(!autoRotate)}
                    className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                      autoRotate
                        ? 'bg-slate-800 text-white border border-slate-700'
                        : 'bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-400'
                    }`}
                  >
                    <RotateCw className={`w-3.5 h-3.5 ${autoRotate ? 'animate-spin-slow text-brand-orange' : ''}`} />
                    <span>Auto Rotate</span>
                  </button>
                </div>
              </div>

              {/* RIGHT COLUMN: Structural Specs & Annotation descriptions (Col-3) */}
              <div id="ar-view-right-specs" className="md:col-span-3 border-t md:border-t-0 md:border-l border-slate-800/90 p-5 md:p-6 flex flex-col justify-between space-y-6 bg-slate-950/70 overflow-y-auto max-h-[35vh] md:max-h-none">
                <div className="space-y-6">
                  {/* Selected phone details */}
                  <div>
                    <label className="text-[9px] font-black uppercase text-slate-500 tracking-wider block font-mono">SPECIFIED CHASSIS MODEL</label>
                    <h4 className="font-display font-black text-white text-base mt-0.5 leading-snug">{phone.name}</h4>
                    <span className="text-[10px] text-brand-orange font-bold font-mono mt-1 block">Color: {selectedPresetColor}</span>
                  </div>

                  {/* Highlight Annotation HUD */}
                  <div className="space-y-3 bg-slate-900 p-4 rounded-2xl border border-slate-800">
                    <div className="flex items-center gap-1.5 text-brand-orange">
                      <Sparkles className="w-4 h-4 fill-current animate-pulse text-brand-orange" />
                      <span className="text-[10px] font-black uppercase tracking-wider">3D Annotation Inspector</span>
                    </div>

                    <div className="space-y-2">
                      <h5 className="text-xs font-bold text-white leading-tight">{activeHotspot.name}</h5>
                      <p className="text-[11px] text-slate-300 leading-relaxed font-medium">
                        {activeHotspot.description}
                      </p>
                    </div>

                    {/* Annotation switcher button selectors */}
                    <div className="pt-2 border-t border-slate-800/85 space-y-1">
                      <span className="text-[8.5px] text-slate-500 block uppercase font-mono mb-1.5">Switch Highlight Focal Point:</span>
                      <div className="flex flex-col gap-1">
                        {hotspots.map((hot) => (
                          <button
                            key={hot.id}
                            type="button"
                            onClick={() => {
                              setActiveHotspotId(hot.id);
                              // Adjust yaw/pitch automatically to focus on relevant camera or battery
                              if (hot.id === 'camera') {
                                setYaw(Math.PI); // facing back
                                setPitch(-0.1);
                              } else if (hot.id === 'screen') {
                                setYaw(0); // facing front
                                setPitch(0);
                              } else {
                                setYaw(0.6); // isometric
                                setPitch(-0.3);
                              }
                            }}
                            className={`w-full text-left px-2 py-1.5 rounded-lg text-[10px] font-bold transition-all flex items-center justify-between cursor-pointer ${
                              activeHotspotId === hot.id
                                ? 'bg-slate-800 text-brand-orange font-extrabold border-l-2 border-brand-orange pl-2'
                                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/50'
                            }`}
                          >
                            <span className="truncate">{hot.name}</span>
                            <span className="text-[8px] font-mono text-slate-500">[{hot.id.toUpperCase()}]</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Structural dimensions spec sheets */}
                  <div className="space-y-2.5">
                    <label className="text-[9px] font-black uppercase text-slate-500 tracking-wider block font-mono">Structural Assembly Data</label>
                    
                    <div className="space-y-1.5 text-[11px] text-slate-300">
                      <div className="flex justify-between items-center py-1 border-b border-slate-900">
                        <span className="text-slate-500">Form Factor:</span>
                        <span className="font-bold text-slate-200">{phone.specs.display.split('(')[0]}</span>
                      </div>
                      <div className="flex justify-between items-center py-1 border-b border-slate-900">
                        <span className="text-slate-500">Processor:</span>
                        <span className="font-bold text-slate-200 truncate max-w-[120px]">{phone.specs.processor.split('with')[0]}</span>
                      </div>
                      <div className="flex justify-between items-center py-1">
                        <span className="text-slate-500">Battery Architecture:</span>
                        <span className="font-bold text-slate-200">{phone.specs.battery.split('(')[0]}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bottom reservation shortcuts and Exit button */}
                <div className="space-y-2 pt-4 border-t border-slate-800/60">
                  <div className="flex justify-between items-center bg-slate-900/60 p-2 rounded-xl text-[9px] text-slate-500 font-mono">
                    <span>CAD Core Version:</span>
                    <span className="text-emerald-400 font-bold">PRO-3D-v1.6</span>
                  </div>

                  <button
                    type="button"
                    onClick={onClose}
                    className="w-full bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold py-3 rounded-xl text-xs transition-colors cursor-pointer text-center"
                  >
                    Close 3D Viewer
                  </button>
                </div>
              </div>

            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
