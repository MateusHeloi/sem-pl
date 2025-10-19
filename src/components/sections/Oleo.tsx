import { Gamepad2 } from "lucide-react";
import ManguezalCleanupGame from "@/components/game/ManguezalCleanupGame";

const Oleo = () => {
  return (
    <section id="oleo" className="py-12 md:py-24 px-4 bg-gradient-to-b from-background to-muted">
      <div className="container mx-auto">
        <div className="text-center mb-8 md:mb-16">
          <Gamepad2 className="text-primary mx-auto mb-4 md:mb-6" size={48} />
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-primary mb-4 md:mb-6">
            Limpe o Mangue 🌿
          </h2>
          <div className="w-16 md:w-24 h-1 gradient-ocean mx-auto rounded-full mb-4 md:mb-6"></div>
          <p className="text-base md:text-xl text-muted-foreground max-w-3xl mx-auto px-4">
            Ajude a salvar o mangue removendo o óleo que o está prejudicando
          </p>
        </div>
        <div className="px-2 md:px-0">
          <ManguezalCleanupGame />
        </div>
      </div>
    </section>
  );
};

export default Oleo;