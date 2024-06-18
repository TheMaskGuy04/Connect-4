const board = document.querySelector(".board");
const reset_btn = document.querySelector(".reset-btn");
const result = document.querySelector(".winner");
const single_btn = document.getElementById("single");
const double_btn = document.getElementById("double");

let choice = "";

let board_arr = [
  [-1, -1, -1, -1, -1, -1, -1],
  [-1, -1, -1, -1, -1, -1, -1],
  [-1, -1, -1, -1, -1, -1, -1],
  [-1, -1, -1, -1, -1, -1, -1],
  [-1, -1, -1, -1, -1, -1, -1],
  [-1, -1, -1, -1, -1, -1, -1],
];

function creatBoard() {
  for (let i = 0; i < 42; i++) {
    const new_cell = document.createElement("div");
    new_cell.setAttribute("class", "cell");
    new_cell.setAttribute("id", `${i}`);

    board.appendChild(new_cell);
  }
}

creatBoard();

single_btn.addEventListener("click", () => {
  choice = "single";
  double_btn.disabled = true;
});

double_btn.addEventListener("click", () => {
  choice = "double";
  single_btn.disabled = true;
});

const cell = document.querySelectorAll(".cell");
let current_color = "red";
let moves = 0;

result.innerHTML = `It's Red turn`;

// adding click event listener.
for (let i = 0; i < 42; i++) {
  const curr_cell = cell[i];

  curr_cell.addEventListener("click", () => {
    //
    if (choice.length == 0) {
      alert("Select Single or Double Mode.");
      return;
    }

    moves++;
    const column = i % 7;
    fillBoard(column);

    if (moves >= 7) {
      const check = checkWinner();

      if (check == -1) {
      } else {
        const winner = check == 1 ? "Red" : "Yellow";
        result.innerHTML = `${winner} is the Winner.`;
        return;
      }
    }

    if (choice == "double") {
      current_color = current_color == "red" ? "yellow" : "red";
      result.innerHTML = `It's ${current_color} turn`;
    }

    if (choice == "single") {
      result.innerHTML = `It's Yellow turn`;

      nextMove();

      console.log(board_arr);

      moves++;

      if (moves >= 7) {
        const check = checkWinner();

        if (check == -1) {
        } else {
          const winner = check == 1 ? "Red" : "Yellow";

          result.innerHTML = `${winner} is the Winner.`;
          return;
        }
      }
    }
  });
}

reset_btn.addEventListener("click", stop);

function fillBoard(column) {
  let row = 5;
  for (let i = 0; i < 6; i++) {
    if (board_arr[i][column] != -1) {
      if (i == 0) {
        return -1;
      } else {
        row = i - 1;
        break;
      }
    }
  }

  board_arr[row][column] = current_color == "red" ? 1 : 0;

  const index = row * 7 + column;
  const cell_to_color = cell[index];
  cell_to_color.style.background = `${current_color}`;
}

function stop() {
  board_arr = [
    [-1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1],
  ];

  choice = "";
  current_color = "red";

  single_btn.disabled = false;
  double_btn.disabled = false;

  for (let i = 0; i < 42; i++) {
    const element = cell[i];

    element.style.background = "";
  }
}

function checkWinner() {
  for (let i = 5; i >= 0; i--) {
    for (let j = 0; j < 7; j++) {
      const curr = board_arr[i][j];

      if (curr == -1) {
        continue;
      } else {
        // East checking
        if (j <= 3) {
          if (
            board_arr[i][j + 1] == curr &&
            board_arr[i][j + 2] == curr &&
            board_arr[i][j + 3] == curr
          ) {
            return curr;
          }
        }

        // North checking
        if (i >= 3) {
          if (
            board_arr[i - 1][j] == curr &&
            board_arr[i - 2][j] == curr &&
            board_arr[i - 3][j] == curr
          ) {
            return curr;
          }
        }

        // North-East checking
        if (i >= 3 && j <= 3) {
          // console.log("0");
          if (
            board_arr[i - 1][j + 1] == curr &&
            board_arr[i - 2][j + 2] == curr &&
            board_arr[i - 3][j + 3] == curr
          ) {
            // console.log("3");
            return curr;
          }
        }

        // North-West Checking
        if (i >= 3 && j >= 3) {
          if (
            board_arr[i - 1][j - 1] == curr &&
            board_arr[i - 2][j - 2] == curr &&
            board_arr[i - 3][j - 3] == curr
          ) {
            return curr;
          }
        }
      }
    }
  }

  return -1;
}

function add(curr, red_win, yellow_win, i, j) {
  if (curr == 1) {
    if (i != 5 && board_arr[i + 1][j] == -1) {
    } else {
      red_win[red_win.length] = [i, j];
    }
  } else if (curr == 0) {
    if (i != 5 && board_arr[i + 1][j] == -1) {
    } else {
      yellow_win[yellow_win.length] = [i, j];
    }
  }
}

