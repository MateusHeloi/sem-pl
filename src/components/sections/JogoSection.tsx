import { Button } from "@/components/ui/button";
import { Gamepad2, Smartphone, Star } from "lucide-react";
import characterSailor from "@/assets/character-sailor.png";

const JogoSection = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="jogo" className="py-20 px-4 bg-gradient-to-b from-background to-muted relative overflow-hidden">
      {/* Decorative bubbles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute w-3 h-3 bg-primary/20 rounded-full animate-float-up"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${6 + Math.random() * 4}s`
            }}
          />
        ))}
      </div>

      <div className="container mx-auto relative z-10">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-4xl md:text-6xl font-bold text-primary mb-4">
            Trilha Maré Sem Plástico 🌊💙
          </h2>
          <div className="w-24 h-1 gradient-ocean mx-auto rounded-full mb-6"></div>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Um jogo educativo para crianças de 8 a 12 anos que ensina sobre o cuidado com os oceanos e a redução da poluição plástica
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          {/* Phone mockup */}
          <div className="flex justify-center animate-fade-in-up">
            <div className="relative">
              {/* Phone frame */}
              <div className="w-80 h-[600px] bg-gradient-to-br from-gray-800 to-gray-900 rounded-[3rem] p-3 shadow-ocean">
                <div className="w-full h-full bg-primary rounded-[2.5rem] overflow-hidden relative">
                  {/* Game preview */}
                  <div className="absolute inset-0 gradient-ocean flex items-center justify-center">
                    <img 
                      src={characterSailor} 
                      alt="Jogo Trilha Maré Sem Plástico"
                      className="w-3/4 animate-bounce"
                    />
                  </div>
                  {/* Play icon overlay */}
                  <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                    <div className="w-20 h-20 bg-white/90 rounded-full flex items-center justify-center hover:scale-110 transition-bounce cursor-pointer">
                      <div className="w-0 h-0 border-t-[15px] border-t-transparent border-l-[25px] border-l-primary border-b-[15px] border-b-transparent ml-1"></div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Phone notch */}
              <div className="absolute top-6 left-1/2 -translate-x-1/2 w-32 h-6 bg-gray-900 rounded-full"></div>
            </div>
          </div>

          {/* Content */}
          <div className="space-y-6 animate-fade-in-up">
            <div className="flex items-start gap-4">
              <div className="p-3 gradient-ocean rounded-2xl shadow-ocean">
                <Gamepad2 className="text-white" size={32} />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-primary mb-2">
                  Aprenda Brincando
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  Explore diferentes ecossistemas marinhos, conheça a vida oceânica e aprenda como proteger nosso planeta através de minigames divertidos e educativos!
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-3 bg-secondary rounded-2xl shadow-ocean">
                <Star className="text-white" size={32} />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-secondary mb-2">
                  Torne-se um Guardião das Águas
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  Complete desafios, salve animais marinhos e limpe os oceanos enquanto descobre fatos incríveis sobre a vida marinha e sustentabilidade.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-3 gradient-coral rounded-2xl shadow-ocean">
                <Smartphone className="text-white" size={32} />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-accent mb-2">
                  Disponível para Celular
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  Jogue a qualquer hora, em qualquer lugar! Compatível com Android e iPhone.
                </p>
              </div>
            </div>

            <Button
              onClick={() => scrollToSection("manguezal")}
              size="lg"
              className="gradient-coral text-white font-bold rounded-full px-8 py-6 text-lg hover:scale-105 transition-bounce shadow-ocean"
            >
              🎮 Conheça os Minigames
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default JogoSection;
