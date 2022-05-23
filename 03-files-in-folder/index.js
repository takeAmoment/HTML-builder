const fs = require('fs');
// eslint-disable-next-line no-unused-vars
const readdir = require('fs/promises');
const path = require('path');

let secretFolderPath = path.join(__dirname, 'secret-folder');

fs.readdir(secretFolderPath, (err, files)=>{
  if(err){
    return console.log(err);
  }
  files.forEach((file) => {
    fs.stat(path.join(secretFolderPath, `${file}`), (err, stats) => {
      if(err) return console.log(err);
      if(stats.isFile()){
        let [filename, ext] = [path.basename(file, path.extname(file)), path.extname(file).slice(1)];
        console.log(`${filename} - ${ext} - ${stats['size'] / 1000}kb`);
      } 
    });
  });
});