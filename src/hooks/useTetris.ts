import { useState, useCallback, useEffect, useRef } from 'react';

// Tetris piece shapes
const PIECES = {
  I: {
    shape: [[1, 1, 1, 1]],
    color: 'tetris-i',
  },
  O: {
    shape: [
      [1, 1],
      [1, 1],
    ],
    color: 'tetris-o',
  },
  T: {
    shape: [
      [0, 1, 0],
      [1, 1, 1],
    ],
    color: 'tetris-t',
  },
  S: {
    shape: [
      [0, 1, 1],
      [1, 1, 0],
    ],
    color: 'tetris-s',
  },
  Z: {
    shape: [
      [1, 1, 0],
      [0, 1, 1],
    ],
    color: 'tetris-z',
  },
  J: {
    shape: [
      [1, 0, 0],
      [1, 1, 1],
    ],
    color: 'tetris-j',
  },
  L: {
    shape: [
      [0, 0, 1],
      [1, 1, 1],
    ],
    color: 'tetris-l',
  },
};

type PieceType = keyof typeof PIECES;

interface Position {
  x: number;
  y: number;
}

interface CurrentPiece {
  type: PieceType;
  shape: number[][];
  color: string;
  position: Position;
}

export interface GameState {
  board: (string | null)[][];
  currentPiece: CurrentPiece | null;
  nextPiece: PieceType;
  score: number;
  level: number;
  lines: number;
  isPlaying: boolean;
  isPaused: boolean;
  isGameOver: boolean;
}

const BOARD_WIDTH = 10;
const BOARD_HEIGHT = 20;
const BASE_SPEED = 1000;
const SPEED_DECREASE = 50;
const MIN_SPEED = 100;

const createEmptyBoard = (): (string | null)[][] =>
  Array.from({ length: BOARD_HEIGHT }, () => Array(BOARD_WIDTH).fill(null));

const getRandomPiece = (): PieceType => {
  const pieces = Object.keys(PIECES) as PieceType[];
  return pieces[Math.floor(Math.random() * pieces.length)];
};

const rotatePiece = (shape: number[][]): number[][] => {
  const rows = shape.length;
  const cols = shape[0].length;
  const rotated: number[][] = [];

  for (let col = 0; col < cols; col++) {
    const newRow: number[] = [];
    for (let row = rows - 1; row >= 0; row--) {
      newRow.push(shape[row][col]);
    }
    rotated.push(newRow);
  }

  return rotated;
};

