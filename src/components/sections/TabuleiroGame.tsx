import { Gamepad2 } from "lucide-react";
import TabuleiroGame from "@/components/game/Tabuleiro";

const Tabuleiro = () => {
  return (
    <section id="tabuleiro" className="py-24 px-4 bg-gradient-to-b from-background to-muted">
      <div className="container mx-auto">
        <div className="text-center mb-16 animate-fade-in-up">
          <Gamepad2 className="text-primary mx-auto mb-6" size={64} />
          <h2 className="text-5xl md:text-6xl font-bold text-primary mb-6">
            Trilha Sem Plástico 
          </h2>
          <div className="w-24 h-1 gradient-ocean mx-auto rounded-full mb-6"></div>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Um jogo de tabuleiro educativo onde você aprende sobre sustentabilidade enquanto avança pela trilha!
          </p>
        </div>
        <TabuleiroGame />
      </div>
    </section>
  );
};

export default Tabuleiro;