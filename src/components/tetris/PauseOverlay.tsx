import { Button } from '@/components/ui/button';
import { Play, RotateCcw } from 'lucide-react';

interface PauseOverlayProps {
  isPaused: boolean;
  isGameOver: boolean;
  score: number;
  lines: number;
  onResume: () => void;
  onRestart: () => void;
}

const PauseOverlay = ({ isPaused, isGameOver, score, lines, onResume, onRestart }: PauseOverlayProps) => {
  if (!isPaused && !isGameOver) return null;

  return (
    <div className="absolute inset-0 bg-background/80 backdrop-blur-sm flex flex-col items-center justify-center gap-4 rounded-lg z-10">
      {isGameOver ? (
        <>
          <div className="text-center">
            <h2 className="text-xl font-bold text-foreground mb-1">游戏结束</h2>
            <p className="text-muted-foreground text-sm">
              最终分数: <span className="font-bold text-foreground">{score.toLocaleString()}</span>
            </p>
            <p className="text-muted-foreground text-sm">
              消除行数: <span className="font-bold text-foreground">{lines}</span>
            </p>
          </div>
          <Button
            onClick={onRestart}
            size="default"
            className="gap-2 shadow-lg"
          >
            <RotateCcw className="h-4 w-4" />
            再来一局
          </Button>
        </>
      ) : (
        <>
          <h2 className="text-xl font-bold text-foreground">暂停中</h2>
          <div className="flex gap-2">
            <Button
              onClick={onResume}
              size="default"
              className="gap-2 shadow-lg"
            >
              <Play className="h-4 w-4" />
              继续
            </Button>
            <Button
              onClick={onRestart}
              variant="outline"
              size="default"
              className="gap-2"
            >
              <RotateCcw className="h-4 w-4" />
              重新开始
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default PauseOverlay;
