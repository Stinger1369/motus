import React from "react";
import "./GameTile.css";

const GameTile = ({ value, onChange, disabled, hintStatus, inputRef }) => {
  return (
    <input
      type="text"
      maxLength="1"
      className={`tile ${hintStatus}`}
      value={value || ""}
      onChange={onChange}
      disabled={disabled}
      ref={inputRef}
    />
  );
};

export default GameTile;
