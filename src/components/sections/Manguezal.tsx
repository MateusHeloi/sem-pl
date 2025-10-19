import { Gamepad2 } from "lucide-react";
import OceanCleanupGame from "@/components/game/OceanCleanupGame";

const Manguezal = () => {
  return (
    <section 
      id="manguezal" 
      className="py-12 md:py-24 px-4 bg-gradient-to-b from-background to-muted"
    >
      <div className="container mx-auto">
        <div className="text-center mb-8 md:mb-16 animate-fade-in-up">
          <Gamepad2 className="text-primary mx-auto mb-4 md:mb-6" size={48} />
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-primary mb-4 md:mb-6">
            Jogo Interativo
          </h2>
          <div className="w-16 md:w-24 h-1 gradient-ocean mx-auto rounded-full mb-4 md:mb-6"></div>
          <p className="text-base md:text-xl text-muted-foreground max-w-3xl mx-auto px-4">
            Ajude a Sereia Liu a limpar o oceano coletando plásticos e lixos!
          </p>
        </div>

        <div className="px-2 md:px-0">
          <OceanCleanupGame />
        </div>
      </div>
    </section>
  );
};

export default Manguezal;