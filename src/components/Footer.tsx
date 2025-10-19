import logo from "@/assets/logo.png";
import { Heart } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-primary text-white py-12 px-4">
      <div className="container mx-auto">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Logo & Mission */}
          <div className="space-y-4">
            <img src={logo} alt="Maré Sem Plástico" className="h-16" />
            <p className="text-white/80 leading-relaxed">
              Protegendo os oceanos, educando comunidades e inspirando mudanças para um futuro sustentável.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4">Links Rápidos</h3>
            <ul className="space-y-2 text-white/80">
              <li>
                <a href="#quem-somos" className="hover:text-white transition-smooth">Quem Somos</a>
              </li>
              <li>
                <a href="#o-problema" className="hover:text-white transition-smooth">O Problema</a>
              </li>
              <li>
                <a href="#jogo" className="hover:text-white transition-smooth">Jogo Educativo</a>
              </li>
              <li>
                <a href="#contato" className="hover:text-white transition-smooth">Contato</a>
              </li>
            </ul>
          </div>

          {/* Legal & Credits */}
          <div>
            <h3 className="text-xl font-bold mb-4">Informações</h3>
            <ul className="space-y-2 text-white/80">
              <li>
                <a href="#" className="hover:text-white transition-smooth">Política de Privacidade</a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-smooth">Termos de Uso</a>
              </li>
              <li className="pt-4">
                <p className="text-sm">
                  Desenvolvido com <Heart className="inline w-4 h-4 text-accent" /> por<br />
                  <span className="font-semibold">Mateus Heloi Santos</span>
                </p>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/20 pt-8 text-center text-white/80">
          <p>&copy; 2025 Maré Sem Plástico - Todos os direitos reservados</p>
          <p className="mt-2 text-sm">
            🌊 Juntos por oceanos mais limpos e um planeta mais saudável
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
