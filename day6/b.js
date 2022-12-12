import { readFile } from "fs";

// const testInput = [
//   "mjqjpqmgbljsphdztnvjfqwrcgsmlb",
//   "bvwbjplbgvbhsrlpgdmjqwftvncz",
//   "nppdvjthqldpwncqszvftbrmjlhg",
//   "nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg",
//   "zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw",
// ];

// for (let index = 0; index < testInput.length; index++) {
//   const text = testInput[index];

//   for (let i = 13; i < text.length; i++) {
//     const test = [...text.substring(i - 13, i + 1)];
//     const unique = new Map(test.map((c) => [c, null]));

//     if (unique.size === 14) {
//       console.log("correct?", i + 1);
//       break;
//     }
//   }
// }

readFile("./day6/input.txt", "utf8", (err, data) => {
  if (err) {
    console.log(err);
    return;
  }

  for (let i = 13; i < data.length; i++) {
    const test = [...data.substring(i - 13, i + 1)];
    const unique = new Map(test.map((c) => [c, null]));

    if (unique.size === 14) {
      console.log("correct?", i + 1);
      break;
    }
  }
});
