import React, { useState, useEffect, useRef } from 'react';
import * as THREE from 'three';
import { 
  Cpu, 
  Layers, 
  ArrowRight, 
  Code2, 
  Binary, 
  Database, 
  Sparkles, 
  Globe, 
  Palette, 
  Wrench, 
  Briefcase, 
  LayoutGrid,
  CheckCircle2
} from 'lucide-react';
import { DEPARTMENTS_DATA } from '../data/collegeData';
import { DepartmentInfo, DepartmentType } from '../types';
import { DepartmentModal } from './DepartmentModal';

interface DepartmentSectionProps {
  onStartQuiz: (dept: DepartmentType) => void;
}

export const DepartmentSection: React.FC<DepartmentSectionProps> = ({ onStartQuiz }) => {
  const [selectedDept, setSelectedDept] = useState<DepartmentInfo | null>(null);

  // 3D Canvas Refs for procedural cards
  const csCanvasRef = useRef<HTMLDivElement | null>(null);
  const caCanvasRef = useRef<HTMLDivElement | null>(null);

  // Procedural Mini-3D Processor for CS Card
  useEffect(() => {
    const container = csCanvasRef.current;
    if (!container) return;

    const width = container.clientWidth || 300;
    const height = 180;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 50);
    camera.position.set(0, 1.8, 3.2);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    container.appendChild(renderer.domElement);

    const ambientLight = new THREE.AmbientLight(0x0a192f, 1.5);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0x00f0ff, 3);
    dirLight.position.set(2, 3, 2);
    scene.add(dirLight);

    // 3D CPU Processor Model
    const cpuGroup = new THREE.Group();
    scene.add(cpuGroup);

    // Substrate PCB
    const pcbGeo = new THREE.BoxGeometry(1.5, 0.08, 1.5);
    const pcbMat = new THREE.MeshStandardMaterial({
      color: 0x071e3d,
      roughness: 0.3,
      metalness: 0.8,
    });
    const pcbMesh = new THREE.Mesh(pcbGeo, pcbMat);
    cpuGroup.add(pcbMesh);

    // Metallic Heat Spreader
    const spreaderGeo = new THREE.BoxGeometry(1.05, 0.12, 1.05);
    const spreaderMat = new THREE.MeshStandardMaterial({
      color: 0x0284c7,
      roughness: 0.2,
      metalness: 0.95,
      emissive: 0x0369a1,
      emissiveIntensity: 0.3,
    });
    const spreaderMesh = new THREE.Mesh(spreaderGeo, spreaderMat);
    spreaderMesh.position.y = 0.08;
    cpuGroup.add(spreaderMesh);

    // Glowing Core Silicon Die
    const dieGeo = new THREE.BoxGeometry(0.5, 0.04, 0.5);
    const dieMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8 });
    const dieMesh = new THREE.Mesh(dieGeo, dieMat);
    dieMesh.position.y = 0.16;
    cpuGroup.add(dieMesh);

    // Gold Pins ring
    const pinGeo = new THREE.CylinderGeometry(0.015, 0.015, 0.12, 8);
    const pinMat = new THREE.MeshStandardMaterial({ color: 0xffd700, metalness: 0.9, roughness: 0.1 });
    for (let i = -6; i <= 6; i += 2) {
      for (let j = -6; j <= 6; j += 2) {
        if (Math.abs(i) === 6 || Math.abs(j) === 6) {
          const pin = new THREE.Mesh(pinGeo, pinMat);
          pin.position.set(i * 0.11, -0.06, j * 0.11);
          cpuGroup.add(pin);
        }
      }
    }

    let frameId = 0;
    const animate = () => {
      frameId = requestAnimationFrame(animate);
      cpuGroup.rotation.y += 0.012;
      cpuGroup.rotation.x = 0.3 + Math.sin(Date.now() * 0.0015) * 0.08;
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(frameId);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      pcbGeo.dispose();
      pcbMat.dispose();
      spreaderGeo.dispose();
      spreaderMat.dispose();
      dieGeo.dispose();
      dieMat.dispose();
      pinGeo.dispose();
      pinMat.dispose();
    };
  }, []);

  // Procedural Mini-3D Holographic App for CA Card
  useEffect(() => {
    const container = caCanvasRef.current;
    if (!container) return;

    const width = container.clientWidth || 300;
    const height = 180;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 50);
    camera.position.set(0, 1.8, 3.2);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    container.appendChild(renderer.domElement);

    const ambientLight = new THREE.AmbientLight(0x1a0a2f, 1.5);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xd946ef, 3);
    dirLight.position.set(-2, 3, 2);
    scene.add(dirLight);

    // 3D Holographic App Stack (Layers)
    const appGroup = new THREE.Group();
    scene.add(appGroup);

    // 3 Floating Glass App Layers (UI, Logic, Data)
    const layerGeo = new THREE.BoxGeometry(1.4, 0.05, 1.0);
    const layers: THREE.Mesh[] = [];

    const colors = [0xd946ef, 0xa855f7, 0x6366f1];
    for (let i = 0; i < 3; i++) {
      const layerMat = new THREE.MeshStandardMaterial({
        color: colors[i],
        emissive: colors[i],
        emissiveIntensity: 0.5,
        transparent: true,
        opacity: 0.75,
        roughness: 0.2,
        metalness: 0.8,
      });
      const layer = new THREE.Mesh(layerGeo, layerMat);
      layer.position.y = (i - 1) * 0.35;
      appGroup.add(layer);
      layers.push(layer);
    }

    // Floating Holographic Ring around layers
    const ringGeo = new THREE.TorusGeometry(1.1, 0.02, 16, 64);
    const ringMat = new THREE.MeshBasicMaterial({ color: 0xf472b6, wireframe: true });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.rotation.x = Math.PI / 2;
    appGroup.add(ring);

    let frameId = 0;
    const animate = () => {
      frameId = requestAnimationFrame(animate);
      appGroup.rotation.y += 0.015;
      appGroup.rotation.z = Math.sin(Date.now() * 0.002) * 0.08;
      ring.rotation.z -= 0.01;
      layers.forEach((l, idx) => {
        l.position.y = (idx - 1) * 0.35 + Math.sin(Date.now() * 0.003 + idx) * 0.04;
      });
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(frameId);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      layerGeo.dispose();
      ringGeo.dispose();
      ringMat.dispose();
    };
  }, []);

  return (
    <section id="departments" className="relative py-24 px-4 sm:px-6 lg:px-8 border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/70 border border-cyan-500/30 text-cyan-300 text-xs font-mono mb-3">
            <Layers className="w-3.5 h-3.5 text-cyan-400" />
            <span>ACADEMIC DEPARTMENTS // SELECT SPECIALIZATION</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-white mb-4">
            Department Selection
          </h2>
          <p className="text-base text-slate-300">
            Explore the flagship computing divisions at Madha Arts and Science College (MASC), Chennai.
            Choose your portal to inspect syllabus, lab ecosystems, and career avenues.
          </p>
        </div>

        {/* 2 Large Interactive 3D Department Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          {/* Card 1: Department of Computer Science (Blue/Cyan) */}
          <div
            className="group relative rounded-2xl glass-panel p-6 sm:p-8 border-cyan-500/30 hover:border-cyan-400/80 transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-[0_0_30px_rgba(6,182,212,0.15)] hover:shadow-[0_0_45px_rgba(6,182,212,0.3)]"
          >
            {/* Ambient Cyan Glow */}
            <div className="absolute top-0 right-0 -mr-16 -mt-16 w-56 h-56 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none" />

            <div>
              {/* Header Badge */}
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono px-3 py-1 rounded-md bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 uppercase tracking-wider font-semibold">
                  DEPT // 01
                </span>
                <span className="text-xs font-mono text-slate-400">B.Sc Computer Science</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-2 group-hover:text-cyan-300 transition-colors">
                Department of Computer Science
              </h3>
              <p className="text-xs sm:text-sm text-cyan-400/90 font-mono mb-6 italic">
                Foundations of Computation, Algorithmic Thinking & Systems
              </p>

              {/* 3D Processor Illustration Container */}
              <div className="relative w-full h-[180px] rounded-xl bg-[#040c1a] border border-cyan-500/20 mb-6 overflow-hidden flex items-center justify-center">
                <div ref={csCanvasRef} className="w-full h-full" />
                <div className="absolute bottom-2 left-3 text-[10px] font-mono text-cyan-400/70 bg-slate-950/80 px-2 py-0.5 rounded border border-cyan-500/20">
                  PROC // 3D QUANTUM CORE
                </div>
              </div>

              {/* 6 Required Topics */}
              <div className="space-y-2.5 mb-8">
                <div className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-2">
                  Key Academic Pillars
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-300">
                  <div className="flex items-center gap-2 p-2 rounded-lg bg-slate-900/60 border border-slate-800">
                    <Code2 className="w-4 h-4 text-cyan-400 shrink-0" />
                    <span className="font-medium">Programming (C/C++, Python)</span>
                  </div>
                  <div className="flex items-center gap-2 p-2 rounded-lg bg-slate-900/60 border border-slate-800">
                    <Binary className="w-4 h-4 text-cyan-400 shrink-0" />
                    <span className="font-medium">Data Structures & Algorithms</span>
                  </div>
                  <div className="flex items-center gap-2 p-2 rounded-lg bg-slate-900/60 border border-slate-800">
                    <Cpu className="w-4 h-4 text-cyan-400 shrink-0" />
                    <span className="font-medium">Operating Systems</span>
                  </div>
                  <div className="flex items-center gap-2 p-2 rounded-lg bg-slate-900/60 border border-slate-800">
                    <Database className="w-4 h-4 text-cyan-400 shrink-0" />
                    <span className="font-medium">Database Management</span>
                  </div>
                  <div className="flex items-center gap-2 p-2 rounded-lg bg-slate-900/60 border border-slate-800">
                    <Layers className="w-4 h-4 text-cyan-400 shrink-0" />
                    <span className="font-medium">Software Development</span>
                  </div>
                  <div className="flex items-center gap-2 p-2 rounded-lg bg-slate-900/60 border border-slate-800">
                    <Sparkles className="w-4 h-4 text-cyan-400 shrink-0" />
                    <span className="font-medium">Artificial Intelligence Basics</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-4 border-t border-slate-800/80 flex flex-col sm:flex-row items-center gap-3">
              <button
                onClick={() => setSelectedDept(DEPARTMENTS_DATA.CS)}
                className="w-full sm:flex-1 py-3.5 px-6 rounded-xl font-bold text-xs uppercase tracking-wider bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 hover:from-cyan-400 hover:to-blue-500 shadow-[0_0_20px_rgba(6,182,212,0.3)] transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Explore Computer Science</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => onStartQuiz('CS')}
                className="w-full sm:w-auto py-3.5 px-4 rounded-xl font-mono text-xs text-cyan-300 bg-cyan-950/60 border border-cyan-500/30 hover:bg-cyan-900/60 transition-colors cursor-pointer"
              >
                CS Quiz
              </button>
            </div>
          </div>

          {/* Card 2: Department of Computer Applications (Purple/Pink) */}
          <div
            className="group relative rounded-2xl glass-panel p-6 sm:p-8 border-purple-500/30 hover:border-purple-400/80 transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-[0_0_30px_rgba(168,85,247,0.15)] hover:shadow-[0_0_45px_rgba(168,85,247,0.3)]"
          >
            {/* Ambient Purple Glow */}
            <div className="absolute top-0 right-0 -mr-16 -mt-16 w-56 h-56 bg-purple-500/15 rounded-full blur-3xl pointer-events-none" />

            <div>
              {/* Header Badge */}
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono px-3 py-1 rounded-md bg-purple-950/80 border border-purple-500/40 text-purple-300 uppercase tracking-wider font-semibold">
                  DEPT // 02
                </span>
                <span className="text-xs font-mono text-slate-400">BCA (Bachelor of Computer Applications)</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-2 group-hover:text-purple-300 transition-colors">
                Department of Computer Applications
              </h3>
              <p className="text-xs sm:text-sm text-purple-400/90 font-mono mb-6 italic">
                Application Engineering, Full-Stack Web & Practical Software Stacks
              </p>

              {/* 3D Holographic App Illustration Container */}
              <div className="relative w-full h-[180px] rounded-xl bg-[#120624] border border-purple-500/20 mb-6 overflow-hidden flex items-center justify-center">
                <div ref={caCanvasRef} className="w-full h-full" />
                <div className="absolute bottom-2 left-3 text-[10px] font-mono text-purple-400/70 bg-slate-950/80 px-2 py-0.5 rounded border border-purple-500/20">
                  HOLO // MULTI-TIER APP ARCHITECTURE
                </div>
              </div>

              {/* 6 Required Topics */}
              <div className="space-y-2.5 mb-8">
                <div className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-2">
                  Key Academic Pillars
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-300">
                  <div className="flex items-center gap-2 p-2 rounded-lg bg-slate-900/60 border border-slate-800">
                    <LayoutGrid className="w-4 h-4 text-purple-400 shrink-0" />
                    <span className="font-medium">Application Development</span>
                  </div>
                  <div className="flex items-center gap-2 p-2 rounded-lg bg-slate-900/60 border border-slate-800">
                    <Globe className="w-4 h-4 text-purple-400 shrink-0" />
                    <span className="font-medium">Web Development</span>
                  </div>
                  <div className="flex items-center gap-2 p-2 rounded-lg bg-slate-900/60 border border-slate-800">
                    <Database className="w-4 h-4 text-purple-400 shrink-0" />
                    <span className="font-medium">Database Technologies</span>
                  </div>
                  <div className="flex items-center gap-2 p-2 rounded-lg bg-slate-900/60 border border-slate-800">
                    <Palette className="w-4 h-4 text-purple-400 shrink-0" />
                    <span className="font-medium">UI/UX Design</span>
                  </div>
                  <div className="flex items-center gap-2 p-2 rounded-lg bg-slate-900/60 border border-slate-800">
                    <Wrench className="w-4 h-4 text-purple-400 shrink-0" />
                    <span className="font-medium">Software Tools & Frameworks</span>
                  </div>
                  <div className="flex items-center gap-2 p-2 rounded-lg bg-slate-900/60 border border-slate-800">
                    <Briefcase className="w-4 h-4 text-purple-400 shrink-0" />
                    <span className="font-medium">Practical Computing</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-4 border-t border-slate-800/80 flex flex-col sm:flex-row items-center gap-3">
              <button
                onClick={() => setSelectedDept(DEPARTMENTS_DATA.CA)}
                className="w-full sm:flex-1 py-3.5 px-6 rounded-xl font-bold text-xs uppercase tracking-wider bg-gradient-to-r from-purple-500 to-pink-600 text-white hover:from-purple-400 hover:to-pink-500 shadow-[0_0_20px_rgba(168,85,247,0.3)] transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Explore Computer Applications</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => onStartQuiz('CA')}
                className="w-full sm:w-auto py-3.5 px-4 rounded-xl font-mono text-xs text-purple-300 bg-purple-950/60 border border-purple-500/30 hover:bg-purple-900/60 transition-colors cursor-pointer"
              >
                CA Quiz
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal View */}
      {selectedDept && (
        <DepartmentModal
          department={selectedDept}
          onClose={() => setSelectedDept(null)}
          onStartQuiz={onStartQuiz}
        />
      )}
    </section>
  );
};
