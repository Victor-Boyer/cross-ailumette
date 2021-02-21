const { exec } = require("child_process");
const readline = require("readline"),
  fs = require("fs");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const AIlumette = require("./body-game");
const cmd = process.argv[2] || null;

/* ------------------ Game Launcher ------------------*/
if (cmd == "--gui") {
  console.log("Launching...");
  console.log("Press CTRL + C to close the app");
  exec("npm run electron-react", (error, stdout, stderr) => {
    if (error) throw error;
    console.log(stdout);
    if (stderr) throw stderr;
  });
} else if (cmd == null) {
  const Game = new AIlumette();

  const prefix = "> ";
  let ifLine = false;

  console.log("Good to see you. Let's play AIlumette !");
  console.log(
    "If the match(es) you put is more than the `|` number, that will delete them all."
  );
  Game.board_game();
  console.log("Line : ");
  rl.setPrompt(prefix, prefix.length);
  rl.prompt();

  let Line;
  let Matches;

  rl.on("line", (line) => {
    if (!ifLine) {
      Line = line;
      ifLine = true;
      console.log("Match(es) : ");
    } else {
      Matches = line;
      Game.step(Line, Matches);
      if (Game.checkWin()) {
        console.log("You lost... too bad");
        process.exit(0);
      }
      console.log("Robot  turn ! ...");
      Game.ia();
      if (Game.checkWin()) {
        console.log("You won !");
        process.exit(0);
      }
      console.log("Your turn");
      console.log("Line : ");
      ifLine = false;
    }
    rl.prompt();
  }).on("close", function () {
    console.log("Have a great day!");
    process.exit(0);
  });
} else {
  console.error("Option : `" + cmd + "` is not supported");
  process.exit(0);
}
