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
    <div className="flex items-center gap-2">
      <span className="text-muted-foreground text-xs">下一个</span>
      <div className="bg-card p-1.5 rounded-md shadow-sm border border-border">
        <div className="flex flex-col gap-[1px]">
          {shape.map((row, rowIndex) => (
            <div key={rowIndex} className="flex gap-[1px]">
              {row.map((cell, colIndex) => (
                <div
                  key={colIndex}
                  className={cn(
                    'w-3 h-3 rounded-[1px]',
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
