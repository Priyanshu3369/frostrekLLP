import { motion } from "framer-motion";
import { useMemo, useState } from "react";
import { Brain, Bot, Cpu, Database, Cloud, BarChart3, ShieldCheck, Gauge } from "lucide-react";
import FuturisticSection from "../components/FuturisticSection";
import usePerformanceMode from "../hooks/usePerformanceMode";

const featureCards = [
  {
    title: "Autonomous ML Fabrics",
    description:
      "Continuously learning pipelines that monitor drift, retrain, and publish without breaking compliance gates.",
    icon: Brain,
    signal: "Adaptive intelligence",
  },
  {
    title: "Conversational Systems",
    description:
      "Context-rich copilots that blend LLMs with your knowledge graphs to deliver explainable answers in milliseconds.",
    icon: Bot,
    signal: "Natural dialogue",
  },
  {
    title: "Vision Intelligence",
    description:
      "Edge-ready perception models that translate video streams into actionable intelligence for operators and agents.",
    icon: Cpu,
    signal: "Realtime vision",
  },
  {
    title: "Data Foundations",
    description:
      "Unified ingestion, governance, and observability so product teams can build with trusted, production-ready signals.",
    icon: Database,
    signal: "Trusted data",
  },
  {
    title: "Cloud + Edge Fusion",
    description:
      "Deploy anywhere with a hybrid fabric that balances hyperscale elasticity with secure, low-latency edge inference.",
    icon: Cloud,
    signal: "Hybrid scale",
  },
  {
    title: "Predictive Command",
    description:
      "Scenario engines that forecast demand, detect anomalies, and recommend interventions before impact surfaces.",
    icon: BarChart3,
    signal: "Forward insight",
  },
];

const capabilityHighlights = [
  {
    label: "Safety by design",
    detail: "Multi-layer guardrails, bias monitoring, and governance dashboards shipped in every release.",
    icon: ShieldCheck,
  },
  {
    label: "Latency engineered",
    detail: "Sub-40ms response contracts with circuit breakers and auto-scaling tuned for your workloads.",
    icon: Gauge,
  },
];

const stats = [
  { value: "300+", label: "Models orchestrated" },
  { value: "45%", label: "Time-to-production gains" },
  { value: "9.8/10", label: "Stakeholder confidence" },
];

const cardVariants = {
  initial: { opacity: 0, y: 32, scale: 0.98 },
  visible: (index) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { delay: index * 0.08, duration: 0.6, ease: [0.32, 0.72, 0, 1] },
  }),
};

const FeatureCard = ({ feature, index, performanceMode }) => {
  const Icon = feature.icon;
  const [isActive, setIsActive] = useState(false);

  const activate = () => setIsActive(true);
  const deactivate = () => setIsActive(false);

  return (
    <motion.article
      custom={index}
      initial="initial"
      whileInView="visible"
      viewport={{ once: true, amount: 0.35 }}
      variants={cardVariants}
      className="relative overflow-hidden rounded-3xl border border-white/6 bg-[#0B0B0E]/70 p-8 text-left shadow-[0_25px_60px_rgba(7,12,30,0.45)] backdrop-blur focus:outline-none focus:ring-2 focus:ring-cyan-400/40"
      whileHover={performanceMode ? undefined : { translateY: -8 }}
      whileTap={{ scale: 0.99 }}
      onHoverStart={activate}
      onHoverEnd={deactivate}
      onFocus={activate}
      onBlur={deactivate}
      onTapStart={activate}
      onTap={deactivate}
      onTapCancel={deactivate}
      tabIndex={0}
      aria-label={`Explore ${feature.title}`}
    >
      <motion.div
        className="absolute inset-px rounded-[calc(1.5rem-1px)] bg-linear-to-br from-cyan-500/15 via-transparent to-indigo-500/10"
        animate={{ opacity: isActive ? 1 : 0.4 }}
        transition={{ duration: 0.3 }}
      />

      <div className="relative flex h-full flex-col justify-between gap-8">
        <div className="flex items-start justify-between gap-4">
          <motion.div
            className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-500/10 text-cyan-300"
            animate={{ scale: isActive ? 1.12 : 1, rotate: isActive && !performanceMode ? 6 : 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 18 }}
          >
            <Icon size={22} />
          </motion.div>

          <motion.span
            className="rounded-full border border-cyan-400/30 bg-cyan-500/5 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.28em] text-cyan-200/80"
            animate={{ opacity: isActive ? 1 : 0.75, letterSpacing: isActive ? "0.32em" : "0.28em" }}
            transition={{ duration: 0.25 }}
          >
            {feature.signal}
          </motion.span>
        </div>

        <div className="space-y-4">
          <div className="space-y-3">
            <h3 className="text-xl font-semibold text-slate-50 lg:text-2xl">{feature.title}</h3>
            <motion.div
              className="h-px w-full bg-linear-to-r from-cyan-500/40 via-transparent to-indigo-500/30"
              animate={{ scaleX: isActive ? 1 : 0.25, opacity: isActive ? 1 : 0.5 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              style={{ transformOrigin: "0% 50%" }}
            />
          </div>

          <motion.p
            className="text-sm leading-relaxed text-slate-300/85"
            animate={{ opacity: isActive ? 1 : 0.85, y: isActive ? -2 : 0 }}
            transition={{ duration: 0.3 }}
          >
            {feature.description}
          </motion.p>
        </div>

        <motion.div
          className="flex items-center gap-2 text-xs font-medium uppercase tracking-[0.4em] text-slate-400"
          animate={{ opacity: isActive ? 1 : 0.7 }}
          transition={{ duration: 0.3 }}
        >
          <motion.span
            className="inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.6)]"
            animate={{ scale: isActive ? 1.4 : 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 12 }}
          />
          System nominal
        </motion.div>
      </div>
    </motion.article>
  );
};

const FeatureStats = () => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6, ease: "easeOut" }}
    className="grid gap-4 rounded-3xl border border-white/10 bg-white/5 p-6 text-sm text-slate-300/80 sm:grid-cols-3"
  >
    {stats.map((stat) => (
      <div key={stat.label} className="space-y-1 text-center sm:text-left">
        <div className="text-2xl font-semibold text-slate-100 lg:text-3xl">{stat.value}</div>
        <div className="text-xs uppercase tracking-[0.3em] text-slate-400/80">{stat.label}</div>
      </div>
    ))}
  </motion.div>
);