function nextMove() {
  let yellow_win = [];
  let red_win = [];

  let empty = [];

  for (let i = 5; i >= 0; i--) {
    for (let j = 0; j < 7; j++) {
      let curr = board_arr[i][j];

      if (curr == -1) {
        // East checking
        empty[empty.length] = [i, j];

        if (j <= 3) {
          if (
            board_arr[i][j + 1] == board_arr[i][j + 2] &&
            board_arr[i][j + 2] == board_arr[i][j + 3]
          ) {
            add(board_arr[i][j + 1], red_win, yellow_win, i, j);
          }
        }

        // North checking
        if (i >= 3) {
          if (
            board_arr[i - 1][j] == board_arr[i - 2][j] &&
            board_arr[i - 2][j] == board_arr[i - 3][j]
          ) {
            add(board_arr[i - 1][j], red_win, yellow_win, i, j);
          }
        }

        // North-East checking
        if (i >= 3 && j <= 3) {
          if (
            board_arr[i - 1][j + 1] == board_arr[i - 2][j + 2] &&
            board_arr[i - 2][j + 2] == board_arr[i - 3][j + 3]
          ) {
            add(board_arr[i - 1][j + 1], red_win, yellow_win, i, j);
          }
        }

        // North-West Checking
        if (i >= 3 && j >= 3) {
          if (
            board_arr[i - 1][j - 1] == board_arr[i - 2][j - 2] &&
            board_arr[i - 2][j - 2] == board_arr[i - 3][j - 3]
          ) {
            add(board_arr[i - 1][j - 1], red_win, yellow_win, i, j);
          }
        }
      }
      //
      else {
        // East checking
        if (j <= 3) {
          if (board_arr[i][j + 1] == curr) {
            if (board_arr[i][j + 2] == curr) {
              if (board_arr[i][j + 3] == -1) {
                add(curr, red_win, yellow_win, i, j + 3);
              }
            } else if (
              board_arr[i][j + 2] == -1 &&
              board_arr[i][j + 3] == curr
            ) {
              add(curr, red_win, yellow_win, i, j + 2);
            }
          } else if (
            board_arr[i][j + 1] == -1 &&
            board_arr[i][j + 2] == curr &&
            board_arr[i][j + 3] == curr
          ) {
            add(curr, red_win, yellow_win, i, j + 1);
          }
        }

        // North checking
        if (i >= 3) {
          if (board_arr[i - 1][j] == curr) {
            if (board_arr[i - 2][j] == curr) {
              if (board_arr[i - 3][j] == -1) {
                add(curr, red_win, yellow_win, i - 3, j);
              }
            } else if (
              board_arr[i - 2][j] == -1 &&
              board_arr[i - 3][j] == curr
            ) {
              add(curr, red_win, yellow_win, i - 2, j);
            }
          } else if (
            board_arr[i - 1][j] == -1 &&
            board_arr[i - 2][j] == curr &&
            board_arr[i - 3][j] == curr
          ) {
            add(curr, red_win, yellow_win, i - 1, j);
          }
        }

        // North-East checking
        if (i >= 3 && j <= 3) {
          if (board_arr[i - 1][j + 1] == curr) {
            if (board_arr[i - 2][j + 2] == curr) {
              if (board_arr[i - 3][j + 3] == -1) {
                add(curr, red_win, yellow_win, i - 3, j + 3);
              }
            } else if (
              board_arr[i - 2][j + 2] == -1 &&
              board_arr[i - 3][j + 3] == curr
            ) {
              add(curr, red_win, yellow_win, i - 2, j + 2);
            }
          } else if (
            board_arr[i - 1][j + 1] == -1 &&
            board_arr[i - 2][j + 2] == curr &&
            board_arr[i - 3][j + 3] == curr
          ) {
            add(curr, red_win, yellow_win, i - 1, j + 1);
          }
        }

        // North-West Checking
        if (i >= 3 && j >= 3) {
          if (board_arr[i - 1][j - 1] == curr) {
            if (board_arr[i - 2][j - 2] == curr) {
              if (board_arr[i - 3][j - 3] == -1) {
                add(curr, red_win, yellow_win, i - 3, j - 3);
              }
            } else if (
              board_arr[i - 2][j - 2] == -1 &&
              board_arr[i - 3][j - 3] == curr
            ) {
              add(curr, red_win, yellow_win, i - 2, j - 2);
            }
          } else if (
            board_arr[i - 1][j - 1] == -1 &&
            board_arr[i - 2][j - 2] == curr &&
            board_arr[i - 3][j - 3] == curr
          ) {
            add(curr, red_win, yellow_win, i - 1, j - 1);
          }
        }
      }
    }
  }

  let row, column;

  if (yellow_win.length != 0) {
    row = yellow_win[0][0];
    column = yellow_win[0][1];
  } else if (red_win.length != 0) {
    row = red_win[0][0];
    column = red_win[0][1];
  } else {
    row = empty[0][0];
    column = empty[0][1];
  }

  board_arr[row][column] = 0;

  const index = row * 7 + column;
  const cell_to_color = cell[index];
  cell_to_color.style.background = `yellow`;

  result.innerHTML = "It's Red turn";
}
