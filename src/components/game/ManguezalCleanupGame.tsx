import { useEffect, useRef, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trophy, RotateCcw, Play } from "lucide-react";
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

    // Draw character panel
    ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
    ctx.lineWidth = 3;
    ctx.strokeStyle = '#000';
    roundRect(ctx, canvasWidth - 180, 10, 170, 150, 10);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = '#0000FF';
    ctx.font = '12px Fredoka';
    ctx.textAlign = 'center';
    ctx.fillText('Ajudantes', canvasWidth - 95, 30);

    if (imagesRef.current.sereia) {
      ctx.drawImage(imagesRef.current.sereia, canvasWidth - 160, 40, 50, 50);
    }
    ctx.fillText('Sereia Lú', canvasWidth - 95, 105);

    if (imagesRef.current.tartaruga) {
      ctx.drawImage(imagesRef.current.tartaruga, canvasWidth - 160, 110, 50, 50);
    }
    ctx.fillText('Tartaruguitá', canvasWidth - 95, 170);

    // Draw UI panel
    ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
    ctx.fillRect(0, 0, 350, 80);

    ctx.fillStyle = '#0000FF';
    ctx.font = '20px Fredoka';
    ctx.textAlign = 'left';
    ctx.fillText(`Óleo Limpo: ${totalOil - oilDropsRef.current.filter(o => !o.collected).length}/${totalOil}`, 10, 30);
    ctx.fillText(`Tempo: ${timeLeft}s`, 10, 60);

    // Draw and update oil drops
    oilDropsRef.current.forEach((drop) => {
      if (drop.collected) return;

      const wobbleX = Math.sin(frameCountRef.current * drop.wobbleSpeed + drop.wobbleOffset) * 4;
      const wobbleY = Math.cos(frameCountRef.current * drop.wobbleSpeed + drop.wobbleOffset) * 2;

      ctx.save();
      ctx.translate(drop.x + wobbleX, drop.y + wobbleY);
      ctx.rotate(drop.rotation);
      if (imagesRef.current.oleo) {
        ctx.drawImage(imagesRef.current.oleo, -drop.size / 2, -drop.size / 2, drop.size, drop.size);
      }
      ctx.restore();
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
    <div className="max-w-4xl mx-auto">
      <Card className="p-8 bg-card border shadow-ocean">
        {/* Header */}
        <div className="mb-6">
          <h3 className="text-3xl font-bold text-center text-primary mb-4">
            Limpeza do Mangue 🌿
          </h3>
          <p className="text-center text-muted-foreground mb-6">
            Ajude a Sereia Lú e Tartaruguitá a limpar o óleo do mangue!
          </p>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            <Card className="p-4 bg-primary/10 border-primary/20">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">{score}</div>
                <div className="text-sm text-muted-foreground">Óleo Limpo</div>
              </div>
            </Card>
            <Card className="p-4 bg-secondary/10 border-secondary/20">
              <div className="text-center">
                <div className="text-2xl font-bold text-secondary">{timeLeft}s</div>
                <div className="text-sm text-muted-foreground">Tempo</div>
              </div>
            </Card>
            <Card className="p-4 bg-accent/10 border-accent/20">
              <div className="text-center">
                <Trophy className="text-accent mx-auto mb-1" size={24} />
                <div className="text-lg font-bold text-accent">{highScore}</div>
                <div className="text-xs text-muted-foreground">Recorde</div>
              </div>
            </Card>
          </div>
        </div>

        {/* Game Canvas */}
        <div className="relative mb-6">
          <canvas
            ref={canvasRef}
            width={canvasWidth}
            height={canvasHeight}
            onClick={handleCanvasClick}
            className="w-full border-4 border-primary rounded-xl shadow-lg cursor-pointer"
            style={{ maxWidth: '100%', height: 'auto', aspectRatio: '8/5' }}
          />

          {/* Overlay for idle/ended states */}
          {(gameState === 'idle' || gameState === 'ended') && (
            <div className="absolute inset-0 bg-black/70 rounded-xl flex items-center justify-center">
              <div className="text-center text-white p-8">
                {gameState === 'idle' ? (
                  <>
                    <h4 className="text-3xl font-bold mb-4">🎮 Como Jogar</h4>
                    <p className="text-lg mb-2">Clique no óleo para limpá-lo! 💧</p>
                    <p className="text-lg mb-6">Limpe {totalOil} manchas de óleo antes do tempo acabar!</p>
                    <div className="mb-6 space-y-2">
                      <p className="text-sm">⏱️ Você tem 60 segundos</p>
                      <p className="text-sm">🧴 Cada óleo = 1 ponto</p>
                      <p className="text-sm">🏆 Tente bater seu recorde!</p>
                    </div>
                    <Button
                      onClick={startGame}
                      size="lg"
                      className="gradient-ocean text-white font-semibold"
                    >
                      <Play className="mr-2" size={20} />
                      Começar Jogo
                    </Button>
                  </>
                ) : (
                  <>
                    <Trophy className="text-yellow-400 mx-auto mb-4" size={64} />
                    <h4 className="text-3xl font-bold mb-4">Jogo Finalizado!</h4>
                    <p className="text-2xl mb-2">Óleo Limpo: {score}/{totalOil}</p>
                    {score === highScore && score > 0 && (
                      <p className="text-xl text-yellow-400 mb-6">🎉 Novo Recorde!</p>
                    )}
                    <Button
                      onClick={startGame}
                      size="lg"
                      className="gradient-ocean text-white font-semibold"
                    >
                      <RotateCcw className="mr-2" size={20} />
                      Jogar Novamente
                    </Button>
                  </>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Controls Info */}
        <div className="bg-muted rounded-lg p-4">
          <p className="text-center text-sm text-muted-foreground">
            💡 <strong>Dica:</strong> Clique rapidamente para limpar todo o óleo do mangue!
          </p>
        </div>
      </Card>

      {/* Ranking Section */}
      <Card className="mt-6 p-6 bg-gradient-to-br from-accent/5 to-accent/10 border-accent/20">
        <h4 className="text-2xl font-bold text-center text-foreground mb-4">
          🏆 Ranking Local
        </h4>
        <div className="text-center">
          <div className="inline-block bg-white rounded-lg p-6 shadow-lg">
            <Trophy className="text-yellow-500 mx-auto mb-2" size={48} />
            <div className="text-4xl font-bold text-primary mb-1">{highScore}</div>
            <div className="text-muted-foreground">Seu Melhor Score</div>
          </div>
        </div>
        <p className="text-center text-sm text-muted-foreground mt-4">
          Continue jogando para melhorar seu recorde!
        </p>
      </Card>
    </div>
  );
};

export default ManguezalCleanupGame;