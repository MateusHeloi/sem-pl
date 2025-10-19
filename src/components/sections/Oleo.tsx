import { Gamepad2 } from "lucide-react";
import ManguezalCleanupGame from "@/components/game/ManguezalCleanupGame";

const Oleo = () => {
  return (
    <section id="oleo" className="py-24 px-4 bg-gradient-to-b from-background to-muted">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold text-primary mb-6">
            Limpe o Mangue 🌿
          </h2>
          <div className="w-24 h-1 gradient-ocean mx-auto rounded-full mb-6"></div>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Ajude a salvar o mangue removendo o óleo que o está prejudicando
          </p>
        </div>
        <ManguezalCleanupGame />
      </div>
    </section>
  );
};

export default Oleo;