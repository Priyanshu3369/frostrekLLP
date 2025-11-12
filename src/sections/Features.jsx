import { useRef, useEffect, useState, useCallback } from "react";
import { Brain, Bot, Cpu, Database, Cloud, BarChart3 } from "lucide-react";
import DarkVeil from "../components/DarkVeil/DarkVeil";
import FuturisticSection from "../components/FuturisticSection";


const gsap = {
  to: (element, config) => {
    if (!element) return { kill: () => { } };

    const duration = (config.duration || 0.3) * 1000;
    const delay = (config.delay || 0) * 1000;

    setTimeout(() => {
      if (!element.style) return;

      element.style.transition = `all ${duration}ms ${config.ease || 'ease'}`;

      Object.keys(config).forEach(key => {
        if (key === 'x') element.style.transform = `translate(${config.x}px, ${element.style.transform.match(/translateY\(([^)]+)\)/)?.[1] || '0px'})`;
        else if (key === 'y') element.style.transform = `translate(${element.style.transform.match(/translateX\(([^)]+)\)/)?.[1] || '0px'}, ${config.y}px)`;
        else if (key === 'scale') element.style.transform = `scale(${config.scale})`;
        else if (key === 'opacity') element.style.opacity = config.opacity;
        else if (key === 'rotateX') element.style.transform = `rotateX(${config.rotateX}deg)`;
        else if (key === 'rotateY') element.style.transform = `rotateY(${config.rotateY}deg)`;
        else if (key === 'rotation') element.style.transform = `rotate(${config.rotation}deg)`;
      });

      if (config.onComplete) {
        setTimeout(config.onComplete, duration);
      }
    }, delay);

    return { kill: () => { } };
  },
  fromTo: (element, from, to) => {
    if (!element) return { kill: () => { } };

    Object.keys(from).forEach(key => {
      if (key === 'scale') element.style.transform = `scale(${from.scale})`;
      else if (key === 'opacity') element.style.opacity = from.opacity;
    });

    setTimeout(() => gsap.to(element, to), 10);
    return { kill: () => { } };
  }
};

const DEFAULT_PARTICLE_COUNT = 8;
const DEFAULT_SPOTLIGHT_RADIUS = 250;
const DEFAULT_GLOW_COLOR = '0, 255, 255'; // Electric cyan for premium dark theme

const features = [
  {
    title: "Machine Learning",
    desc: "Train and deploy robust ML models to predict, automate, and optimize operations at scale with cutting-edge algorithms.",
    icon: Brain,
    color: '#111827'
  },
  {
    title: "Natural Language Processing",
    desc: "Empower your systems to understand and respond to human language intelligently with advanced NLP capabilities.",
    icon: Bot,
    color: '#111827'
  },
  {
    title: "Computer Vision",
    desc: "Implement AI-driven visual recognition systems for accurate image and video insights across multiple domains.",
    icon: Cpu,
    color: '#111827'
  },
  {
    title: "Data Engineering",
    desc: "Organize, clean, and structure large datasets to drive precise AI-driven outcomes with enterprise-grade tools.",
    icon: Database,
    color: '#111827'
  },
  {
    title: "Cloud Integration",
    desc: "Leverage cloud-based AI infrastructure for seamless scalability and performance across global deployments.",
    icon: Cloud,
    color: '#111827'
  },
  {
    title: "Predictive Analytics",
    desc: "Forecast business outcomes using deep learning and data intelligence models with real-time insights.",
    icon: BarChart3,
    color: '#111827'
  }
];

const createParticleElement = (x, y, color = DEFAULT_GLOW_COLOR) => {
  const el = document.createElement('div');
  el.className = 'particle';
  el.style.cssText = `
    position: absolute;
    width: 3px;
    height: 3px;
    border-radius: 50%;
    background: rgba(${color}, 1);
    box-shadow: 0 0 8px rgba(${color}, 0.8);
    pointer-events: none;
    z-index: 100;
    left: ${x}px;
    top: ${y}px;
  `;
  return el;
};

