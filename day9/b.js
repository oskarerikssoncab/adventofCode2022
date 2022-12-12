import { readFile } from "fs";

readFile("./day9/input.txt", "utf8", (err, data) => {
  if (err) {
    console.log(err);
    return;
  }

  function logCoordinates() {
    //
    positionVisited.set(tail.x + "," + tail.y);
  }

  function difference(a, b) {
    return Math.abs(a - b);
  }

  let positionVisited = new Map();

  let head = {
    x: 0,
    y: 0,
  };

  let tail = {
    x: 0,
    y: 0,
  };

  const formattedData = data.replace(/(\r)/gm, "").split("\n");
  logCoordinates();

  for (let index = 0; index < formattedData.length; index++) {
    const command = formattedData[index];

    const moveDirection = command.split(" ")[0];
    const moveStep = parseInt(command.split(" ")[1]);

    if (moveDirection === "R") {
      //   head.x += moveStep;

      for (let y = 0; y < moveStep; y++) {
        head.x++;

        if (difference(head.x, tail.x) > 9) {
          //check if diagonal move is required
          if (difference(head.y - 9, tail.y) === 0) {
            tail.x++;
          } else {
            tail.x++;

            if (head.y - 10 - tail.y < 0) {
              tail.y--;
            } else if (head.y - 10 - tail.y > 0) {
              tail.y++;
            }
          }
        }
        logCoordinates();
      }
    }
    if (moveDirection === "L") {
      //   head.x -= moveStep;
      for (let y = 0; y < moveStep; y++) {
        head.x--;

        if (difference(head.x, tail.x) > 9) {
          //check if diagonal move is required
          if (difference(head.y - 9, tail.y) === 0) {
            tail.x--;
          } else {
            tail.x--;

            if (head.y - 10 - tail.y < 0) {
              tail.y--;
            } else if (head.y - 10 - tail.y > 0) {
              tail.y++;
            }
          }
        }
        logCoordinates();
      }
    }

    if (moveDirection === "U") {
      //   head.y += moveStep;

      for (let y = 0; y < moveStep; y++) {
        head.y++;

        if (difference(head.y, tail.y) > 9) {
          //check if diagonal move is required
          if (difference(head.x - 9, tail.x) === 0) {
            tail.y++;
          } else {
            tail.y++;

            if (head.x - 10 - tail.x < 0) {
              tail.x--;
            } else if (head.x - 10 - tail.x > 0) {
              tail.x++;
            }
          }
        }
        logCoordinates();
      }
    }

    if (moveDirection === "D") {
      //   head.y -= moveStep;
      for (let y = 0; y < moveStep; y++) {
        head.y--;

        if (difference(head.y, tail.y) > 9) {
          //check if diagonal move is required
          if (difference(head.x - 9, tail.x) === 0) {
            tail.y--;
          } else {
            tail.y--;

            if (head.x - 10 - tail.x < 0) {
              tail.x--;
            } else if (head.x - 10 - tail.x > 0) {
              tail.x++;
            }
          }
        }
        logCoordinates();
      }
    }
  }

  console.log("head:", head);
  console.log("tail:", tail);
  //   console.log(positionVisited);
  console.log(positionVisited.size);
});
