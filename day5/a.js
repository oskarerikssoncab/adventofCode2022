import { readFile } from "fs";

// const testInstructions = [
//   "move 1 from 2 to 1",
//   "move 3 from 1 to 3",
//   "move 2 from 2 to 1",
//   "move 1 from 1 to 2",
// ];

// const testRow1 = ["Z", "N"];
// const testRow2 = ["M", "C", "D"];
// const testRow3 = ["P"];

// const stacks = [testRow1, testRow2, testRow3];

const row1 = ["N", "B", "D", "T", "V", "G", "Z", "J"];
const row2 = ["S", "R", "M", "D", "W", "P", "F"];
const row3 = ["V", "C", "R", "S", "Z"];
const row4 = ["R", "T", "J", "Z", "P", "H", "G"];
const row5 = ["T", "C", "J", "N", "D", "Z", "Q", "F"];
const row6 = ["N", "V", "P", "W", "G", "S", "F", "M"];
const row7 = ["G", "C", "V", "B", "P", "Q"];
const row8 = ["Z", "B", "P", "N"];
const row9 = ["W", "P", "J"];

const stacks = [row1, row2, row3, row4, row5, row6, row7, row8, row9];

// testInstructions.forEach((instructionRow) => {
//   let formattedInstruction = instructionRow.replace("move", "");
//   formattedInstruction = formattedInstruction.replace("from", ",");
//   formattedInstruction = formattedInstruction.replace("to", ",");
//   formattedInstruction = formattedInstruction.replace(/\s/g, "");

//   const instructions = formattedInstruction.split(",");
//   const moveNumber = instructions[0];
//   const moveFrom = instructions[1];
//   const moveTo = instructions[2];

//   for (let index = 0; index < moveNumber; index++) {
//     const create = stacks[moveFrom - 1].pop();
//     stacks[moveTo - 1].push(create);
//   }
// });

// stacks.forEach((stack) => console.log(stack[stack.length - 1]));

readFile("./day5/input.txt", "utf8", (err, data) => {
  if (err) {
    console.log(err);
    return;
  }
  const formattedData = data.replace(/(\r)/gm, "").split("\n");

  formattedData.forEach((instructionRow) => {
    console.log(instructionRow);
    let formattedInstruction = instructionRow.replace("move", "");
    formattedInstruction = formattedInstruction.replace("from", ",");
    formattedInstruction = formattedInstruction.replace("to", ",");
    formattedInstruction = formattedInstruction.replace(/\s/g, "");

    const instructions = formattedInstruction.split(",");
    const moveNumber = instructions[0];
    const moveFrom = instructions[1];
    const moveTo = instructions[2];

    for (let index = 0; index < moveNumber; index++) {
      const create = stacks[moveFrom - 1].pop();
      stacks[moveTo - 1].push(create);
    }
  });

  stacks.forEach((stack) => console.log(stack[stack.length - 1]));
});
