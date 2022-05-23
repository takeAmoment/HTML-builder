const fs = require('fs');
const path = require('path');

const pathToFile = path.join(__dirname, 'text.txt');
const readStream = fs.createReadStream (pathToFile, 'utf-8');

readStream.on('data', chunk => console.log(chunk));
readStream.on('error', error => {
  if(error.code === 'ENOENT'){
    return console.error('This file doesn\'t exist\n');
  } else {
    return console.error(error.message);
  }
});