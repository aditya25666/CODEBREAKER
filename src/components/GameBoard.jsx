// src/components/GameBoard.jsx

import { useState, useEffect } from "react";

import AttemptRow from "./AttemptRow";
import StatsCard from "./StatsCard";
import WinLoseModal from "./WinLoseModal";

import {
  generateCode,
  getHints,
  isWinner,
} from "../utils/mastermind";

const DIFFICULTY_CONFIG = {
  easy: {
    length: 4,
    attempts: 10,
    time: 120,
  },

  medium: {
    length: 5,
    attempts: 8,
    time: 90,
  },

  hard: {
    length: 6,
    attempts: 6,
    time: 60,
  },
};

export default function GameBoard({
  difficulty,
  onChangeDifficulty,
}) {
  const config =
    DIFFICULTY_CONFIG[difficulty];

  const [secretCode, setSecretCode] =
    useState("");

  const [guess, setGuess] = useState(
    Array(config.length).fill("")
  );

  const [attempts, setAttempts] =
    useState([]);

  const [attemptsLeft, setAttemptsLeft] =
    useState(config.attempts);

  const [timeLeft, setTimeLeft] =
    useState(config.time);

  const [won, setWon] =
    useState(false);

  const [gameOver, setGameOver] =
    useState(false);

  const [stats, setStats] = useState(() => {
    const saved =
      localStorage.getItem(
        "codebreaker-stats"
      );

    return saved
      ? JSON.parse(saved)
      : {
          gamesPlayed: 0,
          wins: 0,
          bestScore: null,
        };
  });

  // --------------------------------
  // Initialize Game
  // --------------------------------

  useEffect(() => {
    const code =
      generateCode(config.length);

    setSecretCode(code);

    console.log(
      "Secret Code:",
      code
    );
  }, [difficulty]);

  // --------------------------------
  // Timer
  // --------------------------------

  useEffect(() => {
    if (won || gameOver) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setGameOver(true);
          return 0;
        }

        return prev - 1;
      });
    }, 1000);

    return () =>
      clearInterval(timer);
  }, [won, gameOver]);

  // --------------------------------
  // Enter Key Support
  // --------------------------------
