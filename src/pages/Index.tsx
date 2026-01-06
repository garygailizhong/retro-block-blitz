import { useTetris } from '@/hooks/useTetris';
import GameBoard from '@/components/tetris/GameBoard';
import ControlPanel from '@/components/tetris/ControlPanel';
import ScoreDisplay from '@/components/tetris/ScoreDisplay';
import NextBlockPreview from '@/components/tetris/NextBlockPreview';
import PauseOverlay from '@/components/tetris/PauseOverlay';
import { Button } from '@/components/ui/button';
import { Pause, Play } from 'lucide-react';

const Index = () => {
  const {
    gameState,
    startGame,
    togglePause,
    moveLeft,
    moveRight,
    rotate,
    hardDrop,
    getGhostPosition,
    PIECES,
  } = useTetris();

  const ghostY = getGhostPosition();
  const isControlDisabled = !gameState.isPlaying || gameState.isPaused || gameState.isGameOver;

  return (
    <div className="h-[100dvh] bg-background flex flex-col items-center justify-between py-2 px-2 select-none overflow-hidden">
      {/* Header */}
      <header className="w-full max-w-[360px] flex items-center justify-between">
        <h1 className="text-lg font-bold text-foreground">俄罗斯方块</h1>
        <div className="flex items-center gap-3">
          <NextBlockPreview pieceType={gameState.nextPiece} pieces={PIECES} />
          {gameState.isPlaying && !gameState.isGameOver && (
            <Button
              variant="ghost"
              size="icon"
              onClick={togglePause}
              className="h-9 w-9"
            >
              {gameState.isPaused ? <Play className="h-4 w-4" /> : <Pause className="h-4 w-4" />}
            </Button>
          )}
        </div>
      </header>

      {/* Score */}
      <div className="w-full max-w-[360px]">
        <ScoreDisplay
          score={gameState.score}
          level={gameState.level}
          lines={gameState.lines}
        />
      </div>

      {/* Game Board */}
      <div className="relative flex-1 flex items-center justify-center min-h-0 py-1">
        <GameBoard gameState={gameState} ghostY={ghostY} />
        <PauseOverlay
          isPaused={gameState.isPaused}
          isGameOver={gameState.isGameOver}
          score={gameState.score}
          lines={gameState.lines}
          onResume={togglePause}
          onRestart={startGame}
        />
        
        {/* Start screen */}
        {!gameState.isPlaying && !gameState.isGameOver && (
          <div className="absolute inset-0 bg-background/80 backdrop-blur-sm flex flex-col items-center justify-center gap-3 rounded-xl">
            <h2 className="text-xl font-bold text-foreground">俄罗斯方块</h2>
            <p className="text-muted-foreground text-sm">经典益智游戏</p>
            <Button onClick={startGame} size="default" className="gap-2 shadow-lg">
              <Play className="h-4 w-4" />
              开始游戏
            </Button>
          </div>
        )}
      </div>

      {/* Controls */}
      <div className="pb-2">
        <ControlPanel
          onMoveLeft={moveLeft}
          onMoveRight={moveRight}
          onRotate={rotate}
          onHardDrop={hardDrop}
          disabled={isControlDisabled}
        />
      </div>
    </div>
  );
};

export default Index;
