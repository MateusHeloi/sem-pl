import { Card } from "@/components/ui/card";
import { Sparkles } from "lucide-react";
import mangroveBackground from "@/assets/mangrove-background.jpg";
import characterLiu from "@/assets/character-liu.jpg";
import characterMarisqueira from "@/assets/character-marisqueira.png";
import characterOleoso from "@/assets/character-oleoso.png";

const Manguezal = () => {
  const dialogues = [
    {
      character: "Liu",
      text: "Shi! Olha só! O manguezal está todo sujo! As raízes estão grudadas e o caranguejo-Uçá está preso!",
      image: characterLiu,
      color: "from-secondary to-primary"
    },
    {
      character: "Marisqueira Shi",
      text: "Vixe, Liu! Esse óleo deixa tudo grudento. Os bichinhos não conseguem respirar direito!",
      image: characterMarisqueira,
      color: "from-accent to-amber-500"
    },
    {
      character: "Oleoso",
      text: "Hahaha! Eu adoro óleo e sujeira! Quanto mais preto e fedido, melhor!",
      image: characterOleoso,
      color: "from-gray-700 to-gray-900"
    },
    {
      character: "Liu",
      text: "Você não entende nada, Oleoso! O mangue é o coração do mar e do rio!",
      image: characterLiu,
      color: "from-secondary to-primary"
    },
    {
      character: "Marisqueira Shi",
      text: "Bora limpar esse mangue e salvar nossos amigos? Vamos juntos nessa missão!",
      image: characterMarisqueira,
      color: "from-accent to-amber-500"
    }
  ];

  const challenges = [
    {
      icon: "🧹",
      title: "Limpe o óleo!",
      description: "Arraste o dedo ou o cursor para empurrar as manchas de óleo para dentro das bolhas de limpeza."
    },
    {
      icon: "🦀",
      title: "Salve os bichinhos!",
      description: "Leve o caranguejo-Uçá de volta pro seu buraco, guie os peixinhos até as raízes limpas, faça as garças voarem e ajude o peixe-boi a nadar."
    },
    {
      icon: "🌱",
      title: "Cure o mangue!",
      description: "Toque nas árvores para fazer as folhas voltarem a ser verdes e brilhantes."
    },
    {
      icon: "📚",
      title: "Aprenda e descubra!",
      description: "Descubra que os manguezais são berçários de vida, guardam carbono e ajudam a resfriar o planeta!"
    }
  ];

  return (
    <section 
      id="manguezal" 
      className="py-20 px-4 relative overflow-hidden"
      style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url(${mangroveBackground})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      <div className="container mx-auto relative z-10">
        <div className="text-center mb-12 animate-fade-in-up">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 drop-shadow-lg">
            Ecossistema 1: Manguezal 🪸
          </h2>
          <p className="text-2xl md:text-3xl text-white/95 font-semibold drop-shadow-lg">
            "O coração que bate entre o mar e o rio"
          </p>
          <div className="w-24 h-1 bg-secondary mx-auto rounded-full mt-4"></div>
        </div>

        {/* Characters Introduction */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <Card className="bg-white/95 backdrop-blur-sm p-6 rounded-3xl shadow-ocean hover:scale-105 transition-bounce animate-fade-in-up">
            <img src={characterLiu} alt="Sereia Liu" className="w-32 h-32 mx-auto mb-4 rounded-full object-cover border-4 border-secondary" />
            <h3 className="text-xl font-bold text-center text-secondary mb-2">🧜‍♀️ Sereia Liu</h3>
            <p className="text-center text-muted-foreground">Curiosa, alegre e apaixonada pela natureza</p>
          </Card>

          <Card className="bg-white/95 backdrop-blur-sm p-6 rounded-3xl shadow-ocean hover:scale-105 transition-bounce animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <img src={characterMarisqueira} alt="Marisqueira Shi" className="w-32 h-32 mx-auto mb-4 rounded-full object-cover border-4 border-accent" />
            <h3 className="text-xl font-bold text-center text-accent mb-2">👩 Marisqueira Shi</h3>
            <p className="text-center text-muted-foreground">Divertida, sábia e protetora do mangue</p>
          </Card>

          <Card className="bg-white/95 backdrop-blur-sm p-6 rounded-3xl shadow-ocean hover:scale-105 transition-bounce animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            <img src={characterOleoso} alt="Oleoso" className="w-32 h-32 mx-auto mb-4 rounded-full object-cover border-4 border-gray-700" />
            <h3 className="text-xl font-bold text-center text-gray-700 mb-2">😈 Oleoso</h3>
            <p className="text-center text-muted-foreground">Vilão atrapalhado que espalha óleo e sujeira</p>
          </Card>
        </div>

        {/* Dialogue Section */}
        <div className="max-w-4xl mx-auto mb-12 space-y-4">
          {dialogues.map((dialogue, index) => (
            <div 
              key={index}
              className="flex items-start gap-4 animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <img 
                src={dialogue.image} 
                alt={dialogue.character}
                className="w-16 h-16 rounded-full object-cover border-2 border-white shadow-lg"
              />
              <div className={`flex-1 bg-gradient-to-r ${dialogue.color} text-white p-4 rounded-2xl rounded-tl-none shadow-lg`}>
                <p className="font-bold mb-1">{dialogue.character}:</p>
                <p className="leading-relaxed">{dialogue.text}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Minigame Section */}
        <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-8 md:p-12 shadow-ocean animate-fade-in-up">
          <div className="text-center mb-8">
            <Sparkles className="text-accent mx-auto mb-4" size={48} />
            <h3 className="text-3xl md:text-4xl font-bold text-primary mb-4">
              🎯 Minigame: "Heróis do Manguezal"
            </h3>
            <p className="text-xl text-muted-foreground">
              Ajude Liu e Shi a limpar o mangue e salvar os bichinhos! 🌱
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {challenges.map((challenge, index) => (
              <Card 
                key={index}
                className="p-6 gradient-ocean text-white rounded-2xl shadow-ocean hover:scale-105 transition-bounce"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="text-4xl mb-3">{challenge.icon}</div>
                <h4 className="text-xl font-bold mb-2">{challenge.title}</h4>
                <p className="text-white/90">{challenge.description}</p>
              </Card>
            ))}
          </div>

          <div className="mt-8 p-6 bg-secondary/10 rounded-2xl border-2 border-secondary">
            <p className="text-center text-xl font-semibold text-secondary">
              🌈 Final da fase: "O mangue está limpo! Quando a gente cuida da natureza, ela cuida da gente." 💙
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Manguezal;
