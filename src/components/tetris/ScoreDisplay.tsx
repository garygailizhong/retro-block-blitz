interface ScoreDisplayProps {
  score: number;
  level: number;
  lines: number;
}

const ScoreDisplay = ({ score, level, lines }: ScoreDisplayProps) => {
  return (
    <div className="flex items-center justify-center gap-6 text-sm font-medium">
      <div className="flex flex-col items-center">
        <span className="text-muted-foreground text-[10px] uppercase tracking-wider">分数</span>
        <span className="text-lg font-bold tabular-nums">{score.toLocaleString()}</span>
      </div>
      <div className="flex flex-col items-center">
        <span className="text-muted-foreground text-[10px] uppercase tracking-wider">等级</span>
        <span className="text-lg font-bold tabular-nums">{level}</span>
      </div>
      <div className="flex flex-col items-center">
        <span className="text-muted-foreground text-[10px] uppercase tracking-wider">行数</span>
        <span className="text-lg font-bold tabular-nums">{lines}</span>
      </div>
    </div>
  );
};

export default ScoreDisplay;
