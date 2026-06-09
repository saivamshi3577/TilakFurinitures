import { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import HeroBackground from './HeroBackground';
import logo from './assets/logo2.png'; 
import "./App.css";
import workshop from './assets/workshop.png';
import cnc from './assets/cnc.png';
import closet from './assets/closet.png';
import timber from './assets/timber.png';
// Premium React Icons
import { 
  FiSun, FiMoon, FiArrowRight, FiLayers, FiCheckCircle, 
  FiShield, FiSliders, FiCpu, FiCompass, FiAward, FiFeather,
  FiBriefcase, FiEye, FiBox
} from 'react-icons/fi';

export default function App() {
  const containerRef = useRef();
  const [activeSection, setActiveSection] = useState(0);
  const [isDarkMode, setIsDarkMode] = useState(true);

  // 13 Elite High-Conversion Carpentry & Interior Sections
  const sections = [
    { id: 'home', name: 'Intro' },
    { id: 'heritage', name: 'Our Heritage' },
    { id: 'philosophy', name: 'Design Ethos' },
    { id: 'kitchens', name: 'Kitchen Systems' },
    { id: 'living', name: 'Living Lounges' },
    { id: 'wardrobes', name: 'Luxury Storage' },
    { id: 'kids-vanity', name: 'Vanities & Kids' },
    { id: 'structural', name: 'Heavy Woodwork' },
    { id: 'commercial', name: 'Corporate Spatial' },
    { id: 'workshop', name: 'Live Facility' },
    { id: 'turnkey', name: 'Our Process' },
    { id: 'materials', name: 'Material Ethics' },
    { id: 'contact', name: 'Inquire' }
  ];

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    if (isDarkMode) {
      document.documentElement.classList.add('light-mode');
    } else {
      document.documentElement.classList.remove('light-mode');
    }
  };

  const scrollToSection = (index) => {
    const target = document.getElementById(sections[index].id);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(index);
    }
  };

  // High-performance Intersection Observer to coordinate text & image entry mechanics dynamically
  useEffect(() => {
    const observers = sections.map((sec, idx) => {
      const el = document.getElementById(sec.id);
      if (!el) return null;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(idx);

            // Dynamic programmatic injection of GSAP transitions per active view scope
            if (sec.id !== 'home') {
              const textNodes = el.querySelectorAll('.premium-reveal-text');
              const imageNode = el.querySelector('.premium-slide-img');

              if (textNodes.length > 0) {
                gsap.to(textNodes, {
                  opacity: 1,
                  y: 0,
                  duration: 0.8,
                  stagger: 0.12,
                  ease: "power3.out",
                  overwrite: "auto"
                });
              }

              if (imageNode) {
                gsap.to(imageNode, {
                  opacity: 1,
                  x: 0,
                  scale: 1,
                  duration: 1.2,
                  ease: "power4.out",
                  overwrite: "auto"
                });
              }
            }
          }
        },
        { threshold: 0.25 } // Optimizes viewport boundary calculations
      );
      observer.observe(el);
      return { observer, el };
    });

    return () => {
      observers.forEach((obs) => obs && obs.observer.unobserve(obs.el));
    };
  }, []);

  useGSAP(() => {
    // Preloader and Hero entry timeline sequence
    const tl = gsap.timeline();
    tl.to(".preloader-logo", { scale: 1.02, duration: 0.8, ease: "power2.out" })
      .to(".preloader", { yPercent: -100, duration: 0.8, ease: "power4.inOut", delay: 0.1 })
      .from(".hero-reveal-title", { y: 100, opacity: 0, duration: 1.2, ease: "power4.out" }, "-=0.2")
      .from(".hero-reveal-sub", { y: 40, opacity: 0, duration: 0.8, stagger: 0.1, ease: "power3.out" }, "-=0.6");
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="relative w-full min-h-screen antialiased bg-[#0D0D0D] text-white transition-colors duration-500 selection:bg-brand-gold selection:text-black">
      
      {/* Preloader */}
      <div className="preloader fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#0D0D0D]">
        <img src={logo} alt="Thilak Furnitures" className="preloader-logo w-48 h-auto object-contain mb-4" />
        <div className="w-16 h-[2px] bg-brand-gold/20 relative overflow-hidden">
          <div className="absolute top-0 left-0 h-full w-1/2 bg-brand-gold animate-pulse"></div>
        </div>
      </div>

      {/* Top Floating Header */}
      <header className="fixed top-0 left-0 w-full z-40 flex justify-between items-center px-6 md:px-12 py-6 backdrop-blur-md bg-transparent">
        <img src={logo} alt="Logo" className="h-10 md:h-12 w-auto object-contain filter drop-shadow-md" />
        
        <div className="flex items-center gap-4">
          <button 
            onClick={toggleTheme} 
            className="flex items-center justify-center w-10 h-10 rounded-full border border-brand-gold/20 hover:border-brand-gold bg-black/20 text-brand-gold cursor-pointer transition-all hover:scale-105 active:scale-95"
          >
            {isDarkMode ? <FiSun size={16} /> : <FiMoon size={16} />}
          </button>
          <button onClick={() => scrollToSection(sections.length - 1)} className="flex items-center gap-2 border border-brand-gold text-brand-gold px-5 py-2.5 text-xs font-bold tracking-widest uppercase hover:bg-brand-gold hover:text-black transition-all cursor-pointer rounded-none">
            Inquire <FiArrowRight size={14} />
          </button>
        </div>
      </header>

      {/* Dynamically Calibrated 13-Step Nav Loop */}
      <nav className="fixed right-4 md:right-8 top-1/2 -translate-y-1/2 z-40 flex flex-col gap-3 items-center bg-black/10 p-3 rounded-full backdrop-blur-sm border border-white/5">
        <span className="text-[9px] font-bold uppercase tracking-[0.25em] text-brand-gold/60 [writing-mode:vertical-lr] mb-2 font-mono">Index</span>
        {sections.map((section, idx) => (
          <button
            key={section.id}
            onClick={() => scrollToSection(idx)}
            className="group relative flex items-center justify-end p-1 cursor-pointer"
          >
            <span className={`absolute right-8 text-[10px] font-mono tracking-widest uppercase whitespace-nowrap transition-all duration-300 transform translate-x-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 ${activeSection === idx ? 'text-brand-gold font-bold opacity-100 translate-x-0' : 'text-gray-400'}`}>
              {section.name}
            </span>
            <div className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${activeSection === idx ? 'bg-brand-gold scale-150 ring-4 ring-brand-gold/20' : 'bg-brand-gold/30 group-hover:bg-brand-gold/60'}`} />
          </button>
        ))}
      </nav>

      {/* Main Structural Scrolling Track */}
      <main className="portfolio-container w-full">

        {/* SECTION 1: Intro */}
        <section id="home" className="w-full min-h-screen flex items-center px-6 md:px-24 relative py-32">
          <div className="absolute inset-0 z-0 overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=2000&q=90" 
              alt="Premium Production Atelier background" 
              className="w-full h-full object-cover filter brightness-35 contrast-115 select-none scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0D0D0D] via-[#0D0D0D]/60 to-transparent dark-overlay" />
          </div>
          <HeroBackground />
          <div className="max-w-4xl z-10 relative">
            <span className="hero-reveal-sub block text-brand-gold uppercase tracking-[0.2em] text-xs font-bold font-mono mb-4">// Architectural Interior Atelier</span>
            <h1 className="hero-reveal-title text-5xl sm:text-7xl md:text-9xl tracking-tighter leading-[0.95] mb-6 font-display uppercase text-white">
              Spaces <br />Perfected.
            </h1>
            <p className="hero-reveal-sub text-gray-300 max-w-xl text-sm md:text-base mb-8 leading-relaxed font-sans">
              Engineering premium custom furniture systems and structural interior profiles using moisture-resistant calibrated timbers calculated to stand beautifully for generations.
            </p>
            <button onClick={() => scrollToSection(1)} className="hero-reveal-sub flex items-center gap-3 px-6 py-4 bg-brand-gold text-black font-bold tracking-widest uppercase text-xs hover:bg-white hover:text-black transition-all cursor-pointer rounded-none border border-brand-gold">
              Discover Our Story <FiArrowRight size={14} />
            </button>
          </div>
        </section>

        {/* SECTION 2: Corporate Heritage Story */}
        <section id="heritage" className="w-full min-h-screen flex items-center bg-secondary-theme px-6 md:px-24 py-32 border-b border-white/5">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center w-full max-w-7xl mx-auto">
            <div className="lg:col-span-6 z-10 space-y-6">
              <span className="premium-reveal-text opacity-0 translate-y-8 text-brand-gold text-xs font-mono uppercase tracking-widest block">[02 / The Heritage]</span>
              <h2 className="premium-reveal-text opacity-0 translate-y-8 text-4xl md:text-6xl uppercase tracking-tighter font-display text-theme-heading">Mastering Timber & Space Since Inception</h2>
              <div className="premium-reveal-text opacity-0 translate-y-8 space-y-4 text-muted-theme text-sm md:text-base leading-relaxed font-sans">
                <p>
                  Thilak Furnitures and Interior Works was built upon a clear guiding principle: balancing rigorous industrial engineering with traditional, premium joinery techniques. What started as an unyielding focus on structural woodwork has evolved into a comprehensive interior design studio specializing in bespoke home architectural environments.
                </p>
                <p>
                  We do not believe in mass-produced, fragile furniture alternatives. Every modular assembly, entertainment display unit, and luxury wardrobe system that exits our facility undergoes precision edge-banding, specialized anti-termite chemical treatments, and meticulous weight distribution testing. 
                </p>
              </div>
              <div className="premium-reveal-text opacity-0 translate-y-8 pt-4 flex items-center gap-6">
                <div><span className="text-brand-gold font-display text-2xl font-bold block">15+</span><span className="text-[10px] uppercase font-mono tracking-wider text-muted-theme">Years Excellence</span></div>
                <div className="w-[1px] h-8 bg-brand-gold/20" />
                <div><span className="text-brand-gold font-display text-2xl font-bold block">500+</span><span className="text-[10px] uppercase font-mono tracking-wider text-muted-theme">Premium Handovers</span></div>
              </div>
            </div>
            <div className="lg:col-span-6 relative h-[45vh] lg:h-[65vh] overflow-hidden shadow-2xl border border-white/5">
              <img src={timber} />
            </div>
          </div>
        </section>

        {/* SECTION 3: Design Principles */}
        <section id="philosophy" className="w-full min-h-screen flex items-center px-6 md:px-24 py-32 border-b border-white/5">
          <div className="max-w-6xl mx-auto w-full space-y-12">
            <div className="space-y-3">
              <span className="premium-reveal-text opacity-0 translate-y-8 text-brand-gold text-xs font-mono uppercase tracking-widest block">[03 / Design Ideology]</span>
              <h2 className="premium-reveal-text opacity-0 translate-y-8 text-4xl md:text-6xl uppercase tracking-tighter font-display text-theme-heading">Our Three Pillars of Craft</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="premium-reveal-text opacity-0 translate-y-8 p-8 border border-brand-gold/10 bg-secondary-theme flex flex-col gap-4 hover:border-brand-gold/30 transition-colors duration-300">
                <FiCompass className="text-brand-gold" size={28} />
                <h3 className="text-xl font-bold font-display uppercase tracking-tight text-theme-heading">01. Spatial Symmetry</h3>
                <p className="text-muted-theme text-xs md:text-sm leading-relaxed font-sans">
                  We balance space carefully before introducing furniture. Every configuration undergoes precise site dimension assessments to ensure ideal natural lighting access, unobstructed room thoroughfares, and flawless architectural flow.
                </p>
              </div>
              <div className="premium-reveal-text opacity-0 translate-y-8 p-8 border border-brand-gold/10 bg-secondary-theme flex flex-col gap-4 hover:border-brand-gold/30 transition-colors duration-300">
                <FiFeather className="text-brand-gold" size={28} />
                <h3 className="text-xl font-bold font-display uppercase tracking-tight text-theme-heading">02. Material Authenticity</h3>
                <p className="text-muted-theme text-xs md:text-sm leading-relaxed font-sans">
                  We intentionally reject weak composite boards, paper thin low-pressure laminates, and lightweight alloy fasteners. If a component does not stand up beautifully to daily weight loads and real moisture levels, it has no place in our blueprints.
                </p>
              </div>
              <div className="premium-reveal-text opacity-0 translate-y-8 p-8 border border-brand-gold/10 bg-secondary-theme flex flex-col gap-4 hover:border-brand-gold/30 transition-colors duration-300">
                <FiAward className="text-brand-gold" size={28} />
                <h3 className="text-xl font-bold font-display uppercase tracking-tight text-theme-heading">03. Enduring Function</h3>
                <p className="text-muted-theme text-xs md:text-sm leading-relaxed font-sans">
                  True luxury spaces perform reliably well across generations. We select highly anti-corrosive tracks, micro-adjustable hinges, and heavy-duty sliding track assemblies so your systems feel effortless even years down the road.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 4: Modular Kitchens */}
        <section id="kitchens" className="w-full min-h-screen flex items-center bg-secondary-theme px-6 md:px-24 py-32 border-b border-white/5">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center w-full max-w-7xl mx-auto">
            <div className="lg:col-span-5 z-10 space-y-4">
              <span className="premium-reveal-text opacity-0 translate-y-8 text-brand-gold text-xs font-mono uppercase tracking-widest block">[04 / Culinary Architecture]</span>
              <h2 className="premium-reveal-text opacity-0 translate-y-8 text-4xl md:text-6xl uppercase tracking-tighter font-display text-theme-heading">Culinary Workstations</h2>
              <p className="premium-reveal-text opacity-0 translate-y-8 text-muted-theme text-sm leading-relaxed font-sans">
                Our custom-engineered kitchen arrays are framed from high-density, boiling-water proof (BWP) marine plywood grids to provide full resistance against heavy damp conditions. Coupled with premium anti-fingerprint acrylic sheet choices and seamless machine edge-band profiles.
              </p>
              <div className="premium-reveal-text opacity-0 translate-y-8 flex items-center gap-2 text-xs font-mono text-brand-gold pt-2">
                <FiLayers /> Structural Grid: Marine Board + Hafele Premium Lift Closers
              </div>
            </div>
            <div className="lg:col-span-7 relative h-[45vh] lg:h-[65vh] overflow-hidden shadow-2xl border border-white/5">
              <img src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=90" alt="Luxury Minimalist Kitchen System" className="premium-slide-img opacity-0 translate-x-12 scale-105 w-full h-full object-cover" />
            </div>
          </div>
        </section>

        {/* SECTION 5: Living Lounges */}
        <section id="living" className="w-full min-h-screen flex items-center px-6 md:px-24 py-32 border-b border-white/5">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center w-full max-w-7xl mx-auto">
            <div className="lg:col-span-7 h-[45vh] lg:h-[65vh] overflow-hidden order-2 lg:order-1 shadow-2xl border border-white/5">
              <img src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=90" alt="High End TV Console Unit Living Room" className="premium-slide-img opacity-0 translate-x-12 scale-105 w-full h-full object-cover" />
            </div>
            <div className="lg:col-span-5 z-10 order-1 lg:order-2 space-y-4">
              <span className="premium-reveal-text opacity-0 translate-y-8 text-brand-gold text-xs font-mono uppercase tracking-widest block">[05 / Entertainment Hubs]</span>
              <h2 className="premium-reveal-text opacity-0 translate-y-8 text-4xl md:text-6xl uppercase tracking-tighter font-display text-theme-heading">Bespoke Living Lounges</h2>
              <p className="premium-reveal-text opacity-0 translate-y-8 text-muted-theme text-sm leading-relaxed font-sans">
                We craft central architectural entertainment fixtures detailed with custom warm LED routing matrices, hidden internal cable-management pathways, and premium micro-fluted structural panel accent backdrops.
              </p>
              <div className="premium-reveal-text opacity-0 translate-y-8 flex items-center gap-2 text-xs font-mono text-brand-gold pt-2">
                <FiSliders /> Structural Grid: Teak Wood Outlines + Custom Finished Accents
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 6: Wardrobes */}
        <section id="wardrobes" className="w-full min-h-screen flex items-center bg-secondary-theme px-6 md:px-24 py-32 border-b border-white/5">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center w-full max-w-7xl mx-auto">
            <div className="lg:col-span-5 z-10 space-y-4">
              <span className="premium-reveal-text opacity-0 translate-y-8 text-brand-gold text-xs font-mono uppercase tracking-widest block mb-3">[06 / Premium Storage]</span>
              <h2 className="premium-reveal-text opacity-0 translate-y-8 text-4xl md:text-6xl uppercase tracking-tighter font-display text-theme-heading">Walk-In Closets</h2>
              <p className="premium-reveal-text opacity-0 translate-y-8 text-muted-theme text-sm leading-relaxed font-sans">
                Floor-to-ceiling sleek closet storage installations detailed with premium aluminum profile safety-glass frames, automatic proximity sensory light track rails, and soft velvet item organizers.
              </p>
              <div className="premium-reveal-text opacity-0 translate-y-8 flex items-center gap-2 text-xs font-mono text-brand-gold pt-2">
                <FiCpu /> Structural Grid: Smoked Anodized Metal Profiles + Proximity Sensors
              </div>
            </div>
            <div className="lg:col-span-7 h-[45vh] lg:h-[65vh] overflow-hidden shadow-2xl border border-white/5">
              <img src={closet} />
            </div>
          </div>
        </section>

        {/* SECTION 7: Kids Bedrooms & Premium Luxury Vanities */}
        <section id="kids-vanity" className="w-full min-h-screen flex items-center px-6 md:px-24 py-32 border-b border-white/5">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center w-full max-w-7xl mx-auto">
            <div className="lg:col-span-7 h-[45vh] lg:h-[65vh] overflow-hidden order-2 lg:order-1 shadow-2xl border border-white/5">
              <img src="https://images.unsplash.com/photo-1616486029423-aaa4789e8c9a?auto=format&fit=crop&w=1200&q=90" alt="Luxury Bathroom Vanity Furniture Design" className="premium-slide-img opacity-0 translate-x-12 scale-105 w-full h-full object-cover" />
            </div>
            <div className="lg:col-span-5 z-10 order-1 lg:order-2 space-y-4">
              <span className="premium-reveal-text opacity-0 translate-y-8 text-brand-gold text-xs font-mono uppercase tracking-widest block">[07 / Private Ensuites]</span>
              <h2 className="premium-reveal-text opacity-0 translate-y-8 text-4xl md:text-6xl uppercase tracking-tighter font-display text-theme-heading">Vanities & Kids Habitats</h2>
              <p className="premium-reveal-text opacity-0 translate-y-8 text-muted-theme text-sm leading-relaxed font-sans">
                Creating vibrant but durable ergonomically designed youth bedrooms alongside master ensuite floating vanities. Engineered using absolute waterproof high-pressure laminates to sustain direct water droplets and intense daily handling safely.
              </p>
              <div className="premium-reveal-text opacity-0 translate-y-8 flex items-center gap-2 text-xs font-mono text-brand-gold pt-2">
                <FiBox /> Structural Grid: Pure PU Paint Finishes + Anti-Slam Soft-close Sliders
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 8: Structural Woodwork */}
        <section id="structural" className="w-full min-h-screen flex items-center bg-secondary-theme px-6 md:px-24 py-32 border-b border-white/5">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center w-full max-w-7xl mx-auto">
            <div className="lg:col-span-5 z-10 space-y-4">
              <span className="premium-reveal-text opacity-0 translate-y-8 text-brand-gold text-xs font-mono uppercase tracking-widest block">[08 / Heavy Woodwork]</span>
              <h2 className="premium-reveal-text opacity-0 translate-y-8 text-4xl md:text-6xl uppercase tracking-tighter font-display text-theme-heading">Heavy Wood Joinery</h2>
              <p className="premium-reveal-text opacity-0 translate-y-8 text-muted-theme text-sm leading-relaxed font-sans">
                Our classic carpentry workshop focuses heavily on solid double-door main entry ways, precise CNC router geometric ceiling panel overlays, structural wooden separation dividers, and loose customized statement furniture.
              </p>
              <div className="premium-reveal-text opacity-0 translate-y-8 flex items-center gap-2 text-xs font-mono text-brand-gold pt-2">
                <FiCheckCircle /> Structural Grid: Solid Wood Bases + Specialized Protective Matte Lacquer
              </div>
            </div>
            <div className="lg:col-span-7 h-[45vh] lg:h-[65vh] overflow-hidden shadow-2xl border border-white/5">
              <img src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=90" alt="Solid Hardwood Door Interior Joinery" className="premium-slide-img opacity-0 translate-x-12 scale-105 w-full h-full object-cover" />
            </div>
          </div>
        </section>

        {/* SECTION 9: Commercial Space Blueprints */}
        <section id="commercial" className="w-full min-h-screen flex items-center px-6 md:px-24 py-32 border-b border-white/5">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center w-full max-w-7xl mx-auto">
            <div className="lg:col-span-7 h-[45vh] lg:h-[65vh] overflow-hidden order-2 lg:order-1 shadow-2xl border border-white/5">
              <img src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=90" alt="Executive Corporate Boardroom Furniture Design" className="premium-slide-img opacity-0 translate-x-12 scale-105 w-full h-full object-cover" />
            </div>
            <div className="lg:col-span-5 z-10 order-1 lg:order-2 space-y-4">
              <span className="premium-reveal-text opacity-0 translate-y-8 text-brand-gold text-xs font-mono uppercase tracking-widest block">[09 / High-Traffic Spatial]</span>
              <h2 className="premium-reveal-text opacity-0 translate-y-8 text-4xl md:text-6xl uppercase tracking-tighter font-display text-theme-heading">Corporate Chambers</h2>
              <p className="premium-reveal-text opacity-0 translate-y-8 text-muted-theme text-sm leading-relaxed font-sans">
                Expanding high-end execution directly into elite retail outlets, premium executive director spaces, and high-end acoustic boardrooms. Maximizing floor planning acoustics alongside highly structural integrated technology hubs.
              </p>
              <div className="premium-reveal-text opacity-0 translate-y-8 flex items-center gap-2 text-xs font-mono text-brand-gold pt-2">
                <FiBriefcase /> System Profile: High Wear-Resistance Commercial Tops + Hidden Wireways
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 10: Real Factory Live Transparency */}
        <section id="workshop" className="w-full min-h-screen flex items-center bg-secondary-theme px-6 md:px-24 py-32 border-b border-white/5">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center w-full max-w-7xl mx-auto">
            <div className="lg:col-span-5 z-10 space-y-4">
              <span className="premium-reveal-text opacity-0 translate-y-8 text-brand-gold text-xs font-mono uppercase tracking-widest block">[10 / Production Facility]</span>
              <h2 className="premium-reveal-text opacity-0 translate-y-8 text-4xl md:text-6xl uppercase tracking-tighter font-display text-theme-heading">The Live Workshop</h2>
              <p className="premium-reveal-text opacity-0 translate-y-8 text-muted-theme text-sm leading-relaxed font-sans">
                We believe true premium results come from ultimate structural transparency. Every blueprint layout runs directly into our centralized factory floor where master craftsmen utilize linear multi-stage edge-band machines and computerized multi-axis panel routing infrastructure.
              </p>
              <div className="premium-reveal-text opacity-0 translate-y-8 flex items-center gap-2 text-xs font-mono text-brand-gold pt-2">
                <FiEye /> Live Audit: Heavy Calibrated Panel Saws & Precision Router Lines
              </div>
            </div>
            <div className="lg:col-span-7 h-[45vh] lg:h-[65vh] overflow-hidden shadow-2xl border border-white/5">
              <img src={workshop} />
            </div>
          </div>
        </section>

        {/* SECTION 11: Turnkey Process */}
        <section id="turnkey" className="w-full min-h-screen flex items-center px-6 md:px-24 py-32 border-b border-white/5">
          <div className="max-w-5xl mx-auto w-full space-y-12">
            <div className="text-center space-y-2">
              <span className="premium-reveal-text opacity-0 translate-y-8 text-brand-gold text-xs uppercase tracking-widest font-mono font-bold block">// Absolute Delivery Mechanics</span>
              <h2 className="premium-reveal-text opacity-0 translate-y-8 text-4xl md:text-6xl font-display uppercase tracking-tighter text-theme-heading">The Turnkey Lifecycle</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {[
                { step: "01", name: "3D Spatial Layouts", text: "High-fidelity photorealistic design rendering stages mapping accurate architectural site boundaries down to single millimeter margins." },
                { step: "02", name: "Material Sourcing", text: "Direct corporate scale procurement of choice dense timber logs, premium chemical treatments, and genuine soft-close hardware components." },
                { step: "03", name: "Flawless Handover", text: "Computerized industrial edge-banding machinery execution, precise leveling setups, and a thorough post-install detailing wash." }
              ].map((phase, idx) => (
                <div key={idx} className="premium-reveal-text opacity-0 translate-y-8 p-8 bg-secondary-theme border border-brand-gold/10 rounded-none relative hover:border-brand-gold/30 transition-colors duration-300">
                  <div className="text-3xl font-display text-brand-gold font-bold mb-4">{phase.step}</div>
                  <h3 className="text-xl font-bold tracking-tight mb-2 uppercase text-theme-heading">{phase.name}</h3>
                  <p className="text-muted-theme text-xs leading-relaxed font-sans">{phase.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 12: Material Ethics */}
        <section id="materials" className="w-full min-h-screen flex items-center bg-secondary-theme px-6 md:px-24 py-32 border-b border-white/5">
          <div className="max-w-4xl mx-auto text-center w-full space-y-12">
            <div className="space-y-4">
              <span className="premium-reveal-text opacity-0 translate-y-8 text-brand-gold text-xs uppercase tracking-widest font-mono font-bold block">// Production Standards</span>
              <h2 className="premium-reveal-text opacity-0 translate-y-8 text-4xl md:text-7xl font-display uppercase tracking-tighter text-theme-heading">Material Integrity</h2>
              <p className="premium-reveal-text opacity-0 translate-y-8 text-muted-theme text-sm md:text-base leading-relaxed max-w-2xl mx-auto font-sans">
                We completely eliminate fragile composite pulp alternatives. Thilak Furnitures builds exclusively using chemically treated structural framing layers, anti-corrosive structural fasteners, and pristine wear surfaces.
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-left">
              <div className="premium-reveal-text opacity-0 translate-y-8 p-5 bg-black/20 border border-brand-gold/10 flex flex-col gap-3">
                <FiShield className="text-brand-gold" size={20} />
                <div>
                  <span className="font-bold text-lg block text-theme-heading">100%</span>
                  <span className="text-[10px] text-muted-theme uppercase font-mono tracking-wider">Termite proofed</span>
                </div>
              </div>
              <div className="premium-reveal-text opacity-0 translate-y-8 p-5 bg-black/20 border border-brand-gold/10 flex flex-col gap-3">
                <FiSliders className="text-brand-gold" size={20} />
                <div>
                  <span className="font-bold text-lg block text-theme-heading">Premium</span>
                  <span className="text-[10px] text-muted-theme uppercase font-mono tracking-wider">Soft rails</span>
                </div>
              </div>
              <div className="premium-reveal-text opacity-0 translate-y-8 p-5 bg-black/20 border border-brand-gold/10 flex flex-col gap-3">
                <FiLayers className="text-brand-gold" size={20} />
                <div>
                  <span className="font-bold text-lg block text-theme-heading">Flawless</span>
                  <span className="text-[10px] text-muted-theme uppercase font-mono tracking-wider">Edge-banded</span>
                </div>
              </div>
              <div className="premium-reveal-text opacity-0 translate-y-8 p-5 bg-black/20 border border-brand-gold/10 flex flex-col gap-3">
                <FiCheckCircle className="text-brand-gold" size={20} />
                <div>
                  <span className="font-bold text-lg block text-theme-heading">Curated</span>
                  <span className="text-[10px] text-muted-theme uppercase font-mono tracking-wider">Teak Selects</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 13: Inquire Contact */}
        <section id="contact" className="w-full min-h-screen flex items-center px-6 md:px-24 py-32">
          <div className="max-w-3xl mx-auto w-full text-center space-y-8">
            <h2 className="premium-reveal-text opacity-0 translate-y-8 text-5xl md:text-8xl font-display uppercase tracking-tighter text-white">Start Your Blueprint</h2>
            <p className="premium-reveal-text opacity-0 translate-y-8 text-gray-400 text-sm max-w-md mx-auto leading-relaxed font-sans">
              Ready to execute tailored modular layouts, premium closets, or heavy structural wood fittings? Let us map custom industrial estimates for your blueprints.
            </p>
            <a href="mailto:info@thilakfurnitures.com" className="premium-reveal-text opacity-0 translate-y-8 inline-flex items-center gap-3 bg-brand-gold text-black px-8 py-5 text-xs font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-all cursor-pointer rounded-none border border-brand-gold">
              Initiate Consultation <FiArrowRight size={14} />
            </a>
            <div className="mt-20 pt-8 border-t border-brand-gold/10 flex justify-between items-center text-[10px] text-gray-500 font-mono tracking-widest uppercase">
              <span>Thilak Furnitures &copy; 2026</span>
              <span>Premium Production Standard</span>
            </div>
          </div>
        </section>

      </main>
    </div>
  );
}