const ParticleCard = ({ children, className = '', particleCount = DEFAULT_PARTICLE_COUNT, glowColor = DEFAULT_GLOW_COLOR }) => {
  const cardRef = useRef(null);
  const particlesRef = useRef([]);
  const timeoutsRef = useRef([]);
  const isHoveredRef = useRef(false);
  const memoizedParticles = useRef([]);
  const particlesInitialized = useRef(false);

  const initializeParticles = useCallback(() => {
    if (particlesInitialized.current || !cardRef.current) return;

    const { width, height } = cardRef.current.getBoundingClientRect();
    memoizedParticles.current = Array.from({ length: particleCount }, () =>
      createParticleElement(Math.random() * width, Math.random() * height, glowColor)
    );
    particlesInitialized.current = true;
  }, [particleCount, glowColor]);

  const clearAllParticles = useCallback(() => {
    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];

    particlesRef.current.forEach(particle => {
      gsap.to(particle, {
        scale: 0,
        opacity: 0,
        duration: 0.3,
        onComplete: () => {
          particle.parentNode?.removeChild(particle);
        }
      });
    });
    particlesRef.current = [];
  }, []);

  const animateParticles = useCallback(() => {
    if (!cardRef.current || !isHoveredRef.current) return;

    if (!particlesInitialized.current) {
      initializeParticles();
    }

    memoizedParticles.current.forEach((particle, index) => {
      const timeoutId = setTimeout(() => {
        if (!isHoveredRef.current || !cardRef.current) return;

        const clone = particle.cloneNode(true);
        cardRef.current.appendChild(clone);
        particlesRef.current.push(clone);

        gsap.fromTo(clone, { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.3 });

        const animate = () => {
          if (!isHoveredRef.current) return;
          const xMove = (Math.random() - 0.5) * 80;
          const yMove = (Math.random() - 0.5) * 80;
          const rotation = Math.random() * 360;

          gsap.to(clone, {
            x: xMove,
            y: yMove,
            rotation: rotation,
            duration: 2 + Math.random() * 2,
            onComplete: animate
          });
        };
        animate();
      }, index * 80);

      timeoutsRef.current.push(timeoutId);
    });
  }, [initializeParticles]);

  useEffect(() => {
    if (!cardRef.current) return;

    const element = cardRef.current;

    const handleMouseEnter = () => {
      isHoveredRef.current = true;
      animateParticles();
    };

    const handleMouseLeave = () => {
      isHoveredRef.current = false;
      clearAllParticles();
    };

    element.addEventListener('mouseenter', handleMouseEnter);
    element.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      isHoveredRef.current = false;
      element.removeEventListener('mouseenter', handleMouseEnter);
      element.removeEventListener('mouseleave', handleMouseLeave);
      clearAllParticles();
    };
  }, [animateParticles, clearAllParticles]);

  return (
    <div ref={cardRef} className={`${className} relative overflow-visible`}>
      {children}
    </div>
  );
};

const GlobalSpotlight = ({ gridRef, spotlightRadius = DEFAULT_SPOTLIGHT_RADIUS, glowColor = DEFAULT_GLOW_COLOR }) => {
  const spotlightRef = useRef(null);

  useEffect(() => {
    if (!gridRef?.current) return;

    const spotlight = document.createElement('div');
    spotlight.className = 'global-spotlight';
    spotlight.style.cssText = `
      position: fixed;
      width: 600px;
      height: 600px;
      border-radius: 50%;
      pointer-events: none;
      background: radial-gradient(circle,
        rgba(${glowColor}, 0.15) 0%,
        rgba(${glowColor}, 0.08) 20%,
        rgba(${glowColor}, 0.03) 40%,
        transparent 70%
      );
      z-index: 200;
      opacity: 0;
      transform: translate(-50%, -50%);
      mix-blend-mode: screen;
    `;
    document.body.appendChild(spotlight);
    spotlightRef.current = spotlight;

    const handleMouseMove = e => {
      if (!spotlightRef.current || !gridRef.current) return;

      const rect = gridRef.current.getBoundingClientRect();
      const mouseInside = e.clientX >= rect.left && e.clientX <= rect.right &&
        e.clientY >= rect.top && e.clientY <= rect.bottom;

      if (!mouseInside) {
        gsap.to(spotlightRef.current, { opacity: 0, duration: 0.3 });
        return;
      }

      gsap.to(spotlightRef.current, {
        x: e.clientX,
        y: e.clientY,
        opacity: 0.8,
        duration: 0.1
      });
    };

    document.addEventListener('mousemove', handleMouseMove);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      spotlightRef.current?.parentNode?.removeChild(spotlightRef.current);
    };
  }, [gridRef, spotlightRadius, glowColor]);

  return null;
};

