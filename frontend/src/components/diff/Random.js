import React from "react";

const Random = ({ setRandomDifficulty }) => {
  return (
    <label>
      <input
        type="checkbox"
        onChange={(e) => setRandomDifficulty(e.target.checked)}
      />
      Random
    </label>
  );
};

export default Random;
