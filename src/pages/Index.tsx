import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Bubbles from "@/components/Bubbles";
import QuemSomos from "@/components/sections/QuemSomos";
import OProblema from "@/components/sections/OProblema";
import JogoSection from "@/components/sections/JogoSection";
import Manguezal from "@/components/sections/Manguezal";
import Oleo from "@/components/sections/Oleo";
import Contato from "@/components/sections/Contato";
import { Button } from "@/components/ui/button";
import { Waves } from "lucide-react";
import heroOcean from "@/assets/hero-ocean.jpg";

const Index = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen">
      <Bubbles />
      <Navbar />
      
      {/* Hero Section */}
      <section 
        className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url(${heroOcean})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      >
        <div className="container mx-auto text-center relative z-10 pt-20">
          <div className="animate-fade-in-up">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 drop-shadow-lg">
              Maré Sem Plástico 🌊
            </h1>
            <p className="text-2xl md:text-3xl text-white/95 mb-4 font-semibold drop-shadow-lg">
              Engajamos pessoas para promover a cultura oceânica
            </p>
            <p className="text-xl md:text-2xl text-white/90 mb-12 max-w-3xl mx-auto drop-shadow-lg">
              Acreditamos que o conhecimento é a maré que transforma atitudes. 

            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                onClick={() => scrollToSection("quem-somos")}
                size="lg"
                className="gradient-ocean text-white font-bold rounded-full px-10 py-7 text-xl hover:scale-105 transition-bounce shadow-ocean"
              >
                <Waves className="mr-2" size={24} />
                Conheça Nossa Missão
              </Button>
              
              <Button
                onClick={() => scrollToSection("jogo")}
                size="lg"
                className="gradient-coral text-white font-bold rounded-full px-10 py-7 text-xl hover:scale-105 transition-bounce shadow-ocean"
              >
                🎮 Jogue Agora
              </Button>
            </div>
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
            <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
              <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Sections */}
      <QuemSomos />
      <OProblema />
      <JogoSection />
      <Manguezal />
      <Oleo />
      <Contato />
     
      
      <Footer />
    </div>
  );
};

export default Index;
