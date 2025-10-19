import { Button } from "@/components/ui/button";
import { Waves, Heart, Users, Sparkles } from "lucide-react";
import beachCleanup1 from "@/assets/beach-cleanup-1.jpg";
import beachCleanup2 from "@/assets/beach-cleanup-2.jpg";

const QuemSomos = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="quem-somos" className="py-20 px-4 bg-background">
      <div className="container mx-auto">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">
            Quem Somos 🌊
          </h2>
          <div className="w-24 h-1 gradient-ocean mx-auto rounded-full"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div className="space-y-6 animate-fade-in-up">
            <div className="flex items-start gap-4">
              <div className="p-3 gradient-ocean rounded-2xl shadow-ocean">
                <Waves className="text-white" size={32} />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-primary mb-2">Nossa Missão</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Proteger os oceanos, reduzir o uso de plásticos e educar crianças e comunidades sobre conservação marinha. Acreditamos que pequenas ações podem gerar grandes mudanças!
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-3 gradient-coral rounded-2xl shadow-ocean">
                <Heart className="text-white" size={32} />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-accent mb-2">Nossa Visão</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Um mundo onde os oceanos estejam livres de poluição plástica, onde a vida marinha floresça e onde cada criança seja um guardião das águas.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-3 bg-secondary rounded-2xl shadow-ocean">
                <Users className="text-white" size={32} />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-secondary mb-2">Nosso Trabalho</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Realizamos limpeza de praias, oficinas educativas, campanhas de conscientização e desenvolvemos ferramentas lúdicas como o jogo "Trilha Maré Sem Plástico".
                </p>
              </div>
            </div>

            <Button
              onClick={() => scrollToSection("o-problema")}
              size="lg"
              className="gradient-ocean text-white font-bold rounded-full px-8 py-6 text-lg hover:scale-105 transition-bounce shadow-ocean"
            >
              <Sparkles className="mr-2" size={20} />
              Saiba Mais
            </Button>
          </div>

          <div className="grid grid-cols-2 gap-4 animate-fade-in-up">
            <img
              src={beachCleanup2}
              alt="Voluntários da Maré Sem Plástico em ação"
              className="rounded-3xl shadow-ocean hover:scale-105 transition-smooth col-span-2"
            />
            <img
              src={beachCleanup1}
              alt="Coleta de plástico na praia"
              className="rounded-3xl shadow-ocean hover:scale-105 transition-smooth"
            />
            <div className="gradient-ocean rounded-3xl p-8 flex items-center justify-center shadow-ocean">
              <div className="text-center text-white">
                <p className="text-5xl font-bold mb-2">100+</p>
                <p className="text-xl font-semibold">Voluntários</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default QuemSomos;
