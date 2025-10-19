import { Download, Printer } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import tabuleiroImg from "@/assets/jogo com logo nova[1].png";

const TabuleiroFisico = () => {
  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = tabuleiroImg;
    link.download = 'tabuleiro-mare-sem-plastico.png';
    link.click();
  };

  return (
    <section className="min-h-screen bg-gradient-to-b from-background to-muted py-8 md:py-12 px-4">
      <div className="container mx-auto">
        {/* Header */}
        <div className="text-center mb-6 md:mb-12 animate-fade-in-up">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold text-primary mb-3 md:mb-4">
            Tabuleiro Físico
          </h1>
          <div className="w-16 md:w-32 h-1 gradient-ocean mx-auto rounded-full mb-4 md:mb-6"></div>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto mb-6 md:mb-8 px-2">
            Imprima o tabuleiro e jogue com seus amigos e família! Um jogo de tabuleiro educativo sobre sustentabilidade marinha.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mb-8 md:mb-12">
            <Button
              onClick={handlePrint}
              size="lg"
              className="bg-gradient-to-r from-blue-500 to-blue-600 text-white font-bold px-6 sm:px-8 py-3 md:py-4 rounded-full hover:scale-105 transition-transform shadow-lg text-sm sm:text-base"
            >
              <Printer className="mr-2 sm:mr-3" size={20} />
              Imprimir Tabuleiro
            </Button>
            <Button
              onClick={handleDownload}
              size="lg"
              className="bg-gradient-to-r from-green-500 to-green-600 text-white font-bold px-6 sm:px-8 py-3 md:py-4 rounded-full hover:scale-105 transition-transform shadow-lg text-sm sm:text-base"
            >
              <Download className="mr-2 sm:mr-3" size={20} />
              Baixar Imagem
            </Button>
          </div>
        </div>

        {/* Tabuleiro Container */}
        <div className="flex justify-center mb-8 md:mb-12">
          <Card className="p-3 sm:p-4 md:p-6 bg-white shadow-2xl border-2 sm:border-3 md:border-4 border-primary rounded-lg sm:rounded-xl md:rounded-2xl overflow-hidden w-full max-w-5xl">
            <div className="bg-gradient-to-br from-orange-50 via-blue-50 to-cyan-100 p-2 sm:p-3 md:p-4 rounded-lg md:rounded-xl">
              <img 
                src={tabuleiroImg}
                alt="Tabuleiro Maré Sem Plástico"
                className="w-full h-auto rounded-lg shadow-lg"
              />
            </div>
          </Card>
        </div>

        {/* Instruções */}
        <div className="max-w-4xl mx-auto px-2 sm:px-0">
          <Card className="p-4 sm:p-6 md:p-8 bg-gradient-to-br from-cyan-100 to-blue-100 border-2 border-cyan-300 rounded-lg sm:rounded-xl md:rounded-2xl mb-6 md:mb-8">
            <h2 className="text-2xl sm:text-3xl md:text-3xl font-bold text-cyan-800 mb-4 md:mb-6">Como Usar o Tabuleiro</h2>
            <div className="space-y-3 md:space-y-4 text-cyan-900">
              <div className="flex gap-3 md:gap-4">
                <div className="text-2xl sm:text-3xl flex-shrink-0">🖨️</div>
                <div>
                  <h3 className="font-bold text-base md:text-lg mb-1">Imprimir</h3>
                  <p className="text-sm md:text-base">Clique em "Imprimir Tabuleiro" ou use Ctrl+P para imprimir em tamanho A2 (recomendado) ou A1 para maior visibilidade.</p>
                </div>
              </div>
              <div className="flex gap-3 md:gap-4">
                <div className="text-2xl sm:text-3xl flex-shrink-0">✂️</div>
                <div>
                  <h3 className="font-bold text-base md:text-lg mb-1">Montar</h3>
                  <p className="text-sm md:text-base">Recorte e cole as partes se necessário. Coloque sobre cartolina ou papelão para maior durabilidade.</p>
                </div>
              </div>
              <div className="flex gap-3 md:gap-4">
                <div className="text-2xl sm:text-3xl flex-shrink-0">🎮</div>
                <div>
                  <h3 className="font-bold text-base md:text-lg mb-1">Jogar</h3>
                  <p className="text-sm md:text-base">Use moedas, botões ou peças como marcadores. Role um dado comum (1-6) e avance pelas casas.</p>
                </div>
              </div>
            </div>
          </Card>

          {/* Legenda das Casas */}
          <Card className="p-4 sm:p-6 md:p-8 bg-gradient-to-br from-purple-100 to-pink-100 border-2 border-purple-300 rounded-lg sm:rounded-xl md:rounded-2xl">
            <h2 className="text-2xl sm:text-3xl md:text-3xl font-bold text-purple-800 mb-4 md:mb-6">Tipos de Casas</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-6">
              <div className="bg-white rounded-lg sm:rounded-xl p-4 md:p-6 shadow-md border-2 border-red-300">
                <div className="text-4xl sm:text-5xl mb-2 md:mb-3">❓</div>
                <h3 className="font-bold text-base md:text-lg text-gray-800 mb-1 md:mb-2">Quiz</h3>
                <p className="text-sm md:text-base text-gray-600">Responda uma pergunta sobre sustentabilidade e oceanos. Acerte = continue.</p>
              </div>
              <div className="bg-white rounded-lg sm:rounded-xl p-4 md:p-6 shadow-md border-2 border-yellow-300">
                <div className="text-4xl sm:text-5xl mb-2 md:mb-3">♻️</div>
                <h3 className="font-bold text-base md:text-lg text-gray-800 mb-1 md:mb-2">Ação Sustentável</h3>
                <p className="text-sm md:text-base text-gray-600">Realize uma ação amiga do ambiente para avançar mais uma casa.</p>
              </div>
              <div className="bg-white rounded-lg sm:rounded-xl p-4 md:p-6 shadow-md border-2 border-purple-300">
                <div className="text-4xl sm:text-5xl mb-2 md:mb-3">⭐</div>
                <h3 className="font-bold text-base md:text-lg text-gray-800 mb-1 md:mb-2">Pegada Plástica</h3>
                <p className="text-sm md:text-base text-gray-600">Aprenda sobre impacto do plástico e ganhe um bônus: role novamente!</p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default TabuleiroFisico;