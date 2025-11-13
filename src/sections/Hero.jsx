import { motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import {
  Sparkles,
  Play,
  ArrowUpRight,
  Shield,
  Cpu,
  LineChart,
} from "lucide-react";
import TechGlobe from "../components/TechGlobe/TechGlobe";
import usePerformanceMode from "../hooks/usePerformanceMode";

const stats = [
  { label: "Enterprise Deployments", value: "120+", trend: "+32%" },
  { label: "Model Accuracy", value: "99.2%", trend: "+4.5%" },
  { label: "Automation Savings", value: "3.4M hrs", trend: "+56%" },
];

const highlights = [
  {
    icon: Shield,
    title: "Trusted AI Governance",
    description:
      "Enterprise-grade controls embedded at every layer to keep your models human-aligned and production ready.",
  },
  {
    icon: Cpu,
    title: "Adaptive Intelligence Core",
    description:
      "Modular inference pipelines that learn continuously from real-time signals without sacrificing reliability.",
  },
  {
    icon: LineChart,
    title: "Observable Performance",
    description:
      "Unified telemetry with drift detection, guided remediation, and precision reporting for stakeholders.",
  },
];

const floatingBeacons = [
  {
    title: "Neural Mesh",
    subtitle: "Self-healing data fabric",
    position: "top-[10%] left-[8%]",
    delay: 0.2,
  },
  {
    title: "Latency < 32ms",
    subtitle: "Realtime decisions",
    position: "bottom-[16%] left-[18%]",
    delay: 0.5,
  },
  {
    title: "Autonomous Ops",
    subtitle: "Smart escalation layer",
    position: "top-[14%] right-[15%]",
    delay: 0.8,
  },
];

const Hero = () => {
  const performanceMode = usePerformanceMode();
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") {
      return undefined;
    }

    const mediaQuery = window.matchMedia("(max-width: 768px)");
    const handleChange = () => setIsSmallScreen(mediaQuery.matches);

    handleChange();
    if (typeof mediaQuery.addEventListener === "function") {
      mediaQuery.addEventListener("change", handleChange);
    } else {
      mediaQuery.addListener(handleChange);
    }

    return () => {
      if (typeof mediaQuery.removeEventListener === "function") {
        mediaQuery.removeEventListener("change", handleChange);
      } else {
        mediaQuery.removeListener(handleChange);
      }
    };
  }, []);

  const ambientParticles = useMemo(() => {
    const count = performanceMode ? 8 : isSmallScreen ? 12 : 18;

    if (count <= 0) {
      return [];
    }

    return Array.from({ length: count }, (_, index) => ({
      id: `hero-particle-${index}`,
      left: Math.random() * 100,
      top: Math.random() * 100,
      duration: 6 + Math.random() * 3,
      delay: Math.random() * 2,
      offset: Math.random() * 14,
    }));
  }, [isSmallScreen, performanceMode]);

  return (
    <section
      id="home"
      className="relative min-h-screen w-full overflow-hidden bg-[#06060C] pt-24 pb-32"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(0,255,255,0.16),transparent_55%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,_rgba(109,40,217,0.12),transparent_60%)]" />

      <div className="absolute inset-0 opacity-[0.18]">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(26,187,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(125,95,255,0.08)_1px,transparent_1px)] bg-[size:80px_80px]" />
      </div>

      {ambientParticles.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0 pointer-events-none"
        >
          {ambientParticles.map((particle) => (
            <motion.span
              key={particle.id}
              className="absolute block h-[2px] w-[2px] rounded-full bg-cyan-300/60 shadow-[0_0_12px_rgba(34,211,238,0.8)]"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0], y: ["0%", "-10%", "0%"] }}
              transition={{
                duration: particle.duration,
                repeat: Infinity,
                delay: particle.delay,
              }}
              style={{
                left: `${particle.left}%`,
                top: `${particle.top}%`,
              }}
            />
          ))}
        </motion.div>
      )}

      <div className="relative z-10 mx-auto flex max-w-7xl flex-col gap-16 px-6 md:px-10 lg:flex-row lg:gap-20">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-1 flex-col justify-center"
        >
          <motion.div
            className="inline-flex items-center gap-3 self-start rounded-full border border-cyan-500/40 bg-white/5 px-5 py-2 text-sm uppercase tracking-[0.3em] text-cyan-200 backdrop-blur-lg"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.7 }}
          >
            <Sparkles className="h-4 w-4 text-cyan-300" />
            Frostrek Neural Edge
          </motion.div>

          <motion.h1
            className="mt-8 text-4xl font-semibold leading-tight text-[#F8FAFC] sm:text-5xl lg:text-6xl xl:text-7xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.9, ease: [0.2, 0.8, 0.2, 1] }}
          >
            <span className="bg-gradient-to-r from-cyan-300 via-indigo-400 to-teal-300 bg-clip-text text-transparent">
              Intelligent systems
            </span>{" "}
            built to scale with how your business thinks.
          </motion.h1>

          <motion.p
            className="mt-8 max-w-2xl text-lg text-slate-300/80 md:text-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.8 }}
          >
            Frostrek orchestrates data, decisions, and human oversight into a
            single cognitive stack. Deploy bespoke copilots, automation agents,
            and predictive intelligence with enterprise reliability and precise
            guardrails.
          </motion.p>

          <motion.div
            className="mt-12 flex flex-col items-start gap-4 sm:flex-row"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <button className="group relative flex items-center gap-3 overflow-hidden rounded-full bg-gradient-to-r from-cyan-400 via-sky-500 to-indigo-500 px-8 py-4 text-base font-semibold text-[#06111F] shadow-[0_12px_30px_rgba(13,148,136,0.25)] transition-transform duration-200 hover:-translate-y-1">
              <span className="relative z-10 flex items-center gap-2">
                Launch Your AI Program
                <ArrowUpRight className="h-4 w-4" />
              </span>
              <span className="absolute inset-0 bg-white/40 opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
            </button>

            <button className="group flex items-center gap-3 rounded-full border border-white/10 px-6 py-4 text-base text-slate-200/80 transition duration-200 hover:border-cyan-400/40 hover:text-cyan-200">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/5 text-cyan-300 shadow-[0_0_12px_rgba(56,189,248,0.35)] transition group-hover:bg-cyan-400/20">
                <Play className="h-4 w-4" />
              </span>
              See platform in action
            </button>
          </motion.div>

          <motion.div
            className="mt-12 grid w-full gap-6 rounded-3xl border border-white/5 bg-white/5 p-6 backdrop-blur-xl md:grid-cols-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.75, duration: 0.8 }}
          >
            {stats.map((stat) => (
              <div key={stat.label} className="flex flex-col gap-2">
                <span className="text-xs uppercase tracking-[0.2em] text-slate-400">
                  {stat.label}
                </span>
                <span className="text-2xl font-bold text-slate-100 md:text-3xl">
                  {stat.value}
                </span>
                <span className="text-sm text-emerald-300">{stat.trend} YoY</span>
              </div>
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          className="relative flex flex-1 flex-col justify-center"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.25, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="absolute -left-24 top-1/4 hidden h-32 w-32 rounded-full bg-cyan-400/20 blur-3xl lg:block" />
          <div className="absolute -right-32 bottom-16 hidden h-40 w-40 rounded-full bg-indigo-500/20 blur-3xl lg:block" />

          <div className="relative">
            <TechGlobe enablePointer={!performanceMode} />

            <div className="tech-globe-overlay pointer-events-none">
              <div className="tech-globe-grid" />
            </div>

            {!performanceMode && (
              <motion.div
                className="pointer-events-none absolute inset-0"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.8 }}
                transition={{ delay: 0.3, duration: 1 }}
              >
                {floatingBeacons.map((beacon) => (
                  <motion.div
                    key={beacon.title}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.9 + beacon.delay, duration: 0.6 }}
                    className={`absolute ${beacon.position} w-48 rounded-2xl border border-cyan-400/20 bg-[#06060C]/80 p-4 text-xs text-slate-200 shadow-[0_18px_32px_rgba(8,47,73,0.35)] backdrop-blur-lg`}
                  >
                    <div className="text-sm font-semibold text-cyan-200">
                      {beacon.title}
                    </div>
                    <div className="mt-1 text-[11px] uppercase tracking-[0.2em] text-slate-400">
                      {beacon.subtitle}
                    </div>
                    <div className="mt-3 flex items-center gap-2 text-[11px] text-slate-400/70">
                      <span className="flex h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(74,222,128,0.6)]" />
                      Systems Nominal
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>

      <motion.div
        className="relative z-10 mx-auto mt-24 max-w-6xl px-6 md:px-10"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="grid gap-6 rounded-[28px] border border-white/5 bg-white/[0.04] p-6 backdrop-blur-xl md:grid-cols-3 md:p-10">
          {highlights.map(({ icon: Icon, title, description }) => (
            <div
              key={title}
              className="group relative flex flex-col gap-4 rounded-2xl border border-transparent p-5 transition duration-200 hover:border-cyan-300/30 hover:bg-cyan-500/5"
            >
              <div className="relative flex h-12 w-12 items-center justify-center rounded-full bg-cyan-400/10 text-cyan-200 shadow-[0_0_24px_rgba(34,211,238,0.35)] transition group-hover:bg-cyan-400/20">
                <Icon className="h-5 w-5" />
                <span className="absolute inset-0 rounded-full border border-cyan-400/30 opacity-0 transition group-hover:opacity-100" />
              </div>
              <h3 className="text-lg font-semibold text-slate-50">{title}</h3>
              <p className="text-sm leading-relaxed text-slate-300/80">{description}</p>
            </div>
          ))}
        </div>
      </motion.div>

      <div className="absolute right-12 top-24 hidden h-28 w-28 rounded-full border border-cyan-400/40 bg-cyan-400/10 blur-3xl lg:block" />
      <div className="absolute left-10 bottom-10 hidden h-24 w-24 rounded-full border border-indigo-500/40 bg-indigo-400/10 blur-3xl lg:block" />

      <motion.div
        className="absolute inset-x-0 bottom-0 z-0 h-40 bg-gradient-to-t from-[#06060C] via-[#06060C]/80 to-transparent"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      />
    </section>
  );
};

export default Hero;

