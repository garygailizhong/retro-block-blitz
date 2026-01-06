import { cn } from '@/lib/utils';

interface NextBlockPreviewProps {
  pieceType: string;
  pieces: Record<string, { shape: number[][]; color: string }>;
}

const CELL_COLORS: { [key: string]: string } = {
  'tetris-i': 'bg-[hsl(var(--tetris-i))]',
  'tetris-o': 'bg-[hsl(var(--tetris-o))]',
  'tetris-t': 'bg-[hsl(var(--tetris-t))]',
  'tetris-s': 'bg-[hsl(var(--tetris-s))]',
  'tetris-z': 'bg-[hsl(var(--tetris-z))]',
  'tetris-j': 'bg-[hsl(var(--tetris-j))]',
  'tetris-l': 'bg-[hsl(var(--tetris-l))]',
};

const NextBlockPreview = ({ pieceType, pieces }: NextBlockPreviewProps) => {
  const piece = pieces[pieceType];
  if (!piece) return null;

  const { shape, color } = piece;

  return (
    <div className="flex flex-col items-center gap-2">
      <span className="text-muted-foreground text-xs uppercase tracking-wider">下一个</span>
      <div className="bg-card p-3 rounded-lg shadow-md border border-border">
        <div className="flex flex-col gap-[2px]">
          {shape.map((row, rowIndex) => (
            <div key={rowIndex} className="flex gap-[2px]">
              {row.map((cell, colIndex) => (
                <div
                  key={colIndex}
                  className={cn(
                    'w-5 h-5 rounded-sm',
                    cell ? cn(CELL_COLORS[color], 'shadow-inner') : 'bg-transparent'
                  )}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NextBlockPreview;
