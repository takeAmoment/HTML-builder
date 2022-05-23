const fs = require('fs');
const path = require('path');
// eslint-disable-next-line no-unused-vars
const readdir = require('fs/promises');

fs.mkdir(path.join(__dirname, 'files-copy'), {recursive: true}, (err) => {
  if(err){
    console.error(err);
  } 
  console.log(' You create new directory');
});
function copyDir(file) {
  const readableFile = fs.createReadStream(path.join(__dirname, 'files', file), 'utf-8');
  const writebleFile = fs.createWriteStream(path.join(__dirname, 'files-copy', file), 'utf-8');

  readableFile.on('error', error => console.log('Error', error.message));
  writebleFile.on('error', error => console.log('Error', error.message));
  readableFile.pipe(writebleFile);
}

fs.readdir(path.join(__dirname, 'files'), (err, files) => {

  if(err){
    return console.error(err.message);
  }
  files.forEach((file) => {
    copyDir(file);
  });
});


