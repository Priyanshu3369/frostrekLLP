import { useState } from "react";
import { ChevronDown } from "lucide-react";
import FuturisticSection from "../components/FuturisticSection";

const Collaborate = () => {
  const [showForm, setShowForm] = useState(false);

  const handleEnter = () => {
    setShowForm(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log("Form submitted");
  };

  return (
    <FuturisticSection
      id="collaborate"
      className="py-28"
      containerClassName="relative mx-auto flex min-h-[80vh] w-full max-w-4xl flex-col items-center justify-center gap-12 px-6 md:px-12"
    >
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div
          className="absolute left-1/4 top-1/3 h-80 w-80 animate-pulse rounded-full blur-3xl"
          style={{ background: "radial-gradient(circle, rgba(0, 255, 255, 0.18) 0%, transparent 70%)" }}
        />
        <div
          className="absolute bottom-1/4 right-1/4 h-80 w-80 animate-pulse rounded-full blur-3xl"
          style={{ background: "radial-gradient(circle, rgba(109, 40, 217, 0.16) 0%, transparent 70%)" }}
        />
      </div>

      <div className="relative z-10 flex w-full max-w-3xl flex-col items-center">
        {/* Initial State - Large Heading with Enter Button */}
        <div
          className={`transition-all duration-700 ease-in-out ${
            showForm
              ? "opacity-0 scale-95 -translate-y-8 pointer-events-none absolute"
              : "opacity-100 scale-100 translate-y-0"
          }`}
        >
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-extrabold text-center bg-gradient-to-r from-[#00FFFF] via-[#6D28D9] to-[#14B8A6] bg-clip-text text-transparent mb-12 animate-fade-in drop-shadow-[0_0_30px_rgba(0,255,255,0.3)]">
            Let's Collaborate
          </h2>
          
          <button
            onClick={handleEnter}
            className="group relative px-12 py-4 bg-gradient-to-r from-[#00FFFF] via-[#6D28D9] to-[#14B8A6] rounded-full text-[#0B0B0E] font-semibold text-lg shadow-lg hover:shadow-cyan-500/50 transition-all duration-300 hover:scale-105 active:scale-95 overflow-hidden"
          >
            <span className="flex items-center gap-3 relative z-10">
              Get in Touch
              <ChevronDown 
                size={24} 
                className="transform group-hover:translate-y-1 transition-transform duration-300" 
              />
            </span>
            <span className="absolute inset-0 bg-gradient-to-r from-[#14B8A6] via-[#00FFFF] to-[#6D28D9] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
          </button>
        </div>

        {/* Form State - Smaller Heading with Form */}
        <div
          className={`w-full transition-all duration-700 ease-in-out ${
            showForm
              ? "opacity-100 scale-100 translate-y-0"
              : "opacity-0 scale-95 translate-y-8 pointer-events-none"
          }`}
        >
          {/* Small Heading */}
          <h2 className="text-3xl md:text-4xl font-extrabold mb-4 text-center bg-gradient-to-r from-[#00FFFF] via-[#6D28D9] to-[#14B8A6] bg-clip-text text-transparent">
            Let's Collaborate
          </h2>
          
          {/* Subtext */}
          <p className="text-[#D1D5DB] text-base md:text-lg text-center max-w-2xl mx-auto mb-10">
            Have a project in mind or want to explore how Frostrek can empower your
            business with AI? Let's connect and build the future together.
          </p>

          {/* Contact Form */}
          <div className="bg-[#0D0D10] w-full max-w-lg mx-auto p-8 rounded-2xl border border-cyan-500/20 shadow-lg hover:shadow-cyan-500/20 transition-all duration-300 backdrop-blur-sm">
            <div className="flex flex-col gap-5">
              <div className="transform transition-all duration-500 hover:translate-x-1">
                <label className="block text-sm text-[#D1D5DB] mb-2">Full Name</label>
                <input
                  type="text"
                  placeholder="Enter your name"
                  className="w-full px-4 py-3 bg-[#0B0B0E] border border-cyan-500/20 rounded-xl text-[#FFFFFF] focus:outline-none focus:border-cyan-400 focus:shadow-lg focus:shadow-cyan-500/30 transition-all duration-300"
                />
              </div>
              
              <div className="transform transition-all duration-500 hover:translate-x-1">
                <label className="block text-sm text-[#D1D5DB] mb-2">Email Address</label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-4 py-3 bg-[#0B0B0E] border border-cyan-500/20 rounded-xl text-[#FFFFFF] focus:outline-none focus:border-cyan-400 focus:shadow-lg focus:shadow-cyan-500/30 transition-all duration-300"
                />
              </div>
              
              <div className="transform transition-all duration-500 hover:translate-x-1">
                <label className="block text-sm text-[#D1D5DB] mb-2">Message</label>
                <textarea
                  rows="4"
                  placeholder="Tell us about your project..."
                  className="w-full px-4 py-3 bg-[#0B0B0E] border border-cyan-500/20 rounded-xl text-[#FFFFFF] focus:outline-none focus:border-cyan-400 focus:shadow-lg focus:shadow-cyan-500/30 transition-all duration-300 resize-none"
                ></textarea>
              </div>
              
              <button
                onClick={handleSubmit}
                className="mt-4 w-full py-3 bg-gradient-to-r from-[#00FFFF] via-[#6D28D9] to-[#14B8A6] rounded-xl text-[#0B0B0E] font-semibold shadow-md hover:shadow-cyan-500/40 transition-all duration-300 hover:scale-105 active:scale-95"
              >
                Send Message
              </button>
            </div>
          </div>

          {/* Back Button */}
          <button
            onClick={() => setShowForm(false)}
            className="mt-6 mx-auto block text-[#9CA3AF] hover:text-cyan-400 transition-colors duration-300 text-sm"
          >
            ← Back
          </button>
        </div>
      </div>
    </FuturisticSection>
  );
};

export default Collaborate;