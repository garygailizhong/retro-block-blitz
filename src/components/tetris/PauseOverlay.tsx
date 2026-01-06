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
    <div className="absolute inset-0 bg-background/80 backdrop-blur-sm flex flex-col items-center justify-center gap-6 rounded-xl z-10">
      {isGameOver ? (
        <>
          <div className="text-center">
            <h2 className="text-2xl font-bold text-foreground mb-2">游戏结束</h2>
            <p className="text-muted-foreground">
              最终分数: <span className="font-bold text-foreground">{score.toLocaleString()}</span>
            </p>
            <p className="text-muted-foreground">
              消除行数: <span className="font-bold text-foreground">{lines}</span>
            </p>
          </div>
          <Button
            onClick={onRestart}
            size="lg"
            className="gap-2 shadow-lg"
          >
            <RotateCcw className="h-5 w-5" />
            再来一局
          </Button>
        </>
      ) : (
        <>
          <h2 className="text-2xl font-bold text-foreground">暂停中</h2>
          <div className="flex gap-3">
            <Button
              onClick={onResume}
              size="lg"
              className="gap-2 shadow-lg"
            >
              <Play className="h-5 w-5" />
              继续
            </Button>
            <Button
              onClick={onRestart}
              variant="outline"
              size="lg"
              className="gap-2"
            >
              <RotateCcw className="h-5 w-5" />
              重新开始
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default PauseOverlay;
