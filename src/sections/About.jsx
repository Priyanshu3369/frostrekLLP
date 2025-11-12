// import React, { useState, useEffect, useRef } from "react";
// import { motion, useInView } from "framer-motion";
// import FuturisticSection from "../components/FuturisticSection";

// const About = () => {
//   const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
//   const canvasRef = useRef(null);
//   const textRef = useRef(null);
//   const isInView = useInView(textRef, { once: true, amount: 0.3 });

//   useEffect(() => {
//     const handleMouseMove = (e) => {
//       setMousePosition({
//         x: (e.clientX / window.innerWidth - 0.5) * 20,
//         y: (e.clientY / window.innerHeight - 0.5) * 20,
//       });
//     };
//     window.addEventListener('mousemove', handleMouseMove);
//     return () => window.removeEventListener('mousemove', handleMouseMove);
//   }, []);

//   // Enhanced particle field with dynamic waves
//   useEffect(() => {
//     const canvas = canvasRef.current;
//     if (!canvas) return;
    
//     const ctx = canvas.getContext('2d');
    
//     const updateCanvasSize = () => {
//       canvas.width = canvas.offsetWidth;
//       canvas.height = canvas.offsetHeight;
//     };
    
//     updateCanvasSize();
//     window.addEventListener('resize', updateCanvasSize);

//     const particles = [];
//     const particleCount = 120;
//     const waves = [];
//     const waveCount = 3;
    
//     // Create particles
//     for (let i = 0; i < particleCount; i++) {
//       particles.push({
//         x: Math.random() * canvas.width,
//         y: Math.random() * canvas.height,
//         vx: (Math.random() - 0.5) * 0.5,
//         vy: (Math.random() - 0.5) * 0.5,
//         radius: Math.random() * 2 + 0.5,
//         opacity: Math.random() * 0.5 + 0.3,
//         pulseSpeed: Math.random() * 0.02 + 0.01,
//         pulsePhase: Math.random() * Math.PI * 2,
//       });
//     }

//     // Create waves
//     for (let i = 0; i < waveCount; i++) {
//       waves.push({
//         y: (canvas.height / waveCount) * i + Math.random() * 100,
//         amplitude: 40 + Math.random() * 30,
//         frequency: 0.003 + Math.random() * 0.002,
//         speed: 0.5 + Math.random() * 0.5,
//         offset: Math.random() * Math.PI * 2,
//         opacity: 0.03 + Math.random() * 0.02,
//       });
//     }

//     let time = 0;
//     let animationId;

//     const drawWave = (wave, time) => {
//       ctx.beginPath();
//       ctx.moveTo(0, wave.y);
      
//       for (let x = 0; x <= canvas.width; x += 5) {
//         const y = wave.y + Math.sin(x * wave.frequency + time * wave.speed + wave.offset) * wave.amplitude;
//         ctx.lineTo(x, y);
//       }
      
//       ctx.strokeStyle = `rgba(0, 255, 255, ${wave.opacity})`;
//       ctx.lineWidth = 1.5;
//       ctx.stroke();
//     };

//     const animate = () => {
//       ctx.fillStyle = 'rgba(11, 11, 14, 0.1)';
//       ctx.fillRect(0, 0, canvas.width, canvas.height);

//       time += 0.01;

//       // Draw flowing waves
//       waves.forEach(wave => {
//         drawWave(wave, time);
//       });

//       // Update and draw particles
//       particles.forEach((particle, i) => {
//         particle.x += particle.vx;
//         particle.y += particle.vy;

//         // Bounce off edges
//         if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
//         if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;

//         // Pulse effect
//         particle.pulsePhase += particle.pulseSpeed;
//         const pulseScale = 1 + Math.sin(particle.pulsePhase) * 0.3;

//         // Draw connections with nearby particles
//         particles.forEach((otherParticle, j) => {
//           if (i === j) return;
//           const dx = particle.x - otherParticle.x;
//           const dy = particle.y - otherParticle.y;
//           const distance = Math.sqrt(dx * dx + dy * dy);

//           if (distance < 150) {
//             const opacity = (1 - distance / 150) * 0.15;
//             ctx.beginPath();
//             ctx.strokeStyle = `rgba(0, 255, 255, ${opacity})`;
//             ctx.lineWidth = 0.5;
//             ctx.moveTo(particle.x, particle.y);
//             ctx.lineTo(otherParticle.x, otherParticle.y);
//             ctx.stroke();
//           }
//         });

