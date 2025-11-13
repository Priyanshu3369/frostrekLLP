import { useEffect, useState } from "react";
import { Menu, Sparkles, X } from "lucide-react";
import usePerformanceMode from "../hooks/usePerformanceMode";

const links = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Why Choose Us", href: "#why-choose-us" },
  { label: "Features", href: "#features" },
  { label: "FAQs", href: "#faqs" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Collaborate", href: "#collaborate" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const performanceMode = usePerformanceMode();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 32);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [isOpen]);

  const closeMenu = () => setIsOpen(false);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all ${
        scrolled
          ? "border-b border-white/10 bg-[#0B0B0E]/95 backdrop-blur"
          : "bg-[#0B0B0E]/75"
      } ${performanceMode ? "shadow-sm" : "shadow-[0_10px_30px_rgba(0,0,0,0.25)]"}`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 md:px-8">
        <a
          href="#home"
          className="flex items-center gap-2 text-sm font-semibold tracking-tight text-slate-100 transition-colors hover:text-cyan-300"
        >
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-cyan-500/10 text-cyan-300">
            <Sparkles size={18} />
          </span>
          <span className="text-base md:text-lg">Frostrek</span>
        </a>

        <nav className="hidden items-center gap-6 text-sm font-medium text-slate-200 md:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-full px-3 py-1 transition-colors hover:bg-cyan-500/10 hover:text-cyan-200"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-slate-200 transition-colors hover:border-cyan-400/50 hover:text-cyan-200 md:hidden"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-expanded={isOpen}
          aria-label="Toggle navigation"
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {isOpen && (
        <div className="border-t border-white/10 bg-[#0B0B0E]/98 shadow-lg md:hidden">
          <nav className="flex flex-col gap-1 px-5 py-4 text-sm font-medium text-slate-200">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={closeMenu}
                className="rounded-lg px-3 py-2 transition-colors hover:bg-cyan-500/10 hover:text-cyan-200"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;