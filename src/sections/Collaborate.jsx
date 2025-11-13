import { useState } from "react";
import { Mail, MessageSquare, Phone } from "lucide-react";
import FuturisticSection from "../components/FuturisticSection";

const contactHighlights = [
  "Tailored discovery sessions to align on goals",
  "End-to-end implementation with measurable milestones",
  "Dedicated AI specialists for ongoing optimisation",
];

const contactMethods = [
  {
    icon: Mail,
    label: "Email us",
    detail: "hello@frostrek.ai",
    href: "mailto:hello@frostrek.ai",
  },
  {
    icon: Phone,
    label: "Call the studio",
    detail: "+1 (415) 555-0199",
    href: "tel:+14155550199",
  },
  {
    icon: MessageSquare,
    label: "Book a call",
    detail: "Choose a slot that suits you",
    href: "#",
  },
];

const Collaborate = () => {
  const [status, setStatus] = useState("idle");

  const handleSubmit = (event) => {
    event.preventDefault();
    setStatus("submitted");
  };

  return (
    <FuturisticSection
      id="collaborate"
      className="py-28"
      containerClassName="relative mx-auto w-full max-w-6xl px-6 md:px-12 xl:px-20"
      fullWidth
    >
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -left-10 top-1/4 h-64 w-64 rounded-full bg-cyan-500/15 blur-3xl sm:h-80 sm:w-80" />
        <div className="absolute right-0 bottom-0 h-56 w-56 rounded-full bg-indigo-500/15 blur-[120px] sm:h-72 sm:w-72" />
      </div>

      <div className="relative z-10 grid gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
        <div className="flex flex-col gap-8">
          <div className="space-y-4">
            <p className="text-xs uppercase tracking-[0.4em] text-cyan-200/70">Let’s collaborate</p>
            <h2 className="text-3xl font-semibold text-slate-50 sm:text-4xl lg:text-5xl">
              Build the next generation of intelligence with Frostrek
            </h2>
            <p className="text-base text-slate-300/85">
              Share your challenges and we’ll co-design a roadmap that balances technical depth with
              measurable impact. Our team blends strategy, engineering, and enablement so you stay in control
              at every step.
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 shadow-[0_20px_50px_rgba(8,15,40,0.35)] backdrop-blur">
            <h3 className="text-sm font-semibold uppercase tracking-[0.25em] text-cyan-200/80">
              What to expect
            </h3>
            <ul className="mt-5 space-y-3 text-sm text-slate-300/85">
              {contactHighlights.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-1 inline-flex h-2 w-2 flex-none rounded-full bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.6)]" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {contactMethods.map(({ icon: Icon, label, detail, href }) => (
              <a
                key={label}
                href={href}
                className="group flex items-center gap-4 rounded-2xl border border-white/10 bg-[#0D0D10]/80 p-4 transition hover:border-cyan-400/40 hover:bg-cyan-500/5"
              >
                <span className="flex h-11 w-11 flex-none items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-300">
                  <Icon size={20} />
                </span>
                <span className="flex flex-col">
                  <span className="text-xs uppercase tracking-[0.2em] text-slate-400">{label}</span>
                  <span className="text-sm font-medium text-slate-100 group-hover:text-cyan-200">{detail}</span>
                </span>
              </a>
            ))}
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-6 rounded-3xl border border-white/10 bg-[#0B0B0E]/70 p-8 shadow-[0_24px_60px_rgba(6,16,40,0.45)] backdrop-blur"
        >
          <div>
            <h3 className="text-lg font-semibold text-slate-50">Tell us about your project</h3>
            <p className="mt-2 text-sm text-slate-400">
              We’ll respond within one business day with next steps and a suggested time to connect.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <label className="flex flex-col gap-2 text-sm text-slate-300/80">
              Full name
              <input
                type="text"
                name="name"
                required
                autoComplete="name"
                className="rounded-xl border border-white/10 bg-[#08080c]/80 px-4 py-3 text-base text-slate-100 placeholder:text-slate-500 focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/40"
                placeholder="Alex Rivera"
              />
            </label>
            <label className="flex flex-col gap-2 text-sm text-slate-300/80">
              Work email
              <input
                type="email"
                name="email"
                required
                autoComplete="email"
                className="rounded-xl border border-white/10 bg-[#08080c]/80 px-4 py-3 text-base text-slate-100 placeholder:text-slate-500 focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/40"
                placeholder="you@company.com"
              />
            </label>
          </div>

          <label className="flex flex-col gap-2 text-sm text-slate-300/80">
            Company / organisation
            <input
              type="text"
              name="company"
              className="rounded-xl border border-white/10 bg-[#08080c]/80 px-4 py-3 text-base text-slate-100 placeholder:text-slate-500 focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/40"
              placeholder="Frostrek Labs"
            />
          </label>

          <label className="flex flex-col gap-2 text-sm text-slate-300/80">
            How can we help?
            <textarea
              name="message"
              rows={5}
              required
              className="rounded-2xl border border-white/10 bg-[#08080c]/80 px-4 py-3 text-base text-slate-100 placeholder:text-slate-500 focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/40"
              placeholder="Share a bit about your initiative, timeline, or KPIs."
            />
          </label>

          <button
            type="submit"
            className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-cyan-400 via-sky-500 to-indigo-500 px-6 py-3 text-sm font-semibold text-slate-900 shadow-[0_15px_35px_rgba(23,162,184,0.35)] transition hover:-translate-y-0.5 hover:shadow-[0_20px_45px_rgba(23,162,184,0.4)]"
          >
            {status === "submitted" ? "Message sent" : "Send message"}
          </button>

          {status === "submitted" && (
            <p className="text-sm font-medium text-emerald-300">
              Thanks for reaching out! Someone from our team will respond shortly.
            </p>
          )}
        </form>
      </div>
    </FuturisticSection>
  );
};

export default Collaborate;