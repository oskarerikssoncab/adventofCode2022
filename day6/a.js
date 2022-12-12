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

//   for (let i = 3; i < text.length; i++) {
//     const char = text[i];

//     const unique = new Map();

//     unique.set(text[i - 3], null);
//     unique.set(text[i - 2], null);
//     unique.set(text[i - 1], null);
//     unique.set(text[i], null);

//     if (unique.size === 4) {
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

  for (let i = 3; i < data.length; i++) {
    // const char = data[i];

    const unique = new Map();

    unique.set(data[i - 3], null);
    unique.set(data[i - 2], null);
    unique.set(data[i - 1], null);
    unique.set(data[i], null);

    if (unique.size === 4) {
      console.log("correct?", i + 1);
      break;
    }
  }
});