const FlipCard = ({ feature, index, isVisible }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <ParticleCard
      className={`flip-card-container ${isVisible ? 'fade-up' : ''}`}
      style={{
        animationDelay: `${index * 0.1}s`,
        perspective: '1000px',
        height: '320px'
      }}
      particleCount={DEFAULT_PARTICLE_COUNT}
      glowColor={DEFAULT_GLOW_COLOR}
    >
      <div
        className={`flip-card ${isFlipped ? 'flipped' : ''}`}
        onMouseEnter={() => setIsFlipped(true)}
        onMouseLeave={() => setIsFlipped(false)}
      >
        {/* Front Side */}
        <div className="flip-card-front feature-card bg-[#0D0D10] p-8 rounded-2xl border border-cyan-500/20 backdrop-blur-sm">
          <div className="border-dots top-left"></div>
          <div className="border-dots top-right"></div>
          <div className="border-dots bottom-left"></div>
          <div className="border-dots bottom-right"></div>
          <div className="flex flex-col items-center justify-center h-full text-center">
            <div className="text-cyan-400 mb-6 icon-container">
              <feature.icon size={64} strokeWidth={1.5} />
            </div>
            <h3 className="text-2xl font-bold text-[#FFFFFF]">
              {feature.title}
            </h3>
          </div>
        </div>

        {/* Back Side */}
        <div className="flip-card-back feature-card bg-gradient-to-br from-[#0D0D10] to-[#0B0B0E] p-8 rounded-2xl border border-cyan-400/50 shadow-lg shadow-cyan-500/20">
          <div className="border-dots top-left"></div>
          <div className="border-dots top-right"></div>
          <div className="border-dots bottom-left"></div>
          <div className="border-dots bottom-right"></div>
          <div className="flex flex-col items-center justify-center h-full text-center">
            <div className="text-cyan-400 mb-4">
              <feature.icon size={40} strokeWidth={1.5} />
            </div>
            <h3 className="text-xl font-semibold mb-4 text-[#FFFFFF]">
              {feature.title}
            </h3>
            <p className="text-[#D1D5DB] text-sm leading-relaxed">
              {feature.desc}
            </p>
          </div>
        </div>
      </div>
    </ParticleCard>
  );
};

