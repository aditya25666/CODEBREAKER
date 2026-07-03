// src/App.jsx

import { useState } from "react";

import DifficultyScreen from "./components/DifficultyScreen";
import GameBoard from "./components/GameBoard";

export default function App() {
  const [difficulty, setDifficulty] =
    useState(null);

  const handleSelectDifficulty = (
    level
  ) => {
    setDifficulty(level);
  };

  const handleChangeDifficulty = () => {
    setDifficulty(null);
  };

  return (
    <>
      {!difficulty ? (
        <DifficultyScreen
          onSelectDifficulty={
            handleSelectDifficulty
          }
        />
      ) : (
        <GameBoard
          difficulty={difficulty}
          onChangeDifficulty={
            handleChangeDifficulty
          }
        />
      )}
    </>
  );
}