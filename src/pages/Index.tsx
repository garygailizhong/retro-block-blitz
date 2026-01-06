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
    <div className="min-h-screen bg-background flex flex-col items-center justify-center py-4 px-2 select-none">
      {/* Header */}
      <header className="w-full max-w-[360px] mb-4">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold text-foreground">俄罗斯方块</h1>
          {gameState.isPlaying && !gameState.isGameOver && (
            <Button
              variant="ghost"
              size="icon"
              onClick={togglePause}
              className="h-10 w-10"
            >
              {gameState.isPaused ? <Play className="h-5 w-5" /> : <Pause className="h-5 w-5" />}
            </Button>
          )}
        </div>
      </header>

      {/* Score and Preview */}
      <div className="w-full max-w-[360px] flex items-start justify-between mb-4 px-1">
        <ScoreDisplay
          score={gameState.score}
          level={gameState.level}
          lines={gameState.lines}
        />
        <NextBlockPreview pieceType={gameState.nextPiece} pieces={PIECES} />
      </div>

      {/* Game Board */}
      <div className="relative mb-6">
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
          <div className="absolute inset-0 bg-background/80 backdrop-blur-sm flex flex-col items-center justify-center gap-4 rounded-xl">
            <h2 className="text-2xl font-bold text-foreground">俄罗斯方块</h2>
            <p className="text-muted-foreground text-sm">经典益智游戏</p>
            <Button onClick={startGame} size="lg" className="gap-2 shadow-lg">
              <Play className="h-5 w-5" />
              开始游戏
            </Button>
          </div>
        )}
      </div>

      {/* Controls */}
      <ControlPanel
        onMoveLeft={moveLeft}
        onMoveRight={moveRight}
        onRotate={rotate}
        onHardDrop={hardDrop}
        disabled={isControlDisabled}
      />

      {/* Footer hint */}
      <p className="text-xs text-muted-foreground mt-6 text-center">
        点击按钮控制方块移动和旋转
      </p>
    </div>
  );
};

export default Index;
