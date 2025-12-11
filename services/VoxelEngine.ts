/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/


import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { AppState, SimulationVoxel, RebuildTarget, VoxelData } from '../types';
import { CONFIG, COLORS } from '../utils/voxelConstants';

export class VoxelEngine {
  private container: HTMLElement;
  private scene: THREE.Scene;
  private camera: THREE.PerspectiveCamera;
  private renderer: THREE.WebGLRenderer;
  private controls: OrbitControls;
  private instanceMesh: THREE.InstancedMesh | null = null;
  private dummy = new THREE.Object3D();
  
  private voxels: SimulationVoxel[] = [];
  private rebuildTargets: RebuildTarget[] = [];
  private rebuildStartTime: number = 0;
  
  private state: AppState = AppState.STABLE;
  private onStateChange: (state: AppState) => void;
  private onCountChange: (count: number) => void;
  private animationId: number = 0;

  constructor(
    container: HTMLElement, 
    onStateChange: (state: AppState) => void,
    onCountChange: (count: number) => void
  ) {
    this.container = container;
    this.onStateChange = onStateChange;
    this.onCountChange = onCountChange;

    // Init Three.js
    this.scene = new THREE.Scene();
    // Default to dark, will be updated by react effect immediately
    this.scene.background = new THREE.Color(0x0f172a); 
    this.scene.fog = new THREE.Fog(0x0f172a, 40, 90); 

    this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    // Position camera to the right so model appears on the right side of screen
    this.camera.position.set(20, 10, 35);

    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.appendChild(this.renderer.domElement);

    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true;
    this.controls.autoRotate = true;
    this.controls.autoRotateSpeed = 2.0;
    this.controls.target.set(0, 0, 0);
    this.controls.enablePan = false;

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    this.scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0x6366f1, 2.0); // Indigo light
    dirLight.position.set(20, 20, 20);
    dirLight.castShadow = true;
    this.scene.add(dirLight);
    
    const fillLight = new THREE.DirectionalLight(0x10b981, 1.0); // Emerald rim light
    fillLight.position.set(-20, 10, -20);
    this.scene.add(fillLight);

    // Floor (Grid)
    const gridHelper = new THREE.GridHelper(200, 50, 0x1e293b, 0x1e293b);
    gridHelper.position.y = CONFIG.FLOOR_Y - 2;
    this.scene.add(gridHelper);

