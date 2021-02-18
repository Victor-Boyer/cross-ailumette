const readline = require("readline"),
  fs = require("fs");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  
});
const prefix = '> '

let array = ["   |   ", "  |||  ", " ||||| ", "|||||||"];

function plateau() {
  console.log("* * * * * *");
  for (let i = 0; i < 4; i++) {
    console.log("* " + array[i] + " *");
  }
  console.log("* * * * * *");
}

function step(line, match, array) {
  const b = array[line - 1].split(" ");
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
}


/* console.log("Line ?");
rl.on('line', (line) => {
  console.log('Match : ');
  let bool = false;
  let matches;
  while (!bool) {
    rl.on('line', (match)=>{
      matches = match;
      bool=true;
    })
  }
  step(line, matches, array)
  plateau();
}); */

let ifLine = false;

console.log('Good to see you. Let\'s play AIlumette !');
plateau();
console.log('Line : ');
rl.setPrompt(prefix, prefix.length);
rl.prompt();

let Line;
let Matches;


rl.on('line', (line)=>{
  if(!ifLine) {
    Line = line;
    ifLine = true;
    console.log('Match(es) : ');
  }
  else {
    Matches = line;
    step(Line, Matches, array);
    plateau();
    ifLine = false;
    console.log('Line : ');
  }
  rl.prompt();
}).on('close', function() {
  console.log('Have a great day!');
  process.exit(0);
});