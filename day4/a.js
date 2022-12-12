import { readFile } from "fs";
const testInput = [
  "2-4,6-8",
  "2-3,4-5",
  "5-7,7-9",
  "2-8,3-7",
  "6-6,4-6",
  "2-6,4-8",
];

readFile("./day4/input.txt", "utf8", (err, data) => {
  if (err) {
    console.log(err);
    return;
  }

  let result = 0;
  const formattedData = data.replace(/(\r)/gm, "").split("\n");
  //   console.log(formattedData);

  for (let index = 0; index < formattedData.length; index++) {
    const row = formattedData[index].split(",");
    const pair1 = row[0];
    const pair2 = row[1];

    const pairOneNumbers = pair1.split("-");
    const pairTwoNumbers = pair2.split("-");

    const pairOneLowestNumber = parseInt(pairOneNumbers[0]);
    const pairOneHighestNumber = parseInt(pairOneNumbers[1]);

    const pairTwoLowestNumber = parseInt(pairTwoNumbers[0]);
    const pairTwoHighestNumber = parseInt(pairTwoNumbers[1]);

    if (
      pairOneLowestNumber >= pairTwoLowestNumber &&
      pairOneHighestNumber <= pairTwoHighestNumber
    ) {
      console.log("pair one in pair tow", index);

      result++;
    } else if (
      pairTwoLowestNumber >= pairOneLowestNumber &&
      pairTwoHighestNumber <= pairOneHighestNumber
    ) {
      console.log("pair two in one", index);
      result++;
    }
  }

  console.log("result: ", result);
});