const CapabilityHighlight = ({ item, index }) => {
  const Icon = item.icon;

  return (
    <motion.li
      key={item.label}
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5, ease: "easeOut" }}
      className="flex flex-col gap-3 rounded-2xl border border-white/10 bg-[#090910]/80 p-6 text-sm leading-relaxed text-slate-300/80"
    >
      <div className="flex items-center gap-3 text-slate-100">
        <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-300">
          <Icon size={18} />
        </span>
        <span className="text-base font-semibold">{item.label}</span>
      </div>
      <p>{item.detail}</p>
    </motion.li>
  );
};

const Features = () => {
  const performanceMode = usePerformanceMode();
  const ambientOrbs = useMemo(() => {
    if (performanceMode) {
      return [
        { id: "orb-a", top: "12%", left: "14%", size: 160, duration: 10, delay: 0 },
        { id: "orb-b", bottom: "10%", right: "8%", size: 200, duration: 12, delay: 1.5 },
      ];
    }

    return [
      { id: "orb-a", top: "8%", left: "10%", size: 180, duration: 11, delay: 0 },
      { id: "orb-b", top: "18%", right: "18%", size: 220, duration: 13, delay: 1.2 },
      { id: "orb-c", bottom: "12%", left: "22%", size: 200, duration: 12, delay: 0.8 },
      { id: "orb-d", bottom: "6%", right: "12%", size: 240, duration: 14, delay: 1.6 },
    ];
  }, [performanceMode]);

  return (
    <FuturisticSection
      id="features"
      className="py-28"
      containerClassName="relative mx-auto flex w-full flex-col gap-16 px-6 md:px-12 xl:px-20"
      fullWidth
    >
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-x-0 top-1/4 h-128 -translate-y-1/2 bg-[radial-gradient(circle_at_center,rgba(15,205,255,0.16),transparent_55%)] blur-3xl" />
        <div className="absolute inset-x-10 bottom-0 h-112 bg-[radial-gradient(circle_at_bottom,rgba(109,40,217,0.18),transparent_60%)] blur-3xl" />
        {ambientOrbs.map((orb) => (
          <motion.span
            key={orb.id}
            className="absolute rounded-full bg-linear-to-br from-cyan-400/25 via-transparent to-indigo-500/30 blur-3xl"
            style={{
              top: orb.top,
              bottom: orb.bottom,
              left: orb.left,
              right: orb.right,
              width: `${orb.size}px`,
              height: `${orb.size}px`,
            }}
            animate={{ opacity: [0.25, 0.6, 0.25], scale: [0.85, 1.1, 0.85], rotate: [0, 12, 0] }}
            transition={{ duration: orb.duration, delay: orb.delay, repeat: Infinity, ease: "easeInOut" }}
          />
        ))}
      </div>

      <div className="flex flex-col gap-16">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="mx-auto flex max-w-4xl flex-col items-center gap-6 text-center"
        >
          <span className="text-xs uppercase tracking-[0.4em] text-cyan-200/70">Capability Matrix</span>
          <h2 className="text-3xl font-semibold text-slate-50 sm:text-4xl lg:text-5xl">
            A composable stack for mission-critical AI products
          </h2>
          <p className="text-base text-slate-300/85 md:text-lg">
            Frostrek weaves models, data, and safety tooling into a single control plane. Choose the building
            blocks you need, connect your environment, and ship experiences that feel effortless and future-proof.
          </p>
        </motion.div>

        <FeatureStats />

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {featureCards.map((feature, index) => (
            <FeatureCard
              key={feature.title}
              feature={feature}
              index={index}
              performanceMode={performanceMode}
            />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="grid gap-6 rounded-3xl border border-white/10 bg-white/4 p-6 shadow-[0_20px_55px_rgba(8,20,46,0.42)] backdrop-blur md:grid-cols-2"
        >
          {capabilityHighlights.map((item, index) => (
            <CapabilityHighlight key={item.label} item={item} index={index} />
          ))}
        </motion.div>
      </div>
    </FuturisticSection>
  );
};

export default Features;