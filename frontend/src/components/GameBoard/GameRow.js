import React, { useEffect } from "react";
import GameTile from "./GameTitle";
import "./GameRow.css";
import blackCheck from "../../assets/images/Black_check.svg";
import greenCheck from "../../assets/images/Green_check.svg";

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
      <div className="check-icon-container">
        {rowIndex === currentRow && !gameWon && (
          <img
            src={isCurrentRowComplete() ? greenCheck : blackCheck}
            alt={isCurrentRowComplete() ? "Green Check" : "Black Check"}
            onClick={isCurrentRowComplete() ? onHandleGuess : null}
            className="check-icon"
            style={{
              cursor: isCurrentRowComplete() ? "pointer" : "not-allowed",
            }}
          />
        )}
      </div>
    </div>
  );
};

export default GameRow;
