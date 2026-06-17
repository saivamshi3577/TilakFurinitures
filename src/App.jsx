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
  FiBriefcase, FiEye, FiBox, FiGithub, FiInstagram, FiLinkedin,
  FiMail, FiPhone, FiMapPin
} from 'react-icons/fi';

export default function App() {
  const containerRef = useRef();
  const [activeSection, setActiveSection] = useState(0);
  const [isDarkMode, setIsDarkMode] = useState(true);

  // 16 Elite High-Conversion Carpentry & Interior Sections
  const sections = [
    { id: 'home', name: 'Intro' },
    { id: 'heritage', name: 'Our Heritage' },
    { id: 'philosophy', name: 'Design Ethos' },
    { id: 'kitchens', name: 'Kitchen Systems' },
    { id: 'dining', name: 'Dining Suites' },
    { id: 'living', name: 'Living Lounges' },
    { id: 'wardrobes', name: 'Luxury Storage' },
    { id: 'bedrooms', name: 'Master Sanctuary' },
    { id: 'kids-vanity', name: 'Vanities & Kids' },
    { id: 'structural', name: 'Heavy Woodwork' },
    { id: 'commercial', name: 'Corporate Spatial' },
    { id: 'workshop', name: 'Live Facility' },
    { id: 'turnkey', name: 'Our Process' },
    { id: 'materials', name: 'Material Ethics' },
    { id: 'contact-info', name: 'Contact Info' },
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
    tl.to(".preloader-logo", { scale: 1.05, duration: 0.8, ease: "power2.out" })
      .to(".preloader", { yPercent: -100, duration: 0.9, ease: "power4.inOut", delay: 0.1 })
      
      // Left Column Animations
      .from(".hero-logo-box", { 
        scale: 0.6, 
        y: 40, 
        rotationX: 45,
        opacity: 0, 
        duration: 1.2, 
        ease: "back.out(1.7)" 
      }, "-=0.3")
      .from(".hero-main-title", { 
        x: -50, 
        skewX: -10, 
        opacity: 0, 
        duration: 1.0, 
        ease: "power4.out" 
      }, "-=0.9")
      .from(".hero-location-badge", { 
        y: 20, 
        opacity: 0, 
        duration: 0.8, 
        ease: "power3.out" 
      }, "-=0.8")
      .from(".hero-details-item", { 
        y: 15, 
        opacity: 0, 
        stagger: 0.12, 
        duration: 0.8, 
        ease: "power2.out" 
      }, "-=0.7")
      .from(".hero-social-icon", { 
        scale: 0, 
        rotation: -45, 
        opacity: 0, 
        stagger: 0.1, 
        duration: 0.8, 
        ease: "back.out(2)" 
      }, "-=0.6")
      
      // Right Column Animations
      .from(".hero-right-subtitle", { 
        y: -15, 
        opacity: 0, 
        duration: 0.6, 
        ease: "power2.out" 
      }, "-=1.1")
      .from(".hero-quote-text", { 
        x: 60, 
        skewY: 2, 
        opacity: 0, 
        duration: 1.2, 
        ease: "power4.out" 
      }, "-=1.0")
      .from(".hero-subquote-text", { 
        y: 30, 
        opacity: 0, 
        duration: 0.9, 
        ease: "power3.out" 
      }, "-=0.8")
      .from(".hero-cta-btn", { 
        y: 20, 
        opacity: 0, 
        stagger: 0.15, 
        duration: 0.8, 
        ease: "power3.out" 
      }, "-=0.6");
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="relative w-full min-h-screen antialiased bg-[#0D0D0D] text-white transition-colors duration-500 selection:bg-brand-gold selection:text-black">
      
      {/* Preloader */}
      <div className="preloader fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#0D0D0D]">
        <img src={logo} alt="Thilak Furnitures" className="preloader-logo w-80 md:w-[420px] h-auto object-contain mb-8" />
        
        {/* Luxury Premium Loader */}
        <div className="premium-loader-container">
          <div className="premium-spinner">
            <div className="premium-spinner-circle"></div>
            <div className="premium-spinner-inner"></div>
          </div>
          <span className="premium-loader-text">
            Crafting Luxury
          </span>
        </div>
      </div>

      {/* Dynamically Calibrated Nav Loop */}
      <nav className="fixed right-4 md:right-8 top-1/2 -translate-y-1/2 z-40 flex flex-col gap-2.5 items-center bg-secondary-theme/40 p-3 rounded-full backdrop-blur-md border border-brand-gold/10">
        <span className="text-[9px] font-bold uppercase tracking-[0.25em] text-brand-gold/60 [writing-mode:vertical-lr] mb-2 font-sans">Index</span>
        {sections.map((section, idx) => (
          <button
            key={section.id}
            onClick={() => scrollToSection(idx)}
            className="group relative flex items-center justify-end p-1 cursor-pointer"
          >
            <span className={`absolute right-8 text-[10px] font-sans tracking-widest uppercase whitespace-nowrap transition-all duration-300 transform translate-x-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 ${activeSection === idx ? 'text-brand-gold font-bold opacity-100 translate-x-0' : 'text-theme-heading'}`}>
              {section.name}
            </span>
            <div className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${activeSection === idx ? 'bg-brand-gold scale-150 ring-4 ring-brand-gold/20' : 'bg-brand-gold/30 group-hover:bg-brand-gold/60'}`} />
          </button>
        ))}
      </nav>

      {/* Main Structural Scrolling Track */}
      <main className="portfolio-container w-full">

        {/* SECTION 1: Intro */}
        <section id="home" className="w-full min-h-screen flex items-center px-6 md:px-24 relative py-20 lg:py-32">
          <div className="absolute inset-0 z-0 overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=2000&q=90" 
              alt="Premium Production Atelier background" 
              className="w-full h-full object-cover filter brightness-35 contrast-115 select-none scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0D0D0D] via-[#0D0D0D]/60 to-transparent dark-overlay" />
          </div>
          <HeroBackground />
          
          <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center z-10 relative">
            {/* Left Column: Big Logo and Details */}
            <div className="lg:col-span-6 flex flex-col items-center lg:items-start text-center lg:text-left space-y-6">
              
              <div className="flex items-center gap-2 px-3 py-1 bg-brand-gold/10 border border-brand-gold/30 rounded-full w-fit">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-gold animate-ping" />
                <span className="text-[10px] tracking-[0.25em] font-mono text-brand-gold uppercase font-semibold">PREMIUM PRODUCTION MODULE</span>
              </div>

              <div className="hero-logo-box relative p-6 bg-black/40 backdrop-blur-lg border border-brand-gold/10 rounded-lg inline-block shadow-[0_0_50px_rgba(179,146,75,0.15)] group overflow-hidden">
                {/* Tech brackets corners */}
                <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-brand-gold" />
                <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-brand-gold" />
                <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-brand-gold" />
                <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-brand-gold" />
                
                <img 
                  src={logo} 
                  alt="Thilak Furnitures" 
                  className="w-48 sm:w-64 md:w-80 h-auto object-contain filter drop-shadow-[0_0_30px_rgba(179,146,75,0.35)] transition-transform duration-700 group-hover:scale-105" 
                />
              </div>
              <div className="space-y-2">
                <h1 className="hero-main-title text-4xl sm:text-5xl md:text-6xl tracking-tight leading-none font-display uppercase text-white">
                  Thilak Furnitures
                </h1>
                <p className="hero-location-badge text-brand-gold uppercase tracking-[0.25em] text-xs font-bold font-mono flex items-center gap-2 justify-center lg:justify-start">
                  <FiMapPin className="animate-pulse" /> Based in Hyderabad
                </p>
              </div>
              
              {/* Details of the company / contact info */}
              <div className="space-y-3 pl-4 border-l border-brand-gold/20 text-gray-300 text-xs sm:text-sm font-mono tracking-wide">
                <a href="mailto:Thilaksrivarsha@gmail.com" className="hero-details-item flex items-center gap-3 hover:text-brand-gold transition-colors duration-300">
                  <span className="text-brand-gold/50 text-[10px]">01 //</span>
                  <FiMail className="text-brand-gold" /> Thilaksrivarsha@gmail.com
                </a>
                <a href="tel:7993983299" className="hero-details-item flex items-center gap-3 hover:text-brand-gold transition-colors duration-300">
                  <span className="text-brand-gold/50 text-[10px]">02 //</span>
                  <FiPhone className="text-brand-gold" /> +91 79939 83299
                </a>
                <div className="hero-details-item flex items-center gap-3">
                  <span className="text-brand-gold/50 text-[10px]">03 //</span>
                  <FiCompass className="text-brand-gold" /> Plot no 537, IDA Cherlapally
                </div>
              </div>

              {/* Social Icons & GitHub */}
              <div className="flex items-center gap-4 pt-2">
                <a 
                  href="https://github.com/thilak-furnitures" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  title="GitHub Repository"
                  className="hero-social-icon w-11 h-11 border border-brand-gold/20 hover:border-brand-gold hover:text-black hover:bg-brand-gold bg-black/40 text-brand-gold flex items-center justify-center transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_15px_rgba(179,146,75,0.4)]"
                >
                  <FiGithub size={18} />
                </a>
                <a 
                  href="https://linkedin.com" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  title="LinkedIn"
                  className="hero-social-icon w-11 h-11 border border-brand-gold/20 hover:border-brand-gold hover:text-black hover:bg-brand-gold bg-black/40 text-brand-gold flex items-center justify-center transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_15px_rgba(179,146,75,0.4)]"
                >
                  <FiLinkedin size={18} />
                </a>
                <a 
                  href="https://instagram.com" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  title="Instagram"
                  className="hero-social-icon w-11 h-11 border border-brand-gold/20 hover:border-brand-gold hover:text-black hover:bg-brand-gold bg-black/40 text-brand-gold flex items-center justify-center transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_15px_rgba(179,146,75,0.4)]"
                >
                  <FiInstagram size={18} />
                </a>
              </div>
            </div>

            {/* Right Column: Quote and Sub-quote */}
            <div className="lg:col-span-6 flex flex-col items-center lg:items-start text-center lg:text-left space-y-6 lg:pl-12 border-t lg:border-t-0 lg:border-l border-brand-gold/20 pt-8 lg:pt-0">
              <div className="relative p-8 bg-black/30 backdrop-blur-md border border-brand-gold/10 rounded-lg shadow-[0_0_50px_rgba(0,0,0,0.5)] overflow-hidden w-full">
                {/* Absolute Tech Details */}
                <span className="absolute top-2 right-4 text-[9px] font-mono text-brand-gold/30">REF. ID // ATF-78</span>
                <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-brand-gold/40" />
                <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-brand-gold/40" />
                
                <div className="space-y-4">
                  <span className="hero-right-subtitle block text-brand-gold uppercase tracking-[0.2em] text-xs font-bold font-mono">
                    Architectural Interior Atelier
                  </span>
                  
                  {/* Quote */}
                  <h2 className="hero-quote-text text-3xl sm:text-4xl md:text-5xl font-display italic tracking-tight text-white leading-tight">
                    &ldquo;Crafting Spaces, Engineering Legacies.&rdquo;
                  </h2>
                  
                  {/* Sub Quote */}
                  <p className="hero-subquote-text text-gray-300 text-sm md:text-base leading-relaxed font-sans font-light">
                    Tailoring premium custom furniture and modular spatial ecosystems using calibrated moisture-resistant timber designed to endure beautifully across generations.
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap gap-4 justify-center lg:justify-start pt-2 w-full">
                <button 
                  onClick={() => scrollToSection(1)} 
                  className="hero-cta-btn flex items-center gap-3 px-6 py-4 bg-brand-gold text-black font-bold tracking-widest uppercase text-xs hover:bg-white hover:text-black transition-all cursor-pointer rounded-none border border-brand-gold hover:shadow-[0_0_20px_rgba(179,146,75,0.4)]"
                >
                  Discover Our Story <FiArrowRight size={14} />
                </button>
                
                <button 
                  onClick={toggleTheme} 
                  className="hero-cta-btn flex items-center gap-2 border border-brand-gold/20 text-brand-gold px-6 py-4 text-xs font-bold tracking-widest uppercase hover:border-brand-gold hover:bg-brand-gold hover:text-black transition-all cursor-pointer rounded-none hover:shadow-[0_0_20px_rgba(179,146,75,0.2)]"
                >
                  {isDarkMode ? <FiSun size={14} /> : <FiMoon size={14} />} {isDarkMode ? 'Light Mode' : 'Dark Mode'}
                </button>
              </div>
            </div>
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

        {/* SECTION 5: Dining Suites */}
        <section id="dining" className="w-full min-h-screen flex items-center px-6 md:px-24 py-32 border-b border-white/5">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center w-full max-w-7xl mx-auto">
            <div className="lg:col-span-7 h-[45vh] lg:h-[65vh] overflow-hidden order-2 lg:order-1 shadow-2xl border border-white/5">
              <img src="https://images.unsplash.com/photo-1604014237800-1c9102c219da?auto=format&fit=crop&w=1200&q=90" alt="Bespoke Dining Suite Design" className="premium-slide-img opacity-0 translate-x-12 scale-105 w-full h-full object-cover" />
            </div>
            <div className="lg:col-span-5 z-10 order-1 lg:order-2 space-y-4">
              <span className="premium-reveal-text opacity-0 translate-y-8 text-brand-gold text-xs font-mono uppercase tracking-widest block">[05 / Social Dining]</span>
              <h2 className="premium-reveal-text opacity-0 translate-y-8 text-4xl md:text-6xl uppercase tracking-tighter font-display text-theme-heading">Bespoke Dining Suites</h2>
              <p className="premium-reveal-text opacity-0 translate-y-8 text-muted-theme text-sm leading-relaxed font-sans">
                We handcraft custom solid hardwood dining tables, refined display credenzas, and integrated luxury home bar units. Every piece is curated to coordinate with your interior architectural styling, bringing families together in spaces that inspire conversation.
              </p>
              <div className="premium-reveal-text opacity-0 translate-y-8 flex items-center gap-2 text-xs font-mono text-brand-gold pt-2">
                <FiCheckCircle /> Structural Grid: Calibrated Hardwood + Soft Velvet Custom Upholstery
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 6: Living Lounges */}
        <section id="living" className="w-full min-h-screen flex items-center bg-secondary-theme px-6 md:px-24 py-32 border-b border-white/5">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center w-full max-w-7xl mx-auto">
            <div className="lg:col-span-5 z-10 space-y-4">
              <span className="premium-reveal-text opacity-0 translate-y-8 text-brand-gold text-xs font-mono uppercase tracking-widest block">[06 / Entertainment Hubs]</span>
              <h2 className="premium-reveal-text opacity-0 translate-y-8 text-4xl md:text-6xl uppercase tracking-tighter font-display text-theme-heading">Bespoke Living Lounges</h2>
              <p className="premium-reveal-text opacity-0 translate-y-8 text-muted-theme text-sm leading-relaxed font-sans">
                We craft central architectural entertainment fixtures detailed with custom warm LED routing matrices, hidden internal cable-management pathways, and premium micro-fluted structural panel accent backdrops.
              </p>
              <div className="premium-reveal-text opacity-0 translate-y-8 flex items-center gap-2 text-xs font-mono text-brand-gold pt-2">
                <FiSliders /> Structural Grid: Teak Wood Outlines + Custom Finished Accents
              </div>
            </div>
            <div className="lg:col-span-7 h-[45vh] lg:h-[65vh] overflow-hidden shadow-2xl border border-white/5">
              <img src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=90" alt="High End TV Console Unit Living Room" className="premium-slide-img opacity-0 translate-x-12 scale-105 w-full h-full object-cover" />
            </div>
          </div>
        </section>

        {/* SECTION 7: Wardrobes */}
        <section id="wardrobes" className="w-full min-h-screen flex items-center px-6 md:px-24 py-32 border-b border-white/5">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center w-full max-w-7xl mx-auto">
            <div className="lg:col-span-7 h-[45vh] lg:h-[65vh] overflow-hidden order-2 lg:order-1 shadow-2xl border border-white/5">
              <img src={closet} className="premium-slide-img opacity-0 translate-x-12 scale-105 w-full h-full object-cover" />
            </div>
            <div className="lg:col-span-5 z-10 order-1 lg:order-2 space-y-4">
              <span className="premium-reveal-text opacity-0 translate-y-8 text-brand-gold text-xs font-mono uppercase tracking-widest block mb-3">[07 / Premium Storage]</span>
              <h2 className="premium-reveal-text opacity-0 translate-y-8 text-4xl md:text-6xl uppercase tracking-tighter font-display text-theme-heading">Walk-In Closets</h2>
              <p className="premium-reveal-text opacity-0 translate-y-8 text-muted-theme text-sm leading-relaxed font-sans">
                Floor-to-ceiling sleek closet storage installations detailed with premium aluminum profile safety-glass frames, automatic proximity sensory light track rails, and soft velvet item organizers.
              </p>
              <div className="premium-reveal-text opacity-0 translate-y-8 flex items-center gap-2 text-xs font-mono text-brand-gold pt-2">
                <FiCpu /> Structural Grid: Smoked Anodized Metal Profiles + Proximity Sensors
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 8: Sanctuary Bedrooms */}
        <section id="bedrooms" className="w-full min-h-screen flex items-center bg-secondary-theme px-6 md:px-24 py-32 border-b border-white/5">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center w-full max-w-7xl mx-auto">
            <div className="lg:col-span-5 z-10 space-y-4">
              <span className="premium-reveal-text opacity-0 translate-y-8 text-brand-gold text-xs font-mono uppercase tracking-widest block">[08 / Private Sanctuaries]</span>
              <h2 className="premium-reveal-text opacity-0 translate-y-8 text-4xl md:text-6xl uppercase tracking-tighter font-display text-theme-heading">Master Bedroom Sanctuary</h2>
              <p className="premium-reveal-text opacity-0 translate-y-8 text-muted-theme text-sm leading-relaxed font-sans">
                We shape restful private spaces using custom upholstered headboard systems, floating bedside cabinets, integrated vanity corners, and concealed ambient bed illumination. Tailored using soft-touch materials and premium veneered panels for absolute comfort.
              </p>
              <div className="premium-reveal-text opacity-0 translate-y-8 flex items-center gap-2 text-xs font-mono text-brand-gold pt-2">
                <FiCompass /> Structural Grid: Veneered MDF Blocks + Sound-Dampening Padded Headboards
              </div>
            </div>
            <div className="lg:col-span-7 h-[45vh] lg:h-[65vh] overflow-hidden shadow-2xl border border-white/5">
              <img src="https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=1200&q=90" alt="Master Bedroom Sanctuary Furniture Design" className="premium-slide-img opacity-0 translate-x-12 scale-105 w-full h-full object-cover" />
            </div>
          </div>
        </section>

        {/* SECTION 9: Kids Bedrooms & Premium Luxury Vanities */}
        <section id="kids-vanity" className="w-full min-h-screen flex items-center px-6 md:px-24 py-32 border-b border-white/5">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center w-full max-w-7xl mx-auto">
            <div className="lg:col-span-7 h-[45vh] lg:h-[65vh] overflow-hidden order-2 lg:order-1 shadow-2xl border border-white/5">
              <img src="https://images.unsplash.com/photo-1616486029423-aaa4789e8c9a?auto=format&fit=crop&w=1200&q=90" alt="Luxury Bathroom Vanity Furniture Design" className="premium-slide-img opacity-0 translate-x-12 scale-105 w-full h-full object-cover" />
            </div>
            <div className="lg:col-span-5 z-10 order-1 lg:order-2 space-y-4">
              <span className="premium-reveal-text opacity-0 translate-y-8 text-brand-gold text-xs font-mono uppercase tracking-widest block">[09 / Private Ensuites]</span>
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

        {/* SECTION 10: Structural Woodwork */}
        <section id="structural" className="w-full min-h-screen flex items-center bg-secondary-theme px-6 md:px-24 py-32 border-b border-white/5">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center w-full max-w-7xl mx-auto">
            <div className="lg:col-span-5 z-10 space-y-4">
              <span className="premium-reveal-text opacity-0 translate-y-8 text-brand-gold text-xs font-mono uppercase tracking-widest block">[10 / Heavy Woodwork]</span>
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

        {/* SECTION 11: Commercial Space Blueprints */}
        <section id="commercial" className="w-full min-h-screen flex items-center px-6 md:px-24 py-32 border-b border-white/5">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center w-full max-w-7xl mx-auto">
            <div className="lg:col-span-7 h-[45vh] lg:h-[65vh] overflow-hidden order-2 lg:order-1 shadow-2xl border border-white/5">
              <img src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=90" alt="Executive Corporate Boardroom Furniture Design" className="premium-slide-img opacity-0 translate-x-12 scale-105 w-full h-full object-cover" />
            </div>
            <div className="lg:col-span-5 z-10 order-1 lg:order-2 space-y-4">
              <span className="premium-reveal-text opacity-0 translate-y-8 text-brand-gold text-xs font-mono uppercase tracking-widest block">[11 / High-Traffic Spatial]</span>
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

        {/* SECTION 12: Real Factory Live Transparency */}
        <section id="workshop" className="w-full min-h-screen flex items-center bg-secondary-theme px-6 md:px-24 py-32 border-b border-white/5">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center w-full max-w-7xl mx-auto">
            <div className="lg:col-span-5 z-10 space-y-4">
              <span className="premium-reveal-text opacity-0 translate-y-8 text-brand-gold text-xs font-mono uppercase tracking-widest block">[12 / Production Facility]</span>
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
              <span className="premium-reveal-text opacity-0 translate-y-8 text-brand-gold text-xs uppercase tracking-widest font-mono font-bold block"> Absolute Delivery Mechanics</span>
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
              <span className="premium-reveal-text opacity-0 translate-y-8 text-brand-gold text-xs uppercase tracking-widest font-mono font-bold block"> Production Standards</span>
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

        {/* SECTION 15: Contact Details */}
        <section id="contact-info" className="w-full min-h-screen flex items-center px-6 md:px-24 py-32 border-b border-white/5">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center w-full max-w-7xl mx-auto">
            <div className="lg:col-span-6 space-y-8">
              <div className="space-y-3">
                <span className="premium-reveal-text opacity-0 translate-y-8 text-brand-gold text-xs font-mono uppercase tracking-widest block">[15 / Location & Reach]</span>
                <h2 className="premium-reveal-text opacity-0 translate-y-8 text-4xl md:text-6xl uppercase tracking-tighter font-display text-theme-heading">Connect With Us</h2>
                <p className="premium-reveal-text opacity-0 translate-y-8 text-muted-theme text-sm leading-relaxed font-sans max-w-md">
                  Have a plan or blueprint ready? Reach out to us directly or visit our premium production facility to witness our materials and construction processes firsthand.
                </p>
              </div>
              
              <div className="premium-reveal-text opacity-0 translate-y-8 space-y-4 pt-4">
                {/* Mail Card */}
                <a href="mailto:Thilaksrivarsha@gmail.com" className="flex items-start gap-4 p-5 border border-brand-gold/10 hover:border-brand-gold/40 bg-black/5 dark:bg-black/20 transition-colors duration-300 group">
                  <div className="w-10 h-10 rounded-none bg-brand-gold/10 flex items-center justify-center text-brand-gold group-hover:bg-brand-gold group-hover:text-black transition-all duration-300">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-mono tracking-wider text-muted-theme block">Email Address</span>
                    <span className="text-base font-bold font-sans text-theme-heading hover:text-brand-gold transition-colors">Thilaksrivarsha@gmail.com</span>
                  </div>
                </a>

                {/* Phone Card */}
                <a href="tel:7993983299" className="flex items-start gap-4 p-5 border border-brand-gold/10 hover:border-brand-gold/40 bg-black/5 dark:bg-black/20 transition-colors duration-300 group">
                  <div className="w-10 h-10 rounded-none bg-brand-gold/10 flex items-center justify-center text-brand-gold group-hover:bg-brand-gold group-hover:text-black transition-all duration-300">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-mono tracking-wider text-muted-theme block">Call Directly</span>
                    <span className="text-base font-bold font-sans text-theme-heading hover:text-brand-gold transition-colors">+91 79939 83299</span>
                  </div>
                </a>

                {/* Address Card */}
                <div className="flex items-start gap-4 p-5 border border-brand-gold/10 bg-black/5 dark:bg-black/20 transition-colors duration-300">
                  <div className="w-10 h-10 rounded-none bg-brand-gold/10 flex items-center justify-center text-brand-gold">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-mono tracking-wider text-muted-theme block">Manufacturing Unit & Address</span>
                    <span className="text-sm font-semibold font-sans text-theme-heading leading-relaxed block">
                      Plot no 537, B N Reddy Nagar, Phase 2, IDA Cherlapally
                    </span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="lg:col-span-6 relative h-[45vh] lg:h-[65vh] w-full overflow-hidden shadow-2xl border border-white/5">
              <img 
                src="https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1200&q=90" 
                alt="Premium Furniture Showroom Design Studio" 
                className="w-full h-full object-cover premium-slide-img opacity-0 translate-x-12 scale-105" 
              />
              <div className="absolute bottom-6 left-6 z-10">
                <a 
                  href="https://maps.google.com/?q=Plot+no+537,+B+N+Reddy+Nagar,+Phase+2,+IDA+Cherlapally" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="inline-flex items-center gap-2 bg-black/80 hover:bg-brand-gold hover:text-black text-white px-5 py-3 text-xs font-bold uppercase tracking-wider transition-all duration-300 backdrop-blur-sm border border-white/10 hover:border-brand-gold"
                >
                  Get Directions On Map <FiArrowRight size={12} />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 16: Inquire Contact */}
        <section id="contact" className="w-full min-h-screen flex items-center bg-secondary-theme px-6 md:px-24 py-32">
          <div className="max-w-3xl mx-auto w-full text-center space-y-8">
            <h2 className="premium-reveal-text opacity-0 translate-y-8 text-5xl md:text-8xl font-display uppercase tracking-tighter text-theme-heading">Start Your Blueprint</h2>
            <p className="premium-reveal-text opacity-0 translate-y-8 text-muted-theme text-sm max-w-md mx-auto leading-relaxed font-sans">
              Ready to execute tailored modular layouts, premium closets, or heavy structural wood fittings? Let us map custom industrial estimates for your blueprints.
            </p>
            <a href="mailto:Thilaksrivarsha@gmail.com" className="premium-reveal-text opacity-0 translate-y-8 inline-flex items-center gap-3 bg-brand-gold text-black px-8 py-5 text-xs font-bold uppercase tracking-widest hover:bg-[var(--text-primary)] hover:text-[var(--bg-primary)] transition-all cursor-pointer rounded-none border border-brand-gold">
              Initiate Consultation <FiArrowRight size={14} />
            </a>
            <div className="mt-20 pt-8 border-t border-brand-gold/10 flex justify-between items-center text-[10px] text-muted-theme font-mono tracking-widest uppercase">
              <span>Thilak Furnitures &copy; 2026</span>
              <span>Premium Production Standard</span>
            </div>
          </div>
        </section>

      </main>
    </div>
  );
}