    this.animate = this.animate.bind(this);
    this.animate();
  }

  public updateTheme(isDarkMode: boolean) {
      const bgColor = isDarkMode ? 0x0f172a : 0xf8fafc;
      const fogColor = isDarkMode ? 0x0f172a : 0xf8fafc;
      const gridColor = isDarkMode ? 0x1e293b : 0xe2e8f0;
      
      this.scene.background = new THREE.Color(bgColor);
      this.scene.fog = new THREE.Fog(fogColor, 40, 90);
      
      // Update Grid Helper manually as it's hard to update colors after init, recreating is easier or accessing material
      // Simplest way: find grid helper and update material color
      this.scene.children.forEach(c => {
          if (c instanceof THREE.GridHelper) {
              // Access private material if possible or just remove and re-add. 
              // Re-adding is safer in TS without casting to any.
              this.scene.remove(c);
          }
      });
      
      const gridHelper = new THREE.GridHelper(200, 50, gridColor, gridColor);
      gridHelper.position.y = CONFIG.FLOOR_Y - 2;
      this.scene.add(gridHelper);
  }

  public loadInitialModel(data: VoxelData[]) {
    this.createVoxels(data);
    this.onCountChange(this.voxels.length);
    this.state = AppState.STABLE;
    this.onStateChange(this.state);
  }

  private createVoxels(data: VoxelData[]) {
    // Clear existing
    if (this.instanceMesh) {
      this.scene.remove(this.instanceMesh);
      this.instanceMesh.geometry.dispose();
      if (Array.isArray(this.instanceMesh.material)) {
          this.instanceMesh.material.forEach(m => m.dispose());
      } else {
          this.instanceMesh.material.dispose();
      }
    }

    this.voxels = data.map((v, i) => {
        const c = new THREE.Color(v.color);
        return {
            id: i,
            x: v.x, y: v.y, z: v.z, color: c,
            vx: 0, vy: 0, vz: 0, rx: 0, ry: 0, rz: 0,
            rvx: 0, rvy: 0, rvz: 0
        };
    });

    const geometry = new THREE.BoxGeometry(0.95, 0.95, 0.95);
    const material = new THREE.MeshStandardMaterial({ roughness: 0.3, metalness: 0.2 });
    this.instanceMesh = new THREE.InstancedMesh(geometry, material, this.voxels.length);
    this.instanceMesh.castShadow = true;
    this.instanceMesh.receiveShadow = true;
    this.scene.add(this.instanceMesh);

    this.draw();
  }

  private draw() {
    if (!this.instanceMesh) return;
    this.voxels.forEach((v, i) => {
        this.dummy.position.set(v.x, v.y, v.z);
        this.dummy.rotation.set(v.rx, v.ry, v.rz);
        this.dummy.updateMatrix();
        this.instanceMesh!.setMatrixAt(i, this.dummy.matrix);
        this.instanceMesh!.setColorAt(i, v.color);
    });
    this.instanceMesh.instanceMatrix.needsUpdate = true;
    this.instanceMesh.instanceColor!.needsUpdate = true;
  }

  public dismantle() {
    if (this.state !== AppState.STABLE) return;
    this.state = AppState.DISMANTLING;
    this.onStateChange(this.state);

    this.voxels.forEach(v => {
        // Explode outwards
        v.vx = (Math.random() - 0.5) * 1.5;
        v.vy = (Math.random()) * 1.5;
        v.vz = (Math.random() - 0.5) * 1.5;
        v.rvx = (Math.random() - 0.5) * 0.4;
        v.rvy = (Math.random() - 0.5) * 0.4;
        v.rvz = (Math.random() - 0.5) * 0.4;
    });
  }

  private getColorDist(c1: THREE.Color, hex2: number): number {
    const c2 = new THREE.Color(hex2);
    const r = (c1.r - c2.r);
    const g = (c1.g - c2.g);
    const b = (c1.b - c2.b);
    return Math.sqrt(r*r + g*g + b*b);
  }

  public rebuild(targetModel: VoxelData[]) {
    // If already rebuilding, do nothing or interrupt? Let's interrupt
    // if (this.state === AppState.REBUILDING) return;

    // Reset voxels that might have flown too far if we are dismantling
    if (this.state === AppState.DISMANTLING) {
        // Keep their current positions as start
    } else {
        // If stable, maybe we are switching models. 
        // Let's explode them first briefly? No, just morph.
    }

    const available = this.voxels.map((v, i) => ({ index: i, color: v.color, taken: false }));
    
    // If we have fewer voxels than target, we might need to recycle or hide.
    // Ideally we should spawn more, but for this demo let's just reuse.
    // If we have more voxels than target, extras will become rubble or hide.

    const mappings: RebuildTarget[] = new Array(this.voxels.length).fill(null);
    const targetCount = targetModel.length;

    // Greedy match colors
    targetModel.forEach(target => {
        let bestDist = 9999;
        let bestIdx = -1;

        for (let i = 0; i < available.length; i++) {
            if (available[i].taken) continue;
            const d = this.getColorDist(available[i].color, target.color);
            if (d < bestDist) {
                bestDist = d;
                bestIdx = i;
                if (d < 0.05) break; 
            }
        }

        if (bestIdx !== -1) {
            available[bestIdx].taken = true;
            // Delay based on height for cool building effect
            const h = (target.y - CONFIG.FLOOR_Y); 
            mappings[available[bestIdx].index] = {
                x: target.x, y: target.y, z: target.z,
                delay: h * 100 // faster build
            };
        }
    });

    // Handle leftovers
    for (let i = 0; i < this.voxels.length; i++) {
        if (!mappings[i]) {
            // Send to floor/hide
            mappings[i] = {
                x: (Math.random() - 0.5) * 50, 
                y: CONFIG.FLOOR_Y - 5, // Under floor
                z: (Math.random() - 0.5) * 50,
                isRubble: true, delay: 0
            };
        }
    }

    this.rebuildTargets = mappings;
    this.rebuildStartTime = Date.now();
    this.state = AppState.REBUILDING;
    this.onStateChange(this.state);
  }

  private updatePhysics() {
    if (this.state === AppState.DISMANTLING) {
        this.voxels.forEach(v => {
            v.vy -= 0.05; // Gravity
            v.x += v.vx; v.y += v.vy; v.z += v.vz;
            v.rx += v.rvx; v.ry += v.rvy; v.rz += v.rvz;

            // Floor bounce
            if (v.y < CONFIG.FLOOR_Y) {
                v.y = CONFIG.FLOOR_Y;
                v.vy *= -0.6; 
                v.vx *= 0.9; v.vz *= 0.9;
            }
        });
    } else if (this.state === AppState.REBUILDING) {
        const now = Date.now();
        const elapsed = now - this.rebuildStartTime;
        let allDone = true;
        let movingCount = 0;

        this.voxels.forEach((v, i) => {
            const t = this.rebuildTargets[i];
            
            if (elapsed < t.delay) {
                allDone = false;
                // Add some jitter while waiting
                if (Math.random() > 0.9) {
                    v.x += (Math.random()-0.5)*0.1;
                    v.y += (Math.random()-0.5)*0.1;
                    v.z += (Math.random()-0.5)*0.1;
                }
                return;
            }

            const dx = t.x - v.x;
            const dy = t.y - v.y;
            const dz = t.z - v.z;
            const distSq = dx*dx + dy*dy + dz*dz;

            if (distSq > 0.01) {
                allDone = false;
                movingCount++;
                const speed = 0.15; // Fast snap
                v.x += dx * speed;
                v.y += dy * speed;
                v.z += dz * speed;
                
                v.rx += (0 - v.rx) * speed;
                v.ry += (0 - v.ry) * speed;
                v.rz += (0 - v.rz) * speed;
            } else {
                v.x = t.x; v.y = t.y; v.z = t.z;
                v.rx = 0; v.ry = 0; v.rz = 0;
            }
        });

        if (allDone && elapsed > 1000) {
            this.state = AppState.STABLE;
            this.onStateChange(this.state);
        }
    }
  }

  private animate() {
    this.animationId = requestAnimationFrame(this.animate);
    this.controls.update();
    this.updatePhysics();
    this.draw();
    this.renderer.render(this.scene, this.camera);
  }

  public handleResize() {
      if (this.camera && this.renderer) {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
      }
  }
  
  public setAutoRotate(enabled: boolean) {
    if (this.controls) {
        this.controls.autoRotate = enabled;
    }
  }

  public getJsonData(): string {
      return ""; // Disabled for portfolio
  }
  
  public getUniqueColors(): string[] {
    return [];
  }

  public cleanup() {
    cancelAnimationFrame(this.animationId);
    this.container.removeChild(this.renderer.domElement);
    this.renderer.dispose();
  }
}