import React, { useEffect } from "react";
import GameTile from "./GameTitle";

const GameRow = ({
  rowIndex,
  difficulty,
  currentRow,
  currentGuess,
  handleTileChange,
  gameWon,
  onHandleGuess,
  isCurrentRowComplete,
  inputRefs,
  hints,
}) => {
  useEffect(() => {
    if (rowIndex === currentRow) {
      const timer = setTimeout(() => {
        onHandleGuess();
      }, 30000); // 30 seconds per row

      return () => clearTimeout(timer);
    }
  }, [rowIndex, currentRow, onHandleGuess]);

  return (
    <div className="board-row">
      {Array(difficulty)
        .fill(null)
        .map((_, colIndex) => {
          const hintStatus = hints[rowIndex]?.[colIndex]?.status || "";
          const letter =
            hints[rowIndex]?.[colIndex]?.letter ||
            currentGuess[rowIndex][colIndex];
          return (
            <GameTile
              key={colIndex}
              value={letter}
              onChange={(e) =>
                handleTileChange(rowIndex, colIndex, e.target.value)
              }
              disabled={rowIndex !== currentRow}
              hintStatus={hintStatus}
              inputRef={(el) =>
                (inputRefs.current[rowIndex * difficulty + colIndex] = el)
              }
            />
          );
        })}
      {rowIndex === currentRow && !gameWon && (
        <button onClick={onHandleGuess} disabled={!isCurrentRowComplete()}>
          Proposer
        </button>
      )}
    </div>
  );
};

export default GameRow;