export const useTetris = () => {
  const [gameState, setGameState] = useState<GameState>({
    board: createEmptyBoard(),
    currentPiece: null,
    nextPiece: getRandomPiece(),
    score: 0,
    level: 1,
    lines: 0,
    isPlaying: false,
    isPaused: false,
    isGameOver: false,
  });

  const gameLoopRef = useRef<number | null>(null);

  const checkCollision = useCallback(
    (piece: CurrentPiece, board: (string | null)[][]): boolean => {
      for (let row = 0; row < piece.shape.length; row++) {
        for (let col = 0; col < piece.shape[row].length; col++) {
          if (piece.shape[row][col]) {
            const newX = piece.position.x + col;
            const newY = piece.position.y + row;

            if (newX < 0 || newX >= BOARD_WIDTH || newY >= BOARD_HEIGHT) {
              return true;
            }

            if (newY >= 0 && board[newY][newX]) {
              return true;
            }
          }
        }
      }
      return false;
    },
    []
  );

  const mergePieceToBoard = useCallback(
    (piece: CurrentPiece, board: (string | null)[][]): (string | null)[][] => {
      const newBoard = board.map((row) => [...row]);

      for (let row = 0; row < piece.shape.length; row++) {
        for (let col = 0; col < piece.shape[row].length; col++) {
          if (piece.shape[row][col]) {
            const y = piece.position.y + row;
            const x = piece.position.x + col;
            if (y >= 0 && y < BOARD_HEIGHT && x >= 0 && x < BOARD_WIDTH) {
              newBoard[y][x] = piece.color;
            }
          }
        }
      }

      return newBoard;
    },
    []
  );

  const clearLines = useCallback(
    (board: (string | null)[][]): { newBoard: (string | null)[][]; linesCleared: number } => {
      const newBoard = board.filter((row) => row.some((cell) => cell === null));
      const linesCleared = BOARD_HEIGHT - newBoard.length;

      while (newBoard.length < BOARD_HEIGHT) {
        newBoard.unshift(Array(BOARD_WIDTH).fill(null));
      }

      return { newBoard, linesCleared };
    },
    []
  );

  const calculateScore = useCallback((linesCleared: number, level: number): number => {
    const lineScores: { [key: number]: number } = { 1: 100, 2: 300, 3: 500, 4: 800 };
    return (lineScores[linesCleared] || 0) * level;
  }, []);

  const spawnNewPiece = useCallback(
    (nextType: PieceType): CurrentPiece => {
      const piece = PIECES[nextType];
      return {
        type: nextType,
        shape: piece.shape,
        color: piece.color,
        position: {
          x: Math.floor((BOARD_WIDTH - piece.shape[0].length) / 2),
          y: 0,
        },
      };
    },
    []
  );

  const startGame = useCallback(() => {
    const firstPiece = getRandomPiece();
    const nextPiece = getRandomPiece();

    setGameState({
      board: createEmptyBoard(),
      currentPiece: spawnNewPiece(firstPiece),
      nextPiece,
      score: 0,
      level: 1,
      lines: 0,
      isPlaying: true,
      isPaused: false,
      isGameOver: false,
    });
  }, [spawnNewPiece]);

  const togglePause = useCallback(() => {
    setGameState((prev) => ({
      ...prev,
      isPaused: !prev.isPaused,
    }));
  }, []);

  const moveLeft = useCallback(() => {
    setGameState((prev) => {
      if (!prev.currentPiece || prev.isPaused || !prev.isPlaying) return prev;

      const newPiece = {
        ...prev.currentPiece,
        position: { ...prev.currentPiece.position, x: prev.currentPiece.position.x - 1 },
      };

      if (checkCollision(newPiece, prev.board)) return prev;

      return { ...prev, currentPiece: newPiece };
    });
  }, [checkCollision]);

  const moveRight = useCallback(() => {
    setGameState((prev) => {
      if (!prev.currentPiece || prev.isPaused || !prev.isPlaying) return prev;

      const newPiece = {
        ...prev.currentPiece,
        position: { ...prev.currentPiece.position, x: prev.currentPiece.position.x + 1 },
      };

      if (checkCollision(newPiece, prev.board)) return prev;

      return { ...prev, currentPiece: newPiece };
    });
  }, [checkCollision]);

  const rotate = useCallback(() => {
    setGameState((prev) => {
      if (!prev.currentPiece || prev.isPaused || !prev.isPlaying) return prev;

      const rotatedShape = rotatePiece(prev.currentPiece.shape);
      let newPiece = {
        ...prev.currentPiece,
        shape: rotatedShape,
      };

      // Wall kick - try to move piece if rotation causes collision
      if (checkCollision(newPiece, prev.board)) {
        newPiece = {
          ...newPiece,
          position: { ...newPiece.position, x: newPiece.position.x - 1 },
        };
        if (checkCollision(newPiece, prev.board)) {
          newPiece = {
            ...newPiece,
            position: { ...newPiece.position, x: newPiece.position.x + 2 },
          };
          if (checkCollision(newPiece, prev.board)) {
            return prev; // Can't rotate
          }
        }
      }

      return { ...prev, currentPiece: newPiece };
    });
  }, [checkCollision]);

  const moveDown = useCallback(() => {
    setGameState((prev) => {
      if (!prev.currentPiece || prev.isPaused || !prev.isPlaying) return prev;

      const newPiece = {
        ...prev.currentPiece,
        position: { ...prev.currentPiece.position, y: prev.currentPiece.position.y + 1 },
      };

      if (checkCollision(newPiece, prev.board)) {
        // Lock piece
        const newBoard = mergePieceToBoard(prev.currentPiece, prev.board);
        const { newBoard: clearedBoard, linesCleared } = clearLines(newBoard);
        const scoreIncrease = calculateScore(linesCleared, prev.level);
        const newLines = prev.lines + linesCleared;
        const newLevel = Math.floor(newLines / 10) + 1;

        // Spawn new piece
        const nextPieceObj = spawnNewPiece(prev.nextPiece);
        const newNextPiece = getRandomPiece();

        // Check game over
        if (checkCollision(nextPieceObj, clearedBoard)) {
          return {
            ...prev,
            board: clearedBoard,
            currentPiece: null,
            score: prev.score + scoreIncrease,
            lines: newLines,
            level: newLevel,
            isPlaying: false,
            isGameOver: true,
          };
        }

        return {
          ...prev,
          board: clearedBoard,
          currentPiece: nextPieceObj,
          nextPiece: newNextPiece,
          score: prev.score + scoreIncrease,
          lines: newLines,
          level: newLevel,
        };
      }

      return { ...prev, currentPiece: newPiece };
    });
  }, [checkCollision, mergePieceToBoard, clearLines, calculateScore, spawnNewPiece]);

  const hardDrop = useCallback(() => {
    setGameState((prev) => {
      if (!prev.currentPiece || prev.isPaused || !prev.isPlaying) return prev;

      let dropDistance = 0;
      let testPiece = { ...prev.currentPiece };

      while (!checkCollision({ ...testPiece, position: { ...testPiece.position, y: testPiece.position.y + 1 } }, prev.board)) {
        testPiece.position.y++;
        dropDistance++;
      }

      // Lock piece
      const newBoard = mergePieceToBoard(testPiece, prev.board);
      const { newBoard: clearedBoard, linesCleared } = clearLines(newBoard);
      const scoreIncrease = calculateScore(linesCleared, prev.level) + dropDistance * 2;
      const newLines = prev.lines + linesCleared;
      const newLevel = Math.floor(newLines / 10) + 1;

      // Spawn new piece
      const nextPieceObj = spawnNewPiece(prev.nextPiece);
      const newNextPiece = getRandomPiece();

      // Check game over
      if (checkCollision(nextPieceObj, clearedBoard)) {
        return {
          ...prev,
          board: clearedBoard,
          currentPiece: null,
          score: prev.score + scoreIncrease,
          lines: newLines,
          level: newLevel,
          isPlaying: false,
          isGameOver: true,
        };
      }

      return {
        ...prev,
        board: clearedBoard,
        currentPiece: nextPieceObj,
        nextPiece: newNextPiece,
        score: prev.score + scoreIncrease,
        lines: newLines,
        level: newLevel,
      };
    });
  }, [checkCollision, mergePieceToBoard, clearLines, calculateScore, spawnNewPiece]);

  // Game loop
  useEffect(() => {
    if (!gameState.isPlaying || gameState.isPaused || gameState.isGameOver) {
      if (gameLoopRef.current) {
        clearInterval(gameLoopRef.current);
        gameLoopRef.current = null;
      }
      return;
    }

    const speed = Math.max(MIN_SPEED, BASE_SPEED - (gameState.level - 1) * SPEED_DECREASE);

    gameLoopRef.current = window.setInterval(() => {
      moveDown();
    }, speed);

    return () => {
      if (gameLoopRef.current) {
        clearInterval(gameLoopRef.current);
      }
    };
  }, [gameState.isPlaying, gameState.isPaused, gameState.isGameOver, gameState.level, moveDown]);

  // Get ghost piece position (preview where piece will land)
  const getGhostPosition = useCallback((): number | null => {
    if (!gameState.currentPiece) return null;

    let ghostY = gameState.currentPiece.position.y;
    while (
      !checkCollision(
        {
          ...gameState.currentPiece,
          position: { ...gameState.currentPiece.position, y: ghostY + 1 },
        },
        gameState.board
      )
    ) {
      ghostY++;
    }

    return ghostY;
  }, [gameState.currentPiece, gameState.board, checkCollision]);

  return {
    gameState,
    startGame,
    togglePause,
    moveLeft,
    moveRight,
    rotate,
    moveDown,
    hardDrop,
    getGhostPosition,
    PIECES,
  };
};
