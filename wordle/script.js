const answer = "moody";
const guesses = ["might", "flood", "stray", "", "", ""];

function Title() {
  return React.createElement(
    "div",
    { id: "title", className: "merriweather-bold" },
    "Wordle"
  );
}

/**
 * Represents a single square on the game board, displaying a letter with a color-coded status.
 * @param {Object} props - The component props.
 * @param {string} props.letter - The letter to be displayed in the square.
 * @param {string} props.status - The status of the letter ('green', 'yellow', 'gray', or an empty string for unused squares).
 * @returns {React.Element} A React element representing a game square with a letter and color-coded background.
 */
function GameSquare({ letter, status }) {
  return React.createElement("div", { className: `box ${status}` }, letter);
}

/**
 * Represents the game board, consisting of multiple rows of GameSquare components, each reflecting a guess and its evaluation against the answer.
 * @param {Object} props - The component props.
 * @param {string[]} props.guesses - An array of string guesses made by the player.
 * @param {string} props.answer - The correct answer the player is attempting to guess.
 * @returns {React.Element} A React element representing the entire game board with all guesses evaluated against the answer.
 */
function GameBoard({ guesses, answer }) {
  let allSquares = [];
  for (let guess of guesses) {
    const evaluation = guess.split("").map((letter, index) => {
      if (answer[index] === letter) return "green";
      if (answer.includes(letter)) return "yellow";
      return "gray";
    });
    while (evaluation.length < 5) {
      evaluation.push("empty");
    }
    // this can be done in longhand, but it's ugly.
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/concat
    allSquares = allSquares.concat(evaluation);
  }
  while (allSquares.length < 30) {
    allSquares.push("empty");
  }

  return React.createElement(
    "div",
    { id: "gameboard" },
    allSquares.map((status, index) =>
      React.createElement(GameSquare, {
        key: index,
        letter:
          index < guesses.join("").length
            ? guesses.join("")[index].toUpperCase()
            : "",
        status: status !== "empty" ? status : "",
      })
    )
  );
}

/**
 * Represents a keyboard component with keys the player can use to make guesses.
 * @returns {React.Element} A React element representing a keyboard with rows of keys, including letters and functional keys like "enter" and "delete".
 */
function KeyboardComponent() {
  const keyboardRows = [
    ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
    ["a", "s", "d", "f", "g", "h", "j", "k", "l"],
    ["enter", "z", "x", "c", "v", "b", "n", "m", "on_delete"],
  ];

  return React.createElement(
    "div",
    {},
    keyboardRows.map((row) =>
      React.createElement(
        "div",
        { className: "keyboard-row" },
        row.map((key) =>
          key === "on_delete"
            ? React.createElement(
                "div",
                { className: "keyboard-key" },
                React.createElement("i", {
                  className: "fa-solid fa-delete-left",
                })
              )
            : React.createElement(
                "div",
                { className: "keyboard-key" },
                key.toUpperCase()
              )
        )
      )
    )
  );
}

/**
 * The main App component that aggregates the GameBoard and KeyboardComponent, effectively composing the game's UI.
 * @returns {React.Element} A React element representing the full application, including the game board and the keyboard.
 */
function App() {
  return React.createElement(
    "div",
    {},
    React.createElement(Title),
    React.createElement(GameBoard, { guesses, answer }),
    React.createElement(KeyboardComponent)
  );
}

ReactDOM.render(React.createElement(App), document.getElementById("root"));
