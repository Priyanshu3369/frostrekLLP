import React, { useEffect, useRef, useState } from "react";
import { motion, useInView, useMotionValue, useTransform, useScroll } from "framer-motion";
import { Brain, LineChart, Code, Cpu } from "lucide-react";
import FuturisticSection from "../components/FuturisticSection";

const services = [
  {
    title: "AI Automation",
    desc: "Streamline workflows and enhance efficiency using intelligent process automation tailored to your business needs.",
    icon: Cpu,
    color: "rgba(100, 116, 139, 0.8)",
    particles: 30,
    backgroundImage: "https://images.unsplash.com/photo-1677442136019-21780ecad995?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
  },
  {
    title: "Data Analytics",
    desc: "Unlock insights through advanced data analytics, helping you make smarter, faster, and informed decisions.",
    icon: LineChart,
    color: "rgba(148, 163, 184, 0.8)",
    particles: 25,
    backgroundImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
  },
  {
    title: "Custom AI Solutions",
    desc: "Design and deploy custom machine learning models and AI tools that align perfectly with your strategic goals.",
    icon: Brain,
    color: "rgba(203, 213, 225, 0.8)",
    particles: 35,
    backgroundImage: "https://media.istockphoto.com/id/2138299051/photo/productivity-evolution-concept-futuristic-gears-%D1%88%D1%81%D1%89%D1%82-in-world-of-technological-progress-and.webp?a=1&b=1&s=612x612&w=0&k=20&c=btIovy5Kt0DG_mM5i2be2Z1ok2ckXh_kdI4Wm0i_ssE=",
  },
  {
    title: "AI Integration",
    desc: "Integrate AI capabilities seamlessly into existing systems to create intelligent, scalable solutions.",
    icon: Code,
    color: "rgba(100, 116, 139, 0.8)",
    particles: 28,
    backgroundImage: "https://images.unsplash.com/photo-1677442136019-21780ecad995?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
  },
];

