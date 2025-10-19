import { Button } from "@/components/ui/button";
import { AlertTriangle, Fish, Droplets, Recycle } from "lucide-react";

const OProblema = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="o-problema" className="py-20 px-4 relative overflow-hidden" style={{
      background: 'linear-gradient(180deg, hsl(199, 70%, 25%) 0%, hsl(199, 84%, 15%) 100%)'
    }}>
      {/* Floating particles effect */}
      <div className="absolute inset-0 opacity-20">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-white rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float-up ${8 + Math.random() * 4}s ease-in infinite`,
              animationDelay: `${Math.random() * 5}s`
            }}
          />
        ))}
      </div>

      <div className="container mx-auto relative z-10">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            O Desafio Azul: A Poluição Plástica 🌊
          </h2>
          <div className="w-24 h-1 bg-accent mx-auto rounded-full"></div>
          <p className="text-xl text-white/90 mt-6 max-w-3xl mx-auto">
            Nossos oceanos estão em perigo. Juntos, podemos fazer a diferença!
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 text-center hover:scale-105 transition-bounce shadow-ocean animate-fade-in-up">
            <div className="w-20 h-20 gradient-coral rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertTriangle className="text-white" size={40} />
            </div>
            <h3 className="text-3xl font-bold text-white mb-2">11 milhões</h3>
            <p className="text-white/80 text-lg">
              de toneladas de plástico entram nos oceanos todos os anos
            </p>
            <p className="text-xs text-white/60 mt-2">Fonte: ONU 2024</p>
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 text-center hover:scale-105 transition-bounce shadow-ocean animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <div className="w-20 h-20 bg-secondary rounded-full flex items-center justify-center mx-auto mb-4">
              <Fish className="text-white" size={40} />
            </div>
            <h3 className="text-3xl font-bold text-white mb-2">100 mil</h3>
            <p className="text-white/80 text-lg">
              animais marinhos morrem anualmente vítimas do lixo plástico
            </p>
            <p className="text-xs text-white/60 mt-2">Dados científicos</p>
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 text-center hover:scale-105 transition-bounce shadow-ocean animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            <div className="w-20 h-20 gradient-ocean rounded-full flex items-center justify-center mx-auto mb-4">
              <Recycle className="text-white" size={40} />
            </div>
            <h3 className="text-3xl font-bold text-white mb-2">Apenas 9%</h3>
            <p className="text-white/80 text-lg">
              do plástico produzido é reciclado no mundo
            </p>
            <p className="text-xs text-white/60 mt-2">Estatística global</p>
          </div>
        </div>

        <div className="max-w-4xl mx-auto text-center space-y-6 animate-fade-in-up">
          <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 shadow-ocean">
            <Droplets className="text-accent mx-auto mb-4" size={48} />
            <h3 className="text-2xl font-bold text-white mb-4">
              O Impacto é Real
            </h3>
            <p className="text-white/90 leading-relaxed text-lg">
              Garrafas plásticas, sacolas, canudos e redes de pesca abandonadas estão sufocando nossos oceanos. 
              Tartarugas confundem sacolas com águas-vivas, aves marinhas alimentam seus filhotes com fragmentos de plástico, 
              e os corais estão sendo sufocados por resíduos.
            </p>
          </div>

          <Button
            onClick={() => scrollToSection("jogo")}
            size="lg"
            className="gradient-coral text-white font-bold rounded-full px-10 py-7 text-xl hover:scale-105 transition-bounce shadow-ocean"
          >
            Como podemos mudar isso? 🌟
          </Button>
        </div>
      </div>
    </section>
  );
};

export default OProblema;
