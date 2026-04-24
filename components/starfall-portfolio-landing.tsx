'use client';

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

// ── Types ──────────────────────────────────────────────
interface NavLink {
  label: string;
  href: string;
}

interface CtaButton {
  label: string;
  href: string;
  variant?: "default" | "outline" | "ghost";
}

interface Project {
  title: string;
  description: string;
  tags: string[];
  href?: string;
}

interface Stat {
  value: string;
  label: string;
}

interface PortfolioPageProps {
  logo?: string;
  navLinks?: NavLink[];
  resume?: string;
  hero?: {
    titleLine1: string;
    titleLine2Gradient: string;
    subtitle: string;
  };
  ctaButtons?: CtaButton[];
  projects?: Project[];
  stats?: Stat[];
  showAnimatedBackground?: boolean;
}

const defaultData: Required<PortfolioPageProps> = {
  logo: "Portfolio",
  navLinks: [
    { label: "About", href: "#about" },
    { label: "Projects", href: "#projects" },
    { label: "Contact", href: "#contact" },
  ],
  resume: "/resume.pdf",
  hero: {
    titleLine1: "Hello, I'm",
    titleLine2Gradient: "A Developer",
    subtitle: "I build things for the web.",
  },
  ctaButtons: [],
  projects: [],
  stats: [],
  showAnimatedBackground: true,
};

// ── Aurora Background ──────────────────────────────────
const AuroraBackground = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    mountRef.current.appendChild(renderer.domElement);

    const geometry = new THREE.PlaneGeometry(10, 10, 50, 50);
    const material = new THREE.MeshBasicMaterial({
      color: 0xffb3c6,
      wireframe: true,
      transparent: true,
      opacity: 0.05,
    });
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);
    camera.position.z = 5;

    let animationId: number;
    const animate = () => {
      animationId = requestAnimationFrame(animate);
      mesh.rotation.x += 0.001;
      mesh.rotation.y += 0.001;
      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
      mountRef.current?.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="fixed inset-0 pointer-events-none z-0"
    />
  );
};

// ── Main Component ─────────────────────────────────────
const PortfolioPage: React.FC<PortfolioPageProps> = ({
  logo = defaultData.logo,
  navLinks = defaultData.navLinks,
  resume = defaultData.resume,
  hero = defaultData.hero,
  ctaButtons = defaultData.ctaButtons,
  projects = defaultData.projects,
  stats = defaultData.stats,
  showAnimatedBackground = true,
}) => {
  return (
    <div className="bg-background text-foreground">
      {showAnimatedBackground && <AuroraBackground />}
      <div className="relative z-10">

        {/* Navbar */}
        <nav className="w-full px-6 py-4 border-b border-white/10">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <span className="font-bold text-xl text-[#ffb3c6]">{logo}</span>
            <div className="flex gap-6">
              {navLinks?.map((link) => (
                <a key={link.href} href={link.href} className="text-muted-foreground hover:text-foreground transition-colors text-sm">
                  {link.label}
                </a>
              ))}
              {resume && (
                <a href={resume} target="_blank" rel="noopener noreferrer" className="text-sm text-[#ffb3c6] hover:underline">
                  Resume
                </a>
              )}
            </div>
          </div>
        </nav>

        {/* Hero */}
        <main id="about" className="w-full min-h-screen flex flex-col items-center justify-center px-6 py-20">
          <div className="max-w-6xl mx-auto text-center">
            <div className="mb-8">
              <h1 className="text-5xl md:text-6xl lg:text-7xl leading-[1.1] font-light text-foreground tracking-tight mb-4">
                {hero.titleLine1}
                <span className="block tracking-tight bg-gradient-to-r from-[#ffb3c6] to-pink-400 bg-clip-text text-transparent">
                  {hero.titleLine2Gradient}
                </span>
              </h1>
              <p className="text-lg md:text-xl max-w-3xl leading-relaxed font-light text-muted-foreground mx-auto">
                {hero.subtitle}
              </p>
            </div>

            {/* CTA Buttons */}
            {ctaButtons && ctaButtons.length > 0 && (
              <div className="flex gap-4 justify-center flex-wrap mt-8">
                {ctaButtons.map((btn) => (
                  <a key={btn.label} href={btn.href}
                    className="px-6 py-3 rounded-xl font-semibold transition-colors bg-[#ffb3c6] text-black hover:bg-[#ffb3c6]/80">
                    {btn.label}
                  </a>
                ))}
              </div>
            )}
          </div>
        </main>

        {/* Stats */}
        {stats && stats.length > 0 && (
          <section className="py-16 px-6 border-t border-white/10">
            <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {stats.map((stat) => (
                <div key={stat.label}>
                  <div className="text-3xl font-bold text-[#ffb3c6]">{stat.value}</div>
                  <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Projects */}
        {projects && projects.length > 0 && (
          <section id="projects" className="py-20 px-6">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12 text-foreground">Projects</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.map((project) => (
                  <a key={project.title} href={project.href ?? "#"}
                    className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                    <h3 className="font-bold text-lg text-foreground mb-2">{project.title}</h3>
                    <p className="text-muted-foreground text-sm mb-4">{project.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <span key={tag} className="text-xs px-2 py-1 rounded-full bg-[#ffb3c6]/20 text-[#ffb3c6]">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </section>
        )}

      </div>
    </div>
  );
};

export default PortfolioPage;