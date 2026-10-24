import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';

interface Hero3DProps {
  onExploreDepartments: () => void;
  onStartQuiz: () => void;
}

export const Hero3D: React.FC<Hero3DProps> = ({ onExploreDepartments, onStartQuiz }) => {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Software WebGL Detection
    const isSoftwareGl = (() => {
      const probeCanvas = document.createElement('canvas');
      const gl = probeCanvas.getContext('webgl2');
      if (!gl) return true;
      const ext = gl.getExtension('WEBGL_debug_renderer_info');
      const param = ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER;
      const gpu = String(gl.getParameter(param));
      gl.getExtension('WEBGL_lose_context')?.loseContext();
      return /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
    })();

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || 580;

    // Scene & Camera
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x030712, 0.045);

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0.9, 6.2);

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: !isSoftwareGl,
      powerPreference: 'high-performance',
      alpha: true,
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    renderer.shadowMap.enabled = !isSoftwareGl;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    container.appendChild(renderer.domElement);

    // Procedural Studio Environment
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    scene.environment = pmremGenerator.fromScene(new RoomEnvironment(), 0.04).texture;
    pmremGenerator.dispose();

    // Lighting Rig
    const ambientLight = new THREE.AmbientLight(0x0b132b, 1.2);
    scene.add(ambientLight);

    const hemiLight = new THREE.HemisphereLight(0x00f0ff, 0x7928ca, 0.8);
    scene.add(hemiLight);

    const keyLight = new THREE.DirectionalLight(0x38bdf8, 2.5);
    keyLight.position.set(3, 4, 3);
    keyLight.castShadow = !isSoftwareGl;
    scene.add(keyLight);

    const purpleRimLight = new THREE.DirectionalLight(0xa855f7, 2.0);
    purpleRimLight.position.set(-3, -2, -2);
    scene.add(purpleRimLight);

    // --- Procedural 3D Subject: Holographic Quantum Campus Core ---
    const campusGroup = new THREE.Group();
    campusGroup.position.y = -0.3;
    scene.add(campusGroup);

    // 1. Core Polyhedron (Computing Brain)
    const coreGeo = new THREE.IcosahedronGeometry(0.85, 1);
    const coreMat = new THREE.MeshPhysicalMaterial({
      color: 0x0284c7,
      emissive: 0x0369a1,
      emissiveIntensity: 0.6,
      metalness: 0.85,
      roughness: 0.2,
      wireframe: false,
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    campusGroup.add(coreMesh);

    // Wireframe Cage overlay
    const wireGeo = new THREE.IcosahedronGeometry(0.92, 1);
    const wireMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      wireframe: true,
      transparent: true,
      opacity: 0.65,
    });
    const wireMesh = new THREE.Mesh(wireGeo, wireMat);
    campusGroup.add(wireMesh);

    // 2. Dual Orbital Cyber Rings (CS & CA tracks)
    // CS Ring (Cyan)
    const ring1Geo = new THREE.TorusGeometry(1.6, 0.035, 16, 100);
    const ring1Mat = new THREE.MeshStandardMaterial({
      color: 0x00e5ff,
      emissive: 0x00e5ff,
      emissiveIntensity: 0.9,
      metalness: 0.9,
      roughness: 0.1,
    });
    const ring1 = new THREE.Mesh(ring1Geo, ring1Mat);
    ring1.rotation.x = Math.PI / 3;
    campusGroup.add(ring1);

    // CA Ring (Purple / Pink)
    const ring2Geo = new THREE.TorusGeometry(1.9, 0.035, 16, 100);
    const ring2Mat = new THREE.MeshStandardMaterial({
      color: 0xc084fc,
      emissive: 0xa855f7,
      emissiveIntensity: 0.9,
      metalness: 0.9,
      roughness: 0.1,
    });
    const ring2 = new THREE.Mesh(ring2Geo, ring2Mat);
    ring2.rotation.y = Math.PI / 3;
    ring2.rotation.x = -Math.PI / 4;
    campusGroup.add(ring2);

    // 3. Floating Data Crystals / Node Glyphs
    const nodeGeo = new THREE.BoxGeometry(0.18, 0.18, 0.18);
    const nodeCount = 12;
    const nodes: THREE.Mesh[] = [];

    for (let i = 0; i < nodeCount; i++) {
      const isCyan = i % 2 === 0;
      const nodeMat = new THREE.MeshStandardMaterial({
        color: isCyan ? 0x00e5ff : 0xd946ef,
        emissive: isCyan ? 0x0284c7 : 0xa855f7,
        emissiveIntensity: 0.8,
        metalness: 0.7,
        roughness: 0.25,
      });
      const node = new THREE.Mesh(nodeGeo, nodeMat);
      const angle = (i / nodeCount) * Math.PI * 2;
      const radius = 1.35 + (i % 3) * 0.35;
      node.position.set(
        Math.cos(angle) * radius,
        (Math.sin(angle * 2) * 0.5),
        Math.sin(angle) * radius
      );
      campusGroup.add(node);
      nodes.push(node);
    }

    // 4. Pedestal Hologram Disc with Contact Shadow Plane
    const discGeo = new THREE.RingGeometry(0.3, 2.4, 32);
    const discMat = new THREE.MeshBasicMaterial({
      color: 0x0284c7,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.28,
      wireframe: true,
    });
    const discMesh = new THREE.Mesh(discGeo, discMat);
    discMesh.rotation.x = Math.PI / 2;
    discMesh.position.y = -1.6;
    campusGroup.add(discMesh);

    // Contact shadow fake plane
    const shadowGeo = new THREE.PlaneGeometry(3.5, 3.5);
    const canvasTexture = document.createElement('canvas');
    canvasTexture.width = 128;
    canvasTexture.height = 128;
    const ctx = canvasTexture.getContext('2d');
    if (ctx) {
      const gradient = ctx.createRadialGradient(64, 64, 0, 64, 64, 64);
      gradient.addColorStop(0, 'rgba(6, 182, 212, 0.4)');
      gradient.addColorStop(0.5, 'rgba(147, 51, 234, 0.15)');
      gradient.addColorStop(1, 'rgba(3, 7, 18, 0)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 128, 128);
    }
    const shadowTex = new THREE.CanvasTexture(canvasTexture);
    shadowTex.colorSpace = THREE.SRGBColorSpace;
    const shadowMat = new THREE.MeshBasicMaterial({
      map: shadowTex,
      transparent: true,
      depthWrite: false,
    });
    const shadowPlane = new THREE.Mesh(shadowGeo, shadowMat);
    shadowPlane.rotation.x = -Math.PI / 2;
    shadowPlane.position.y = -1.61;
    campusGroup.add(shadowPlane);

    // 5. Floating Code Runes (Points Cloud)
    const particleCount = 180;
    const particlePositions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
      particlePositions[i] = (Math.random() - 0.5) * 8;
      particlePositions[i + 1] = (Math.random() - 0.5) * 6;
      particlePositions[i + 2] = (Math.random() - 0.5) * 6;
    }
    const particleGeo = new THREE.BufferGeometry();
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0x38bdf8,
      size: 0.04,
      transparent: true,
      opacity: 0.75,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    campusGroup.add(particles);

    // Mouse Movement Handler
    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      mouseRef.current.targetX = x * 0.35;
      mouseRef.current.targetY = y * 0.25;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Resize Handler
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight || 580;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    // Software GL Pacing
    let frameId = 0;
    function afterDraw(cb: () => void) {
      const glContext = renderer.getContext() as WebGL2RenderingContext;
      const sync = glContext.fenceSync(glContext.SYNC_GPU_COMMANDS_COMPLETE, 0);
      glContext.flush();
      const poll = () => {
        const state = sync && glContext.getSyncParameter(sync, glContext.SYNC_STATUS);
        if (state === glContext.UNSIGNALED) {
          frameId = window.setTimeout(poll, 5);
        } else {
          if (sync) glContext.deleteSync(sync);
          frameId = window.setTimeout(cb, 60);
        }
      };
      frameId = window.setTimeout(poll, 5);
    }

    const clock = new THREE.Clock();

    const tick = () => {
      const delta = clock.getDelta();
      const time = clock.getElapsedTime();

      // Smooth mouse damping
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.05;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.05;

      campusGroup.rotation.y = time * 0.25 + mouseRef.current.x;
      campusGroup.rotation.x = Math.sin(time * 0.3) * 0.08 + mouseRef.current.y;

      ring1.rotation.z = time * 0.4;
      ring2.rotation.z = -time * 0.35;
      coreMesh.rotation.y = -time * 0.2;
      wireMesh.rotation.y = time * 0.15;

      // Animate floating nodes
      nodes.forEach((node, idx) => {
        node.rotation.x = time * (0.8 + idx * 0.05);
        node.rotation.y = time * (0.5 + idx * 0.05);
        node.position.y += Math.sin(time * 2 + idx) * 0.003;
      });

      discMesh.rotation.z = time * 0.08;

      renderer.render(scene, camera);

      if (isSoftwareGl) {
        afterDraw(tick);
      } else {
        frameId = requestAnimationFrame(tick);
      }
    };

    tick();

    return () => {
      cancelAnimationFrame(frameId);
      clearTimeout(frameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      coreGeo.dispose();
      coreMat.dispose();
      wireGeo.dispose();
      wireMat.dispose();
      ring1Geo.dispose();
      ring1Mat.dispose();
      ring2Geo.dispose();
      ring2Mat.dispose();
      nodeGeo.dispose();
      discGeo.dispose();
      discMat.dispose();
      shadowGeo.dispose();
      shadowMat.dispose();
      particleGeo.dispose();
      particleMat.dispose();
    };
  }, []);

  return (
    <section id="home" className="relative min-h-[92vh] flex items-center justify-center pt-24 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* 3D WebGL Canvas Container */}
      <div
        ref={mountRef}
        aria-hidden="true"
        className="absolute inset-0 z-0 pointer-events-none opacity-85 flex items-center justify-center"
      />

      {/* Hero Content Overlay */}
      <div className="relative z-10 max-w-5xl mx-auto text-center flex flex-col items-center">
        {/* College Branding & Location Badge */}
        <div className="inline-flex flex-col sm:flex-row items-center gap-2 px-4 py-2 rounded-full border border-cyan-500/30 bg-slate-900/85 backdrop-blur-md shadow-[0_0_20px_rgba(6,182,212,0.15)] mb-6 animate-fade-in">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 shadow-[0_0_8px_#22d3ee]" />
            <span className="text-xs sm:text-sm font-bold tracking-wider text-cyan-200 uppercase font-mono">
              MADHA ARTS AND SCIENCE COLLEGE (MASC)
            </span>
          </div>
          <span className="hidden sm:inline text-slate-500 font-mono">•</span>
          <span className="text-[11px] font-mono text-cyan-400/90 tracking-wide">
            📍 KUNDRATHUR, CHENNAI - 600 128
          </span>
        </div>

        {/* Department Dual Pill */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 mb-4">
          <span className="text-xs font-mono px-3 py-1 rounded bg-blue-950/60 border border-blue-500/30 text-blue-300">
            DEPARTMENT OF COMPUTER SCIENCE
          </span>
          <span className="text-slate-500 font-mono text-xs">•</span>
          <span className="text-xs font-mono px-3 py-1 rounded bg-purple-950/60 border border-purple-500/30 text-purple-300">
            DEPARTMENT OF COMPUTER APPLICATIONS
          </span>
        </div>

        {/* Main Brand Title */}
        <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black tracking-tight mb-4 uppercase">
          WELCOME TO{' '}
          <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-purple-500 bg-clip-text text-transparent drop-shadow-[0_0_35px_rgba(6,182,212,0.4)]">
            C<sup className="text-cyan-400 text-3xl sm:text-5xl lg:text-6xl -top-6">2</sup> TECH
          </span>
        </h1>

        {/* Tagline */}
        <p className="text-xl sm:text-2xl lg:text-3xl font-medium text-slate-300 italic tracking-wide mb-8 max-w-3xl">
          &ldquo;Think Beyond Code. Build Beyond Limits.&rdquo;
        </p>

        {/* Subtitle brief with College Location */}
        <p className="text-sm sm:text-base text-slate-300 max-w-2xl mb-10 leading-relaxed bg-slate-950/60 backdrop-blur-sm px-4 py-2 rounded-xl border border-slate-800/60 shadow-lg">
          The official futuristic 3D learning portal for Madha Arts and Science College students, located at Somangalam Road, Kundrathur, Chennai - 600 128.
          Explore the depths of theoretical computation and applied software craftsmanship in an interconnected digital universe.
        </p>

        {/* Interactive Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
          <button
            onClick={onExploreDepartments}
            className="w-full sm:w-auto px-8 py-4 rounded-xl font-bold text-sm tracking-wide uppercase bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 hover:from-cyan-400 hover:to-blue-500 shadow-[0_0_25px_rgba(6,182,212,0.4)] transition-all duration-300 hover:scale-[1.03] active:scale-[0.98] cursor-pointer flex items-center justify-center gap-2"
          >
            <span>Explore Departments</span>
            <span className="font-mono text-xs">→</span>
          </button>

          <button
            onClick={onStartQuiz}
            className="w-full sm:w-auto px-8 py-4 rounded-xl font-bold text-sm tracking-wide uppercase bg-slate-900/90 text-purple-200 border border-purple-500/40 hover:border-purple-400 hover:bg-purple-950/40 shadow-[0_0_20px_rgba(168,85,247,0.2)] transition-all duration-300 hover:scale-[1.03] active:scale-[0.98] cursor-pointer flex items-center justify-center gap-2"
          >
            <span>Start Coding Quiz</span>
            <span className="font-mono text-xs text-purple-400">⚡</span>
          </button>
        </div>

        {/* Visual Spec Badges */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-6 mt-16 w-full max-w-4xl text-left">
          <div className="glass-panel p-3.5 rounded-lg border-cyan-500/20">
            <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-wider block">Dimension // 01</span>
            <span className="text-xs sm:text-sm font-semibold text-slate-200">Algorithmic Systems</span>
          </div>
          <div className="glass-panel p-3.5 rounded-lg border-purple-500/20">
            <span className="text-[10px] font-mono text-purple-400 uppercase tracking-wider block">Dimension // 02</span>
            <span className="text-xs sm:text-sm font-semibold text-slate-200">Full-Stack Apps</span>
          </div>
          <div className="glass-panel p-3.5 rounded-lg border-blue-500/20">
            <span className="text-[10px] font-mono text-blue-400 uppercase tracking-wider block">Simulation // 03</span>
            <span className="text-xs sm:text-sm font-semibold text-slate-200">Virtual 3D Coding Lab</span>
          </div>
          <div className="glass-panel p-3.5 rounded-lg border-emerald-500/20">
            <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-wider block">Assessment // 04</span>
            <span className="text-xs sm:text-sm font-semibold text-slate-200">CS vs CA Arena</span>
          </div>
        </div>
      </div>
    </section>
  );
};
