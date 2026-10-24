import React, { useState, useEffect, useRef } from 'react';
import * as THREE from 'three';
import { 
  Play, 
  RotateCcw, 
  Eye, 
  Code, 
  Laptop, 
  Terminal, 
  Sparkles, 
  Maximize2,
  FileCode,
  Layers
} from 'lucide-react';

const PRESET_CODE_SNIPPETS = {
  matrix: {
    title: 'Matrix Digital Rain',
    html: `<div id="canvas-container">
  <canvas id="matrixCanvas"></canvas>
  <div class="overlay-text">MASC C² TECH // MATRIX LINK ESTABLISHED</div>
</div>`,
    css: `body {
  margin: 0;
  background: #030712;
  overflow: hidden;
  font-family: 'Courier New', monospace;
}
#canvas-container {
  position: relative;
  width: 100vw;
  height: 100vh;
}
.overlay-text {
  position: absolute;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  color: #22d3ee;
  background: rgba(3, 7, 18, 0.85);
  padding: 8px 16px;
  border-radius: 8px;
  border: 1px solid #06b6d4;
  font-size: 13px;
  letter-spacing: 2px;
  box-shadow: 0 0 15px rgba(6, 182, 212, 0.5);
}`,
    js: `const canvas = document.getElementById('matrixCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const chars = '01MASC_CS_CA_C2TECH';
const fontSize = 14;
const columns = canvas.width / fontSize;
const drops = Array(Math.floor(columns)).fill(1);

function draw() {
  ctx.fillStyle = 'rgba(3, 7, 18, 0.1)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  
  ctx.fillStyle = '#22d3ee';
  ctx.font = fontSize + 'px monospace';
  
  for (let i = 0; i < drops.length; i++) {
    const text = chars[Math.floor(Math.random() * chars.length)];
    ctx.fillText(text, i * fontSize, drops[i] * fontSize);
    if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
      drops[i] = 0;
    }
    drops[i]++;
  }
}
setInterval(draw, 40);`,
  },
  neonButton: {
    title: 'Cyberpunk Neon Button',
    html: `<div class="cyber-box">
  <h2>C² TECH LAB DEMO</h2>
  <p>Think Beyond Code. Build Beyond Limits.</p>
  <button id="cyberBtn" class="neon-btn">INITIALIZE SYSTEM</button>
  <div id="statusLog" class="status-box">SYSTEM READY // MASC CHENNAI</div>
</div>`,
    css: `body {
  margin: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: radial-gradient(circle, #0f172a, #030712);
  color: #f8fafc;
  font-family: system-ui, sans-serif;
}
.cyber-box {
  text-align: center;
  padding: 30px;
  background: rgba(15, 23, 42, 0.8);
  border: 1px solid #38bdf8;
  border-radius: 16px;
  box-shadow: 0 0 30px rgba(56, 189, 248, 0.2);
}
.neon-btn {
  background: #0284c7;
  color: #fff;
  border: none;
  padding: 12px 28px;
  font-size: 14px;
  font-weight: bold;
  letter-spacing: 1.5px;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s;
  box-shadow: 0 0 15px rgba(14, 165, 233, 0.6);
}
.neon-btn:hover {
  background: #00f0ff;
  color: #030712;
  box-shadow: 0 0 25px rgba(0, 240, 255, 0.9);
  transform: scale(1.05);
}
.status-box {
  margin-top: 20px;
  font-family: monospace;
  font-size: 12px;
  color: #a855f7;
}`,
    js: `const btn = document.getElementById('cyberBtn');
const log = document.getElementById('statusLog');
let count = 0;

btn.addEventListener('click', () => {
  count++;
  log.innerText = 'QUANTUM CORE PULSE #' + count + ' // STATUS: OPTIMAL';
  log.style.color = count % 2 === 0 ? '#38bdf8' : '#e879f9';
});`,
  },
};

