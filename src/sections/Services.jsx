import { motion } from "framer-motion";
import { Brain, Code, Cpu, LineChart } from "lucide-react";
import FuturisticSection from "../components/FuturisticSection";
import usePerformanceMode from "../hooks/usePerformanceMode";

const services = [
  {
    title: "AI Automation",
    description:
      "Streamline operations with intelligent workflows that remove manual busywork and scale effortlessly.",
    icon: Cpu,
  },
  {
    title: "Data Analytics",
    description:
      "Transform raw data into clear signals using modern analytics pipelines and actionable dashboards.",
    icon: LineChart,
  },
  {
    title: "Custom AI Solutions",
    description:
      "Design bespoke machine learning models that reflect your business logic and compliance needs.",
    icon: Brain,
  },
  {
    title: "AI Integration",
    description:
      "Embed AI safely into existing products with reliable deployment, monitoring, and iteration loops.",
    icon: Code,
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: (index) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.12 * index, duration: 0.6, ease: [0.32, 0.72, 0, 1] },
  }),
};

const Services = () => {
  const performanceMode = usePerformanceMode();

  return (
    <FuturisticSection
      id="services"
      className="py-24"
      containerClassName="mx-auto flex max-w-6xl flex-col gap-14 px-6 md:px-12"
    >
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-xs uppercase tracking-[0.35em] text-cyan-200/70">What we do</p>
        <h2 className="mt-4 text-3xl font-semibold tracking-tight text-slate-50 md:text-4xl">
          Reliable AI services that move the needle
        </h2>
        <p className="mt-4 text-base text-slate-300/80 md:text-lg">
          We combine pragmatic engineering with thoughtful design so each engagement feels fast,
          understandable, and ready for production.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {services.map((service, index) => {
          const Icon = service.icon;

          return (
            <motion.article
              key={service.title}
              className="group relative flex h-full flex-col rounded-2xl border border-white/6 bg-[#0C0C10]/70 p-6 text-left shadow-[0_10px_30px_rgba(3,10,26,0.35)] backdrop-blur"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.35 }}
              custom={index}
              variants={cardVariants}
              whileHover={performanceMode ? undefined : { translateY: -6 }}
            >
              <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-300">
                <Icon size={22} />
              </div>
              <h3 className="text-lg font-semibold text-slate-100">{service.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-300/80">
                {service.description}
              </p>
              {!performanceMode && (
                <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity group-hover:opacity-100">
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-500/10 to-transparent" />
                </div>
              )}
            </motion.article>
          );
        })}
      </div>
    </FuturisticSection>
  );
};

export default Services;