import { Card } from "@/components/ui/card";
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
    <section id="o-problema" className="py-24 px-4 relative overflow-hidden bg-gradient-to-b from-muted to-background">
      <div className="container mx-auto relative z-10">
        <div className="text-center mb-20 animate-fade-in-up">
          <h2 className="text-5xl md:text-6xl font-bold text-primary mb-6">
            O Desafio da Poluição Plástica
          </h2>
          <div className="w-24 h-1 gradient-ocean mx-auto rounded-full mb-6"></div>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            A poluição plástica nos oceanos representa uma das maiores ameaças ambientais do nosso tempo, com impactos devastadores na biodiversidade marinha e nos ecossistemas costeiros.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <Card className="p-8 bg-card border text-center hover:shadow-lg transition-all duration-300 animate-fade-in-up">
            <div className="w-20 h-20 gradient-coral rounded-xl flex items-center justify-center mx-auto mb-6">
              <AlertTriangle className="text-white" size={40} />
            </div>
            <h3 className="text-4xl font-bold text-foreground mb-2">11 milhões</h3>
            <p className="text-muted-foreground text-lg leading-relaxed">
              de toneladas de plástico entram nos oceanos anualmente
            </p>
            <p className="text-xs text-muted-foreground/60 mt-3">Fonte: ONU 2024</p>
          </Card>

          <Card className="p-8 bg-card border text-center hover:shadow-lg transition-all duration-300 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            <div className="w-20 h-20 bg-secondary rounded-xl flex items-center justify-center mx-auto mb-6">
              <Fish className="text-white" size={40} />
            </div>
            <h3 className="text-4xl font-bold text-foreground mb-2">100 mil</h3>
            <p className="text-muted-foreground text-lg leading-relaxed">
              animais marinhos morrem vítimas do lixo plástico por ano
            </p>
            <p className="text-xs text-muted-foreground/60 mt-3">Estudos científicos</p>
          </Card>

          <Card className="p-8 bg-card border text-center hover:shadow-lg transition-all duration-300 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <div className="w-20 h-20 gradient-ocean rounded-xl flex items-center justify-center mx-auto mb-6">
              <Recycle className="text-white" size={40} />
            </div>
            <h3 className="text-4xl font-bold text-foreground mb-2">Apenas 9%</h3>
            <p className="text-muted-foreground text-lg leading-relaxed">
              do plástico produzido é reciclado globalmente
            </p>
            <p className="text-xs text-muted-foreground/60 mt-3">Estatística mundial</p>
          </Card>
        </div>

        <div className="max-w-5xl mx-auto space-y-8 mb-16 animate-fade-in-up">
          <Card className="p-10 bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
            <div className="flex items-start gap-6">
              <div className="p-4 bg-primary rounded-xl">
                <Droplets className="text-white" size={48} />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-foreground mb-4">
                  Consequências para os Ecossistemas Marinhos
                </h3>
                <p className="text-muted-foreground leading-relaxed text-lg mb-4">
                  A poluição plástica afeta todos os níveis da cadeia alimentar marinha. Microplásticos são ingeridos por organismos microscópicos, peixes e mamíferos marinhos, causando intoxicação, desnutrição e morte.
                </p>
                <p className="text-muted-foreground leading-relaxed text-lg">
                  Tartarugas confundem sacolas com águas-vivas, aves marinhas alimentam filhotes com fragmentos plásticos, e corais são sufocados por resíduos que impedem a fotossíntese e comprometem ecossistemas inteiros.
                </p>
              </div>
            </div>
          </Card>

          <div className="grid md:grid-cols-2 gap-6">
            <Card className="p-8 bg-card border">
              <h4 className="text-xl font-bold text-foreground mb-4">Impacto na Biodiversidade</h4>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Mais de 800 espécies marinhas afetadas pela poluição plástica</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>52% das tartarugas marinhas ingeriram plástico</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Microplásticos encontrados em 90% das aves marinhas</span>
                </li>
              </ul>
            </Card>

            <Card className="p-8 bg-card border">
              <h4 className="text-xl font-bold text-foreground mb-4">Efeitos na Saúde Humana</h4>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-secondary mt-1">•</span>
                  <span>Microplásticos detectados em peixes destinados ao consumo</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-secondary mt-1">•</span>
                  <span>Contaminação de cadeias alimentares marinhas</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-secondary mt-1">•</span>
                  <span>Acumulação de toxinas em organismos marinhos</span>
                </li>
              </ul>
            </Card>
          </div>
        </div>

        <div className="text-center">
          <Button
            onClick={() => scrollToSection("jogo")}
            size="lg"
            className="gradient-ocean text-white font-semibold rounded-lg px-10 py-6 text-lg hover:shadow-lg transition-all duration-300"
          >
            Conheça Nossa Solução
          </Button>
        </div>
      </div>
    </section>
  );
};

export default OProblema;