const Features = () => {
  const gridRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (gridRef.current) {
      observer.observe(gridRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <style>{`
        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .fade-up {
          opacity: 0;
          animation: fadeUp 0.8s ease-out forwards;
        }

        .flip-card-container {
          width: 100%;
          height: 320px;
        }

        .flip-card {
          position: relative;
          width: 100%;
          height: 100%;
          transition: transform 0.6s;
          transform-style: preserve-3d;
        }

        .flip-card.flipped {
          transform: rotateY(180deg);
        }

        .flip-card-front,
        .flip-card-back {
          position: absolute;
          width: 100%;
          height: 100%;
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
        }

        .flip-card-back {
          transform: rotateY(180deg);
        }

        .feature-card {
          --glow-x: 50%;
          --glow-y: 50%;
          --glow-intensity: 0;
          transition: all 0.3s ease;
        }

        .feature-card::after {
          content: '';
          position: absolute;
          inset: 0;
          padding: 2px;
          background: radial-gradient(300px circle at var(--glow-x) var(--glow-y),
              rgba(0, 255, 255, calc(var(--glow-intensity) * 0.6)) 0%,
              rgba(109, 40, 217, calc(var(--glow-intensity) * 0.3)) 30%,
              transparent 60%);
          border-radius: inherit;
          mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          mask-composite: subtract;
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          pointer-events: none;
          opacity: 0;
          transition: opacity 0.3s ease;
          z-index: 1;
        }

        .flip-card:hover .feature-card::after {
          opacity: 1;
        }

        .flip-card:hover .feature-card {
          border-color: rgba(0, 255, 255, 0.6);
          box-shadow: 0 8px 30px rgba(0, 255, 255, 0.25);
          
        }

        .icon-container {
          transition: transform 0.3s ease;
        }

        .flip-card-front:hover .icon-container {
          transform: scale(1.1) rotate(5deg);
        }

        /* Animated Border */
        @keyframes borderRotate {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }

        .feature-card::before {
          content: '';
          position: absolute;
          inset: -2px;
          border-radius: inherit;
          padding: 2px;
          background: linear-gradient(
            45deg,
            transparent 0%,
            rgba(0, 255, 255, 0.8) 25%,
            rgba(109, 40, 217, 0.8) 50%,
            rgba(20, 184, 166, 0.8) 75%,
            transparent 100%
          );
          background-size: 300% 300%;
          animation: borderGradient 3s ease infinite;
          mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          mask-composite: subtract;
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          pointer-events: none;
          opacity: 0;
          transition: opacity 0.3s ease;
          z-index: 0;
        }

        @keyframes borderGradient {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }

        .flip-card:hover .feature-card::before {
          opacity: 1;
        }

        

        /* Corner dots animation */
        .border-dots {
          position: absolute;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: linear-gradient(135deg, #00FFFF, #6D28D9);
          box-shadow: 0 0 10px rgba(0, 255, 255, 0.8);
          opacity: 0;
          transition: opacity 0.3s ease;
          z-index: 2;
        }

        .border-dots.top-left {
          top: -4px;
          left: -4px;
          animation: pulse 2s ease-in-out infinite;
        }

        .border-dots.top-right {
          top: -4px;
          right: -4px;
          animation: pulse 2s ease-in-out 0.5s infinite;
        }

        .border-dots.bottom-left {
          bottom: -4px;
          left: -4px;
          animation: pulse 2s ease-in-out 1s infinite;
        }

        .border-dots.bottom-right {
          bottom: -4px;
          right: -4px;
          animation: pulse 2s ease-in-out 1.5s infinite;
        }

        @keyframes pulse {
          0%, 100% {
            transform: scale(1);
            opacity: 0.8;
          }
          50% {
            transform: scale(1.5);
            opacity: 1;
          }
        }

        .flip-card:hover .border-dots {
          opacity: 1;
        }
      `}</style>

      <GlobalSpotlight gridRef={gridRef} glowColor={DEFAULT_GLOW_COLOR} />

      <FuturisticSection
        id="features"
        innerRef={gridRef}
        className="py-28"
        containerClassName="relative flex min-h-[calc(100vh-120px)] w-full flex-col items-center gap-16 px-6 md:px-16"
      >
        <div className="pointer-events-none absolute inset-x-0 top-1/2 -z-10 -translate-y-1/2">
          <DarkVeil />
        </div>

        <div className="relative z-10 flex w-full flex-col items-center">
          <div className={`mb-16 text-center ${isVisible ? "fade-up" : ""}`}>
            <h2 className="mb-4 bg-gradient-to-r from-[#00FFFF] via-[#6D28D9] to-[#14B8A6] bg-clip-text text-4xl font-extrabold text-transparent drop-shadow-[0_0_30px_rgba(0,255,255,0.3)] md:text-5xl">
              Frostrek AI Features
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-[#D1D5DB]">
              Cutting-edge AI capabilities to transform your business
            </p>
          </div>

          <div className="grid w-full max-w-6xl gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => (
              <FlipCard
                key={index}
                feature={feature}
                index={index}
                isVisible={isVisible}
              />
            ))}
          </div>
        </div>
      </FuturisticSection>
    </>
  );
};

export default Features;