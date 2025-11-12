import { Facebook, Twitter, Linkedin, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="relative overflow-hidden bg-[#06060C] py-16 px-6 text-[#D1D5DB] md:px-16">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 opacity-[0.08]" style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)` ,
          backgroundSize: "80px 80px"
        }} />
        <div className="absolute -top-24 left-1/4 h-64 w-64 rounded-full blur-3xl" style={{ background: "radial-gradient(circle, rgba(13, 221, 255, 0.24) 0%, transparent 70%)" }} />
        <div className="absolute bottom-0 right-1/5 h-72 w-72 rounded-full blur-3xl" style={{ background: "radial-gradient(circle, rgba(109, 40, 217, 0.22) 0%, transparent 70%)" }} />
        <div className="absolute inset-x-10 top-0 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(56,189,248,0.45), transparent)" }} />
        <div className="absolute inset-x-16 bottom-0 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(167,139,250,0.35), transparent)" }} />
      </div>

      <div className="relative z-10 mx-auto grid gap-12 sm:grid-cols-2 md:grid-cols-3">
        {/* Logo & Tagline */}
        <div>
          <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#00FFFF] via-[#6D28D9] to-[#14B8A6]">
            Frostrek LLP
          </h2>
          <p className="mt-3 text-sm max-w-sm text-[#9CA3AF]">
            Empowering industries through AI, automation, and innovation — one
            intelligent solution at a time.
          </p>
        </div>

        {/* Quick Links */}
        <div className="flex flex-col space-y-3 text-sm">
          <h3 className="text-[#FFFFFF] font-semibold mb-2">Quick Links</h3>
          {[
            "Home",
            "About",
            "Services",
            "Features",
            "Testimonials",
            "Collaborate",
          ].map((link, index) => (
            <a
              key={index}
              href={`#${link.toLowerCase()}`}
              className="transition-colors duration-300 hover:text-cyan-400 hover:drop-shadow-[0_0_10px_rgba(56,189,248,0.55)]"
            >
              {link}
            </a>
          ))}
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-[#FFFFFF] font-semibold mb-3">Connect With Us</h3>
          <div className="flex gap-4">
            <a
              href="#"
              className="rounded-full border border-cyan-500/30 p-2 transition-all duration-300 hover:border-cyan-400 hover:text-cyan-400 hover:shadow-[0_0_18px_rgba(0,255,255,0.45)]"
            >
              <Facebook size={20} />
            </a>
            <a
              href="#"
              className="rounded-full border border-cyan-500/30 p-2 transition-all duration-300 hover:border-cyan-400 hover:text-cyan-400 hover:shadow-[0_0_18px_rgba(0,255,255,0.45)]"
            >
              <Twitter size={20} />
            </a>
            <a
              href="#"
              className="rounded-full border border-cyan-500/30 p-2 transition-all duration-300 hover:border-cyan-400 hover:text-cyan-400 hover:shadow-[0_0_18px_rgba(0,255,255,0.45)]"
            >
              <Linkedin size={20} />
            </a>
            <a
              href="#"
              className="rounded-full border border-cyan-500/30 p-2 transition-all duration-300 hover:border-cyan-400 hover:text-cyan-400 hover:shadow-[0_0_18px_rgba(0,255,255,0.45)]"
            >
              <Mail size={20} />
            </a>
          </div>
        </div>
      </div>

      <div className="relative z-10 mt-12 flex flex-col items-center gap-3 text-center text-xs text-[#94a3b8]">
        <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.35em] text-cyan-400/70">
          <span className="h-px w-8 bg-gradient-to-r from-transparent to-cyan-400" />
          Frostrek Neural Network
          <span className="h-px w-8 bg-gradient-to-l from-transparent to-cyan-400" />
        </div>
        <div className="text-[#9CA3AF]">
          © {new Date().getFullYear()} Frostrek LLP. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
