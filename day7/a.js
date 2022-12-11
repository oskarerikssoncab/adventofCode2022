import { readFile } from "fs";

let currentPath = [];
const files = new Map();
files.set("/", { size: 0, paths: new Map() });
const MAX_SIZE = 100000;
const result = [];
let hasRunListCommand = false;

const setNewDir2 = (ref, dirName, i) => {
  if (ref.paths.size === 0) {
    ref.paths.set(dirName, { size: 0, paths: new Map() });
  } else {
    i++;

    if (ref.paths.get(currentPath[i])) {
      setNewDir2(ref.paths.get(currentPath[i]), dirName, i);
    } else {
      ref.paths.set(dirName, { size: 0, paths: new Map() });
    }
  }
};

const addFile2 = (file, ref, i) => {
  if (ref.paths.size === 0) {
    ref.size += file;
  } else {
    ref.size += file;
    i++;
    if (ref.paths.get(currentPath[i])) {
      addFile2(file, ref.paths.get(currentPath[i]), i);
    }
  }
};

const addToResult = (v, k) => {
  if (v.size <= MAX_SIZE) {
    result.push(v.size);
  }

  if (v.paths.size === 0) return;

  v.paths.forEach((v, k) => addToResult(v, k));
};

readFile("./day7/input.txt", "utf8", (err, data) => {
  if (err) {
    console.log(err);
    return;
  }

  const formattedData = data.replace(/(\r)/gm, "").trim().split("\n");

  for (let index = 0; index < formattedData.length; index++) {
    let command = formattedData[index];

    const isDirCommand = command.includes("dir");
    const isFileCommand = isNaN(command.split(" ")[0]) === false;
    const isListCommand = command.includes("$ ls");
    const isMoveForwardCommand =
      command.split(" ")[1] === "cd" && command.includes("..") === false;
    const isMoveBackCommand = command.includes("..");
    const hasRunNoneLsCommand =
      command.includes("$") && isListCommand === false;

    if (isMoveForwardCommand) {
      currentPath.push(command.split(" ")[2]);
    } else if (isMoveBackCommand) {
      currentPath.pop();
    } else if (isListCommand) {
      hasRunListCommand = true;
    } else if (hasRunNoneLsCommand) {
      hasRunListCommand = false;
    } else if (hasRunListCommand) {
      if (isFileCommand) {
        const file = parseInt(command.split(" ")[0]);
        addFile2(file, files.get(currentPath[0]), 0);
      } else if (isDirCommand) {
        const dir = command.split(" ")[1];
        setNewDir2(files.get(currentPath[0]), dir, 0);
      }
    }
  }

  files.forEach((v, k) => addToResult(v, k));

  console.log(result.reduce((v, next) => v + next));
});
