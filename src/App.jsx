// src/App.jsx
import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";

/* Home sections */
import Hero from "./sections/Hero";
import AboutSection from "./sections/About";
import Services from "./sections/Services";
import WhyChooseUs from "./sections/WhyChooseUs";
import Features from "./sections/Features";
import Testimonials from "./sections/Testimonials";
import FAQs from "./sections/FAQs";
import Collaborate from "./sections/Collaborate";
import Footer from "./components/Footer";

/* Separate Pages */
import AboutPage from "./pages/About";
import FAQPage from "./pages/FAQs";
import ServicePage from "./pages/Services";

// ---------- HOME PAGE ----------
const Home = () => {
  return (
    <div className="bg-[#0B0B0E] text-[#FFFFFF] min-h-screen scroll-smooth">
      <Hero />
      <AboutSection />
      <Services />
      <WhyChooseUs />
      <Features />
      <Testimonials />
      <FAQs />
      <Collaborate />
    </div>
  );
};

// ---------- APP WITH CONSTANT NAVBAR ----------
const App = () => {
  return (
    <div className="bg-[#0B0B0E] min-h-screen">
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/about" element={<AboutPage />} />
        <Route path="/services" element={<ServicePage />} />
        <Route path="/faqs" element={<FAQPage />} />

        <Route path="*" element={<Home />} />
      </Routes>
      <Footer/>
    </div>
  );
};

export default App;