//         // Draw particle with glow
//         const gradient = ctx.createRadialGradient(
//           particle.x, particle.y, 0,
//           particle.x, particle.y, particle.radius * pulseScale * 3
//         );
//         gradient.addColorStop(0, `rgba(0, 255, 255, ${particle.opacity})`);
//         gradient.addColorStop(0.5, `rgba(109, 40, 217, ${particle.opacity * 0.3})`);
//         gradient.addColorStop(1, 'rgba(20, 184, 166, 0)');
        
//         ctx.fillStyle = gradient;
//         ctx.beginPath();
//         ctx.arc(particle.x, particle.y, particle.radius * pulseScale * 3, 0, Math.PI * 2);
//         ctx.fill();

//         // Core particle
//         ctx.fillStyle = `rgba(0, 255, 255, ${particle.opacity})`;
//         ctx.beginPath();
//         ctx.arc(particle.x, particle.y, particle.radius * pulseScale, 0, Math.PI * 2);
//         ctx.fill();
//       });

//       animationId = requestAnimationFrame(animate);
//     };

//     animate();
    
//     return () => {
//       cancelAnimationFrame(animationId);
//       window.removeEventListener('resize', updateCanvasSize);
//     };
//   }, []);

//   const paragraph1 = "Frostrek LLP is a forward-thinking AI company dedicated to empowering businesses through advanced automation, data-driven strategies, and intelligent system design.";
//   const paragraph2 = "We bridge innovation with practical impact to help industries thrive in the digital age. With a deep focus on research, machine learning, and scalable solutions, our mission is to redefine how organizations leverage AI to create value, efficiency, and sustainability.";

//   const words1 = paragraph1.split(' ');
//   const words2 = paragraph2.split(' ');

//   return (
//     <FuturisticSection
//       id="about"
//       className="py-28"
//       containerClassName="relative mx-auto flex max-w-7xl flex-col gap-16 px-6 md:px-12"
//     >
//       <canvas
//         ref={canvasRef}
//         className="absolute inset-0 h-full w-full opacity-60"
//         style={{ mixBlendMode: "screen" }}
//       />

//         {/* Section Header */}
//         <motion.div
//           initial={{ opacity: 0, y: -30 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//           transition={{ duration: 0.8 }}
//           className="mb-16"
//         >
//           <motion.div
//             className="inline-flex items-center gap-3 mb-6"
//             initial={{ opacity: 0, x: -20 }}
//             whileInView={{ opacity: 1, x: 0 }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.6 }}
//           >
//             <motion.div
//               className="w-12 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-purple-600"
//               initial={{ width: 0 }}
//               whileInView={{ width: 48 }}
//               viewport={{ once: true }}
//               transition={{ duration: 0.8, delay: 0.3 }}
//             />
//             <span className="text-[#D1D5DB] text-sm font-medium tracking-wider uppercase">About Us</span>
//           </motion.div>
          
//           <h2 className="text-4xl md:text-6xl font-bold mb-4 tracking-tight overflow-hidden">
//             <motion.div
//               initial={{ opacity: 0 }}
//               whileInView={{ opacity: 1 }}
//               viewport={{ once: true }}
//               transition={{ duration: 0.5 }}
//             >
//               {"Frostrek LLP".split("").map((char, index) => (
//                 <motion.span
//                   key={index}
//                   className="inline-block text-[#FFFFFF]"
//                   initial={{ y: 100, opacity: 0, rotateX: -90 }}
//                   whileInView={{ 
//                     y: 0, 
//                     opacity: 1, 
//                     rotateX: 0,
//                   }}
//                   viewport={{ once: true }}
//                   transition={{
//                     duration: 0.8,
//                     delay: index * 0.08,
//                     ease: [0.22, 1, 0.36, 1],
//                   }}
//                   whileHover={{
//                     y: -10,
//                     scale: 1.2,
//                     color: "#00FFFF",
//                     textShadow: "0 0 20px rgba(0, 255, 255, 0.8)",
//                     transition: { duration: 0.2 }
//                   }}
//                   style={{
//                     display: char === " " ? "inline" : "inline-block",
//                     marginRight: char === " " ? "0.5rem" : "0",
//                   }}
//                 >
//                   {char === " " ? "\u00A0" : char}
//                 </motion.span>
//               ))}
//             </motion.div>
//           </h2>
//           <p className="text-xl text-[#D1D5DB] max-w-2xl">
//             <motion.span
//               initial={{ opacity: 0, y: 20 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true }}
//               transition={{ duration: 0.8, delay: 1.2 }}
//             >
//               Empowering businesses through intelligent AI solutions
//             </motion.span>
//           </p>
//         </motion.div>

