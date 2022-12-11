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
  let result = 0;

  while (y < gridLength) {
    const row = formattedData[y];
    const currentNumber = parseInt(row[x]);

    const numberIsOnEdge =
      x === 0 ||
      y === 0 ||
      x === gridLength - 1 ||
      y === formattedData.length - 1;

    if (numberIsOnEdge) {
      //is edge tree
      result++;
    } else {
      let leftCheck = false;
      let rightCheck = false;
      let upCheck = false;
      let downCheck = false;

      //check left
      for (let l = 0; l < x; l++) {
        const numb = parseInt(row[l]);
        if (currentNumber <= numb) {
          leftCheck = false;
          break;
        }
        leftCheck = true;
      }

      //check right
      for (let r = x + 1; r < row.length; r++) {
        const numb = parseInt(row[r]);
        if (currentNumber <= numb) {
          rightCheck = false;
          break;
        }
        rightCheck = true;
      }

      //check up

      for (let u = 0; u < y; u++) {
        const r = formattedData[u];
        const numb = parseInt(r[x]);
        if (currentNumber <= numb) {
          upCheck = false;
          break;
        }
        upCheck = true;
      }

      //check down
      for (let d = y + 1; d < formattedData.length; d++) {
        const r = formattedData[d];
        const numb = parseInt(r[x]);
        if (currentNumber <= numb) {
          downCheck = false;
          break;
        }
        downCheck = true;
      }

      if (leftCheck || rightCheck || upCheck || downCheck) result++;
    }

    if (x === row.length - 1) {
      y++;
      x = 0;
    } else {
      x++;
    }
  }

  console.log(result);
});
