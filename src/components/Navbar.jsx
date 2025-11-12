import { useState, useEffect } from "react";
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { Menu, X, Sparkles, Zap, TrendingUp, Cpu, Brain, Code } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const { scrollY } = useScroll();
  
  const navOpacity = useTransform(scrollY, [0, 100], [0.85, 1]);
  const navBlur = useTransform(scrollY, [0, 100], [20, 40]);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothMouseX = useSpring(mouseX, { damping: 30, stiffness: 200 });
  const smoothMouseY = useSpring(mouseY, { damping: 30, stiffness: 200 });

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    const handleMouseMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("mousemove", handleMouseMove);
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [mouseX, mouseY]);

  const navLinks = [
    { name: "Home", icon: Sparkles },
    { name: "About", icon: Brain },
    { name: "Services", icon: Code },
    { name: "Why Choose Us", icon: TrendingUp },
    { name: "Features", icon: Cpu },
    { name: "FAQs", icon: Zap },
    { name: "Testimonials", icon: Sparkles },
    { name: "Collaborate", icon: Brain },
  ];

  return (
    <>
      {/* Holographic top bar */}
      <motion.div
        className="fixed top-0 left-0 w-full h-1 z-[60] overflow-hidden"
        style={{ opacity: navOpacity }}
      >
        <motion.div
          className="h-full bg-gradient-to-r from-transparent via-cyan-400 to-transparent"
          animate={{
            x: ["-100%", "200%"],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{ width: "50%" }}
        />
        <motion.div
          className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-purple-500/50 via-cyan-500/50 to-teal-500/50"
          animate={{
            backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{
            backgroundSize: "200% 200%",
            filter: "blur(10px)",
          }}
        />
      </motion.div>

      <motion.nav
        style={{ 
          opacity: navOpacity,
          backdropFilter: navBlur.get() ? `blur(${navBlur.get()}px)` : "blur(20px)",
        }}
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-700 ${
          scrolled
            ? "bg-[#0B0B0E]/95 shadow-[0_0_50px_rgba(0,255,255,0.15)] border-b-2 border-cyan-500/30"
            : "bg-[#0B0B0E]/70 border-b border-[#1E1E23]/20"
        }`}
      >
        {/* Animated particles in navbar */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-cyan-400/30 rounded-full"
              style={{
                left: `${(i * 7) % 100}%`,
                top: "50%",
              }}
              animate={{
                y: [-20, 20, -20],
                opacity: [0, 1, 0],
                scale: [0, 1.5, 0],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: i * 0.2,
              }}
            />
          ))}
        </div>

        <div className="container mx-auto flex justify-between items-center px-6 py-4 relative z-10">
          {/* Ultra Advanced Logo */}
          <motion.div
            initial={{ opacity: 0, x: -50, rotateY: -90 }}
            animate={{ opacity: 1, x: 0, rotateY: 0 }}
            transition={{ duration: 1, type: "spring" }}
            className="relative group cursor-pointer"
          >
            {/* Logo outer glow ring */}
            <motion.div
              className="absolute -inset-4 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              animate={{
                rotate: 360,
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "linear",
              }}
              style={{
                background: "conic-gradient(from 0deg, #00FFFF, #6D28D9, #14B8A6, #00FFFF)",
                filter: "blur(20px)",
              }}
            />
            
            {/* Logo container */}
            <motion.div
              className="relative flex items-center gap-3"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              {/* Animated logo icon */}
              <motion.div
                className="relative w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-500/20 to-purple-600/20 border border-cyan-500/50 flex items-center justify-center overflow-hidden"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.8 }}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-purple-600 opacity-20"
                  animate={{
                    scale: [1, 1.5, 1],
                    rotate: [0, 180, 360],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                  }}
                />
                <Brain className="w-5 h-5 text-cyan-400 relative z-10" />
              </motion.div>

              {/* Logo text */}
              <motion.h1
                className="text-2xl font-bold relative"
                style={{
                  background: "linear-gradient(90deg, #00FFFF, #6D28D9, #14B8A6, #00FFFF)",
                  backgroundSize: "200% 100%",
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  filter: "drop-shadow(0 0 20px rgba(0,255,255,0.5))",
                }}
                animate={{
                  backgroundPosition: ["0%", "200%"],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "linear",
                }}
              >
                Frostrek
              </motion.h1>

              {/* Floating sparkles */}
              <motion.div
                className="absolute -top-2 -right-2"
                animate={{
                  rotate: [0, 360],
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                }}
              >
                <Sparkles className="w-4 h-4 text-cyan-400" />
              </motion.div>
            </motion.div>

            {/* Pulsing glow effect */}
            <motion.div
              className="absolute -inset-6 bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-teal-500/20 rounded-full blur-2xl opacity-0 group-hover:opacity-100"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
              }}
            />
          </motion.div>

          {/* Ultra Advanced Desktop Links */}
          <ul className="hidden md:flex gap-1 text-[#D1D5DB] text-sm font-medium relative">
            {/* Background indicator */}
            <motion.div
              className="absolute h-full bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-teal-500/10 rounded-full"
              initial={false}
              animate={{
                width: activeIndex !== null ? "120px" : "0px",
                x: activeIndex * 130,
              }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            />

            {navLinks.map((link, index) => {
              const Icon = link.icon;
              return (
                <motion.li
                  key={link.name}
                  initial={{ opacity: 0, y: -30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05, type: "spring" }}
                  onHoverStart={() => setActiveIndex(index)}
                  onHoverEnd={() => setActiveIndex(null)}
                  className="cursor-pointer relative px-4 py-2 rounded-full group"
                >
                  <motion.div
                    className="relative z-10 flex items-center gap-2"
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    {/* Icon with animation */}
                    <motion.div
                      className="opacity-0 group-hover:opacity-100"
                      animate={{
                        rotate: [0, 360],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    >
                      <Icon className="w-4 h-4 text-cyan-400" />
                    </motion.div>

                    {/* Text */}
                    <motion.span
                      className="relative group-hover:text-cyan-300 transition-colors duration-300"
                      whileHover={{
                        textShadow: "0 0 20px rgba(0,255,255,0.8)",
                      }}
                    >
                      {link.name}
                    </motion.span>

                    {/* Glowing dot */}
                    <motion.span
                      className="absolute -right-2 top-0 w-2 h-2 rounded-full bg-cyan-400"
                      initial={{ opacity: 0, scale: 0 }}
                      whileHover={{ opacity: 1, scale: 1 }}
                      animate={{
                        boxShadow: [
                          "0 0 0px rgba(0,255,255,0.5)",
                          "0 0 20px rgba(0,255,255,1)",
                          "0 0 0px rgba(0,255,255,0.5)",
                        ],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                      }}
                    />
                  </motion.div>

                  {/* Bottom glow line */}
                  <motion.span
                    className="absolute bottom-0 left-1/2 h-[2px] bg-gradient-to-r from-cyan-500 via-purple-500 to-teal-500 shadow-[0_0_10px_rgba(0,255,255,0.8)]"
                    initial={{ width: 0, x: "-50%" }}
                    whileHover={{ width: "100%", x: "-50%" }}
                    transition={{ duration: 0.3 }}
                  />

                  {/* Particles on hover */}
                  <motion.div
                    className="absolute inset-0 pointer-events-none"
                    whileHover={{
                      background: "radial-gradient(circle at center, rgba(0,255,255,0.1) 0%, transparent 70%)",
                    }}
                  >
                    {[...Array(3)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute w-1 h-1 bg-cyan-400 rounded-full opacity-0 group-hover:opacity-100"
                        style={{
                          left: `${30 + i * 20}%`,
                          top: "50%",
                        }}
                        animate={{
                          y: [0, -20, -40],
                          opacity: [0, 1, 0],
                          scale: [0, 1, 0],
                        }}
                        transition={{
                          duration: 1,
                          repeat: Infinity,
                          delay: i * 0.2,
                        }}
                      />
                    ))}
                  </motion.div>
                </motion.li>
              );
            })}
          </ul>

          {/* Ultra Advanced Mobile Menu Button */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="md:hidden text-[#D1D5DB] hover:text-[#00FFFF] transition-colors duration-300 relative p-2"
            onClick={() => setIsOpen(!isOpen)}
          >
            {/* Button background glow */}
            <motion.div
              className="absolute inset-0 rounded-lg bg-gradient-to-r from-cyan-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100"
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 180, 360],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
              }}
            />

            {/* Icon with 3D rotation */}
            <motion.div
              animate={{ 
                rotateY: isOpen ? 180 : 0,
                rotateZ: isOpen ? 90 : 0,
              }}
              transition={{ duration: 0.5, type: "spring" }}
              className="relative z-10"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </motion.div>

            {/* Orbiting particles */}
            {[...Array(4)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-cyan-400 rounded-full"
                animate={{
                  rotate: 360,
                  scale: [1, 1.5, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.5,
                }}
                style={{
                  top: "50%",
                  left: "50%",
                  transformOrigin: `${20 + i * 5}px 0px`,
                }}
              />
            ))}
          </motion.button>
        </div>

        {/* Ultra Advanced Mobile Menu */}
        <motion.div
          initial={false}
          animate={{
            height: isOpen ? "auto" : 0,
            opacity: isOpen ? 1 : 0,
          }}
          transition={{ duration: 0.5, type: "spring" }}
          className="md:hidden overflow-hidden bg-[#0B0B0E]/98 backdrop-blur-3xl border-t border-cyan-500/20 relative"
        >
          {/* Animated background pattern */}
          <div className="absolute inset-0 opacity-20">
            <motion.div
              className="absolute inset-0"
              style={{
                backgroundImage: `
                  linear-gradient(rgba(0,255,255,0.1) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(0,255,255,0.1) 1px, transparent 1px)
                `,
                backgroundSize: "30px 30px",
              }}
              animate={{
                backgroundPosition: ["0px 0px", "30px 30px"],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "linear",
              }}
            />
          </div>

          <ul className="flex flex-col items-center py-6 space-y-4 text-[#D1D5DB] font-medium relative z-10">
            {navLinks.map((link, index) => {
              const Icon = link.icon;
              return (
                <motion.li
                  key={link.name}
                  initial={{ opacity: 0, x: -50, rotateY: -90 }}
                  animate={{ 
                    opacity: isOpen ? 1 : 0, 
                    x: isOpen ? 0 : -50,
                    rotateY: isOpen ? 0 : -90,
                  }}
                  transition={{ 
                    delay: index * 0.05,
                    type: "spring",
                    stiffness: 200,
                  }}
                  className="cursor-pointer hover:text-[#00FFFF] transition-all duration-300 w-full text-center py-3 relative group"
                  onClick={() => setIsOpen(false)}
                >
                  <motion.div
                    className="flex items-center justify-center gap-3"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <motion.div
                      animate={{
                        rotate: [0, 360],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    >
                      <Icon className="w-5 h-5 text-cyan-400" />
                    </motion.div>
                    <span className="relative">
                      {link.name}
                      <motion.span
                        className="absolute -bottom-1 left-0 h-[2px] bg-gradient-to-r from-cyan-500 to-purple-500 shadow-[0_0_10px_rgba(0,255,255,0.8)]"
                        initial={{ width: 0 }}
                        whileHover={{ width: "100%" }}
                      />
                    </span>
                  </motion.div>

                  {/* Hover glow effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    animate={{
                      x: ["-100%", "100%"],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                    }}
                  />
                </motion.li>
              );
            })}
          </ul>

          {/* Bottom accent line */}
          <motion.div
            className="h-1 bg-gradient-to-r from-transparent via-cyan-500 to-transparent"
            animate={{
              x: ["-100%", "100%"],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        </motion.div>
      </motion.nav>
    </>
  );
};

export default Navbar;