//         <div className="grid md:grid-cols-2 gap-16 items-center">
//           {/* Left side - text */}
//           <motion.div
//             initial={{ opacity: 0, x: -50 }}
//             whileInView={{ opacity: 1, x: 0 }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.8 }}
//             className="space-y-8"
//           >
//             <div ref={textRef} className="space-y-6">
//               <p className="text-[#D1D5DB] text-lg leading-relaxed">
//                 {words1.map((word, index) => (
//                   <motion.span
//                     key={index}
//                     initial={{ opacity: 0, y: 10 }}
//                     animate={isInView ? { opacity: 1, y: 0 } : {}}
//                     transition={{ 
//                       duration: 0.3, 
//                       delay: index * 0.03,
//                       ease: "easeOut"
//                     }}
//                     className="inline-block mr-[0.25em]"
//                   >
//                     {word}
//                   </motion.span>
//                 ))}
//               </p>
              
//               <p className="text-[#9CA3AF] text-lg leading-relaxed">
//                 {words2.map((word, index) => (
//                   <motion.span
//                     key={index}
//                     initial={{ opacity: 0, y: 10 }}
//                     animate={isInView ? { opacity: 1, y: 0 } : {}}
//                     transition={{ 
//                       duration: 0.3, 
//                       delay: (words1.length * 0.03) + (index * 0.03),
//                       ease: "easeOut"
//                     }}
//                     className="inline-block mr-[0.25em]"
//                   >
//                     {word}
//                   </motion.span>
//                 ))}
//               </p>
//             </div>

//             {/* Stats */}
//             <motion.div
//               className="grid grid-cols-3 gap-6 pt-8 border-t border-cyan-500/20"
//               initial={{ opacity: 0, y: 30 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true }}
//               transition={{ duration: 0.8, delay: 0.4 }}
//             >
//               {[
//                 { label: 'AI Models', value: '50+' },
//                 { label: 'Clients', value: '200+' },
//                 { label: 'Accuracy', value: '99%' },
//               ].map((stat, idx) => (
//                 <motion.div
//                   key={stat.label}
//                   className="group"
//                   initial={{ opacity: 0, y: 20 }}
//                   whileInView={{ opacity: 1, y: 0 }}
//                   viewport={{ once: true }}
//                   transition={{ duration: 0.6, delay: 0.5 + idx * 0.1 }}
//                 >
//                   <motion.div
//                     className="text-3xl font-bold text-[#FFFFFF] mb-1 bg-gradient-to-r from-[#00FFFF] to-[#6D28D9] bg-clip-text text-transparent"
//                     whileHover={{ scale: 1.05 }}
//                     transition={{ duration: 0.2 }}
//                   >
//                     {stat.value}
//                   </motion.div>
//                   <div className="text-sm text-[#9CA3AF] uppercase tracking-wide">{stat.label}</div>
//                   <motion.div
//                     className="h-[1px] bg-gradient-to-r from-cyan-500 via-purple-600 to-transparent mt-2"
//                     initial={{ width: 0 }}
//                     whileInView={{ width: '100%' }}
//                     viewport={{ once: true }}
//                     transition={{ duration: 0.6, delay: 0.7 + idx * 0.1 }}
//                   />
//                 </motion.div>
//               ))}
//             </motion.div>

//             {/* Key features */}
//             <motion.div
//               className="space-y-4 pt-6"
//               initial={{ opacity: 0 }}
//               whileInView={{ opacity: 1 }}
//               viewport={{ once: true }}
//               transition={{ duration: 0.8, delay: 0.6 }}
//             >
//               {[
//                 'Advanced Machine Learning',
//                 'Scalable AI Solutions',
//                 'Data-Driven Insights',
//               ].map((feature, idx) => (
//                 <motion.div
//                   key={feature}
//                   className="flex items-center gap-3 group"
//                   initial={{ opacity: 0, x: -20 }}
//                   whileInView={{ opacity: 1, x: 0 }}
//                   viewport={{ once: true }}
//                   transition={{ duration: 0.6, delay: 0.7 + idx * 0.1 }}
//                 >
//                   <motion.div
//                     className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_10px_rgba(0,255,255,0.5)]"
//                     whileHover={{ scale: 1.5 }}
//                     transition={{ duration: 0.2 }}
//                   />
//                   <span className="text-[#9CA3AF] group-hover:text-cyan-400 transition-colors duration-300">
//                     {feature}
//                   </span>
//                 </motion.div>
//               ))}
//             </motion.div>
//           </motion.div>

