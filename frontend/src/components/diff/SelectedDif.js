import React from "react";

const SelectedDif = ({ difficulty, setDifficulty, randomDifficulty }) => {
  return (
    <label>
      Niveau de difficulté :
      <input
        type="number"
        value={difficulty}
        onChange={(e) => setDifficulty(e.target.value)}
        min="3"
        max="15"
        disabled={randomDifficulty}
      />
    </label>
  );
};

export default SelectedDif;
