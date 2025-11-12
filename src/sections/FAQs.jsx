import { useState, useEffect } from "react";
import { ChevronDown, Sparkles, Zap } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import FuturisticSection from "../components/FuturisticSection";

const faqs = [
  {
    question: "What services does Frostrek LLP offer?",
    answer:
      "Frostrek LLP specializes in AI automation, data analytics, NLP, computer vision, and AI system integration across industries.",
    icon: "🤖",
  },
  {
    question: "Do you provide custom AI model development?",
    answer:
      "Yes, we build and train custom AI models tailored to your business needs, ensuring optimal performance and scalability.",
    icon: "⚡",
  },
  {
    question: "Can Frostrek integrate AI into existing systems?",
    answer:
      "Absolutely. Our integration experts ensure that AI solutions blend seamlessly into your current workflows and platforms.",
    icon: "🔗",
  },
  {
    question: "How do I collaborate with Frostrek?",
    answer:
      "You can reach out through our collaboration form or schedule a consultation with our AI strategy team.",
    icon: "🚀",
  },
];

const HexPattern = () => {
  return (
    <div className="absolute inset-0 overflow-hidden opacity-5">
      <svg width="100%" height="100%">
        <defs>
          <pattern id="hex-faq" width="60" height="52" patternUnits="userSpaceOnUse">
            <path
              d="M30,0 L56,15 L56,45 L30,60 L4,45 L4,15 Z"
              fill="none"
              stroke="rgba(0, 255, 255, 0.5)"
              strokeWidth="0.5"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#hex-faq)" />
      </svg>
    </div>
  );
};

const ParticleField = () => {
  return (
    <>
      {[...Array(30)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-cyan-400 rounded-full"
          initial={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            opacity: 0,
          }}
          animate={{
            y: [null, Math.random() * window.innerHeight],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2,
            ease: "easeInOut",
          }}
        />
      ))}
    </>
  );
};