//           {/* Right side - Enhanced visualization */}
//           <motion.div
//             initial={{ opacity: 0, x: 50 }}
//             whileInView={{ opacity: 1, x: 0 }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.8 }}
//             className="relative h-[500px] flex items-center justify-center"
//           >
//             <motion.div 
//               className="relative z-10"
//               style={{
//                 rotateY: mousePosition.x * 0.3,
//                 rotateX: -mousePosition.y * 0.3,
//               }}
//               transition={{ type: "spring", stiffness: 100, damping: 20 }}
//             >
//               {/* Rotating rings with gradient */}
//               {[0, 1, 2].map((i) => (
//                 <motion.div
//                   key={i}
//                   className="absolute top-1/2 left-1/2"
//                   style={{
//                     marginLeft: `-${100 + i * 40}px`,
//                     marginTop: `-${100 + i * 40}px`,
//                   }}
//                   animate={{ 
//                     rotate: i % 2 === 0 ? 360 : -360,
//                   }}
//                   transition={{ 
//                     duration: 30 - i * 5, 
//                     repeat: Infinity, 
//                     ease: "linear" 
//                   }}
//                 >
//                   <div 
//                     className="rounded-full border-2"
//                     style={{
//                       width: `${200 + i * 80}px`,
//                       height: `${200 + i * 80}px`,
//                       borderImage: 'linear-gradient(45deg, rgba(0, 255, 255, 0.3), rgba(109, 40, 217, 0.5), rgba(20, 184, 166, 0.3)) 1',
//                     }}
//                   />
//                 </motion.div>
//               ))}

//               {/* Central core with pulsing effect */}
//               <motion.div
//                 className="relative w-24 h-24 flex items-center justify-center"
//                 animate={{ 
//                   rotate: 360,
//                 }}
//                 transition={{ 
//                   duration: 20, 
//                   repeat: Infinity, 
//                   ease: "linear" 
//                 }}
//               >
//                 <div className="relative w-20 h-20 bg-[#0B0B0E] rounded-full flex items-center justify-center border-2 border-cyan-500/50 shadow-lg shadow-cyan-500/30">
//                   <div className="text-2xl font-bold bg-gradient-to-br from-cyan-400 via-purple-500 to-teal-400 bg-clip-text text-transparent">AI</div>
//                 </div>
                
//                 {/* Multiple pulse rings */}
//                 {[0, 1, 2].map((i) => (
//                   <motion.div
//                     key={i}
//                     className="absolute inset-0 border-2 border-cyan-500/30 rounded-full"
//                     animate={{ 
//                       scale: [1, 1.5, 1],
//                       opacity: [0.5, 0, 0.5],
//                     }}
//                     transition={{ 
//                       duration: 3, 
//                       repeat: Infinity,
//                       delay: i * 1,
//                     }}
//                   />
//                 ))}
//               </motion.div>

//               {/* Enhanced orbiting dots with trails */}
//               {[...Array(6)].map((_, i) => {
//                 const angle = (i * Math.PI * 2) / 6;
//                 const radius = 140;
//                 return (
//                   <motion.div
//                     key={i}
//                     className="absolute left-1/2 top-1/2"
//                     animate={{
//                       x: Math.cos(angle) * radius,
//                       y: Math.sin(angle) * radius,
//                       scale: [1, 1.3, 1],
//                     }}
//                     transition={{
//                       x: { duration: 0 },
//                       y: { duration: 0 },
//                       scale: {
//                         duration: 2,
//                         repeat: Infinity,
//                         delay: i * 0.3,
//                         ease: "easeInOut",
//                       }
//                     }}
//                   >
//                     <div className="relative">
//                       <div className="w-3 h-3 bg-cyan-400 rounded-full shadow-lg shadow-cyan-400/70" />
//                       <motion.div
//                         className="absolute inset-0 w-3 h-3 bg-purple-400 rounded-full blur-sm"
//                         animate={{
//                           scale: [1, 2, 1],
//                           opacity: [0.8, 0, 0.8],
//                         }}
//                         transition={{
//                           duration: 2,
//                           repeat: Infinity,
//                           delay: i * 0.3,
//                         }}
//                       />
//                     </div>
//                   </motion.div>
//                 );
//               })}
//             </motion.div>

