import { useEffect, useRef, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trophy, RotateCcw, Play, Zap } from "lucide-react";
import aguaImg from "@/assets/agua.png";
import sereia_luImg from "@/assets/sereia_lu.png";
import tartaruguitaImg from "@/assets/tartaruguita.png";
import oleoImg from "@/assets/oleo.png";

interface OilDrop {
  id: number;
  x: number;
  y: number;
  size: number;
  wobbleOffset: number;
  wobbleSpeed: number;
  rotation: number;
  collected: boolean;
}

const ManguezalCleanupGame = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [gameState, setGameState] = useState<'idle' | 'playing' | 'ended'>('idle');
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [highScore, setHighScore] = useState(() => {
    const saved = localStorage.getItem('manguezalHighScore');
    return saved ? parseInt(saved) : 0;
  });

  const oilDropsRef = useRef<OilDrop[]>([]);
  const gameLoopRef = useRef<number | undefined>(undefined);
  const timerRef = useRef<number | undefined>(undefined);
  const frameCountRef = useRef(0);
  
  const imagesRef = useRef<Record<string, HTMLImageElement | undefined>>({});

  const totalOil = 15;
  const canvasWidth = 800;
  const canvasHeight = 500;

  // Load images
  useEffect(() => {
    const loadImage = (src: string): Promise<HTMLImageElement> => {
      return new Promise((resolve) => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.src = src;
      });
    };

    const loadAllImages = async () => {
      const agua = await loadImage(aguaImg);
      const sereia = await loadImage(sereia_luImg);
      const tartaruga = await loadImage(tartaruguitaImg);
      const oleo = await loadImage(oleoImg);

      imagesRef.current = {
        agua,
        sereia,
        tartaruga,
        oleo
      };
    };

    loadAllImages();
  }, []);

  const initializeOil = () => {
    const drops: OilDrop[] = [];
    for (let i = 0; i < totalOil; i++) {
      drops.push({
        id: i,
        x: Math.random() * (canvasWidth - 100) + 50,
        y: Math.random() * (canvasHeight - 200) + 100,
        size: 40,
        wobbleOffset: Math.random() * Math.PI * 2,
        wobbleSpeed: Math.random() * 0.03 + 0.02,
        rotation: Math.random() * Math.PI * 2,
        collected: false
      });
    }
    oilDropsRef.current = drops;
    setScore(0);
  };

  const startGame = () => {
    setGameState('playing');
    setScore(0);
    setTimeLeft(60);
    initializeOil();

    if (timerRef.current) {
      window.clearInterval(timerRef.current);
    }

    timerRef.current = window.setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          endGame();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    gameLoop();
  };

  const endGame = () => {
    setGameState('ended');
    if (gameLoopRef.current) {
      cancelAnimationFrame(gameLoopRef.current);
      gameLoopRef.current = undefined;
    }
    if (timerRef.current) {
      window.clearInterval(timerRef.current);
      timerRef.current = undefined;
    }
  };

  const gameLoop = () => {
    const canvas = canvasRef.current;
    if (!canvas || gameState === 'ended') return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    frameCountRef.current++;

    // Draw background
    if (imagesRef.current.agua) {
      ctx.drawImage(imagesRef.current.agua, 0, 0, canvasWidth, canvasHeight);
    } else {
      const gradient = ctx.createLinearGradient(0, 0, 0, canvasHeight);
      gradient.addColorStop(0, '#0077be');
      gradient.addColorStop(1, '#004d7a');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvasWidth, canvasHeight);
    }

    // Draw character panel com estilo melhorado
    ctx.fillStyle = 'rgba(255, 255, 255, 0.95)';
    ctx.lineWidth = 3;
    ctx.strokeStyle = '#0077be';
    roundRect(ctx, canvasWidth - 190, 10, 180, 160, 15);
    ctx.fill();
    ctx.stroke();

    // Shadow do painel
    ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
    roundRect(ctx, canvasWidth - 188, 12, 180, 160, 15);
    ctx.fill();

    ctx.fillStyle = '#0077be';
    ctx.font = 'bold 14px Fredoka';
    ctx.textAlign = 'center';
    ctx.fillText('🌿 Ajudantes 🌿', canvasWidth - 100, 32);

    if (imagesRef.current.sereia) {
      ctx.drawImage(imagesRef.current.sereia, canvasWidth - 170, 40, 50, 50);
    }
    ctx.fillStyle = '#004d7a';
    ctx.font = '11px Fredoka';
    ctx.fillText('Sereia Lú', canvasWidth - 100, 107);

    if (imagesRef.current.tartaruga) {
      ctx.drawImage(imagesRef.current.tartaruga, canvasWidth - 170, 110, 50, 50);
    }
    ctx.fillText('Tartaruguitá', canvasWidth - 100, 177);

    // Draw UI panel com gradiente
    const uiGradient = ctx.createLinearGradient(0, 0, 0, 80);
    uiGradient.addColorStop(0, 'rgba(0, 0, 0, 0.4)');
    uiGradient.addColorStop(1, 'rgba(0, 0, 0, 0.2)');
    ctx.fillStyle = uiGradient;
    ctx.fillRect(0, 0, 400, 85);

    // Border do UI
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
    ctx.lineWidth = 2;
    ctx.strokeRect(0, 0, 400, 85);

    ctx.fillStyle = '#00FF00';
    ctx.font = 'bold 22px Fredoka';
    ctx.textAlign = 'left';
    ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
    ctx.shadowBlur = 4;
    ctx.shadowOffsetX = 2;
    ctx.shadowOffsetY = 2;
    ctx.fillText(`🧴 ${totalOil - oilDropsRef.current.filter(o => !o.collected).length}/${totalOil}`, 15, 35);
    
    ctx.fillStyle = '#FFD700';
    ctx.fillText(`⏱️ ${timeLeft}s`, 15, 65);
    ctx.shadowColor = 'transparent';

    // Draw and update oil drops
    oilDropsRef.current.forEach((drop) => {
      if (drop.collected) return;

      const wobbleX = Math.sin(frameCountRef.current * drop.wobbleSpeed + drop.wobbleOffset) * 4;
      const wobbleY = Math.cos(frameCountRef.current * drop.wobbleSpeed + drop.wobbleOffset) * 2;

      // Glow efeito
      ctx.shadowColor = 'rgba(0, 0, 0, 0.3)';
      ctx.shadowBlur = 8;
      ctx.shadowOffsetX = 3;
      ctx.shadowOffsetY = 3;

      ctx.save();
      ctx.translate(drop.x + wobbleX, drop.y + wobbleY);
      ctx.rotate(drop.rotation);
      if (imagesRef.current.oleo) {
        ctx.drawImage(imagesRef.current.oleo, -drop.size / 2, -drop.size / 2, drop.size, drop.size);
      }
      ctx.restore();

      ctx.shadowColor = 'transparent';
    });

    gameLoopRef.current = requestAnimationFrame(gameLoop);
  };

  const handleCanvasClick = (event: React.MouseEvent<HTMLCanvasElement>) => {
    if (gameState !== 'playing') return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = (event.clientX - rect.left) * (canvasWidth / rect.width);
    const y = (event.clientY - rect.top) * (canvasHeight / rect.height);

    oilDropsRef.current.forEach((drop) => {
      if (drop.collected) return;

      const wobbleX = Math.sin(frameCountRef.current * drop.wobbleSpeed + drop.wobbleOffset) * 4;
      const wobbleY = Math.cos(frameCountRef.current * drop.wobbleSpeed + drop.wobbleOffset) * 2;
      
      const distance = Math.sqrt(
        Math.pow(x - (drop.x + wobbleX), 2) + Math.pow(y - (drop.y + wobbleY), 2)
      );

      if (distance < drop.size / 2 + 5) {
        drop.collected = true;
        setScore(prev => prev + 1);
      }
    });
  };

  const roundRect = (
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    w: number,
    h: number,
    r: number
  ) => {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.lineTo(x + w - r, y);
    ctx.quadraticCurveTo(x + w, y, x + w, y + r);
    ctx.lineTo(x + w, y + h - r);
    ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
    ctx.lineTo(x + r, y + h);
    ctx.quadraticCurveTo(x, y + h, x, y + h - r);
    ctx.lineTo(x, y + r);
    ctx.quadraticCurveTo(x, y, x + r, y);
    ctx.closePath();
  };

  useEffect(() => {
    if (score > highScore) {
      setHighScore(score);
      localStorage.setItem('manguezalHighScore', score.toString());
    }
  }, [score, highScore]);

  useEffect(() => {
    return () => {
      if (gameLoopRef.current) cancelAnimationFrame(gameLoopRef.current);
      if (timerRef.current) window.clearInterval(timerRef.current);
    };
  }, []);

  return (
    <div className="max-w-5xl mx-auto">
      <Card className="p-8 bg-gradient-to-br from-cyan-50 to-blue-50 border-2 border-cyan-200 shadow-xl">
        {/* Header */}
        <div className="mb-8">
          <h3 className="text-4xl font-bold text-center text-cyan-700 mb-4">
             Limpeza do Mangue 
          </h3>
          <p className="text-center text-cyan-600 mb-8 text-lg">
            Clique no óleo para limpá-lo e salvar o mangue com a ajuda da Sereia Lú e Tartaruguitá!
          </p>

          {/* Stats com estilo melhorado */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            <Card className="p-6 bg-gradient-to-br from-green-400 to-green-500 border-0 shadow-lg">
              <div className="text-center">
                <Zap className="text-white mx-auto mb-2" size={28} />
                <div className="text-4xl font-bold text-white">{score}</div>
                <div className="text-green-100 font-semibold">Óleo Limpo</div>
              </div>
            </Card>
            <Card className="p-6 bg-gradient-to-br from-yellow-400 to-yellow-500 border-0 shadow-lg">
              <div className="text-center">
                <div className="text-4xl font-bold text-white">{timeLeft}s</div>
                <div className="text-yellow-100 font-semibold">Tempo</div>
              </div>
            </Card>
            <Card className="p-6 bg-gradient-to-br from-purple-400 to-purple-500 border-0 shadow-lg">
              <div className="text-center">
                <Trophy className="text-white mx-auto mb-2" size={28} />
                <div className="text-4xl font-bold text-white">{highScore}</div>
                <div className="text-purple-100 font-semibold">Recorde</div>
              </div>
            </Card>
          </div>
        </div>

        {/* Game Canvas */}
        <div className="relative mb-8 rounded-2xl overflow-hidden shadow-2xl border-4 border-cyan-200">
          <canvas
            ref={canvasRef}
            width={canvasWidth}
            height={canvasHeight}
            onClick={handleCanvasClick}
            className="w-full cursor-pointer bg-gradient-to-b from-cyan-400 to-blue-600"
            style={{ maxWidth: '100%', height: 'auto', aspectRatio: '8/5' }}
          />

          {/* Overlay for idle/ended states */}
          {(gameState === 'idle' || gameState === 'ended') && (
            <div className="absolute inset-0 bg-black/75 rounded-lg flex items-center justify-center">
              <div className="text-center text-white p-8 bg-black/50 rounded-2xl backdrop-blur-sm border-2 border-white/20">
                {gameState === 'idle' ? (
                  <>
                    <h4 className="text-4xl font-bold mb-4">🎮 Como Jogar</h4>
                    <p className="text-xl mb-2 font-semibold">Clique no óleo para limpá-lo! 💧</p>
                    <p className="text-lg mb-8">Limpe {totalOil} manchas de óleo antes do tempo acabar!</p>
                    <div className="mb-8 space-y-3 bg-white/10 rounded-xl p-4">
                      <p className="text-lg">⏱️ Você tem 60 segundos</p>
                      <p className="text-lg">🧴 Cada óleo = 1 ponto</p>
                      <p className="text-lg">🏆 Tente bater seu recorde!</p>
                    </div>
                    <Button
                      onClick={startGame}
                      size="lg"
                      className="bg-gradient-to-r from-green-400 to-green-500 text-white font-bold text-lg px-8 py-4 rounded-full hover:scale-110 transition-transform shadow-lg"
                    >
                      <Play className="mr-3" size={24} />
                      Começar Jogo
                    </Button>
                  </>
                ) : (
                  <>
                    <Trophy className="text-yellow-400 mx-auto mb-4" size={80} />
                    <h4 className="text-4xl font-bold mb-6">Jogo Finalizado!</h4>
                    <p className="text-3xl mb-4 font-bold text-green-400">Óleo Limpo: {score}/{totalOil}</p>
                    {score === highScore && score > 0 && (
                      <p className="text-2xl text-yellow-300 mb-8 font-bold animate-pulse">🎉 Novo Recorde! 🎉</p>
                    )}
                    <Button
                      onClick={startGame}
                      size="lg"
                      className="bg-gradient-to-r from-blue-400 to-blue-500 text-white font-bold text-lg px-8 py-4 rounded-full hover:scale-110 transition-transform shadow-lg"
                    >
                      <RotateCcw className="mr-3" size={24} />
                      Jogar Novamente
                    </Button>
                  </>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Controls Info */}
        <div className="bg-gradient-to-r from-cyan-100 to-blue-100 rounded-2xl p-6 border-2 border-cyan-200">
          <p className="text-center text-lg text-cyan-800 font-semibold">
            💡 <strong>Dica:</strong> Clique rapidamente para limpar todo o óleo do mangue antes do tempo acabar!
          </p>
        </div>
      </Card>

      {/* Ranking Section */}
      <Card className="mt-8 p-8 bg-gradient-to-br from-purple-100 via-pink-100 to-orange-100 border-2 border-purple-200 shadow-xl">
        <h4 className="text-3xl font-bold text-center text-purple-800 mb-8">
          Ranking Local
        </h4>
        <div className="text-center">
          <div className="inline-block bg-gradient-to-br from-yellow-300 to-yellow-400 rounded-2xl p-8 shadow-2xl border-4 border-yellow-500">
            <Trophy className="text-yellow-700 mx-auto mb-3" size={64} />
            <div className="text-5xl font-bold text-yellow-800 mb-2">{highScore}</div>
            <div className="text-yellow-700 text-xl font-semibold">Seu Melhor Score</div>
          </div>
        </div>
        <p className="text-center text-lg text-purple-700 mt-6 font-semibold">
          Continue jogando para melhorar seu recorde! 
        </p>
      </Card>
    </div>
  );
};

export default ManguezalCleanupGame;