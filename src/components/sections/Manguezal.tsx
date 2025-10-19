import { Gamepad2 } from "lucide-react";
import OceanCleanupGame from "@/components/game/OceanCleanupGame";

const Manguezal = () => {
  return (
    <section 
      id="manguezal" 
      className="py-24 px-4 bg-gradient-to-b from-background to-muted"
    >
      <div className="container mx-auto">
        <div className="text-center mb-16 animate-fade-in-up">
          <Gamepad2 className="text-primary mx-auto mb-6" size={64} />
          <h2 className="text-5xl md:text-6xl font-bold text-primary mb-6">
            Jogo Interativo
          </h2>
          <div className="w-24 h-1 gradient-ocean mx-auto rounded-full mb-6"></div>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Ajude a Sereia Liu a limpar o oceano coletando plásticos e lixos!
          </p>
        </div>

        <OceanCleanupGame />
      </div>
    </section>
  );
};

export default Manguezal;
