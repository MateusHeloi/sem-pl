import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, Users, Target, Award, TrendingUp, BookOpen } from "lucide-react";
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
    <section id="quem-somos" className="py-24 px-4 bg-background">
      <div className="container mx-auto">
        <div className="text-center mb-20 animate-fade-in-up">
          <h2 className="text-5xl md:text-6xl font-bold text-primary mb-6">
            Sobre a Maré Sem Plástico
          </h2>
          <div className="w-24 h-1 gradient-ocean mx-auto rounded-full mb-6"></div>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Organização dedicada à conservação marinha e educação ambiental
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-16 items-center mb-20">
          <div className="space-y-6 animate-fade-in-up">
            <h3 className="text-3xl md:text-4xl font-bold text-foreground">
              Transformando a Educação Ambiental
            </h3>
            <p className="text-lg text-muted-foreground leading-relaxed">
              A Maré Sem Plástico é uma organização não governamental que atua na linha de frente da conservação dos oceanos, combinando ciência, educação e tecnologia para criar um impacto duradouro na proteção da vida marinha.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Desenvolvemos soluções inovadoras de educação ambiental, incluindo o jogo "Trilha Maré Sem Plástico", uma plataforma interativa que engaja jovens de 8 a 12 anos no aprendizado sobre ecossistemas marinhos e sustentabilidade.
            </p>
            <div className="flex gap-8 pt-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">10k+</div>
                <div className="text-sm text-muted-foreground">Alunos impactados</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-secondary">50+</div>
                <div className="text-sm text-muted-foreground">Escolas parceiras</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-accent">25+</div>
                <div className="text-sm text-muted-foreground">Ações de limpeza</div>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4 animate-fade-in-up">
            <img 
              src={beachCleanup1} 
              alt="Equipe realizando limpeza costeira" 
              className="rounded-xl shadow-ocean h-72 w-full object-cover hover:scale-105 transition-all duration-300"
            />
            <img 
              src={beachCleanup2} 
              alt="Ação educativa com voluntários" 
              className="rounded-xl shadow-ocean h-72 w-full object-cover hover:scale-105 transition-all duration-300 mt-8"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <Card className="p-8 bg-card border hover:shadow-lg transition-all duration-300 hover:-translate-y-1 animate-fade-in-up">
            <div className="mb-6 p-4 gradient-ocean rounded-xl w-fit">
              <Heart className="text-white" size={28} />
            </div>
            <h4 className="text-2xl font-bold text-foreground mb-4">Missão</h4>
            <p className="text-muted-foreground leading-relaxed">
              Proteger os oceanos através da redução da poluição plástica, promovendo educação ambiental de qualidade e mobilizando comunidades para ações sustentáveis.
            </p>
          </Card>

          <Card className="p-8 bg-card border hover:shadow-lg transition-all duration-300 hover:-translate-y-1 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            <div className="mb-6 p-4 bg-secondary rounded-xl w-fit">
              <Target className="text-white" size={28} />
            </div>
            <h4 className="text-2xl font-bold text-foreground mb-4">Visão</h4>
            <p className="text-muted-foreground leading-relaxed">
              Construir um futuro onde os oceanos estejam livres de poluição plástica e onde cada indivíduo compreenda seu papel fundamental na preservação marinha.
            </p>
          </Card>

          <Card className="p-8 bg-card border hover:shadow-lg transition-all duration-300 hover:-translate-y-1 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <div className="mb-6 p-4 gradient-coral rounded-xl w-fit">
              <Users className="text-white" size={28} />
            </div>
            <h4 className="text-2xl font-bold text-foreground mb-4">Valores</h4>
            <p className="text-muted-foreground leading-relaxed">
              Sustentabilidade, educação transformadora, inovação tecnológica, responsabilidade ambiental e engajamento comunitário.
            </p>
          </Card>
        </div>

        <div className="bg-muted rounded-2xl p-12 mb-16">
          <h3 className="text-3xl font-bold text-center text-foreground mb-12">Nossas Frentes de Atuação</h3>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center">
              <div className="mb-4 p-4 bg-primary rounded-full">
                <BookOpen className="text-white" size={32} />
              </div>
              <h4 className="text-xl font-bold text-foreground mb-3">Educação</h4>
              <p className="text-muted-foreground">
                Programas educativos em escolas, desenvolvimento de jogos interativos e materiais didáticos sobre conservação marinha.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="mb-4 p-4 bg-secondary rounded-full">
                <TrendingUp className="text-white" size={32} />
              </div>
              <h4 className="text-xl font-bold text-foreground mb-3">Ação Direta</h4>
              <p className="text-muted-foreground">
                Limpezas costeiras, monitoramento de ecossistemas e campanhas de redução do uso de plástico descartável.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="mb-4 p-4 bg-accent rounded-full">
                <Award className="text-white" size={32} />
              </div>
              <h4 className="text-xl font-bold text-foreground mb-3">Advocacy</h4>
              <p className="text-muted-foreground">
                Mobilização comunitária, parcerias institucionais e disseminação de boas práticas ambientais.
              </p>
            </div>
          </div>
        </div>

        <div className="text-center">
          <Button
            onClick={() => scrollToSection("o-problema")}
            size="lg"
            className="gradient-ocean text-white font-semibold rounded-lg px-10 py-6 text-lg hover:shadow-lg transition-all duration-300"
          >
            Entenda o Problema
          </Button>
        </div>
      </div>
    </section>
  );
};

export default QuemSomos;