const ServiceCard = ({ service, index, scrollProgress }) => {
  const cardRef = useRef(null);
  const canvasRef = useRef(null);
  const isInView = useInView(cardRef, { once: false, amount: 0.3 });
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useTransform(mouseY, [-0.5, 0.5], [5, -5]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], [-5, 5]);

  // Scroll-based animations
  const cardY = useTransform(scrollProgress, [0, 0.5, 1], [100, 0, -50]);
  const cardOpacity = useTransform(scrollProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0.8]);
  const cardScale = useTransform(scrollProgress, [0, 0.5, 1], [0.8, 1, 0.95]);

  // Preload image
  useEffect(() => {
    const img = new Image();
    img.src = service.backgroundImage;
    img.onload = () => setImageLoaded(true);
  }, [service.backgroundImage]);

  // Particle animation on canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const particles = [];
    const particleCount = service.particles;

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        radius: Math.random() * 1.5 + 0.3,
        opacity: Math.random() * 0.5 + 0.2,
      });
    }

    let animationId;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p, i) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        // Draw connections
        particles.forEach((p2, j) => {
          if (i >= j) return;
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 80) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(0, 255, 255, ${0.15 * (1 - dist / 80)})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        });

        // Draw particle
        ctx.beginPath();
        ctx.fillStyle = `rgba(0, 255, 255, ${p.opacity})`;
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => cancelAnimationFrame(animationId);
  }, [service.particles]);

  const handleMouseMove = (e) => {
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const Icon = service.icon;

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 100, rotateX: -15 }}
      animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : { opacity: 0, y: 100, rotateX: -15 }}
      transition={{ 
        duration: 0.8, 
        delay: index * 0.15,
        type: "spring",
        stiffness: 100,
        damping: 20
      }}
      style={{
        y: cardY,
        opacity: cardOpacity,
        scale: cardScale,
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        mouseX.set(0);
        mouseY.set(0);
      }}
      className="relative group"
    >
      <motion.div
        className="relative h-full bg-gradient-to-br from-[#0B0B0E]/80 to-[#0D0D10]/60 backdrop-blur-md rounded-2xl border border-cyan-500/20 overflow-hidden shadow-lg shadow-cyan-500/5"
        whileHover={{ borderColor: "rgba(0, 255, 255, 0.6)", boxShadow: "0 0 30px rgba(0, 255, 255, 0.2)" }}
        transition={{ duration: 0.3 }}
      >
        {/* Background Image */}
        <motion.div
          className="absolute inset-0 w-full h-full"
          initial={{ opacity: 0, scale: 1.1 }}
          animate={imageLoaded ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 1.1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div
            className="w-full h-full bg-cover bg-center"
            style={{ backgroundImage: `url(${service.backgroundImage})` }}
          />
          {/* Dark Overlay for better text readability */}
          <div className="absolute inset-0 bg-[#0B0B0E]/80 mix-blend-multiply" />
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#0B0B0E]/90 via-[#0D0D10]/70 to-[#0B0B0E]/50" />
        </motion.div>

        {/* Animated Canvas Background */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full opacity-40"
        />

        {/* Holographic Scan Line */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/20 to-transparent"
          animate={isHovered ? { y: ["-100%", "200%"] } : { y: "-100%" }}
          transition={{ duration: 1.5, ease: "linear", repeat: isHovered ? Infinity : 0 }}
        />

        {/* Corner Accents */}
        <div className="absolute top-0 left-0 w-12 h-12 border-t-2 border-l-2 border-cyan-500/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="absolute bottom-0 right-0 w-12 h-12 border-b-2 border-r-2 border-purple-500/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Content */}
        <div className="relative z-10 p-8 h-full flex flex-col">
          {/* Icon with Orbital Ring */}
          <motion.div 
            className="relative w-20 h-20 mb-6 flex items-center justify-center"
            animate={isHovered ? { scale: [1, 1.1, 1] } : {}}
            transition={{ duration: 2, repeat: Infinity }}
          >
            {/* Orbital Rings */}
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="absolute inset-0"
                animate={{ rotate: 360 }}
                transition={{
                  duration: 10 - i * 2,
                  repeat: Infinity,
                  ease: "linear",
                }}
                style={{
                  border: "1px solid rgba(0, 255, 255, 0.2)",
                  borderRadius: "50%",
                  transform: `scale(${1 + i * 0.3})`,
                }}
              />
            ))}

            {/* Icon Container */}
            <motion.div
              className="relative z-10 w-16 h-16 bg-[#0B0B0E]/90 rounded-full flex items-center justify-center border border-cyan-500/30"
              whileHover={{ scale: 1.1, borderColor: "rgba(0, 255, 255, 0.8)" }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Icon className="text-cyan-400" size={32} />
              
              {/* Glow Effect */}
              <motion.div
                className="absolute inset-0 rounded-full blur-lg opacity-0 group-hover:opacity-60"
                style={{ 
                  background: "radial-gradient(circle, rgba(0, 255, 255, 0.4), rgba(109, 40, 217, 0.2))"
                }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>

            {/* Pulse Effect */}
            <motion.div
              className="absolute inset-0 border-2 border-cyan-500/30 rounded-full"
              animate={{
                scale: [1, 1.5, 1.5],
                opacity: [0.5, 0, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeOut",
              }}
            />
          </motion.div>

          {/* Title with Shiny Effect */}
          <motion.div
            className="relative overflow-hidden"
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: index * 0.15 + 0.2 }}
          >
            <motion.h3
              className="text-xl font-bold text-[#FFFFFF] mb-3 tracking-tight relative"
              style={{
                textShadow: "0 0 20px rgba(0,255,255,0.3), 0 0 40px rgba(109,40,217,0.2)"
              }}
            >
              {service.title}
              {/* Shiny overlay effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent transform -skew-x-12"
                animate={{
                  x: ["-100%", "200%"],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  repeatDelay: 5,
                  ease: "easeInOut",
                }}
              />
            </motion.h3>
          </motion.div>

          {/* Divider */}
          <motion.div
            className="h-[1px] bg-gradient-to-r from-cyan-500/50 via-purple-600/50 to-transparent mb-4"
            initial={{ width: 0 }}
            animate={isInView ? { width: "100%" } : {}}
            transition={{ duration: 0.8, delay: index * 0.15 + 0.4 }}
          />

          {/* Description with Enhanced Readability */}
          <motion.div
            className="relative flex-grow"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: index * 0.15 + 0.5 }}
          >
            <p
              className="text-[#D1D5DB] text-sm leading-relaxed relative z-10"
              style={{
                textShadow: "0 1px 2px rgba(0,0,0,0.5)",
                fontWeight: 450,
                letterSpacing: "0.01em"
              }}
            >
              {service.desc}
            </p>
            
            {/* Subtle text glow effect */}
            <div 
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{
                background: "radial-gradient(circle at 50% 50%, rgba(255,255,255,0.1) 0%, transparent 70%)",
                filter: "blur(10px)",
                mixBlendMode: "overlay"
              }}
            />
          </motion.div>

          {/* Bottom Info Bar with Enhanced Text */}
          <motion.div
            className="mt-6 pt-4 border-t border-cyan-500/20 flex items-center justify-between"
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: index * 0.15 + 0.6 }}
          >
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_8px_rgba(0,255,255,0.6)]" />
              <span 
                className="text-xs text-cyan-400 uppercase tracking-wider font-medium"
                style={{
                  textShadow: "0 0 10px rgba(0,255,255,0.4)",
                  fontWeight: 500
                }}
              >
                Active
              </span>
            </div>
            
            <motion.div
              className="text-cyan-400 group-hover:text-cyan-300 transition-colors duration-300"
              whileHover={{ x: 5 }}
              style={{
                filter: "drop-shadow(0 0 8px rgba(0,255,255,0.5))"
              }}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M6 3L11 8L6 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </motion.div>
          </motion.div>
        </div>

        {/* Animated Border Glow */}
        <motion.div
          className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100"
          style={{
            background: "linear-gradient(90deg, transparent, rgba(0, 255, 255, 0.4), rgba(109, 40, 217, 0.4), transparent)",
            filter: "blur(20px)",
          }}
          animate={isHovered ? { 
            background: [
              "linear-gradient(0deg, transparent, rgba(0, 255, 255, 0.4), rgba(109, 40, 217, 0.4), transparent)",
              "linear-gradient(90deg, transparent, rgba(0, 255, 255, 0.4), rgba(109, 40, 217, 0.4), transparent)",
              "linear-gradient(180deg, transparent, rgba(0, 255, 255, 0.4), rgba(109, 40, 217, 0.4), transparent)",
              "linear-gradient(270deg, transparent, rgba(0, 255, 255, 0.4), rgba(109, 40, 217, 0.4), transparent)",
              "linear-gradient(360deg, transparent, rgba(0, 255, 255, 0.4), rgba(109, 40, 217, 0.4), transparent)",
            ]
          } : {}}
          transition={{ duration: 3, repeat: Infinity }}
        />
      </motion.div>

      {/* Floating Particles around card */}
      {isHovered && [...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-cyan-400 rounded-full pointer-events-none shadow-[0_0_8px_rgba(0,255,255,0.8)]"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: i * 0.3,
          }}
        />
      ))}
    </motion.div>
  );
};

