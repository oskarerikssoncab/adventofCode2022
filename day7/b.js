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

const addToResult = (v, k, space_needed) => {
  if (v.size >= space_needed) {
    result.push(v.size);
  }

  if (v.paths.size === 0) return;

  v.paths.forEach((v, k) => addToResult(v, k, space_needed));
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
        // addFile(file);
      } else if (isDirCommand) {
        const dir = command.split(" ")[1];
        setNewDir2(files.get(currentPath[0]), dir, 0);
      }
    }
  }

  const MAX_SPACE = 70000000;
  const CURRENT_FILES_SPACE = files.get("/").size;
  const SPACE_LEFT = MAX_SPACE - CURRENT_FILES_SPACE;
  const SPACE_NEEDED = 30000000 - SPACE_LEFT;
  // console.log(SPACE_NEEDED);

  files.forEach((v, k) => addToResult(v, k, SPACE_NEEDED));
  const sorted = result.sort((a, b) => a - b);
  console.log(sorted);
  // console.log(result.reduce((v, next) => v + next));

  // files.get("/").paths.forEach((v, k) => {
  //   if (v.size >= SPACE_NEEDED) console.log(k);
  // });
});
