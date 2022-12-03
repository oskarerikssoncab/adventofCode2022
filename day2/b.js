import { readFile } from "fs";

const SCISSORS_SCORE = 3;
const PAPER_SCORE = 2;
const ROCK_SCORE = 1;
const WIN_SCORE = 6;
const LOSE_SCORE = 0;
const DRAW_SCORE = 3;

const DRAW_RESULT = "Y";
const LOSE_RESULT = "X";
const WIN_RESULT = "Z";

const ROCK_SHORTHAND = { value: "A", loseTo: "Y", draw: "X" };
const PAPER_SHORTHAND = { value: "B", loseTo: "Z", draw: "Y" };
const SCISSORS_SHORTHAND = { value: "C", loseTo: "X", draw: "Z" };

const calculateResultOfRound = (opponent, roundShouldEndWith) => {
  let roundPoints = 0;
  if (roundShouldEndWith === WIN_RESULT) {
    roundPoints += WIN_SCORE;
    if (opponent === ROCK_SHORTHAND.value) {
      roundPoints += PAPER_SCORE;
    } else if (opponent === PAPER_SHORTHAND.value) {
      roundPoints += SCISSORS_SCORE;
    } else {
      roundPoints += ROCK_SCORE;
    }
  } else if (roundShouldEndWith === DRAW_RESULT) {
    roundPoints += DRAW_SCORE;
    if (opponent === ROCK_SHORTHAND.value) {
      roundPoints += ROCK_SCORE;
    } else if (opponent === PAPER_SHORTHAND.value) {
      roundPoints += PAPER_SCORE;
    } else {
      roundPoints += SCISSORS_SCORE;
    }
  } else {
    roundPoints += LOSE_SCORE;
    if (opponent === ROCK_SHORTHAND.value) {
      roundPoints += SCISSORS_SCORE;
    } else if (opponent === PAPER_SHORTHAND.value) {
      roundPoints += ROCK_SCORE;
    } else {
      roundPoints += PAPER_SCORE;
    }
  }

  return roundPoints;
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
