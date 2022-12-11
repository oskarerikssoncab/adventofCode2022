import { readFile } from "fs";

// const testData = ["30373", "25512", "65332", "33549", "35390"];

readFile("./day8/input.txt", "utf8", (err, data) => {
  const formattedData = data.replace(/(\r)/gm, "").trim().split("\n");

  if (err) {
    console.log(err);
    return;
  }

  let x = 0;
  let y = 0;
  let gridLength = formattedData[0].length;

  let currentHighest = 0;

  while (y < gridLength) {
    const row = formattedData[y];
    const currentNumber = parseInt(row[x]);
    let roundResult = 1;

    const numberIsOnEdge =
      x === 0 ||
      y === 0 ||
      x === gridLength - 1 ||
      y === formattedData.length - 1;

    if (numberIsOnEdge) {
      //is edge tree
      roundResult = 0;
    } else {
      //check left
      let leftResult = 1;
      for (let l = x; l > 1; l--) {
        const numb = parseInt(row[l - 1]);
        if (currentNumber > numb) {
          leftResult++;
        } else break;
      }

      roundResult = roundResult * leftResult;

      //check right
      let rightResult = 1;
      for (let r = x + 1; r < row.length - 1; r++) {
        const numb = parseInt(row[r]);
        if (currentNumber > numb) {
          rightResult++;
        } else break;
      }
      roundResult = roundResult * rightResult;

      //check up
      let upResult = 1;
      for (let u = y; u > 1; u--) {
        const r = formattedData[u];
        const numb = parseInt(r[u - 1]);
        if (currentNumber > numb) {
          upResult++;
        } else break;
      }
      roundResult = roundResult * upResult;

      //check down
      let downResult = 1;
      for (let d = y; d < formattedData.length - 1; d++) {
        const r = formattedData[d + 1];
        const numb = parseInt(r[x]);
        if (currentNumber > numb) {
          downResult++;
        } else break;
      }
      roundResult = roundResult * downResult;
    }

    if (x === row.length - 1) {
      y++;
      x = 0;
    } else {
      x++;
    }

    if (roundResult > currentHighest) {
      currentHighest = roundResult;
    }
  }

  console.log(currentHighest);
});
