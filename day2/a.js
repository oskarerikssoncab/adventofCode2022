import { readFile } from "fs";

const SCISSORS_SCORE = 3;
const PAPER_SCORE = 2;
const ROCK_SCORE = 1;
const WIN_SCORE = 6;
const LOSE_SCORE = 0;
const DRAW_SCORE = 3;

const ROCK_SHORTHAND = { value: "A", loseTo: "Y", draw: "X" };
const PAPER_SHORTHAND = { value: "B", loseTo: "Z", draw: "Y" };
const SCISSORS_SHORTHAND = { value: "C", loseTo: "X", draw: "Z" };

const calculateResultOfRound = (opponent, you) => {
  let roundResults = 0;
  if (opponent === ROCK_SHORTHAND.value) {
    if (you === ROCK_SHORTHAND.loseTo) {
      roundResults = WIN_SCORE + PAPER_SCORE;
    } else if (you === ROCK_SHORTHAND.draw) {
      roundResults = DRAW_SCORE + ROCK_SCORE;
    } else {
      roundResults = LOSE_SCORE + SCISSORS_SCORE;
    }
  } else if (opponent === PAPER_SHORTHAND.value) {
    if (you === PAPER_SHORTHAND.loseTo) {
      roundResults = WIN_SCORE + SCISSORS_SCORE;
    } else if (you === PAPER_SHORTHAND.draw) {
      roundResults = DRAW_SCORE + PAPER_SCORE;
    } else {
      roundResults = LOSE_SCORE + ROCK_SCORE;
    }
  } else {
    if (you === SCISSORS_SHORTHAND.loseTo) {
      roundResults = WIN_SCORE + ROCK_SCORE;
    } else if (you === SCISSORS_SHORTHAND.draw) {
      roundResults = DRAW_SCORE + SCISSORS_SCORE;
    } else {
      roundResults = LOSE_SCORE + PAPER_SCORE;
    }
  }

  return roundResults;
};

readFile("./day2/input.txt", "utf8", (err, data) => {
  if (err) {
    console.error(err);
    return;
  }

  const formattedData = data.split("\n").map((r) => r.replace("\r", ""));

  let result = 0;
  formattedData
    .map((row) => row.split(" "))
    .forEach((val) => (result += calculateResultOfRound(val[0], val[1])));
  console.log(result);
});
