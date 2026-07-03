// src/utils/mastermind.js

/**
 * Generate a random secret code
 * Example: 5831
 */
export const generateCode = (length = 4) => {
  let code = String(Math.floor(Math.random() * 9) + 1);

  for (let i = 1; i < length; i++) {
    code += Math.floor(Math.random() * 10);
  }

  return code;
};

/**
 * Sort hints:
 * green -> yellow -> black
 */
export const sortHints = (hints) => {
  const order = {
    green: 0,
    yellow: 1,
    black: 2,
  };

  return [...hints].sort(
    (a, b) => order[a] - order[b]
  );
};

/**
 * Proper Mastermind hint algorithm
 *
 * green  = correct digit + correct position
 * yellow = correct digit + wrong position
 * black  = digit not present
 *
 * Example:
 *
 * Secret: 5831
 * Guess : 5138
 *
 * Result:
 * ["green", "yellow", "yellow", "yellow"]
 */
export const getHints = (guess, secret) => {
  const secretArr = secret.split("");
  const guessArr = guess.split("");

  const hints = [];

  // PASS 1 -> Greens
  for (let i = 0; i < secret.length; i++) {
    if (guessArr[i] === secretArr[i]) {
      hints.push("green");

      secretArr[i] = null;
      guessArr[i] = null;
    }
  }

  // PASS 2 -> Yellows & Blacks
  for (let i = 0; i < secret.length; i++) {
    if (guessArr[i] === null) continue;

    const foundIndex = secretArr.indexOf(guessArr[i]);

    if (foundIndex !== -1) {
      hints.push("yellow");

      secretArr[foundIndex] = null;
    } else {
      hints.push("black");
    }
  }

  return sortHints(hints);
};

/**
 * Check win condition
 */
export const isWinner = (guess, secret) => {
  return guess === secret;
};