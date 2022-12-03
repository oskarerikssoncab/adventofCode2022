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
    var backpackResult = new Map();

    const compartments1 = new Map(
      backpack
        .substring(0, backpack.length / 2)
        .split("")
        .map((char) => [char, null])
    );

    const compartments2 = backpack.substring(backpack.length / 2).split("");

    for (let index = 0; index < compartments2.length; index++) {
      const char = compartments2[index];
      if (compartments1.has(char)) backpackResult.set(char, null);
    }

    backpackResult.forEach((_, k) => (total += scoring.get(k)));
  });

  console.log("TOTAL: ", total);
});
