import { useState, useEffect } from "react";
import { ShieldCheck, Rocket, Users, Zap } from "lucide-react";
import FuturisticSection from "../components/FuturisticSection";

const reasons = [
  {
    title: "Trusted Expertise",
    desc: "Our team brings years of experience in AI research, software engineering, and scalable solution design.",
    icon: ShieldCheck,
  },
  {
    title: "Innovation-Driven",
    desc: "We push the boundaries of technology by constantly exploring emerging AI trends and integrating them effectively.",
    icon: Rocket,
  },
  {
    title: "Client-Centered Approach",
    desc: "We collaborate closely with clients to ensure that every solution is personalized, impactful, and efficient.",
    icon: Users,
  },
  {
    title: "Cutting-Edge Solutions",
    desc: "From automation to predictive analytics, we deliver high-performance systems that scale with your business.",
    icon: Zap,
  },
];

const WhyChooseUs = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % reasons.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const newParticles = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      duration: Math.random() * 10 + 10,
      delay: Math.random() * 5,
    }));
    setParticles(newParticles);
  }, []);

  return (
    <FuturisticSection
      id="why-choose-us"
      className="py-28"
      containerClassName="relative mx-auto flex max-w-6xl flex-col items-center gap-16 px-6 md:px-12"
    >
      <div className="pointer-events-none absolute inset-0 -z-10">
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="absolute h-1 w-1 rounded-full bg-cyan-400/50 shadow-[0_0_10px_rgba(34,211,238,0.6)]"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              animation: `float ${particle.duration}s ease-in-out ${particle.delay}s infinite`,
            }}
          />
        ))}
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) translateX(0px); opacity: 0.35; }
          50% { transform: translateY(-18px) translateX(12px); opacity: 0.7; }
        }
      `}</style>

      {/* Header section */}
      <div className="relative z-10 mb-12 text-center max-w-3xl">
        <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 bg-cyan-500/10 border border-cyan-500/40 rounded backdrop-blur-sm">
          <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse shadow-[0_0_8px_rgba(0,255,255,0.8)]" />
          <span className="text-xs font-mono text-cyan-400 tracking-widest">AI-POWERED SOLUTIONS</span>
        </div>
        
        <h2 className="text-4xl md:text-5xl font-bold text-[#FFFFFF] mb-4">
          Why Choose <span className="bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent">Frostrek</span>?
        </h2>
        
        <p className="text-[#D1D5DB] text-sm md:text-base">
          Next-generation AI solutions designed to transform your business operations
        </p>
      </div>

      {/* Main content grid */}
      <div className="relative z-10 w-full max-w-6xl">
        <div className="grid md:grid-cols-2 gap-6 relative">
          {/* Connection lines between cards */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none hidden md:block" style={{ zIndex: 1 }}>
            <line x1="50%" y1="25%" x2="50%" y2="75%" stroke="#374151" strokeWidth="1" strokeDasharray="5,5" opacity="0.3" />
            <line x1="25%" y1="50%" x2="75%" y2="50%" stroke="#374151" strokeWidth="1" strokeDasharray="5,5" opacity="0.3" />
          </svg>

          {reasons.map((item, index) => {
            const Icon = item.icon;
            const isActive = activeIndex === index;
            const isHovered = hoveredIndex === index;
            
            return (
              <div
                key={index}
                className="relative"
                style={{ zIndex: 10 }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {/* Animated border container */}
                <div className={`relative transition-all duration-500 ${
                  isActive || isHovered ? 'scale-105' : 'scale-100'
                }`}>
                  {/* Glowing effect background */}
                  <div className={`absolute inset-0 bg-cyan-500/15 blur-xl transition-opacity duration-500 ${
                    isActive || isHovered ? 'opacity-100' : 'opacity-0'
                  }`} />

                  {/* Main card */}
                  <div className={`relative bg-[#0D0D10] border-2 transition-all duration-500 backdrop-blur-sm ${
                    isActive || isHovered
                      ? 'border-cyan-500/60 shadow-lg shadow-cyan-500/30' 
                      : 'border-cyan-500/20'
                  }`}>
                    
                    {/* Top accent bar */}
                    <div className={`h-1 transition-all duration-500 ${
                      isActive || isHovered
                        ? 'bg-gradient-to-r from-cyan-400 via-purple-600 to-teal-400' 
                        : 'bg-cyan-500/30'
                    }`} />

                    <div className="p-6">
                      {/* Header with icon and ID */}
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-4">
                          {/* Icon container */}
                          <div className={`relative p-3 border-2 transition-all duration-500 ${
                            isActive || isHovered
                              ? 'border-cyan-400 bg-cyan-500/10 shadow-[0_0_15px_rgba(0,255,255,0.4)]' 
                              : 'border-cyan-500/30 bg-[#0B0B0E]/50'
                          }`}>
                            <Icon 
                              size={28} 
                              className={`transition-all duration-500 ${
                                isActive || isHovered ? 'text-cyan-400' : 'text-cyan-500/60'
                              }`}
                              strokeWidth={1.5}
                            />
                            
                            {/* Scanning effect */}
                            {isActive && (
                              <div className="absolute inset-0 border-2 border-cyan-400 animate-ping" />
                            )}
                          </div>

                          {/* Title */}
                          <div>
                            <div className="text-xs font-mono text-cyan-500/60 mb-1">
                              MODULE-{String(index + 1).padStart(2, '0')}
                            </div>
                            <h3 className={`text-xl font-bold transition-colors duration-500 ${
                              isActive || isHovered ? 'text-cyan-300' : 'text-[#FFFFFF]'
                            }`}>
                              {item.title}
                            </h3>
                          </div>
                        </div>

                        {/* Status indicator */}
                        <div className="flex flex-col items-end gap-1">
                          <div className={`w-2 h-2 rounded-full transition-all duration-500 ${
                            isActive 
                              ? 'bg-cyan-400 animate-pulse shadow-[0_0_10px_rgba(0,255,255,0.8)]' 
                              : 'bg-cyan-500/30'
                          }`} />
                          <span className="text-xs font-mono text-cyan-500/60">
                            {isActive ? 'ON' : 'OFF'}
                          </span>
                        </div>
                      </div>

                      {/* Description */}
                      <p className="text-[#D1D5DB] text-sm leading-relaxed mb-4">
                        {item.desc}
                      </p>

                      {/* Bottom action bar */}
                      <div className="mt-4 pt-4 border-t border-cyan-500/20 flex items-center justify-between">
                        <div className="flex gap-1">
                          {[1, 2, 3, 4].map((dot) => (
                            <div
                              key={dot}
                              className={`w-1 h-1 rounded-full transition-all duration-300 ${
                                isActive && dot <= 3
                                  ? 'bg-cyan-400 shadow-[0_0_8px_rgba(0,255,255,0.6)]' 
                                  : 'bg-cyan-500/20'
                              }`}
                              style={{ animationDelay: `${dot * 0.1}s` }}
                            />
                          ))}
                        </div>
                        <button 
                          onClick={() => setActiveIndex(index)}
                          className={`text-xs font-mono transition-colors duration-300 ${
                            isActive || isHovered
                              ? 'text-cyan-400 hover:text-cyan-300' 
                              : 'text-cyan-500/50 hover:text-cyan-400'
                          }`}
                        >
                          VIEW DETAILS →
                        </button>
                      </div>
                    </div>

                    {/* Corner decorations */}
                    <div className={`absolute top-0 left-0 w-4 h-4 border-l-2 border-t-2 transition-colors duration-500 ${
                      isActive || isHovered ? 'border-cyan-400' : 'border-cyan-500/30'
                    }`} />
                    <div className={`absolute bottom-0 right-0 w-4 h-4 border-r-2 border-b-2 transition-colors duration-500 ${
                      isActive || isHovered ? 'border-purple-500' : 'border-cyan-500/30'
                    }`} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Navigation controls */}
      <div className="relative z-10 mt-12 flex items-center gap-6">
        <div className="flex gap-2">
          {reasons.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                activeIndex === index
                  ? 'w-12 bg-gradient-to-r from-cyan-400 to-purple-600 shadow-[0_0_10px_rgba(0,255,255,0.6)]' 
                  : 'w-6 bg-cyan-500/30 hover:bg-cyan-500/50'
              }`}
            />
          ))}
        </div>
        
        <div className="text-xs font-mono text-cyan-500/60">
          {activeIndex + 1} / {reasons.length}
        </div>
      </div>
    </FuturisticSection>
  );
};

export default WhyChooseUs;