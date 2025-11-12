import Navbar from "./components/Navbar";
import Hero from "./sections/Hero";
import About from "./sections/About";
import Services from "./sections/Services";
import WhyChooseUs from "./sections/WhyChooseUs";
import Features from "./sections/Features";
import Testimonials from "./sections/Testimonials";
import FAQs from "./sections/FAQs";
import Collaborate from "./sections/Collaborate";
import Footer from "./components/Footer";

const App = () => {
  return (
    <div className="bg-[#0B0B0E] text-[#FFFFFF] min-h-screen scroll-smooth">
      <Navbar />
      <Hero />
      <About />
      <Services />
      <WhyChooseUs />
      <Features />
      <Testimonials />
      <FAQs />
      <Collaborate />
      <Footer />
    </div>
  );
};

export default App;
