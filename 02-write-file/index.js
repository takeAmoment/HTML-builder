const fs = require('fs');
const path = require('path');
const readline = require('readline');

const {stdin, stdout, stderr} = process;

const rl = readline.createInterface({
  input: stdin,
});

const writeStream = fs.createWriteStream(path.join(__dirname, 'text.txt'), 'utf-8');

stdout.write('Hello dude! \n');
rl.on('line', line => {
  if(line !== 'exit'){
    writeStream.write(line + '\n');
  } else {
    process.exit();
  }
});

process.on('exit', (code) => {
  if(code === 0){
    stdout.write('Bye dude\n');
  } else {
    stderr.write('Something goes wrong');
  }
});
