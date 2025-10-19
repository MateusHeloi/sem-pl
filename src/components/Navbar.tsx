import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo.png";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white shadow-soft">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src={logo} alt="Maré Sem Plástico" className="h-12 md:h-16" />
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-6">
            <button
              onClick={() => scrollToSection("quem-somos")}
              className="text-foreground hover:text-primary transition-smooth font-medium"
            >
              Quem Somos
            </button>
            <button
              onClick={() => scrollToSection("o-problema")}
              className="text-foreground hover:text-primary transition-smooth font-medium"
            >
              O Problema
            </button>
            <button
              onClick={() => scrollToSection("contato")}
              className="text-foreground hover:text-primary transition-smooth font-medium"
            >
              Contato
            </button>
            <Button
              onClick={() => scrollToSection("jogo")}
              className="gradient-coral text-white font-bold rounded-full px-6 hover:scale-105 transition-bounce shadow-ocean"
            >
              🎮 Para Crianças
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-foreground"
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 flex flex-col gap-4 animate-fade-in-up">
            <button
              onClick={() => scrollToSection("quem-somos")}
              className="text-foreground hover:text-primary transition-smooth font-medium text-left"
            >
              Quem Somos
            </button>
            <button
              onClick={() => scrollToSection("o-problema")}
              className="text-foreground hover:text-primary transition-smooth font-medium text-left"
            >
              O Problema
            </button>
            <button
              onClick={() => scrollToSection("contato")}
              className="text-foreground hover:text-primary transition-smooth font-medium text-left"
            >
              Contato
            </button>
            <Button
              onClick={() => scrollToSection("jogo")}
              className="gradient-coral text-white font-bold rounded-full px-6 shadow-ocean"
            >
              🎮 Para Crianças
            </Button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;