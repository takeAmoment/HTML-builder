const fs = require ('fs');
const path = require ('path');
// eslint-disable-next-line no-unused-vars
const readdir = require ('fs/promises');

const writableFile = fs.createWriteStream(path.join(__dirname, 'project-dist', 'bundle.css'), 'utf-8');

fs.readdir(path.join(__dirname, 'styles'), (err, files) => {
  files.forEach((file) => {
    fs.stat(path.join(__dirname, 'styles', file), (err, stats) => {
      if(err){
        return console.error(err);
      }

      if(stats.isFile() && path.extname(file) === '.css'){
        const readableFile = fs.createReadStream (path.join(__dirname, 'styles', file), 'utf-8');
        readableFile.on('err', (err) => { return console.error(err);});
        readableFile.pipe(writableFile);
      }
    });
  });
});