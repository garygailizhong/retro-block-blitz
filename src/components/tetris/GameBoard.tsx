import { GameState } from '@/hooks/useTetris';
import { cn } from '@/lib/utils';

interface GameBoardProps {
  gameState: GameState;
  ghostY: number | null;
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

const GameBoard = ({ gameState, ghostY }: GameBoardProps) => {
  const { board, currentPiece } = gameState;

  // Create display board with current piece and ghost
  const displayBoard = board.map((row) => [...row]);

  // Add ghost piece
  if (currentPiece && ghostY !== null && ghostY !== currentPiece.position.y) {
    for (let row = 0; row < currentPiece.shape.length; row++) {
      for (let col = 0; col < currentPiece.shape[row].length; col++) {
        if (currentPiece.shape[row][col]) {
          const y = ghostY + row;
          const x = currentPiece.position.x + col;
          if (y >= 0 && y < 20 && x >= 0 && x < 10 && !displayBoard[y][x]) {
            displayBoard[y][x] = 'ghost';
          }
        }
      }
    }
  }

  // Add current piece
  if (currentPiece) {
    for (let row = 0; row < currentPiece.shape.length; row++) {
      for (let col = 0; col < currentPiece.shape[row].length; col++) {
        if (currentPiece.shape[row][col]) {
          const y = currentPiece.position.y + row;
          const x = currentPiece.position.x + col;
          if (y >= 0 && y < 20 && x >= 0 && x < 10) {
            displayBoard[y][x] = currentPiece.color;
          }
        }
      }
    }
  }

  return (
    <div className="relative bg-[hsl(var(--tetris-board))] rounded-xl p-1 shadow-2xl">
      <div className="grid grid-cols-10 gap-[1px] bg-[hsl(var(--tetris-grid))]">
        {displayBoard.map((row, rowIndex) =>
          row.map((cell, colIndex) => (
            <div
              key={`${rowIndex}-${colIndex}`}
              className={cn(
                'aspect-square w-[calc((min(85vw,320px)-8px)/10)] transition-colors duration-75',
                cell === null && 'bg-[hsl(var(--tetris-board))]',
                cell === 'ghost' && 'bg-[hsl(var(--tetris-ghost))] opacity-30',
                cell && cell !== 'ghost' && cn(CELL_COLORS[cell], 'shadow-inner rounded-sm')
              )}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default GameBoard;