//             {/* Enhanced corner elements */}
//             <motion.div
//               className="absolute top-8 right-8 w-16 h-16 border-t-2 border-r-2 border-cyan-500/40"
//               initial={{ opacity: 0, scale: 0.8 }}
//               whileInView={{ opacity: 1, scale: 1 }}
//               viewport={{ once: true }}
//               transition={{ duration: 0.6, delay: 0.5 }}
//             />
//             <motion.div
//               className="absolute bottom-8 left-8 w-16 h-16 border-b-2 border-l-2 border-purple-500/40"
//               initial={{ opacity: 0, scale: 0.8 }}
//               whileInView={{ opacity: 1, scale: 1 }}
//               viewport={{ once: true }}
//               transition={{ duration: 0.6, delay: 0.7 }}
//             />
//           </motion.div>
//         </div>
//       </div>
//     </FuturisticSection>
//   );
// };

// export default About;




import React, { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import FuturisticSection from "../components/FuturisticSection";

const About = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const canvasRef = useRef(null);
  const textRef = useRef(null);
  const isInView = useInView(textRef, { once: true, amount: 0.3 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Enhanced particle field with dynamic waves
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");

    const updateCanvasSize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    updateCanvasSize();
    window.addEventListener("resize", updateCanvasSize);

    const particles = [];
    const particleCount = 120;
    const waves = [];
    const waveCount = 3;

    // Create particles
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        radius: Math.random() * 2 + 0.5,
        opacity: Math.random() * 0.5 + 0.3,
        pulseSpeed: Math.random() * 0.02 + 0.01,
        pulsePhase: Math.random() * Math.PI * 2,
      });
    }

    // Create waves
    for (let i = 0; i < waveCount; i++) {
      waves.push({
        y: (canvas.height / waveCount) * i + Math.random() * 100,
        amplitude: 40 + Math.random() * 30,
        frequency: 0.003 + Math.random() * 0.002,
        speed: 0.5 + Math.random() * 0.5,
        offset: Math.random() * Math.PI * 2,
        opacity: 0.03 + Math.random() * 0.02,
      });
    }

    let time = 0;
    let animationId;

    const drawWave = (wave, time) => {
      ctx.beginPath();
      ctx.moveTo(0, wave.y);

      for (let x = 0; x <= canvas.width; x += 5) {
        const y =
          wave.y +
          Math.sin(x * wave.frequency + time * wave.speed + wave.offset) *
            wave.amplitude;
        ctx.lineTo(x, y);
      }

      ctx.strokeStyle = `rgba(0, 255, 255, ${wave.opacity})`;
      ctx.lineWidth = 1.5;
      ctx.stroke();
    };

    const animate = () => {
      ctx.fillStyle = "rgba(11, 11, 14, 0.1)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      time += 0.01;

      // Draw flowing waves
      waves.forEach((wave) => {
        drawWave(wave, time);
      });

      // Update and draw particles
      particles.forEach((particle, i) => {
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Bounce off edges
        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;

        // Pulse effect
        particle.pulsePhase += particle.pulseSpeed;
        const pulseScale = 1 + Math.sin(particle.pulsePhase) * 0.3;

        // Draw connections with nearby particles
        particles.forEach((otherParticle, j) => {
          if (i === j) return;
          const dx = particle.x - otherParticle.x;
          const dy = particle.y - otherParticle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 150) {
            const opacity = (1 - distance / 150) * 0.15;
            ctx.beginPath();
            ctx.strokeStyle = `rgba(0, 255, 255, ${opacity})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(otherParticle.x, otherParticle.y);
            ctx.stroke();
          }
        });

        // Draw particle with glow
        const gradient = ctx.createRadialGradient(
          particle.x,
          particle.y,
          0,
          particle.x,
          particle.y,
          particle.radius * pulseScale * 3
        );
        gradient.addColorStop(
          0,
          `rgba(0, 255, 255, ${particle.opacity})`
        );
        gradient.addColorStop(
          0.5,
          `rgba(109, 40, 217, ${particle.opacity * 0.3})`
        );
        gradient.addColorStop(1, "rgba(20, 184, 166, 0)");

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(
          particle.x,
          particle.y,
          particle.radius * pulseScale * 3,
          0,
          Math.PI * 2
        );
        ctx.fill();

        // Core particle
        ctx.fillStyle = `rgba(0, 255, 255, ${particle.opacity})`;
        ctx.beginPath();
        ctx.arc(
          particle.x,
          particle.y,
          particle.radius * pulseScale,
          0,
          Math.PI * 2
        );
        ctx.fill();
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", updateCanvasSize);
    };
  }, []);

  const paragraph1 =
    "Frostrek LLP is a forward-thinking AI company dedicated to empowering businesses through advanced automation, data-driven strategies, and intelligent system design.";
  const paragraph2 =
    "We bridge innovation with practical impact to help industries thrive in the digital age. With a deep focus on research, machine learning, and scalable solutions, our mission is to redefine how organizations leverage AI to create value, efficiency, and sustainability.";

  const words1 = paragraph1.split(" ");
  const words2 = paragraph2.split(" ");

  return (
    <FuturisticSection
      id="about"
      className="py-28"
      containerClassName="relative mx-auto flex max-w-7xl flex-col gap-16 px-6 md:px-12"
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 h-full w-full opacity-60"
        style={{ mixBlendMode: "screen" }}
      />

      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="mb-16"
      >
        <motion.div
          className="inline-flex items-center gap-3 mb-6"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className="w-12 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-purple-600"
            initial={{ width: 0 }}
            whileInView={{ width: 48 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          />
          <span className="text-[#D1D5DB] text-sm font-medium tracking-wider uppercase">
            About Us
          </span>
        </motion.div>

        <h2 className="text-4xl md:text-6xl font-bold mb-4 tracking-tight overflow-hidden">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            {"Frostrek LLP".split("").map((char, index) => (
              <motion.span
                key={index}
                className="inline-block text-[#FFFFFF]"
                initial={{ y: 100, opacity: 0, rotateX: -90 }}
                whileInView={{
                  y: 0,
                  opacity: 1,
                  rotateX: 0,
                }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.8,
                  delay: index * 0.08,
                  ease: [0.22, 1, 0.36, 1],
                }}
                whileHover={{
                  y: -10,
                  scale: 1.2,
                  color: "#00FFFF",
                  textShadow: "0 0 20px rgba(0, 255, 255, 0.8)",
                  transition: { duration: 0.2 },
                }}
                style={{
                  display: char === " " ? "inline" : "inline-block",
                  marginRight: char === " " ? "0.5rem" : "0",
                }}
              >
                {char === " " ? "\u00A0" : char}
              </motion.span>
            ))}
          </motion.div>
        </h2>
        <p className="text-xl text-[#D1D5DB] max-w-2xl">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 1.2 }}
          >
            Empowering businesses through intelligent AI solutions
          </motion.span>
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-16 items-center">
        {/* Left side - text */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="space-y-8"
        >
          <div ref={textRef} className="space-y-6">
            <p className="text-[#D1D5DB] text-lg leading-relaxed">
              {words1.map((word, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{
                    duration: 0.3,
                    delay: index * 0.03,
                    ease: "easeOut",
                  }}
                  className="inline-block mr-[0.25em]"
                >
                  {word}
                </motion.span>
              ))}
            </p>

            <p className="text-[#9CA3AF] text-lg leading-relaxed">
              {words2.map((word, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{
                    duration: 0.3,
                    delay: words1.length * 0.03 + index * 0.03,
                    ease: "easeOut",
                  }}
                  className="inline-block mr-[0.25em]"
                >
                  {word}
                </motion.span>
              ))}
            </p>
          </div>

          {/* Stats */}
          <motion.div
            className="grid grid-cols-3 gap-6 pt-8 border-t border-cyan-500/20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {[
              { label: "AI Models", value: "50+" },
              { label: "Clients", value: "200+" },
              { label: "Accuracy", value: "99%" },
            ].map((stat, idx) => (
              <motion.div
                key={stat.label}
                className="group"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.5 + idx * 0.1 }}
              >
                <motion.div
                  className="text-3xl font-bold text-[#FFFFFF] mb-1 bg-gradient-to-r from-[#00FFFF] to-[#6D28D9] bg-clip-text text-transparent"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                >
                  {stat.value}
                </motion.div>
                <div className="text-sm text-[#9CA3AF] uppercase tracking-wide">
                  {stat.label}
                </div>
                <motion.div
                  className="h-[1px] bg-gradient-to-r from-cyan-500 via-purple-600 to-transparent mt-2"
                  initial={{ width: 0 }}
                  whileInView={{ width: "100%" }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.7 + idx * 0.1 }}
                />
              </motion.div>
            ))}
          </motion.div>

          {/* Key features */}
          <motion.div
            className="space-y-4 pt-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            {[
              "Advanced Machine Learning",
              "Scalable AI Solutions",
              "Data-Driven Insights",
            ].map((feature, idx) => (
              <motion.div
                key={feature}
                className="flex items-center gap-3 group"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.7 + idx * 0.1 }}
              >
                <motion.div
                  className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_10px_rgba(0,255,255,0.5)]"
                  whileHover={{ scale: 1.5 }}
                  transition={{ duration: 0.2 }}
                />
                <span className="text-[#9CA3AF] group-hover:text-cyan-400 transition-colors duration-300">
                  {feature}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Right side - Enhanced visualization */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative h-[500px] flex items-center justify-center"
        >
          <motion.div
            className="relative z-10"
            style={{
              rotateY: mousePosition.x * 0.3,
              rotateX: -mousePosition.y * 0.3,
            }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
          >
            {/* Rotating rings with gradient */}
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="absolute top-1/2 left-1/2"
                style={{
                  marginLeft: `-${100 + i * 40}px`,
                  marginTop: `-${100 + i * 40}px`,
                }}
                animate={{
                  rotate: i % 2 === 0 ? 360 : -360,
                }}
                transition={{
                  duration: 30 - i * 5,
                  repeat: Infinity,
                  ease: "linear",
                }}
              >
                <div
                  className="rounded-full border-2"
                  style={{
                    width: `${200 + i * 80}px`,
                    height: `${200 + i * 80}px`,
                    borderImage:
                      "linear-gradient(45deg, rgba(0, 255, 255, 0.3), rgba(109, 40, 217, 0.5), rgba(20, 184, 166, 0.3)) 1",
                  }}
                />
              </motion.div>
            ))}

            {/* Central core with pulsing effect */}
            <motion.div
              className="relative w-24 h-24 flex items-center justify-center"
              animate={{
                rotate: 360,
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              <div className="relative w-20 h-20 bg-[#0B0B0E] rounded-full flex items-center justify-center border-2 border-cyan-500/50 shadow-lg shadow-cyan-500/30">
                <div className="text-2xl font-bold bg-gradient-to-br from-cyan-400 via-purple-500 to-teal-400 bg-clip-text text-transparent">
                  AI
                </div>
              </div>

              {/* Multiple pulse rings */}
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="absolute inset-0 border-2 border-cyan-500/30 rounded-full"
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.5, 0, 0.5],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    delay: i * 1,
                  }}
                />
              ))}
            </motion.div>

            {/* Enhanced orbiting dots with trails */}
            {[...Array(6)].map((_, i) => {
              const angle = (i * Math.PI * 2) / 6;
              const radius = 140;
              return (
                <motion.div
                  key={i}
                  className="absolute left-1/2 top-1/2"
                  animate={{
                    x: Math.cos(angle) * radius,
                    y: Math.sin(angle) * radius,
                    scale: [1, 1.3, 1],
                  }}
                  transition={{
                    x: { duration: 0 },
                    y: { duration: 0 },
                    scale: {
                      duration: 2,
                      repeat: Infinity,
                      delay: i * 0.3,
                      ease: "easeInOut",
                    },
                  }}
                >
                  <div className="relative">
                    <div className="w-3 h-3 bg-cyan-400 rounded-full shadow-lg shadow-cyan-400/70" />
                    <motion.div
                      className="absolute inset-0 w-3 h-3 bg-purple-400 rounded-full blur-sm"
                      animate={{
                        scale: [1, 2, 1],
                        opacity: [0.8, 0, 0.8],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: i * 0.3,
                      }}
                    />
                  </div>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Enhanced corner elements */}
          <motion.div
            className="absolute top-8 right-8 w-16 h-16 border-t-2 border-r-2 border-cyan-500/40"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
          />
          <motion.div
            className="absolute bottom-8 left-8 w-16 h-16 border-b-2 border-l-2 border-purple-500/40"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.7 }}
          />
        </motion.div>
      </div>
    </FuturisticSection>
  );
};

export default About;
