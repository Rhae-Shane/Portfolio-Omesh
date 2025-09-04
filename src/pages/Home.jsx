import Hero from "../sections/Hero";
import DeveloperSquiggle from "../components/Hero/DeveloperSquiggle";
import Projects from "../sections/Projects";
import Skills from "../sections/Skills";
import BentoGrid from "../sections/About";
import Footer from "../sections/Footer";
import Experience from "../sections/Experience";

const Home = () => {
  return (
    <div>
      <Hero />
      <DeveloperSquiggle />
      <div className="w-[80%] mx-auto h-px bg-white my-12 opacity-50" />
      <Experience />
      <div className="w-[80%] mx-auto h-px bg-white my-12 opacity-50" />

      <Projects />
      <div className="w-[80%] mx-auto h-px bg-white my-12 opacity-50" />
      <Skills />
      <div className="w-[80%] mx-auto h-px bg-white my-12 opacity-50" />
      <BentoGrid />
      <div className="w-[80%] mx-auto h-px bg-white my-12 opacity-50" />
      <Footer />
    </div>
  );
};

export default Home;
