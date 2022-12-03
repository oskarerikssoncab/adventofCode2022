import { readFile } from "fs";

const alpha = Array.from(Array(26)).map((e, i) => i + 65);

const alphabetUpper = new Map(
  alpha.map((x, i) => [String.fromCharCode(x), 27 + i])
);

const alphabetLower = new Map(
  alpha.map((x, i) => [String.fromCharCode(x).toLowerCase(), 1 + i])
);

const scoring = new Map([...alphabetLower, ...alphabetUpper]);

readFile("./day3/input.txt", "utf8", (err, data) => {
  if (err) {
    console.log(err);
    return;
  }

  let total = 0;

  const formattedData = data.replace(/(\r)/gm, "").split("\n");
  formattedData.forEach((backpack, i) => {
    if ((i + 1) % 3 !== 0) return;

    const first = i - 2;
    const second = i - 1;

    const map1 = new Map(
      formattedData[first].split("").map((char) => [char, null])
    );
    const map2 = new Map(
      formattedData[second].split("").map((char) => [char, null])
    );

    const current = backpack.split("");
    for (let index = 0; index < current.length; index++) {
      const char = current[index];

      if (map1.has(char) && map2.has(char)) {
        total += scoring.get(char);
        break;
      }
    }
  });

  console.log(total);
});
