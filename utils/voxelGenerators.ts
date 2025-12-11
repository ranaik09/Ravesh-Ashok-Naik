/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import { VoxelData } from '../types';
import { COLORS, CONFIG } from './voxelConstants';

// Helper to prevent overlapping voxels
function setBlock(map: Map<string, VoxelData>, x: number, y: number, z: number, color: number) {
    const rx = Math.round(x);
    const ry = Math.round(y);
    const rz = Math.round(z);
    const key = `${rx},${ry},${rz}`;
    map.set(key, { x: rx, y: ry, z: rz, color });
}

function generateSphere(map: Map<string, VoxelData>, cx: number, cy: number, cz: number, r: number, col: number, sy = 1) {
    const r2 = r * r;
    const xMin = Math.floor(cx - r);
    const xMax = Math.ceil(cx + r);
    const yMin = Math.floor(cy - r * sy);
    const yMax = Math.ceil(cy + r * sy);
    const zMin = Math.floor(cz - r);
    const zMax = Math.ceil(cz + r);

    for (let x = xMin; x <= xMax; x++) {
        for (let y = yMin; y <= yMax; y++) {
            for (let z = zMin; z <= zMax; z++) {
                const dx = x - cx;
                const dy = (y - cy) / sy;
                const dz = z - cz;
                if (dx * dx + dy * dy + dz * dz <= r2) {
                    setBlock(map, x, y, z, col);
                }
            }
        }
    }
}

// Custom Colors for Ravesh
const C = {
    SKIN: 0xE0AC69,
    BEARD: 0x1A1A1A,
    SHIRT: 0x3B82F6, // Blue shirt from logo
    CAP: 0x1E293B,   // Dark slate cap
    GLASSES: 0x111111,
    MANDALA: 0xF59E0B, // Orange pattern
    DESK: 0x475569,
    SCREEN: 0x0EA5E9
};

export const Generators = {
    RaveshAvatar: (): VoxelData[] => {
        const map = new Map<string, VoxelData>();
        const X = 0, Y = CONFIG.FLOOR_Y + 4, Z = 0;
        
        // --- BODY ---
        // Torso
        for(let y = 0; y < 7; y++) {
             for(let x = -3; x <= 3; x++) {
                 for(let z = -1.5; z <= 1.5; z++) {
                     // Round corners
                     if (Math.abs(x) === 3 && Math.abs(z) > 0.5) continue;
                     
                     let col = C.SHIRT;
                     // Mandala/Logo Graphic on chest
                     if (z > 1 && y > 2 && y < 6 && Math.abs(x) < 2) col = C.MANDALA;
                     
                     setBlock(map, X+x, Y+y, Z+z, col);
                 }
             }
        }

        // Arms
        for(let y = 0; y < 6; y++) {
            // Left Arm
            setBlock(map, X-4, Y+y, Z, C.SHIRT);
            setBlock(map, X-4, Y+y, Z+1, C.SHIRT);
            // Right Arm
            setBlock(map, X+4, Y+y, Z, C.SHIRT);
            setBlock(map, X+4, Y+y, Z+1, C.SHIRT);
        }
        // Hands
        setBlock(map, X-4, Y-1, Z+0.5, C.SKIN);
        setBlock(map, X+4, Y-1, Z+0.5, C.SKIN);

        // --- HEAD ---
        const HY = Y + 7;
        const HZ = Z;
        
        // Face/Head Shape
        for(let y = 0; y < 5; y++) {
            for(let x = -2.5; x <= 2.5; x++) {
                for(let z = -2.5; z <= 2.5; z++) {
                     setBlock(map, X+x, HY+y, HZ+z, C.SKIN);
                }
            }
        }

        // Beard
        for(let x = -2.5; x <= 2.5; x++) {
            for(let z = -2.5; z <= 3; z++) {
                // Jawline beard
                if (z > 1.5 || x <= -2 || x >= 2) {
                    for(let y = 0; y < 2.5; y++) {
                        setBlock(map, X+x, HY+y, HZ+z, C.BEARD);
                    }
                }
            }
        }
        // Mustache
        setBlock(map, X-1, HY+1.5, HZ+3, C.BEARD);
        setBlock(map, X, HY+1.5, HZ+3, C.BEARD);
        setBlock(map, X+1, HY+1.5, HZ+3, C.BEARD);

        // Sunglasses
        for(let x = -2.5; x <= 2.5; x++) {
            if (x === 0) continue; // Bridge
            setBlock(map, X+x, HY+3, HZ+3, C.GLASSES);
            setBlock(map, X+x, HY+3.5, HZ+3, C.GLASSES);
        }
        setBlock(map, X, HY+3.5, HZ+2.8, C.GLASSES); // Bridge

        // Cap
        const CY = HY + 4.5;
        // Cap Dome
        for(let y = 0; y < 2; y++) {
             for(let x = -2.8; x <= 2.8; x++) {
                for(let z = -3; z <= 3; z++) {
                     setBlock(map, X+x, CY+y, HZ+z, C.CAP);
                }
             }
        }
        // Cap Visor
        for(let x = -2.5; x <= 2.5; x++) {
             for(let z = 3; z <= 5; z++) {
                  setBlock(map, X+x, CY, HZ+z, C.CAP);
             }
        }
        // Logo on Cap text "ranaik" simplified
        setBlock(map, X-1, CY+1, HZ+3.2, 0xFFFFFF);
        setBlock(map, X, CY+1, HZ+3.2, 0xFFFFFF);
        setBlock(map, X+1, CY+1, HZ+3.2, 0xFFFFFF);

        return Array.from(map.values());
    },

    Workstation: (): VoxelData[] => {
        const map = new Map<string, VoxelData>();
        const Y = CONFIG.FLOOR_Y + 2;
        
        // Desk
        for(let x = -8; x <= 8; x++) {
            for(let z = -4; z <= 4; z++) {
                setBlock(map, x, Y, z, C.DESK);
            }
        }
        // Legs
        for(let y = Y-1; y > Y-6; y--) {
            setBlock(map, -7, y, -3, 0x333333);
            setBlock(map, -7, y, 3, 0x333333);
            setBlock(map, 7, y, -3, 0x333333);
            setBlock(map, 7, y, 3, 0x333333);
        }

        // Monitor 1 (Center)
        for(let x = -4; x <= 4; x++) {
            for(let y = Y+2; y <= Y+7; y++) {
                setBlock(map, x, y, -2, 0x111111); // Bezel
                if (x !== -4 && x !== 4 && y !== Y+2 && y !== Y+7) {
                    setBlock(map, x, y, -1.8, C.SCREEN); // Screen
                    // "Code" lines
                    if (y % 2 === 0 && Math.random() > 0.3) {
                         setBlock(map, x, y, -1.7, 0xFFFFFF); 
                    }
                }
            }
        }
        // Stand
        setBlock(map, 0, Y+1, -2, 0x222222);

        // Laptop (Side)
        for(let x = 5; x <= 8; x++) {
            for(let z = 0; z <= 2; z++) {
                 setBlock(map, x, Y+0.5, z, 0x888888); // Base
            }
        }
        // Lid
        for(let x = 5; x <= 8; x++) {
            for(let y = Y+0.5; y <= Y+3.5; y++) {
                 setBlock(map, x, y, 0, 0x888888);
            }
        }

        return Array.from(map.values());
    },

    Eagle: (): VoxelData[] => { return [] }, // Placeholder to satisfy types if needed, or remove
    Cat: (): VoxelData[] => { return [] },
    Rabbit: (): VoxelData[] => { return [] },
    Twins: (): VoxelData[] => { return [] }
};