export const VirtualLab3D: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'3d' | 'playground'>('3d');
  const [activePreset, setActivePreset] = useState<'matrix' | 'neonButton'>('matrix');

  // Playground Code States
  const [htmlCode, setHtmlCode] = useState(PRESET_CODE_SNIPPETS.matrix.html);
  const [cssCode, setCssCode] = useState(PRESET_CODE_SNIPPETS.matrix.css);
  const [jsCode, setJsCode] = useState(PRESET_CODE_SNIPPETS.matrix.js);
  const [activeCodeTab, setActiveCodeTab] = useState<'html' | 'css' | 'js'>('html');
  const [compiledSrcDoc, setCompiledSrcDoc] = useState('');

  // 3D Canvas Ref
  const mountRef = useRef<HTMLDivElement | null>(null);

  // Compile Code for Iframe Preview
  const handleRunCode = () => {
    const combined = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>${cssCode}</style>
        </head>
        <body>
          ${htmlCode}
          <script>${jsCode}<\/script>
        </body>
      </html>
    `;
    setCompiledSrcDoc(combined);
  };

  useEffect(() => {
    handleRunCode();
  }, [htmlCode, cssCode, jsCode]);

  const loadPreset = (key: 'matrix' | 'neonButton') => {
    setActivePreset(key);
    setHtmlCode(PRESET_CODE_SNIPPETS[key].html);
    setCssCode(PRESET_CODE_SNIPPETS[key].css);
    setJsCode(PRESET_CODE_SNIPPETS[key].js);
  };

  // Three.js 3D Virtual Computer Workstation Scene
  useEffect(() => {
    if (activeTab !== '3d') return;
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 800;
    const height = 480;

    const isSoftwareGl = (() => {
      const probe = document.createElement('canvas');
      const gl = probe.getContext('webgl2');
      if (!gl) return true;
      const ext = gl.getExtension('WEBGL_debug_renderer_info');
      const param = ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER;
      const gpu = String(gl.getParameter(param));
      gl.getExtension('WEBGL_lose_context')?.loseContext();
      return /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
    })();

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x030712, 0.04);

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 50);
    camera.position.set(0, 1.8, 4.4);
    camera.lookAt(0, 0.2, 0);

    const renderer = new THREE.WebGLRenderer({
      antialias: !isSoftwareGl,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, 1.5));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    container.appendChild(renderer.domElement);

    // Studio Lights
    const ambientLight = new THREE.AmbientLight(0x0f172a, 1.6);
    scene.add(ambientLight);

    const cyanKey = new THREE.DirectionalLight(0x00f0ff, 2.5);
    cyanKey.position.set(3, 4, 3);
    scene.add(cyanKey);

    const purpleFill = new THREE.DirectionalLight(0xa855f7, 2.0);
    purpleFill.position.set(-3, 2, -2);
    scene.add(purpleFill);

    // Procedural Lab Workstation Model Group
    const labGroup = new THREE.Group();
    scene.add(labGroup);

    // 1. Desk Surface
    const deskGeo = new THREE.BoxGeometry(3.6, 0.08, 1.8);
    const deskMat = new THREE.MeshStandardMaterial({
      color: 0x070e1c,
      roughness: 0.25,
      metalness: 0.8,
    });
    const desk = new THREE.Mesh(deskGeo, deskMat);
    desk.position.y = -0.5;
    labGroup.add(desk);

    // Desk Glowing Edge Trim
    const trimGeo = new THREE.BoxGeometry(3.62, 0.02, 0.04);
    const trimMat = new THREE.MeshBasicMaterial({ color: 0x00e5ff });
    const trim = new THREE.Mesh(trimGeo, trimMat);
    trim.position.set(0, -0.46, 0.9);
    labGroup.add(trim);

    // 2. Ultra-Wide Cyber Monitor
    const monitorGroup = new THREE.Group();
    monitorGroup.position.set(0, 0.35, -0.2);
    labGroup.add(monitorGroup);

    // Stand Base & Stem
    const baseGeo = new THREE.CylinderGeometry(0.3, 0.35, 0.04, 32);
    const standMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, metalness: 0.9, roughness: 0.2 });
    const base = new THREE.Mesh(baseGeo, standMat);
    base.position.y = -0.82;
    monitorGroup.add(base);

    const stemGeo = new THREE.BoxGeometry(0.08, 0.8, 0.06);
    const stem = new THREE.Mesh(stemGeo, standMat);
    stem.position.set(0, -0.42, -0.05);
    monitorGroup.add(stem);

    // Curved / Beveled Frame
    const frameGeo = new THREE.BoxGeometry(2.4, 1.1, 0.06);
    const frameMat = new THREE.MeshStandardMaterial({ color: 0x0f172a, roughness: 0.4, metalness: 0.7 });
    const frame = new THREE.Mesh(frameGeo, frameMat);
    monitorGroup.add(frame);

    // Glowing Animated Display Screen
    const screenGeo = new THREE.PlaneGeometry(2.28, 0.98);
    // Procedural Screen Texture with code lines
    const screenCanvas = document.createElement('canvas');
    screenCanvas.width = 512;
    screenCanvas.height = 256;
    const sctx = screenCanvas.getContext('2d');
    if (sctx) {
      sctx.fillStyle = '#020617';
      sctx.fillRect(0, 0, 512, 256);
      sctx.fillStyle = '#38bdf8';
      sctx.font = 'bold 16px monospace';
      sctx.fillText('> MASC C² TECH LAB v2.4', 20, 35);
      sctx.fillStyle = '#a855f7';
      sctx.font = '13px monospace';
      sctx.fillText('import { QuantumAlgorithm } from "@dept/cs";', 20, 65);
      sctx.fillText('import { ReactEngine } from "@dept/ca";', 20, 85);
      sctx.fillStyle = '#22c55e';
      sctx.fillText('// Running high-performance simulation...', 20, 115);
      sctx.fillText('const result = await compileUniverse();', 20, 135);
      sctx.fillStyle = '#06b6d4';
      sctx.fillText('>>> SYSTEM 100% OPERATIONAL // CHENNAI', 20, 175);
    }
    const screenTex = new THREE.CanvasTexture(screenCanvas);
    screenTex.colorSpace = THREE.SRGBColorSpace;
    const screenMat = new THREE.MeshBasicMaterial({ map: screenTex });
    const screen = new THREE.Mesh(screenGeo, screenMat);
    screen.position.z = 0.035;
    monitorGroup.add(screen);

    // 3. Backlit Cyber Keyboard
    const kbGeo = new THREE.BoxGeometry(1.2, 0.03, 0.42);
    const kbMat = new THREE.MeshStandardMaterial({ color: 0x090d16, metalness: 0.6, roughness: 0.4 });
    const keyboard = new THREE.Mesh(kbGeo, kbMat);
    keyboard.position.set(0, -0.44, 0.45);
    labGroup.add(keyboard);

    // Keyboard RGB Underglow
    const glowGeo = new THREE.PlaneGeometry(1.25, 0.45);
    const glowMat = new THREE.MeshBasicMaterial({ color: 0x00f0ff, transparent: true, opacity: 0.35 });
    const glowPlane = new THREE.Mesh(glowGeo, glowMat);
    glowPlane.rotation.x = -Math.PI / 2;
    glowPlane.position.set(0, -0.455, 0.45);
    labGroup.add(glowPlane);

    // 4. Cyber Mouse
    const mouseGeo = new THREE.BoxGeometry(0.12, 0.04, 0.2);
    const mouseMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, metalness: 0.8, roughness: 0.3 });
    const mouse = new THREE.Mesh(mouseGeo, mouseMat);
    mouse.position.set(0.8, -0.44, 0.45);
    labGroup.add(mouse);

    // 5. High-End Tower PC (Right Side)
    const towerGeo = new THREE.BoxGeometry(0.35, 0.9, 0.7);
    const towerMat = new THREE.MeshStandardMaterial({ color: 0x070c18, metalness: 0.8, roughness: 0.2 });
    const tower = new THREE.Mesh(towerGeo, towerMat);
    tower.position.set(1.4, -0.05, 0.1);
    labGroup.add(tower);

    // Tower Glass Panel with Internal LED light
    const glassGeo = new THREE.PlaneGeometry(0.65, 0.8);
    const glassMat = new THREE.MeshBasicMaterial({ color: 0xa855f7, transparent: true, opacity: 0.5 });
    const glassPanel = new THREE.Mesh(glassGeo, glassMat);
    glassPanel.rotation.y = -Math.PI / 2;
    glassPanel.position.set(1.22, -0.05, 0.1);
    labGroup.add(glassPanel);

    // 6. Floating Holographic Programming Runes
    const runeGroup = new THREE.Group();
    labGroup.add(runeGroup);

    const runeGeos = [
      new THREE.IcosahedronGeometry(0.12, 0),
      new THREE.BoxGeometry(0.16, 0.16, 0.16),
      new THREE.OctahedronGeometry(0.14, 0),
      new THREE.TetrahedronGeometry(0.15, 0),
    ];

    const runes: THREE.Mesh[] = [];
    for (let i = 0; i < 6; i++) {
      const geo = runeGeos[i % runeGeos.length];
      const mat = new THREE.MeshStandardMaterial({
        color: i % 2 === 0 ? 0x00f0ff : 0xd946ef,
        emissive: i % 2 === 0 ? 0x0284c7 : 0xa855f7,
        emissiveIntensity: 0.8,
        wireframe: true,
      });
      const rune = new THREE.Mesh(geo, mat);
      const angle = (i / 6) * Math.PI * 2;
      rune.position.set(Math.cos(angle) * 1.8, 0.5 + Math.sin(angle) * 0.4, Math.sin(angle) * 1.2 - 0.2);
      runeGroup.add(rune);
      runes.push(rune);
    }

    let frameId = 0;
    const animate = () => {
      frameId = requestAnimationFrame(animate);
      const t = Date.now() * 0.001;

      // Gentle interactive sway
      labGroup.rotation.y = Math.sin(t * 0.4) * 0.08;
      runeGroup.rotation.y = t * 0.2;

      runes.forEach((r, idx) => {
        r.rotation.x = t * (0.5 + idx * 0.1);
        r.rotation.y = t * (0.8 + idx * 0.1);
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
      deskGeo.dispose();
      deskMat.dispose();
      trimGeo.dispose();
      trimMat.dispose();
      frameGeo.dispose();
      frameMat.dispose();
      screenGeo.dispose();
      screenMat.dispose();
      screenTex.dispose();
      kbGeo.dispose();
      kbMat.dispose();
      glowGeo.dispose();
      glowMat.dispose();
      mouseGeo.dispose();
      mouseMat.dispose();
      towerGeo.dispose();
      towerMat.dispose();
      glassGeo.dispose();
      glassMat.dispose();
      runeGeos.forEach((g) => g.dispose());
    };
  }, [activeTab]);

  return (
    <section id="virtual-lab" className="relative py-24 px-4 sm:px-6 lg:px-8 border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/70 border border-cyan-500/30 text-cyan-300 text-xs font-mono mb-3">
            <Terminal className="w-3.5 h-3.5 text-cyan-400" />
            <span>IMMERSIVE SIMULATION // VIRTUAL CODING WORKSTATION</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-white mb-4">
            Virtual 3D Computer Lab
          </h2>
          <p className="text-base text-slate-300">
            Step into the virtual hardware workstation of Madha Arts and Science College, equipped with a live code runner and 3D simulation.
          </p>
        </div>

        {/* View Switcher: 3D Workstation vs Live Playground */}
        <div className="flex items-center justify-center gap-3 mb-8">
          <button
            onClick={() => setActiveTab('3d')}
            className={`px-5 py-2.5 rounded-xl text-xs font-mono font-bold uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer ${
              activeTab === '3d'
                ? 'bg-cyan-500 text-slate-950 shadow-[0_0_15px_rgba(6,182,212,0.3)]'
                : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <Laptop className="w-4 h-4" />
            <span>3D Workstation View</span>
          </button>
          <button
            onClick={() => setActiveTab('playground')}
            className={`px-5 py-2.5 rounded-xl text-xs font-mono font-bold uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer ${
              activeTab === 'playground'
                ? 'bg-purple-500 text-white shadow-[0_0_15px_rgba(168,85,247,0.3)]'
                : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <Code className="w-4 h-4" />
            <span>Interactive Code Playground</span>
          </button>
        </div>

        {/* 3D Workstation View */}
        {activeTab === '3d' ? (
          <div className="glass-panel rounded-2xl p-6 border-cyan-500/30 shadow-2xl relative overflow-hidden">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-800 text-xs font-mono text-slate-400">
              <span className="text-cyan-400">HARDWARE SPECS // MASC COMPUTING CLUSTER</span>
              <span>RENDER // THREE.JS PBR STUDIO</span>
            </div>

            <div
              ref={mountRef}
              className="w-full h-[480px] bg-[#02050f] rounded-xl border border-slate-800/80 flex items-center justify-center relative overflow-hidden"
            >
              {/* Overlay HUD indicators */}
              <div className="absolute top-4 left-4 p-3 rounded-lg bg-slate-950/80 border border-slate-800 text-xs font-mono text-slate-300 pointer-events-none">
                <div className="text-[10px] text-cyan-400 uppercase">System Status</div>
                <div className="font-bold text-white">Online // Ready</div>
                <div className="text-[10px] text-slate-400">GPU: Procedural PBR</div>
              </div>

              <div className="absolute bottom-4 right-4 flex items-center gap-2">
                <button
                  onClick={() => setActiveTab('playground')}
                  className="px-4 py-2 rounded-lg text-xs font-mono font-bold bg-cyan-500 hover:bg-cyan-400 text-slate-950 transition-all shadow-md flex items-center gap-1.5 cursor-pointer"
                >
                  <Code className="w-4 h-4" />
                  <span>Launch Live Code Runner →</span>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6 text-xs text-slate-400 font-mono">
              <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800">
                <span className="text-cyan-400 block mb-1">01 // High Performance Station</span>
                Curved ultra-wide display, mechanical backlit keyboard, ergonomic controls.
              </div>
              <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800">
                <span className="text-purple-400 block mb-1">02 // Code Compilation Hub</span>
                Integrated client-side JavaScript, CSS3 and HTML5 virtual sandbox.
              </div>
              <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800">
                <span className="text-emerald-400 block mb-1">03 // Holographic Nodes</span>
                Floating algorithm geometry representing active memory allocation.
              </div>
            </div>
          </div>
        ) : (
          /* Live Working Playground */
          <div className="glass-panel rounded-2xl p-6 border-purple-500/30 shadow-2xl">
            {/* Top Bar: Presets & Run */}
            <div className="flex flex-wrap items-center justify-between gap-4 pb-4 mb-4 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono text-slate-400">Preset Scripts:</span>
                <button
                  onClick={() => loadPreset('matrix')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                    activePreset === 'matrix'
                      ? 'bg-cyan-950 border border-cyan-400 text-cyan-300'
                      : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                  }`}
                >
                  Matrix Rain
                </button>
                <button
                  onClick={() => loadPreset('neonButton')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                    activePreset === 'neonButton'
                      ? 'bg-purple-950 border border-purple-400 text-purple-300'
                      : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                  }`}
                >
                  Neon Button
                </button>
              </div>

              <button
                onClick={handleRunCode}
                className="px-5 py-2 rounded-xl text-xs font-mono font-bold uppercase bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-slate-950 transition-all flex items-center gap-2 shadow-[0_0_15px_rgba(16,185,129,0.3)] cursor-pointer"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Execute Code</span>
              </button>
            </div>

            {/* Split Screen: Editor & Live Preview */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Code Editor */}
              <div className="flex flex-col h-[440px] rounded-xl bg-slate-950 border border-slate-800 overflow-hidden">
                {/* File Tabs */}
                <div className="flex items-center border-b border-slate-800 bg-slate-900/80 px-2 pt-2">
                  <button
                    onClick={() => setActiveCodeTab('html')}
                    className={`px-4 py-1.5 rounded-t-lg text-xs font-mono transition-all cursor-pointer ${
                      activeCodeTab === 'html'
                        ? 'bg-slate-950 text-cyan-300 border-t border-x border-cyan-500/40'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    index.html
                  </button>
                  <button
                    onClick={() => setActiveCodeTab('css')}
                    className={`px-4 py-1.5 rounded-t-lg text-xs font-mono transition-all cursor-pointer ${
                      activeCodeTab === 'css'
                        ? 'bg-slate-950 text-purple-300 border-t border-x border-purple-500/40'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    styles.css
                  </button>
                  <button
                    onClick={() => setActiveCodeTab('js')}
                    className={`px-4 py-1.5 rounded-t-lg text-xs font-mono transition-all cursor-pointer ${
                      activeCodeTab === 'js'
                        ? 'bg-slate-950 text-emerald-300 border-t border-x border-emerald-500/40'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    script.js
                  </button>
                </div>

                {/* Textarea */}
                <div className="flex-1 p-3">
                  {activeCodeTab === 'html' && (
                    <textarea
                      value={htmlCode}
                      onChange={(e) => setHtmlCode(e.target.value)}
                      className="w-full h-full bg-transparent text-slate-200 font-mono text-xs focus:outline-none resize-none leading-relaxed"
                      spellCheck={false}
                      aria-label="HTML code editor"
                    />
                  )}
                  {activeCodeTab === 'css' && (
                    <textarea
                      value={cssCode}
                      onChange={(e) => setCssCode(e.target.value)}
                      className="w-full h-full bg-transparent text-slate-200 font-mono text-xs focus:outline-none resize-none leading-relaxed"
                      spellCheck={false}
                      aria-label="CSS code editor"
                    />
                  )}
                  {activeCodeTab === 'js' && (
                    <textarea
                      value={jsCode}
                      onChange={(e) => setJsCode(e.target.value)}
                      className="w-full h-full bg-transparent text-slate-200 font-mono text-xs focus:outline-none resize-none leading-relaxed"
                      spellCheck={false}
                      aria-label="JavaScript code editor"
                    />
                  )}
                </div>
              </div>

              {/* Sandboxed Live Execution Preview */}
              <div className="flex flex-col h-[440px] rounded-xl bg-slate-950 border border-slate-800 overflow-hidden">
                <div className="px-4 py-2 border-b border-slate-800 bg-slate-900/80 flex items-center justify-between text-xs font-mono text-slate-400">
                  <div className="flex items-center gap-2">
                    <Eye className="w-3.5 h-3.5 text-cyan-400" />
                    <span>LIVE BROWSER RENDER</span>
                  </div>
                  <span className="text-[10px] text-emerald-400">ACTIVE PREVIEW</span>
                </div>

                <div className="flex-1 bg-white relative">
                  <iframe
                    title="Live Code Runner Output"
                    srcDoc={compiledSrcDoc}
                    sandbox="allow-scripts"
                    className="w-full h-full border-none"
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
