import { useEffect, useRef, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trophy, RotateCcw, Play } from "lucide-react";
import characterLiu from "@/assets/character-liu.jpg";

interface Trash {
  id: number;
  x: number;
  y: number;
  type: 'bottle' | 'bag' | 'can';
  collected: boolean;
  speed: number;
}

const OceanCleanupGame = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [gameState, setGameState] = useState<'idle' | 'playing' | 'ended'>('idle');
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [highScore, setHighScore] = useState(() => {
    const saved = localStorage.getItem('oceanCleanupHighScore');
    return saved ? parseInt(saved) : 0;
  });
  
  const playerRef = useRef({ x: 200, y: 300, width: 60, height: 80 });
  const trashRef = useRef<Trash[]>([]);
  const keysPressed = useRef<{ [key: string]: boolean }>({});
  const gameLoopRef = useRef<number>();
  const timerRef = useRef<NodeJS.Timeout>();
  const playerImageRef = useRef<HTMLImageElement>();

  const trashTypes = [
    { emoji: '🍾', type: 'bottle' as const, points: 10 },
    { emoji: '🛍️', type: 'bag' as const, points: 15 },
    { emoji: '🥫', type: 'can' as const, points: 20 }
  ];

  useEffect(() => {
    // Load player image
    const img = new Image();
    img.src = characterLiu;
    playerImageRef.current = img;
  }, []);

  const spawnTrash = () => {
    const type = trashTypes[Math.floor(Math.random() * trashTypes.length)];
    const trash: Trash = {
      id: Date.now() + Math.random(),
      x: Math.random() * 700,
      y: -50,
      type: type.type,
      collected: false,
      speed: 1 + Math.random() * 2
    };
    trashRef.current.push(trash);
  };

  const startGame = () => {
    setGameState('playing');
    setScore(0);
    setTimeLeft(60);
    trashRef.current = [];
    playerRef.current = { x: 200, y: 300, width: 60, height: 80 };

    // Start timer
    timerRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          endGame();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    // Start game loop
    gameLoop();
  };

  const endGame = () => {
    setGameState('ended');
    if (gameLoopRef.current) {
      cancelAnimationFrame(gameLoopRef.current);
    }
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
  };

  const gameLoop = () => {
    const canvas = canvasRef.current;
    if (!canvas || gameState === 'ended') return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas with ocean gradient
    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    gradient.addColorStop(0, '#0077be');
    gradient.addColorStop(1, '#004d7a');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Update player position
    const player = playerRef.current;
    const speed = 5;
    if (keysPressed.current['ArrowLeft'] && player.x > 0) player.x -= speed;
    if (keysPressed.current['ArrowRight'] && player.x < canvas.width - player.width) player.x += speed;
    if (keysPressed.current['ArrowUp'] && player.y > 0) player.y -= speed;
    if (keysPressed.current['ArrowDown'] && player.y < canvas.height - player.height) player.y += speed;

    // Draw player (Sereia Liu)
    if (playerImageRef.current && playerImageRef.current.complete) {
      ctx.save();
      ctx.beginPath();
      ctx.arc(player.x + player.width / 2, player.y + player.height / 2, player.width / 2, 0, Math.PI * 2);
      ctx.closePath();
      ctx.clip();
      ctx.drawImage(playerImageRef.current, player.x, player.y, player.width, player.height);
      ctx.restore();
    } else {
      // Fallback mermaid emoji
      ctx.font = '48px Arial';
      ctx.fillText('🧜‍♀️', player.x, player.y + 40);
    }

    // Spawn trash periodically
    if (Math.random() < 0.03) {
      spawnTrash();
    }

    // Update and draw trash
    trashRef.current = trashRef.current.filter(trash => {
      if (trash.collected) return false;

      trash.y += trash.speed;

      // Check collision with player
      if (
        trash.x < player.x + player.width &&
        trash.x + 40 > player.x &&
        trash.y < player.y + player.height &&
        trash.y + 40 > player.y
      ) {
        const trashType = trashTypes.find(t => t.type === trash.type);
        setScore(prev => prev + (trashType?.points || 10));
        return false;
      }

      // Remove if off screen
      if (trash.y > canvas.height) return false;

      // Draw trash
      ctx.font = '32px Arial';
      const emoji = trashTypes.find(t => t.type === trash.type)?.emoji || '🗑️';
      ctx.fillText(emoji, trash.x, trash.y);

      return true;
    });

    gameLoopRef.current = requestAnimationFrame(gameLoop);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
        e.preventDefault();
        keysPressed.current[e.key] = true;
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      keysPressed.current[e.key] = false;
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      if (gameLoopRef.current) cancelAnimationFrame(gameLoopRef.current);
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  useEffect(() => {
    if (score > highScore) {
      setHighScore(score);
      localStorage.setItem('oceanCleanupHighScore', score.toString());
    }
  }, [score, highScore]);

  useEffect(() => {
    if (gameState === 'ended') {
      if (gameLoopRef.current) cancelAnimationFrame(gameLoopRef.current);
      if (timerRef.current) clearInterval(timerRef.current);
    }
  }, [gameState]);

  return (
    <div className="max-w-4xl mx-auto">
      <Card className="p-8 bg-card border shadow-ocean">
        {/* Header */}
        <div className="mb-6">
          <h3 className="text-3xl font-bold text-center text-primary mb-4">
            Limpeza do Oceano 🌊
          </h3>
          <p className="text-center text-muted-foreground mb-6">
            Ajude a Sereia Liu a coletar plásticos e lixos no oceano!
          </p>
          
          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            <Card className="p-4 bg-primary/10 border-primary/20">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">{score}</div>
                <div className="text-sm text-muted-foreground">Pontos</div>
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
            width={800}
            height={500}
            className="w-full border-4 border-primary rounded-xl shadow-lg"
            style={{ maxWidth: '100%', height: 'auto', aspectRatio: '8/5' }}
          />
          
          {/* Overlay for idle/ended states */}
          {(gameState === 'idle' || gameState === 'ended') && (
            <div className="absolute inset-0 bg-black/70 rounded-xl flex items-center justify-center">
              <div className="text-center text-white p-8">
                {gameState === 'idle' ? (
                  <>
                    <h4 className="text-3xl font-bold mb-4">🎮 Como Jogar</h4>
                    <p className="text-lg mb-2">Use as setas ⬅️ ➡️ ⬆️ ⬇️ para mover a Liu</p>
                    <p className="text-lg mb-6">Colete o máximo de lixo em 60 segundos!</p>
                    <div className="mb-6 space-y-2">
                      <p className="text-sm">🍾 Garrafa = 10 pontos</p>
                      <p className="text-sm">🛍️ Sacola = 15 pontos</p>
                      <p className="text-sm">🥫 Lata = 20 pontos</p>
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
                    <p className="text-2xl mb-2">Pontuação: {score}</p>
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
            💡 <strong>Dica:</strong> Planeje seus movimentos para coletar mais lixo e aumentar sua pontuação!
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

export default OceanCleanupGame;