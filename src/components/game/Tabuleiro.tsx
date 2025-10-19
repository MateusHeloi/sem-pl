import { useEffect, useRef, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trophy, RotateCcw, Play, Dices } from "lucide-react";

interface BoardSquare {
  id: number;
  type: 'quiz' | 'action' | 'prize' | 'chance';
  position: number;
  title: string;
  description: string;
}

interface PlayerState {
  position: number;
  score: number;
  name: string;
}

const TabuleiroGame = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [gameState, setGameState] = useState<'idle' | 'playing' | 'ended'>('idle');
  const [player, setPlayer] = useState<PlayerState>({ position: 0, score: 0, name: 'Jogador' });
  const [highScore, setHighScore] = useState(() => {
    const saved = localStorage.getItem('tabuleiroHighScore');
    return saved ? parseInt(saved) : 0;
  });
  const [currentSquare, setCurrentSquare] = useState<BoardSquare | null>(null);
  const [diceResult, setDiceResult] = useState(0);
  const [isRolling, setIsRolling] = useState(false);

  const canvasWidth = 900;
  const canvasHeight = 600;
  const totalSquares = 22;

  // Definir casas do tabuleiro
  const boardSquares: BoardSquare[] = [
    { id: 1, type: 'action', position: 1, title: 'Praia Poluída', description: 'Comece a trilha e limpe a praia!' },
    { id: 2, type: 'quiz', position: 2, title: 'Quiz 2', description: 'O plástico está cada vez mais presente?' },
    { id: 3, type: 'quiz', position: 3, title: 'Quiz 3', description: 'Saiba curiosidades sobre o oceano' },
    { id: 4, type: 'quiz', position: 4, title: 'Quiz 4', description: 'Teste seu conhecimento' },
    { id: 5, type: 'action', position: 5, title: 'Ação Sustentável', description: 'Ajude o meio ambiente' },
    { id: 6, type: 'quiz', position: 6, title: 'Quiz 6', description: 'Mais um desafio!' },
    { id: 7, type: 'quiz', position: 7, title: 'Quiz 7', description: 'Continue jogando' },
    { id: 8, type: 'quiz', position: 8, title: 'Quiz 8', description: 'Teste seus conhecimentos' },
    { id: 9, type: 'prize', position: 9, title: 'Pegada Plástica', description: 'Ganhe pontos!' },
    { id: 10, type: 'quiz', position: 10, title: 'Quiz 10', description: 'Desafio importante' },
    { id: 11, type: 'quiz', position: 11, title: 'Quiz 11', description: 'Quase lá!' },
    { id: 12, type: 'quiz', position: 12, title: 'Quiz 12', description: 'Continue forte' },
    { id: 13, type: 'prize', position: 13, title: 'Pegada Plástica', description: 'Mais pontos!' },
    { id: 14, type: 'quiz', position: 14, title: 'Quiz 14', description: 'Desafio continua' },
    { id: 15, type: 'action', position: 15, title: 'Ação Sustentável', description: 'Salve os corais' },
    { id: 16, type: 'quiz', position: 16, title: 'Quiz 16', description: 'Falta pouco' },
    { id: 17, type: 'quiz', position: 17, title: 'Quiz 17', description: 'Penúltimo desafio' },
    { id: 18, type: 'quiz', position: 18, title: 'Quiz 18', description: 'Quase na meta' },
    { id: 19, type: 'quiz', position: 19, title: 'Quiz 19', description: 'Último quiz' },
    { id: 20, type: 'prize', position: 20, title: 'Pegada Plástica', description: 'Ganhe mais!' },
    { id: 21, type: 'action', position: 21, title: 'Ação Sustentável', description: 'Salve os mangues' },
    { id: 22, type: 'prize', position: 22, title: 'Mangue e Praia Limpa', description: 'VITÓRIA!' }
  ];

  const rollDice = () => {
    setIsRolling(true);
    const result = Math.floor(Math.random() * 6) + 1;
    
    setTimeout(() => {
      setDiceResult(result);
      const newPosition = Math.min(player.position + result, totalSquares);
      setPlayer(prev => ({ ...prev, position: newPosition }));
      
      const square = boardSquares.find(s => s.position === newPosition);
      setCurrentSquare(square || null);
      
      if (square?.type === 'quiz') {
        setPlayer(prev => ({ ...prev, score: prev.score + 10 }));
      } else if (square?.type === 'prize') {
        setPlayer(prev => ({ ...prev, score: prev.score + 25 }));
      } else if (square?.type === 'action') {
        setPlayer(prev => ({ ...prev, score: prev.score + 15 }));
      }
      
      if (newPosition === totalSquares) {
        endGame();
      }
      
      setIsRolling(false);
    }, 800);
  };

  const startGame = () => {
    setGameState('playing');
    setPlayer({ position: 0, score: 0, name: 'Jogador' });
    setDiceResult(0);
    setCurrentSquare(null);
  };

  const endGame = () => {
    setGameState('ended');
    if (player.score > highScore) {
      setHighScore(player.score);
      localStorage.setItem('tabuleiroHighScore', player.score.toString());
    }
  };

  const drawBoard = (ctx: CanvasRenderingContext2D) => {
    // Fundo gradiente
    const gradient = ctx.createLinearGradient(0, 0, canvasWidth, canvasHeight);
    gradient.addColorStop(0, '#FFE8D6');
    gradient.addColorStop(0.5, '#B8E6F0');
    gradient.addColorStop(1, '#7FD4F0');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);

    // Desenhar casas do tabuleiro em espiral
    const colors = ['#FFB6C1', '#FFEB99', '#B6E3B6', '#B6D7FF', '#E6B3FF'];
    const startX = 100;
    const startY = 100;
    const spacing = 100;

    boardSquares.forEach((square, index) => {
      const row = Math.floor(index / 6);
      const col = index % 6;
      
      let x = startX + col * spacing;
      let y = startY + row * spacing;

      // Ajustar para volta em espiral
      if (row % 2 === 1) {
        x = canvasWidth - 100 - col * spacing;
      }

      const isCurrentPosition = player.position === square.position;
      const color = colors[square.type === 'quiz' ? 0 : square.type === 'action' ? 1 : square.type === 'prize' ? 2 : 3];

      // Desenhar círculo da casa
      ctx.fillStyle = isCurrentPosition ? '#FF6B6B' : color;
      ctx.beginPath();
      ctx.arc(x, y, isCurrentPosition ? 28 : 22, 0, Math.PI * 2);
      ctx.fill();

      // Borda
      ctx.strokeStyle = '#000';
      ctx.lineWidth = 3;
      ctx.stroke();

      // Número/posição
      ctx.fillStyle = '#000';
      ctx.font = isCurrentPosition ? 'bold 16px Fredoka' : '14px Fredoka';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(square.position.toString(), x, y - 8);

      // Tipo de casa
      const typeEmoji = square.type === 'quiz' ? '❓' : square.type === 'action' ? '♻️' : '⭐';
      ctx.font = '16px Arial';
      ctx.fillText(typeEmoji, x, y + 12);
    });

    // Desenhar jogador (peça)
    if (player.position > 0) {
      const square = boardSquares.find(s => s.position === player.position);
      if (square) {
        const row = Math.floor((square.position - 1) / 6);
        const col = (square.position - 1) % 6;
        
        let x = startX + col * spacing;
        let y = startY + row * spacing;

        if (row % 2 === 1) {
          x = canvasWidth - 100 - col * spacing;
        }

        ctx.fillStyle = '#4169E1';
        ctx.beginPath();
        ctx.arc(x, y - 35, 12, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#FFF';
        ctx.font = 'bold 16px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('🧜‍♀️', x - 1, y - 35);
      }
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || gameState === 'idle') return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    drawBoard(ctx);
  }, [player, gameState]);

  return (
    <div className="max-w-5xl mx-auto">
      <Card className="p-8 bg-gradient-to-br from-cyan-50 to-blue-50 border-2 border-cyan-200 shadow-xl">
        {/* Header */}
        <div className="mb-8">
          <h3 className="text-4xl font-bold text-center text-cyan-700 mb-4">
            🎲 Trilha Sem Plástico 🌊
          </h3>
          <p className="text-center text-cyan-600 mb-8 text-lg">
            Percorra a trilha, responda perguntas e salve o meio ambiente!
          </p>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            <Card className="p-6 bg-gradient-to-br from-blue-400 to-blue-500 border-0 shadow-lg">
              <div className="text-center">
                <div className="text-4xl font-bold text-white mb-2">🎯</div>
                <div className="text-white font-semibold">Posição: {player.position}/{totalSquares}</div>
              </div>
            </Card>
            <Card className="p-6 bg-gradient-to-br from-green-400 to-green-500 border-0 shadow-lg">
              <div className="text-center">
                <div className="text-4xl font-bold text-white mb-2">{diceResult}</div>
                <div className="text-green-100 font-semibold">Resultado do Dado</div>
              </div>
            </Card>
            <Card className="p-6 bg-gradient-to-br from-purple-400 to-purple-500 border-0 shadow-lg">
              <div className="text-center">
                <Trophy className="text-white mx-auto mb-2" size={32} />
                <div className="text-4xl font-bold text-white">{player.score}</div>
                <div className="text-purple-100 font-semibold">Pontos</div>
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
            className="w-full bg-gradient-to-b from-orange-100 to-blue-200"
            style={{ maxWidth: '100%', height: 'auto', aspectRatio: '9/6' }}
          />

          {/* Overlay for idle/ended states */}
          {(gameState === 'idle' || gameState === 'ended') && (
            <div className="absolute inset-0 bg-black/75 rounded-lg flex items-center justify-center">
              <div className="text-center text-white p-8 bg-black/50 rounded-2xl backdrop-blur-sm border-2 border-white/20 max-w-md">
                {gameState === 'idle' ? (
                  <>
                    <h4 className="text-4xl font-bold mb-4">🎲 Como Jogar</h4>
                    <p className="text-xl mb-6 font-semibold">Clique no botão para rolar o dado!</p>
                    <div className="mb-8 space-y-3 bg-white/10 rounded-xl p-4">
                      <p className="text-lg">❓ Quiz = +10 pontos</p>
                      <p className="text-lg">♻️ Ação Sustentável = +15 pontos</p>
                      <p className="text-lg">⭐ Pegada Plástica = +25 pontos</p>
                      <p className="text-lg">🎯 Chegue até a posição 22!</p>
                    </div>
                    <Button
                      onClick={startGame}
                      size="lg"
                      className="bg-gradient-to-r from-green-400 to-green-500 text-white font-bold text-lg px-8 py-4 rounded-full hover:scale-110 transition-transform shadow-lg w-full"
                    >
                      <Play className="mr-3" size={24} />
                      Começar Jogo
                    </Button>
                  </>
                ) : (
                  <>
                    <Trophy className="text-yellow-400 mx-auto mb-4" size={80} />
                    <h4 className="text-4xl font-bold mb-6">Parabéns!</h4>
                    <p className="text-3xl mb-4 font-bold text-green-400">Pontuação: {player.score}</p>
                    {player.score === highScore && player.score > 0 && (
                      <p className="text-2xl text-yellow-300 mb-8 font-bold animate-pulse">🎉 Novo Recorde! 🎉</p>
                    )}
                    <Button
                      onClick={startGame}
                      size="lg"
                      className="bg-gradient-to-r from-blue-400 to-blue-500 text-white font-bold text-lg px-8 py-4 rounded-full hover:scale-110 transition-transform shadow-lg w-full"
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

        {/* Controle do dado */}
        {gameState === 'playing' && (
          <div className="flex flex-col items-center gap-6">
            {currentSquare && (
              <Card className="w-full p-6 bg-gradient-to-r from-yellow-100 to-orange-100 border-2 border-yellow-300">
                <h4 className="text-2xl font-bold text-yellow-800 mb-2">{currentSquare.title}</h4>
                <p className="text-yellow-700 text-lg">{currentSquare.description}</p>
              </Card>
            )}
            
            <Button
              onClick={rollDice}
              disabled={isRolling}
              size="lg"
              className="bg-gradient-to-r from-red-400 to-red-500 text-white font-bold text-xl px-12 py-6 rounded-full hover:scale-110 transition-transform shadow-lg disabled:opacity-50"
            >
              <Dices className="mr-3" size={28} />
              {isRolling ? 'Rolando...' : 'Rolar Dado'}
            </Button>
          </div>
        )}

        {/* Ranking Section */}
        <Card className="mt-8 p-6 bg-gradient-to-br from-purple-100 to-pink-100 border-2 border-purple-200">
          <h4 className="text-2xl font-bold text-center text-purple-800 mb-4">🏆 Seu Melhor Score</h4>
          <div className="text-center">
            <div className="inline-block bg-gradient-to-br from-yellow-300 to-yellow-400 rounded-xl p-6 shadow-lg border-4 border-yellow-500">
              <div className="text-5xl font-bold text-yellow-800">{highScore}</div>
              <div className="text-yellow-700 font-semibold mt-2">Pontuação Máxima</div>
            </div>
          </div>
        </Card>
      </Card>
    </div>
  );
};

export default TabuleiroGame;