const FAQItem = ({ faq, index, isOpen, onToggle }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, x: -50, rotateY: -15 }}
      whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="relative group"
      style={{ transformStyle: "preserve-3d" }}
    >
      {/* Holographic Glow */}
      <motion.div
        className="absolute -inset-0.5 rounded-2xl opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500"
        style={{
          background: "linear-gradient(90deg, #00FFFF, #6D28D9, #14B8A6, #00FFFF)",
          backgroundSize: "300% 300%",
        }}
        animate={{
          backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
        }}
        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
      />

      <div
        className={`relative bg-gradient-to-br from-[#0D0D10] via-[#0B0B0E] to-[#0B0B0E] rounded-2xl border transition-all duration-500 overflow-hidden backdrop-blur-sm ${
          isOpen
            ? "border-cyan-400 shadow-lg shadow-cyan-500/30"
            : "border-cyan-500/20 hover:border-cyan-400/50"
        }`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Scan Line */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/20 to-transparent"
              initial={{ y: "-100%" }}
              animate={{ y: "200%" }}
              exit={{ y: "200%" }}
              transition={{ duration: 1.5, ease: "linear" }}
            />
          )}
        </AnimatePresence>

        {/* Digital Grid Overlay */}
        <div className="absolute inset-0 opacity-[0.03]">
          <div
            className="w-full h-full"
            style={{
              backgroundImage: `
                repeating-linear-gradient(0deg, rgba(0, 255, 255, 0.5) 0px, rgba(0, 255, 255, 0.5) 1px, transparent 1px, transparent 3px),
                repeating-linear-gradient(90deg, rgba(0, 255, 255, 0.5) 0px, rgba(0, 255, 255, 0.5) 1px, transparent 1px, transparent 3px)
              `,
            }}
          />
        </div>

        {/* Corner Accents */}
        <motion.div
          className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-cyan-400 opacity-0 transition-opacity duration-300"
          animate={{ opacity: isOpen ? 1 : 0 }}
        />
        <motion.div
          className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-purple-500 opacity-0 transition-opacity duration-300"
          animate={{ opacity: isOpen ? 1 : 0 }}
        />
        <motion.div
          className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-purple-500 opacity-0 transition-opacity duration-300"
          animate={{ opacity: isOpen ? 1 : 0 }}
        />
        <motion.div
          className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-cyan-400 opacity-0 transition-opacity duration-300"
          animate={{ opacity: isOpen ? 1 : 0 }}
        />

        {/* Question Button */}
        <button
          className="relative w-full flex items-center justify-between px-6 py-5 text-left focus:outline-none group z-10"
          onClick={onToggle}
        >
          <div className="flex items-center gap-4 flex-1">
            {/* Icon with Pulse */}
            <motion.div
              className="relative flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500/20 to-purple-500/20 border border-cyan-400/30"
              whileHover={{ scale: 1.1, rotate: 5 }}
            >
              <motion.div
                className="absolute inset-0 rounded-xl bg-cyan-400/20"
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.5, 0, 0.5],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <span className="text-2xl relative z-10">{faq.icon}</span>
            </motion.div>

            {/* Question Text */}
            <span className="text-lg font-semibold text-[#FFFFFF] group-hover:text-cyan-400 transition-colors duration-300">
              {faq.question}
            </span>
          </div>

          {/* Animated Chevron */}
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.3, type: "spring", stiffness: 200 }}
            className="relative"
          >
            <motion.div
              className="absolute -inset-2 rounded-full bg-cyan-400/20 blur-md"
              animate={{
                scale: isOpen ? [1, 1.5, 1] : 1,
                opacity: isOpen ? [0.5, 0, 0.5] : 0,
              }}
              transition={{ duration: 1, repeat: isOpen ? Infinity : 0 }}
            />
            <ChevronDown
              size={24}
              className={`relative transition-colors duration-300 ${
                isOpen ? "text-cyan-400" : "text-[#9CA3AF]"
              }`}
            />
          </motion.div>
        </button>

        {/* Answer Section */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              {/* Divider Line */}
              <motion.div
                className="mx-6 h-px bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.5 }}
              />

              {/* Answer Content */}
              <motion.div
                className="px-6 pb-6 pt-4 relative"
                initial={{ y: -20 }}
                animate={{ y: 0 }}
                transition={{ delay: 0.1 }}
              >
                {/* Quote Mark */}
                <motion.div
                  className="absolute left-4 top-2 text-5xl text-cyan-400/10 font-serif"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  "
                </motion.div>

                <p className="text-[#D1D5DB] text-sm leading-relaxed pl-8">
                  {faq.answer}
                </p>

                {/* Tech Accent */}
                <motion.div
                  className="flex items-center gap-2 mt-4 pl-8"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <Zap size={14} className="text-cyan-400" />
                  <span className="text-xs text-cyan-400 font-mono">AI_VERIFIED</span>
                </motion.div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Bottom Tech Line */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              className="h-1 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              exit={{ scaleX: 0 }}
              transition={{ duration: 0.5 }}
              style={{ transformOrigin: "left" }}
            />
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

const FAQs = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <FuturisticSection
      id="faqs"
      className="py-28"
      containerClassName="relative mx-auto flex w-full max-w-5xl flex-col items-center gap-16 px-6 md:px-16"
    >
      {/* Hex Pattern Background */}
      <HexPattern />

      {/* Particle Field */}
      {mounted && <ParticleField />}

      {/* Animated Spotlight */}
      <motion.div
        className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[800px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(6, 182, 212, 0.1) 0%, transparent 70%)",
        }}
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 6, repeat: Infinity }}
      />

      {/* Title Section */}
      <div className="relative z-10 mb-16 text-center">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, type: "spring" }}
        >
          {/* Top Accent */}
          <motion.div
            className="flex items-center justify-center gap-3 mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <motion.div
              className="h-px w-16 bg-gradient-to-r from-transparent to-cyan-400"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1 }}
            />
            <Sparkles className="text-cyan-400" size={20} />
            <motion.div
              className="h-px w-16 bg-gradient-to-l from-transparent to-cyan-400"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1 }}
            />
          </motion.div>

          <h2 className="text-5xl md:text-7xl font-black mb-4 relative">
            <motion.span
              className="bg-gradient-to-r from-cyan-400 via-purple-600 to-teal-400 bg-clip-text text-transparent"
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
              style={{ backgroundSize: "200% auto" }}
            >
              KNOWLEDGE BASE
            </motion.span>

            {/* Glitch Layer */}
            <motion.span
              className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-purple-600 to-teal-400 bg-clip-text text-transparent"
              animate={{
                opacity: [0, 0.5, 0],
                x: [0, -3, 3, 0],
              }}
              transition={{ duration: 0.3, repeat: Infinity, repeatDelay: 4 }}
            >
              KNOWLEDGE BASE
            </motion.span>
          </h2>

          <motion.p
            className="text-[#D1D5DB] text-lg font-mono tracking-wider"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            [ FREQUENTLY ASKED QUESTIONS ]
          </motion.p>

          {/* Bottom Accent */}
          <motion.div
            className="h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent mt-6 max-w-md mx-auto"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.5, delay: 0.6 }}
          />
        </motion.div>
      </div>

      {/* FAQ List */}
      <div className="relative z-10 w-full max-w-4xl space-y-4">
        {faqs.map((faq, index) => (
          <FAQItem
            key={index}
            faq={faq}
            index={index}
            isOpen={openIndex === index}
            onToggle={() => toggleFAQ(index)}
          />
        ))}
      </div>

      {/* Bottom Gradient */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0B0B0E] via-[#0B0B0E]/50 to-transparent pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      />
    </FuturisticSection>
  );
};

export default FAQs;