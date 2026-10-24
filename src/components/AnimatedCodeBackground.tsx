import React, { useEffect, useRef } from 'react';

const CODE_SNIPPETS = [
  'const c2tech = new Universe({ college: "MASC", location: "Kundrathur, Chennai" });',
  'import { ComputerScience, ComputerApplications } from "@masc/c2tech";',
  '#include <iostream>\nusing namespace std;\nint main() { cout << "MASC Chennai - 600128"; }',
  'def think_beyond_code():\n    return build_beyond_limits()',
  'public class C2Tech {\n    public static void main(String[] args) {}\n}',
  '<div className="holographic-campus" data-dept="CS_CA_MASC">',
  'SELECT student_id, skills FROM department WHERE college = "MASC_Kundrathur";',
  'git commit -m "feat: launch C2 Tech portal for MASC Chennai"',
  'void quantum_compute(Matrix* state, int qubits);',
  'interface Algorithm { optimize(): Promise<Solution>; }',
];

export const AnimatedCodeBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // Matrix characters: Binary, Hex, and Programming Glyphs
    const chars = '0101010101MASC_C2_TECH_CS_CA_CHENNAI_<>{}[]/*+=~#&|@$!?;';
    const fontSize = 14;
    const columns = Math.floor(width / fontSize);
    const drops: number[] = new Array(columns).fill(1);

    // Floating code snippet nodes
    const floatingTokens = CODE_SNIPPETS.map((snippet, i) => ({
      text: snippet.split('\n')[0],
      x: (i * (width / CODE_SNIPPETS.length) + 40) % (width - 150),
      y: Math.random() * height,
      speedY: -0.35 - Math.random() * 0.4,
      speedX: (Math.random() - 0.5) * 0.2,
      opacity: 0.12 + Math.random() * 0.18,
      color: i % 2 === 0 ? 'rgba(56, 189, 248, ' : 'rgba(168, 85, 247, ',
    }));

    let lastTick = performance.now();

    const draw = (now: number) => {
      const delta = now - lastTick;
      if (delta > 35) { // ~28-30fps throttle for smooth lightweight rendering
        lastTick = now;

        // Semi-transparent dark overlay for trailing matrix effect
        ctx.fillStyle = 'rgba(3, 7, 18, 0.16)';
        ctx.fillRect(0, 0, width, height);

        // Draw Matrix rain characters
        ctx.font = `${fontSize}px "Fira Code", monospace`;

        for (let i = 0; i < drops.length; i += 2) {
          const char = chars[Math.floor(Math.random() * chars.length)];
          const x = i * fontSize;
          const y = drops[i] * fontSize;

          // Glowing tip character
          if (Math.random() > 0.85) {
            ctx.fillStyle = '#38bdf8'; // bright cyan
            ctx.shadowBlur = 8;
            ctx.shadowColor = '#06b6d4';
          } else {
            ctx.fillStyle = i % 4 === 0 ? 'rgba(168, 85, 247, 0.45)' : 'rgba(14, 165, 233, 0.35)';
            ctx.shadowBlur = 0;
          }

          ctx.fillText(char, x, y);

          if (y > height && Math.random() > 0.985) {
            drops[i] = 0;
          }
          drops[i]++;
        }

        ctx.shadowBlur = 0;

        // Draw floating code snippets
        ctx.font = '12px "Fira Code", monospace';
        floatingTokens.forEach((token) => {
          ctx.fillStyle = `${token.color}${token.opacity})`;
          ctx.fillText(token.text, token.x, token.y);

          token.y += token.speedY;
          token.x += token.speedX;

          if (token.y < -30) {
            token.y = height + 30;
            token.x = Math.random() * (width - 150);
          }
        });
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    animationFrameId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-65" />
      {/* Cyber Grid & Radial Vignette */}
      <div className="absolute inset-0 cyber-grid opacity-30" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#030712]/70 to-[#030712] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,transparent_0%,#030712_85%)] pointer-events-none" />
    </div>
  );
};
