import React, { useMemo, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';
import { ArrowRight, Zap, Users, Target, Eye, CheckCircle, Sparkles, Activity } from 'lucide-react';

const About = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { scrollYProgress } = useScroll();
  
  // Smooth scroll animations
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const y1 = useTransform(smoothProgress, [0, 1], [0, -200]);
  const y2 = useTransform(smoothProgress, [0, 1], [0, 200]);
  const opacity = useTransform(smoothProgress, [0, 0.5, 1], [1, 0.5, 0.2]);
  const scale = useTransform(smoothProgress, [0, 0.5], [1, 1.2]);

  // Mouse parallax effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX - window.innerWidth / 2) / 50,
        y: (e.clientY - window.innerHeight / 2) / 50,
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const features = [
    "Cutting-edge AI model training tailored to your goals",
    "Expertise in RLHF ensures precise model alignment",
    "Access to a pool of top-tier AI talent",
    "Seamless integration and optimization for real-world AI applications",
    "Dedicated support to enhance scalability and efficiency"
  ];

  const services = [
    {
      icon: <Zap className="w-6 h-6" />,
      title: "AI Model Training",
      description: "Leverage our 200+ RLHF experts to train and enhance your AI models for real-world success."
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Talent Pool Solutions",
      description: "Connect with top AI talent and align your resources with the industry's leading organizations."
    },
    {
      icon: <Target className="w-6 h-6" />,
      title: "Custom AI Solutions",
      description: "Tailored AI development strategies to meet your unique business challenges and goals."
    },
    {
      icon: <Eye className="w-6 h-6" />,
      title: "AI Integration & Optimization",
      description: "Seamless integration of AI technologies into your business operations for maximum impact."
    }
  ];

  const offerings = [
    {
      title: "RLHF Expertise",
      description: "Empower your AI systems with 200+ trained RLHF specialists dedicated to aligning models with real-world demands."
    },
    {
      title: "AI Talent Matching",
      description: "Connect with industry-leading AI professionals to transform your vision into reality."
    },
    {
      title: "Custom AI Model Development",
      description: "Design and develop AI models tailored to your business needs and objectives."
    },
    {
      title: "AI Strategy & Integration",
      description: "Seamlessly integrate AI into your workflows, ensuring optimized performance and results."
    }
  ];

  // Generate floating particles with more variety
  const particles = useMemo(() => {
    return Array.from({ length: 30 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      duration: 10 + Math.random() * 10,
      delay: Math.random() * 5,
      size: 1 + Math.random() * 3,
    }));
  }, []);

  // Generate data stream lines
  const dataStreams = useMemo(() => {
    return Array.from({ length: 8 }, (_, i) => ({
      id: i,
      delay: i * 0.5,
      duration: 4 + Math.random() * 2,
    }));
  }, []);

  return (
    <div className="bg-[#0B0B0E] text-[#F8FAFC] min-h-screen relative overflow-hidden">
      {/* Animated Particles Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute rounded-full"
            initial={{ 
              left: `${particle.x}%`, 
              top: `${particle.y}%`,
              opacity: 0,
              scale: 0
            }}
            animate={{
              y: [0, -60, -30, 0],
              x: [0, 30, -20, 10, 0],
              opacity: [0, 0.8, 0.5, 0.3, 0],
              scale: [0, 1.5, 1, 0.8, 0],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: particle.duration,
              delay: particle.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{
              width: particle.size,
              height: particle.size,
              background: `radial-gradient(circle, rgba(34, 211, 238, 0.6), transparent)`,
            }}
          />
        ))}
      </div>

      {/* Mouse follower glow */}
      <motion.div
        className="fixed w-96 h-96 pointer-events-none rounded-full blur-3xl opacity-20"
        style={{
          background: 'radial-gradient(circle, rgba(34, 211, 238, 0.4), transparent)',
          x: mousePosition.x * 2,
          y: mousePosition.y * 2,
          left: '50%',
          top: '50%',
          translateX: '-50%',
          translateY: '-50%',
        }}
      />

      {/* Data stream lines */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {dataStreams.map((stream) => (
          <motion.div
            key={stream.id}
            className="absolute h-px bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent"
            style={{
              left: `${stream.id * 12.5}%`,
              width: '200px',
            }}
            animate={{
              y: [-100, window.innerHeight + 100],
              opacity: [0, 1, 1, 0],
            }}
            transition={{
              duration: stream.duration,
              delay: stream.delay,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}
      </div>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Parallax Background Elements */}
        <motion.div 
          className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(0,255,255,0.16),transparent_55%)]"
          style={{ y: y1, opacity }}
        />
        <motion.div 
          className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,_rgba(109,40,217,0.12),transparent_60%)]"
          style={{ y: y2 }}
        />
        
        {/* Animated Grid Pattern with 3D perspective */}
        <motion.div 
          className="absolute inset-0 opacity-[0.18]"
          style={{
            transform: `perspective(1000px) rotateX(${mousePosition.y * 0.5}deg) rotateY(${mousePosition.x * 0.5}deg)`,
          }}
          animate={{
            backgroundPosition: ['0px 0px', '80px 80px'],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <div className="absolute inset-0 bg-[linear-gradient(rgba(26,187,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(125,95,255,0.08)_1px,transparent_1px)] bg-[size:80px_80px]" />
        </motion.div>

        {/* Animated connecting lines */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20">
          <motion.line
            x1="10%" y1="20%"
            x2="90%" y2="80%"
            stroke="rgba(34, 211, 238, 0.3)"
            strokeWidth="1"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
          />
          <motion.line
            x1="90%" y1="20%"
            x2="10%" y2="80%"
            stroke="rgba(99, 102, 241, 0.3)"
            strokeWidth="1"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 2, delay: 1, repeat: Infinity, repeatType: "reverse" }}
          />
        </svg>

        {/* Floating geometric shapes */}
        <motion.div
          className="absolute top-20 left-10 w-20 h-20 border-2 border-cyan-400/20"
          animate={{
            rotate: [0, 360],
            y: [0, -20, 0],
          }}
          transition={{
            rotate: { duration: 20, repeat: Infinity, ease: "linear" },
            y: { duration: 3, repeat: Infinity, ease: "easeInOut" }
          }}
        />
        <motion.div
          className="absolute bottom-20 right-20 w-16 h-16 rounded-full border-2 border-indigo-400/20"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, -360],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear"
          }}
        />

        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              className="inline-flex items-center gap-3 rounded-full border border-cyan-500/40 bg-white/5 px-5 py-2 text-sm uppercase tracking-[0.3em] text-cyan-200 backdrop-blur-lg mb-8"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.7 }}
              whileHover={{ scale: 1.05, borderColor: "rgba(34, 211, 238, 0.6)" }}
            >
              <motion.div
                animate={{ 
                  rotate: 360,
                  scale: [1, 1.2, 1]
                }}
                transition={{ 
                  rotate: { duration: 3, repeat: Infinity, ease: "linear" },
                  scale: { duration: 2, repeat: Infinity, ease: "easeInOut" }
                }}
              >
                <Sparkles className="h-4 w-4 text-cyan-300" />
              </motion.div>
              about
              <motion.div
                className="h-2 w-2 rounded-full bg-cyan-400"
                animate={{
                  opacity: [1, 0.3, 1],
                  scale: [1, 1.5, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                }}
              />
            </motion.div>

            <motion.h1 
              className="text-4xl md:text-6xl font-semibold mb-6 leading-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.9 }}
              style={{ y: y1 }}
            >
              <motion.span 
                className="bg-gradient-to-r from-cyan-300 via-indigo-400 to-teal-300 bg-clip-text text-transparent inline-block"
                animate={{
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "linear"
                }}
                style={{
                  backgroundSize: '200% 200%'
                }}
              >
                Revealing the essence
              </motion.span>{" "}
              of our successful business
            </motion.h1>
            
            <motion.p 
              className="text-xl md:text-2xl text-slate-300/80 font-light"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45, duration: 0.8 }}
            >
              Revolutionizing AI Solutions with Expert Training and Talent Matching
            </motion.p>
          </motion.div>
          
          <motion.div 
            className="max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <motion.p 
              className="text-lg text-slate-300/80 leading-relaxed mb-10 text-center"
              style={{ x: mousePosition.x * 2 }}
            >
              We are a cutting-edge AI company specializing in training advanced AI models through Reinforcement Learning from Human Feedback (RLHF). Founded with a vision to redefine AI development, we empower organizations by transforming their AI models into smarter, more reliable systems that align seamlessly with real-world needs.
            </motion.p>
            
            <div className="flex justify-center">
              <motion.button 
                className="group relative flex items-center gap-3 overflow-hidden rounded-full bg-gradient-to-r from-cyan-400 via-sky-500 to-indigo-500 px-8 py-4 text-base font-semibold text-[#06111F] shadow-[0_12px_30px_rgba(13,148,136,0.25)]"
                whileHover={{ scale: 1.05, y: -2, boxShadow: "0 20px 40px rgba(13,148,136,0.4)" }}
                whileTap={{ scale: 0.98 }}
                animate={{
                  boxShadow: [
                    "0 12px 30px rgba(13,148,136,0.25)",
                    "0 15px 35px rgba(13,148,136,0.35)",
                    "0 12px 30px rgba(13,148,136,0.25)"
                  ]
                }}
                transition={{
                  boxShadow: { duration: 2, repeat: Infinity }
                }}
              >
                <motion.span 
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                  animate={{
                    x: ['-200%', '200%']
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                />
                <span className="relative z-10 flex items-center gap-2">
                  Discover services
                  <motion.div
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <ArrowRight className="w-5 h-5" />
                  </motion.div>
                </span>
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* What We Do Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(15,205,255,0.08),transparent_70%)]" />
        
        {/* Animated wave effect */}
        <motion.div
          className="absolute inset-0 opacity-10"
          animate={{
            backgroundPosition: ['0% 0%', '100% 100%'],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear"
          }}
          style={{
            backgroundImage: 'repeating-linear-gradient(45deg, rgba(34, 211, 238, 0.1) 0px, transparent 2px, transparent 10px, rgba(34, 211, 238, 0.1) 12px)',
            backgroundSize: '200% 200%'
          }}
        />
        
        {/* Corner pulse effects */}
        <motion.div
          className="absolute top-0 left-0 w-40 h-40"
          animate={{
            boxShadow: [
              "0 0 0 0 rgba(34, 211, 238, 0)",
              "0 0 0 20px rgba(34, 211, 238, 0.1)",
              "0 0 0 40px rgba(34, 211, 238, 0)"
            ]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
          }}
          style={{
            borderTopLeftRadius: '100%',
            border: '2px solid rgba(34, 211, 238, 0.2)'
          }}
        />
        <motion.div
          className="absolute bottom-0 right-0 w-40 h-40"
          animate={{
            boxShadow: [
              "0 0 0 0 rgba(99, 102, 241, 0)",
              "0 0 0 20px rgba(99, 102, 241, 0.1)",
              "0 0 0 40px rgba(99, 102, 241, 0)"
            ]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: 1.5
          }}
          style={{
            borderBottomRightRadius: '100%',
            border: '2px solid rgba(99, 102, 241, 0.2)'
          }}
        />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8 }}
          >
            <motion.span 
              className="text-xs uppercase tracking-[0.2em] text-cyan-400 font-semibold inline-block"
              animate={{
                letterSpacing: ['0.2em', '0.3em', '0.2em']
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
              }}
            >
              what we do
            </motion.span>
            <h2 className="text-3xl md:text-5xl font-semibold mt-4 mb-4 text-slate-50">
              Empowering your AI journey with cutting-edge solutions and expertise
            </h2>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <motion.div 
                key={index}
                className="group relative p-6 bg-white/[0.04] backdrop-blur-xl rounded-2xl border border-white/5 overflow-hidden"
                initial={{ opacity: 0, y: 50, rotateX: -15 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ delay: index * 0.1, duration: 0.6, type: "spring" }}
                whileHover={{ 
                  y: -10,
                  scale: 1.05,
                  borderColor: "rgba(34, 211, 238, 0.3)",
                  boxShadow: "0 20px 40px rgba(34, 211, 238, 0.2)"
                }}
              >
                {/* Animated gradient overlay */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-cyan-400/0 via-cyan-400/5 to-transparent"
                  animate={{
                    opacity: [0, 0.5, 0],
                    scale: [1, 1.5, 1],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    delay: index * 0.3
                  }}
                />

                {/* Hover ripple effect */}
                <motion.div
                  className="absolute inset-0 rounded-2xl"
                  initial={{ scale: 0, opacity: 0.5 }}
                  whileHover={{ scale: 1.5, opacity: 0 }}
                  transition={{ duration: 0.6 }}
                  style={{
                    background: 'radial-gradient(circle, rgba(34, 211, 238, 0.2), transparent)',
                  }}
                />
                
                <motion.div 
                  className="relative flex h-12 w-12 items-center justify-center rounded-full bg-cyan-400/10 text-cyan-200 shadow-[0_0_24px_rgba(34,211,238,0.35)] transition mb-5"
                  whileHover={{ 
                    rotate: [0, -10, 10, -10, 0],
                    scale: 1.2,
                  }}
                  transition={{ duration: 0.5 }}
                >
                  <motion.div
                    animate={{
                      rotate: 360
                    }}
                    transition={{
                      duration: 10,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                  >
                    {service.icon}
                  </motion.div>
                  
                  {/* Orbiting dots */}
                  <motion.div
                    className="absolute w-2 h-2 bg-cyan-400 rounded-full"
                    animate={{
                      rotate: 360,
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                    style={{
                      offsetPath: "circle(30px)",
                      offsetRotate: "0deg",
                    }}
                  />
                </motion.div>

                <motion.h3 
                  className="text-lg font-semibold mb-3 text-slate-50 relative z-10"
                  whileHover={{ x: 5 }}
                >
                  {service.title}
                </motion.h3>
                <p className="text-sm text-slate-300/80 leading-relaxed relative z-10">{service.description}</p>

                {/* Corner decorations */}
                <motion.div
                  className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-cyan-400/0 group-hover:border-cyan-400/50"
                  transition={{ duration: 0.3 }}
                />
                <motion.div
                  className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-cyan-400/0 group-hover:border-cyan-400/50"
                  transition={{ duration: 0.3 }}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Offerings Grid */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <motion.div 
          className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(109,40,217,0.12),transparent_60%)]"
          style={{ scale }}
        />
        
        {/* DNA helix-like rotating circles */}
        <motion.div
          className="absolute top-1/4 right-1/4 w-64 h-64 border border-indigo-400/10 rounded-full"
          animate={{ 
            rotate: 360,
            scale: [1, 1.1, 1]
          }}
          transition={{ 
            rotate: { duration: 20, repeat: Infinity, ease: "linear" },
            scale: { duration: 4, repeat: Infinity, ease: "easeInOut" }
          }}
        >
          <motion.div
            className="absolute top-1/2 left-1/2 w-4 h-4 bg-indigo-400/30 rounded-full -translate-x-1/2 -translate-y-1/2"
            animate={{
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
            }}
          />
        </motion.div>
        <motion.div
          className="absolute bottom-1/4 left-1/4 w-48 h-48 border border-cyan-400/10 rounded-full"
          animate={{ 
            rotate: -360,
            y: [0, -20, 0]
          }}
          transition={{ 
            rotate: { duration: 15, repeat: Infinity, ease: "linear" },
            y: { duration: 5, repeat: Infinity, ease: "easeInOut" }
          }}
        >
          <motion.div
            className="absolute top-0 left-1/2 w-3 h-3 bg-cyan-400/30 rounded-full -translate-x-1/2"
            animate={{
              opacity: [0.3, 1, 0.3],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
            }}
          />
        </motion.div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {offerings.map((offering, index) => (
              <motion.div 
                key={index}
                className="group p-8 bg-white/[0.04] backdrop-blur-xl rounded-[28px] border border-white/5 relative overflow-hidden"
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ delay: index * 0.15, duration: 0.7, type: "spring" }}
                whileHover={{ 
                  scale: 1.02,
                  rotateY: 5,
                  borderColor: "rgba(99, 102, 241, 0.3)"
                }}
                style={{
                  transformStyle: "preserve-3d",
                  perspective: "1000px"
                }}
              >
                {/* Animated scan line */}
                <motion.div
                  className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-indigo-400/50 to-transparent"
                  animate={{
                    y: [0, 200, 0],
                    opacity: [0, 1, 0]
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    delay: index * 0.5
                  }}
                />

                {/* Particle burst on hover */}
                <motion.div
                  className="absolute inset-0"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                >
                  {Array.from({ length: 6 }).map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-1 h-1 bg-indigo-400/40 rounded-full"
                      style={{
                        left: '50%',
                        top: '50%',
                      }}
                      animate={{
                        x: [0, (Math.cos(i * 60 * Math.PI / 180) * 100)],
                        y: [0, (Math.sin(i * 60 * Math.PI / 180) * 100)],
                        opacity: [1, 0],
                        scale: [1, 0]
                      }}
                      transition={{
                        duration: 1,
                        repeat: Infinity,
                        delay: i * 0.1
                      }}
                    />
                  ))}
                </motion.div>

                {/* Glowing gradient overlay */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-indigo-400/0 via-indigo-400/5 to-transparent opacity-0 group-hover:opacity-100"
                  transition={{ duration: 0.3 }}
                />
                
                <h3 className="text-2xl font-semibold mb-4 flex items-center gap-3 text-slate-50 relative z-10">
                  <motion.span
                    whileHover={{ x: -5 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    {offering.title}
                  </motion.span>
                  <motion.div
                    whileHover={{ x: 10, scale: 1.2 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    <ArrowRight className="w-5 h-5 text-indigo-400" />
                  </motion.div>
                </h3>
                <p className="text-slate-300/80 leading-relaxed relative z-10">{offering.description}</p>

                {/* Data visualization bars */}
                <div className="absolute bottom-4 right-4 flex gap-1 opacity-20 group-hover:opacity-40 transition-opacity">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <motion.div
                      key={i}
                      className="w-1 bg-indigo-400 rounded-full"
                      style={{ height: `${(i + 1) * 6}px` }}
                      animate={{
                        height: [`${(i + 1) * 6}px`, `${(i + 1) * 10}px`, `${(i + 1) * 6}px`]
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        delay: i * 0.1
                      }}
                    />
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(0,255,255,0.14),transparent_70%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,_rgba(109,40,217,0.14),transparent_65%)]" />
        
        {/* Pulsing concentric rings */}
        {Array.from({ length: 5 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border border-cyan-400/10 rounded-full"
            style={{
              width: `${(i + 1) * 100}px`,
              height: `${(i + 1) * 100}px`
            }}
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.5, 0, 0.5],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeOut",
              delay: i * 0.8
            }}
          />
        ))}

        {/* Orbiting particles around center */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64">
          {Array.from({ length: 8 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-cyan-400/60 rounded-full"
              style={{
                left: '50%',
                top: '50%',
              }}
              animate={{
                rotate: 360,
              }}
              transition={{
                duration: 10 + i,
                repeat: Infinity,
                ease: "linear",
              }}
              transformTemplate={({ rotate }) => 
                `translateX(${Math.cos(i * 45 * Math.PI / 180) * 120}px) 
                 translateY(${Math.sin(i * 45 * Math.PI / 180) * 120}px) 
                 rotate(${rotate})`
              }
            />
          ))}
        </div>
        
        <div className="max-w-6xl mx-auto text-center relative z-10">
          <motion.h2 
            className="text-3xl md:text-5xl font-semibold mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.8 }}
          >
            <motion.span 
              className="bg-gradient-to-r from-cyan-300 via-indigo-400 to-teal-300 bg-clip-text text-transparent"
              animate={{
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "linear"
              }}
              style={{
                backgroundSize: '200% 200%'
              }}
            >
              The future is now
            </motion.span>
            , let's make it better, together we can
          </motion.h2>
          
          <motion.p 
            className="text-lg text-slate-300/80 leading-relaxed max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            At Frostrek AI, we believe in innovation and collaboration. From training AI models to building custom solutions, our experts guide you at every step. Let's drive meaningful impact and revolutionize industries through AI.
          </motion.p>
        </div>
      </section>

      {/* Features and Benefits */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-7xl mx-auto">
          <motion.h2 
            className="text-3xl font-semibold mb-12 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.8 }}
          >
            <span className="bg-gradient-to-r from-cyan-300 to-indigo-400 bg-clip-text text-transparent">
              features and benefits
            </span>
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-20">
            {features.map((feature, index) => (
              <motion.div 
                key={index}
                className="flex items-start gap-4 p-6 bg-white/[0.04] backdrop-blur-xl rounded-2xl border border-white/5 relative overflow-hidden group"
                initial={{ opacity: 0, scale: 0.9, rotateX: -10 }}
                whileInView={{ opacity: 1, scale: 1, rotateX: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                whileHover={{ 
                  x: 10,
                  borderColor: "rgba(34, 211, 238, 0.3)",
                  boxShadow: "0 10px 30px rgba(34, 211, 238, 0.15)"
                }}
              >
                {/* Progress bar animation */}
                <motion.div
                  className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-cyan-400/50 to-indigo-400/50"
                  initial={{ width: 0 }}
                  whileInView={{ width: "100%" }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 + 0.3, duration: 0.8 }}
                />

                {/* Hover sweep effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400/10 to-transparent"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: '100%' }}
                  transition={{ duration: 0.6 }}
                />
                
                <motion.div 
                  className="flex h-6 w-6 items-center justify-center rounded-full bg-cyan-400/10 flex-shrink-0 mt-1"
                  whileHover={{ 
                    rotate: [0, -10, 10, -10, 10, 0],
                    scale: 1.3,
                    backgroundColor: "rgba(34, 211, 238, 0.2)"
                  }}
                  transition={{ duration: 0.5 }}
                >
                  <CheckCircle className="w-4 h-4 text-cyan-400" />
                </motion.div>
                <motion.p 
                  className="text-slate-300/80 relative z-10"
                  whileHover={{ x: 5 }}
                >
                  {feature}
                </motion.p>

                {/* Animated corner indicator */}
                <motion.div
                  className="absolute top-2 right-2 w-2 h-2 bg-cyan-400/0 rounded-full group-hover:bg-cyan-400/60"
                  animate={{
                    scale: [1, 1.5, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                  }}
                />
              </motion.div>
            ))}
          </div>

          {/* Mission and Vision */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div 
              className="p-10 bg-gradient-to-br from-cyan-500/10 via-cyan-400/5 to-transparent rounded-[28px] border border-cyan-400/20 backdrop-blur-xl relative overflow-hidden group"
              initial={{ opacity: 0, x: -50, rotateY: -15 }}
              whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8 }}
              whileHover={{ 
                scale: 1.02,
                borderColor: "rgba(34, 211, 238, 0.4)",
                boxShadow: "0 20px 50px rgba(34, 211, 238, 0.2)"
              }}
              style={{
                transformStyle: "preserve-3d",
              }}
            >
              {/* Animated grid background */}
              <motion.div
                className="absolute inset-0 opacity-10"
                style={{
                  backgroundImage: 'repeating-linear-gradient(0deg, rgba(34, 211, 238, 0.2) 0px, transparent 1px, transparent 20px, rgba(34, 211, 238, 0.2) 21px), repeating-linear-gradient(90deg, rgba(34, 211, 238, 0.2) 0px, transparent 1px, transparent 20px, rgba(34, 211, 238, 0.2) 21px)',
                }}
                animate={{
                  backgroundPosition: ['0px 0px', '20px 20px'],
                }}
                transition={{
                  duration: 10,
                  repeat: Infinity,
                  ease: "linear"
                }}
              />

              {/* Floating icon */}
              <motion.div
                className="absolute top-4 right-4 text-cyan-400/20"
                animate={{
                  y: [0, -10, 0],
                  rotate: [0, 5, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <Target className="w-12 h-12" />
              </motion.div>

              {/* Animated corner brackets */}
              <motion.div
                className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-cyan-400/30"
                animate={{
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                }}
              />
              <motion.div
                className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-cyan-400/30"
                animate={{
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: 1
                }}
              />
              
              <motion.h3 
                className="text-2xl font-semibold mb-5 text-cyan-200 relative z-10"
                whileHover={{ x: 5 }}
              >
                Our Mission
              </motion.h3>
              <p className="text-slate-300/80 leading-relaxed relative z-10">
                To create transformative AI solutions and empower organizations by merging technology with human expertise. We are committed to enabling businesses and individuals to achieve excellence in the ever-evolving AI landscape.
              </p>
            </motion.div>
            
            <motion.div 
              className="p-10 bg-gradient-to-br from-indigo-500/10 via-indigo-400/5 to-transparent rounded-[28px] border border-indigo-400/20 backdrop-blur-xl relative overflow-hidden group"
              initial={{ opacity: 0, x: 50, rotateY: 15 }}
              whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              whileHover={{ 
                scale: 1.02,
                borderColor: "rgba(99, 102, 241, 0.4)",
                boxShadow: "0 20px 50px rgba(99, 102, 241, 0.2)"
              }}
              style={{
                transformStyle: "preserve-3d",
              }}
            >
              {/* Animated circuit pattern */}
              <motion.div
                className="absolute inset-0 opacity-10"
                style={{
                  backgroundImage: 'repeating-linear-gradient(90deg, rgba(99, 102, 241, 0.2) 0px, transparent 1px, transparent 30px, rgba(99, 102, 241, 0.2) 31px)',
                }}
                animate={{
                  backgroundPosition: ['0px 0px', '30px 0px'],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "linear"
                }}
              />

              {/* Floating icon */}
              <motion.div
                className="absolute top-4 right-4 text-indigo-400/20"
                animate={{
                  y: [0, -10, 0],
                  rotate: [0, -5, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1
                }}
              >
                <Eye className="w-12 h-12" />
              </motion.div>

              {/* Animated corner brackets */}
              <motion.div
                className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-indigo-400/30"
                animate={{
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: 0.5
                }}
              />
              <motion.div
                className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-indigo-400/30"
                animate={{
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: 1.5
                }}
              />
              
              <motion.h3 
                className="text-2xl font-semibold mb-5 text-indigo-200 relative z-10"
                whileHover={{ x: 5 }}
              >
                Our Vision
              </motion.h3>
              <p className="text-slate-300/80 leading-relaxed relative z-10">
                To be the global leader in AI model training and talent empowerment, fostering innovation and success for our clients, teams, and the tech ecosystem as a whole.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(0,255,255,0.16),transparent_70%)]" />
        
        {/* Animated vertical scan lines */}
        {Array.from({ length: 6 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute top-0 w-px h-full bg-gradient-to-b from-transparent via-cyan-400/30 to-transparent"
            style={{ left: `${15 + i * 15}%` }}
            animate={{
              y: ['-100%', '100%'],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 4 + i,
              repeat: Infinity,
              ease: "linear",
              delay: i * 0.5
            }}
          />
        ))}

        {/* Radar sweep effect */}
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96"
          style={{
            background: 'conic-gradient(from 0deg, transparent 0deg, rgba(34, 211, 238, 0.1) 60deg, transparent 120deg)',
          }}
          animate={{
            rotate: 360,
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.h2 
            className="text-3xl md:text-5xl font-semibold mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.8 }}
          >
            Interested? Come talk to us!
          </motion.h2>
          
          <motion.p 
            className="text-lg text-slate-300/80 mb-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            Whether you're looking to enhance your AI models or explore new opportunities, we're here to help. Let's discuss how we can collaborate and drive success together.
          </motion.p>
          
          <motion.button 
            className="group relative flex items-center gap-3 overflow-hidden rounded-full bg-gradient-to-r from-cyan-400 via-sky-500 to-indigo-500 px-10 py-4 text-base font-semibold text-[#06111F] shadow-[0_12px_30px_rgba(13,148,136,0.25)] mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            whileHover={{ 
              scale: 1.1, 
              y: -5,
              boxShadow: "0 25px 50px rgba(13,148,136,0.4)"
            }}
            whileTap={{ scale: 0.95 }}
          >
            {/* Shimmer effect */}
            <motion.span
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
              animate={{
                x: ['-200%', '200%']
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "linear",
                repeatDelay: 1
              }}
            />

            {/* Pulse rings */}
            <motion.span
              className="absolute inset-0 rounded-full border-2 border-white/30"
              animate={{
                scale: [1, 1.5],
                opacity: [1, 0]
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
              }}
            />

            <span className="relative z-10 flex items-center gap-2">
              Get in touch
              <motion.div
                animate={{ 
                  x: [0, 5, 0],
                }}
                transition={{ 
                  duration: 1.5, 
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <ArrowRight className="w-5 h-5" />
              </motion.div>
            </span>
          </motion.button>

          {/* Floating status indicators */}
          <motion.div
            className="mt-12 flex justify-center items-center gap-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <motion.div 
              className="flex items-center gap-2"
              whileHover={{ scale: 1.1 }}
            >
              <motion.div
                className="w-2 h-2 bg-emerald-400 rounded-full"
                animate={{
                  opacity: [1, 0.3, 1],
                  scale: [1, 1.3, 1]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                }}
              />
              <span className="text-sm text-slate-400">Available 24/7</span>
            </motion.div>
            
            <motion.div 
              className="flex items-center gap-2"
              whileHover={{ scale: 1.1 }}
            >
              <motion.div
                animate={{
                  rotate: 360
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "linear"
                }}
              >
                <Activity className="w-4 h-4 text-cyan-400" />
              </motion.div>
              <span className="text-sm text-slate-400">Real-time Support</span>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default About;