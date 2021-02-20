const { exec } = require('child_process');
const readline = require("readline"),
  fs = require("fs");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const cmd = process.argv[2] || null;
class AIlumette {
  constructor() {
    this.board = ["   |   ", "  |||  ", " ||||| ", "|||||||"]
  }
  
  getBoard () {
    return this.board;
  }

  setBoard (new_board) {
    this.board = new_board;
  }

  checkWin () {
    const array = this.getBoard()
    let cnt = 0;
    for (let i = 0; i < array.length; i++) {
      if (array[i].includes('|')) {
        cnt++
      }
    }
    if (cnt == 0) {
      return true
    }
    else {
      return false
    }
  }

  board_game() {
    console.log("* * * * * *");
    for (let i = 0; i < 4; i++) {
      console.log(i + 1 + " " + this.board[i] + " *");
    }
    console.log("* * * * * *");
  }
   
  getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }
  
  step(line, match) {
    const array = this.getBoard()
    let b;
    try {
      b = array[line - 1].split(" ");
    } catch (err) {
      console.log("This line is empty... : " + line);
      console.log("Error from the player ! It's robot turn !");
      return;
    }
    if (!array[line-1].includes('|')) {
      console.log("This line is empty... : " + line);
      console.log("Error from the player ! It's robot turn !");
      return;
    }

    
    const lgt = Math.ceil((b.length - 1) / 2);
    let content = b[lgt].slice(0, b[lgt].length - match);
    const d = Math.ceil((7 - content.length) / 2);
    let e = "";
    for (let i = 1; i < d; i++) {
      e = e.concat(" ");
    }
    const f = 7 - content.length - e.length;
    content = e.concat(content);
    for (let i = 0; i < f; i++) {
      content = content.concat(" ");
    }
    array.splice(line - 1, 1, content);
    this.setBoard(array);
    this.board_game();
  }
  
  ia() {
    const array = this.getBoard();
    let bool = false;
    let cnt = 0;
    while (bool == false) {
      const line = this.getRandomInt(4) + 1;
      let matches;
  
      const b = array[line - 1].split(" ");
      let content;
      for (let i = 0; i < b.length; i++) {
        if (b[i].length > 0) {
          content = b[i];
        }
      }
      if(typeof content !== "undefined") {
        switch (content.length) {
          case 1:
            matches = null;
            break;
          case 2:
            matches = this.getRandomInt(2) + 1;
            break;
          case 3:
            matches = this.getRandomInt(3) + 1;
            break;
          case 4:
            matches = this.getRandomInt(4) + 1;
            break;
          case 5:
            matches = this.getRandomInt(5) + 1;
            break;
          case 6:
            matches = this.getRandomInt(6) + 1;
            break;
          case 7:
            matches = this.getRandomInt(7) + 1;
            break;
          default:
            break;
        }
        if (content.includes("|") && matches !== null) {
          console.log('robot> Line : ' + line);
          console.log('robot> Match(es) : ' + matches);
          this.step(line, matches);
          bool = true;
        }
      }
      cnt++;
      let arg;
      for (let i = 0; i < array.length; i++) {
        if(array[i].includes('|')) arg++
      }
      if (arg == 1 || cnt > 30) {
        bool = true;
        this.board_game();
        console.log("Oops... The robot don't find any solution to win... But the next time, it will be more stronger !");
        process.exit(0);
      }
    }
  }
}

/* ------------------ Game Launcher ------------------*/
if(cmd == '--gui') {
  console.log('Launching...');
  console.log('Press CTRL + C to close the app');
  exec('npm run electron-react', (error, stdout, stderr)=>{
    if (error) throw error;
    console.log(stdout);
    if (stderr) throw stderr;
  });
}
else if (cmd == null) {

  const Game = new AIlumette()
  
  const prefix = "> ";
  let ifLine = false;
  
  console.log("Good to see you. Let's play AIlumette !");
  console.log("If the match(es) you put is more than the `|` number, that will delete them all.");
  Game.board_game()
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
      Game.step(Line, Matches)
      if(Game.checkWin()) {
        console.log('You lost... too bad');
        process.exit(0);
      }
      console.log("Robot  turn ! ...");
      Game.ia();
      if(Game.checkWin()) {
        console.log('You won !');
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
}
else {
  console.error('Option : `'+ cmd +'` is not supported');
  process.exit(0);
}