const Services = () => {
  const sectionRef = useRef(null);
  const bgCanvasRef = useRef(null);
  const titleRef = useRef(null);
  const isInView = useInView(titleRef, { once: false, amount: 0.5 });
  
  // Scroll progress for the entire section
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  // Transform scroll into various effects
  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const orbScale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.5, 1.2]);
  const headerY = useTransform(scrollYProgress, [0, 0.5, 1], [50, 0, -100]);
  const headerOpacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  // Background Grid Animation with Scroll
  useEffect(() => {
    const canvas = bgCanvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    
    const updateSize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    
    updateSize();
    window.addEventListener("resize", updateSize);

    const gridSize = 50;
    let offset = 0;
    let scrollOffset = 0;

    // Subscribe to scroll progress
    const unsubscribe = scrollYProgress.on("change", (latest) => {
      scrollOffset = latest * 200;
    });

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      offset += 0.3;
      if (offset > gridSize) offset = 0;

      ctx.strokeStyle = "rgba(0, 255, 255, 0.1)";
      ctx.lineWidth = 1;

      // Vertical lines with scroll offset
      for (let x = -(offset + scrollOffset % gridSize); x < canvas.width + gridSize; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }

      // Horizontal lines with scroll offset
      for (let y = -(offset + scrollOffset % gridSize); y < canvas.height + gridSize; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", updateSize);
      unsubscribe();
    };
  }, [scrollYProgress]);

  return (
    <FuturisticSection
      id="services"
      innerRef={sectionRef}
      className="py-28"
      containerClassName="relative mx-auto max-w-7xl overflow-visible px-6 md:px-12"
    >
      <motion.div
        style={{ y: backgroundY }}
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <canvas ref={bgCanvasRef} className="absolute inset-0 h-full w-full opacity-40" />
      </motion.div>

      <motion.div
        className="pointer-events-none absolute left-[14%] top-[18%] h-[420px] w-[420px] rounded-full blur-3xl opacity-60"
        style={{
          scale: orbScale,
          background: "radial-gradient(circle, rgba(13, 221, 255, 0.28) 0%, transparent 70%)",
        }}
        animate={{
          x: [0, 40, 0],
          y: [0, -40, 0],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="pointer-events-none absolute right-[12%] bottom-[16%] h-[360px] w-[360px] rounded-full blur-3xl opacity-50"
        style={{
          scale: orbScale,
          background: "radial-gradient(circle, rgba(109, 40, 217, 0.28) 0%, transparent 70%)",
        }}
        animate={{
          x: [0, -28, 0],
          y: [0, 28, 0],
        }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
      />

      {[...Array(8)].map((_, i) => (
        <motion.div
          key={`stream-${i}`}
          className="pointer-events-none absolute h-32 w-[2px] bg-gradient-to-b from-transparent via-cyan-500/45 to-transparent"
          style={{
            left: `${8 + i * 11}%`,
            top: `-10%`,
          }}
          animate={{
            y: ["0vh", "120vh"],
          }}
          transition={{
            duration: 8 + i * 2,
            repeat: Infinity,
            ease: "linear",
            delay: i * 0.45,
          }}
        />
      ))}

      <div className="relative z-10">
        {/* Header with Scroll Animations */}
        <motion.div
          ref={titleRef}
          className="mb-20 text-center"
          style={{ 
            y: headerY,
            opacity: headerOpacity,
          }}
        >
          <div className="inline-flex items-center gap-3 mb-6">
            <motion.div
              className="w-12 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-purple-600"
              initial={{ width: 0 }}
              animate={isInView ? { width: 48 } : { width: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            />
            <motion.span 
              className="text-[#D1D5DB] text-sm font-medium tracking-[0.3em] uppercase"
              initial={{ opacity: 0, letterSpacing: "0.1em" }}
              animate={isInView ? { opacity: 1, letterSpacing: "0.3em" } : { opacity: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              style={{
                textShadow: "0 0 20px rgba(0,255,255,0.3)",
                fontWeight: 500
              }}
            >
              What We Offer
            </motion.span>
            <motion.div
              className="w-12 h-[2px] bg-gradient-to-l from-transparent via-cyan-400 to-purple-600"
              initial={{ width: 0 }}
              animate={isInView ? { width: 48 } : { width: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            />
          </div>

          <motion.h2 
            className="text-5xl md:text-6xl font-bold mb-6 tracking-tight"
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 30, scale: 0.9 }}
            transition={{ duration: 0.8, delay: 0.4, type: "spring" }}
            style={{
              textShadow: "0 0 30px rgba(0,255,255,0.3), 0 0 60px rgba(109,40,217,0.2)"
            }}
          >
            <span className="bg-gradient-to-r from-[#00FFFF] via-[#6D28D9] to-[#14B8A6] bg-clip-text text-transparent">
              Our Services
            </span>
          </motion.h2>

          <motion.p
            className="text-[#D1D5DB] text-lg max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            style={{
              textShadow: "0 1px 2px rgba(0,0,0,0.5)",
              fontWeight: 450
            }}
          >
            Cutting-edge AI solutions designed to transform your business
          </motion.p>

          {/* Decorative Line with Wave Animation */}
          <motion.div
            className="relative h-[2px] mt-8 mx-auto max-w-md overflow-hidden"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent"
              animate={{
                x: ["-100%", "100%"],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "linear",
              }}
            />
          </motion.div>
        </motion.div>

        {/* Services Grid with Staggered Scroll Animations */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <ServiceCard 
              key={index} 
              service={service} 
              index={index}
              scrollProgress={scrollYProgress}
            />
          ))}
        </div>

        {/* Bottom Decoration with Scroll Reveal */}
        <motion.div
          className="mt-20 flex items-center justify-center gap-4"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.8 }}
          transition={{ duration: 0.8 }}
        >
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="relative"
            >
              <motion.div
                className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_10px_rgba(0,255,255,0.6)]"
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.2,
                }}
              />
              {/* Connecting lines */}
              {i < 4 && (
                <motion.div
                  className="absolute top-1/2 left-2 w-4 h-[1px] bg-gradient-to-r from-cyan-400 to-purple-600"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: false }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                />
              )}
            </motion.div>
          ))}
        </motion.div>

      </div>
    </FuturisticSection>
  );
};

export default Services;