useEffect(() => {
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  window.addEventListener(
    "keydown",
    handleKeyPress
  );

  return () =>
    window.removeEventListener(
      "keydown",
      handleKeyPress
    );
}, [guess, attemptsLeft, won, gameOver]);
  // --------------------------------
  // Restart Game
  // --------------------------------

  const restartGame = () => {
    const code =
      generateCode(config.length);

    setSecretCode(code);

    setGuess(
      Array(config.length).fill("")
    );

    setAttempts([]);

    setAttemptsLeft(
      config.attempts
    );

    setTimeLeft(config.time);

    setWon(false);

    setGameOver(false);

    setTimeout(() => {
      document
        .getElementById("digit-0")
        ?.focus();
    }, 50);
  };

  // --------------------------------
  // Input Handling
  // --------------------------------

 const handleInput = (
  index,
  value
) => {
  if (!/^\d?$/.test(value))
    return;

  const updated = [...guess];

  updated[index] = value;

  setGuess(updated);

  if (
    value &&
    index < config.length - 1
  ) {
    document
      .getElementById(
        `digit-${index + 1}`
      )
      ?.focus();
  }

 const guessString =
  customGuess
    ? customGuess.join("")
    : guess.join("");

  if (
    guessString.length === config.length &&
    !updated.includes("")
  ) {
    setTimeout(() => {
      handleSubmit(updated);
    }, 100);
  }
};

  const handleKeyDown = (
    e,
    index
  ) => {
    if (
      e.key === "Backspace" &&
      !guess[index] &&
      index > 0
    ) {
      document
        .getElementById(
          `digit-${index - 1}`
        )
        ?.focus();
    }
  };

  // --------------------------------
  // Submit Guess
  // --------------------------------

  const handleSubmit = (
  customGuess = null
) => {

    const guessString =
      guess.join("");

    if (
      guessString.length !==
      config.length
    ) {
      alert(
        `Enter all ${config.length} digits`
      );
      return;
    }

    const hints =
      getHints(
        guessString,
        secretCode
      );

    const newAttempt = {
      guess: guessString,
      hints,
    };

    setAttempts((prev) => [
      ...prev,
      newAttempt,
    ]);

    const remaining =
      attemptsLeft - 1;

    setAttemptsLeft(
      remaining
    );

    // WIN
    if (
      isWinner(
        guessString,
        secretCode
      )
    ) {
      setWon(true);

      const updatedStats = {
        ...stats,
        gamesPlayed:
          stats.gamesPlayed + 1,

        wins:
          stats.wins + 1,

        bestScore:
          stats.bestScore === null
            ? attempts.length + 1
            : Math.min(
                stats.bestScore,
                attempts.length + 1
              ),
      };

      setStats(updatedStats);

      localStorage.setItem(
        "codebreaker-stats",
        JSON.stringify(
          updatedStats
        )
      );

      return;
    }

    // LOSE
    if (remaining <= 0) {
      setGameOver(true);

      const updatedStats = {
        ...stats,
        gamesPlayed:
          stats.gamesPlayed + 1,
      };

      setStats(updatedStats);

      localStorage.setItem(
        "codebreaker-stats",
        JSON.stringify(
          updatedStats
        )
      );

      return;
    }

    setGuess(
      Array(config.length).fill("")
    );

    setTimeout(() => {
      document
        .getElementById("digit-0")
        ?.focus();
    }, 50);
  };

  return (
  <>
    <div className="min-h-screen bg-slate-950 text-white flex justify-center items-center px-4 py-8">
      <div className="w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-6">

        <div className="text-center mb-8">
          <h1 className="text-4xl font-black">
            CODE BREAKER 🔐
          </h1>

          <p className="text-slate-400 mt-2">
            Crack the secret {config.length}-digit code
          </p>
        </div>

        <StatsCard
          attemptsLeft={attemptsLeft}
          timeLeft={timeLeft}
          stats={stats}
        />

        <div className="space-y-3 mb-8">
          {attempts.length === 0 ? (
            <div className="text-center text-slate-500 py-6 border border-dashed border-slate-700 rounded-xl">
              No attempts yet
            </div>
          ) : (
            attempts.map((attempt, index) => (
              <AttemptRow
                key={index}
                guess={attempt.guess}
                hints={attempt.hints}
              />
            ))
          )}
        </div>

        {!won && !gameOver && (
          <>
            <div className="flex justify-center gap-3 flex-wrap mb-6">
              {guess.map((digit, index) => (
                <input
                  key={index}
                  id={`digit-${index}`}
                  type="text"
                  maxLength={1}
                  value={digit}
                  onChange={(e) =>
                    handleInput(
                      index,
                      e.target.value
                    )
                  }
                  onKeyDown={(e) =>
                    handleKeyDown(
                      e,
                      index
                    )
                  }
                  className="
                    w-14
                    h-14
                    bg-slate-800
                    border
                    border-slate-600
                    rounded-xl
                    text-center
                    text-2xl
                    font-bold
                    focus:border-green-500
                    focus:outline-none
                  "
                />
              ))}
            </div>

            
          </>
        )}

        <div className="mt-6 text-center">
          <button
            onClick={onChangeDifficulty}
            className="text-slate-400 hover:text-white"
          >
            ← Change Difficulty
          </button>
        </div>

      </div>
    </div>

    <WinLoseModal
      isOpen={won || gameOver}
      won={won}
      secretCode={secretCode}
      attemptsUsed={attempts.length}
      onPlayAgain={restartGame}
      onChangeDifficulty={onChangeDifficulty}
    />
  </>
);
}