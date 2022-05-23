const promisses = require('fs/promises');
const fs = require('fs');
const path = require ('path');

fs.mkdir(path.join(__dirname, 'project-dist'), {recursive: true}, (err) => {
  if(err) {
    return console.error(err); 
  }
  console.log('You created a new directory');
});

fs.copyFile(path.join(__dirname, 'template.html'), path.join(__dirname, 'project-dist', 'index.html'), (err)=> {
  if(err){
    console.log(err);
  }
});

(async()=> {
  let templateFile = await promisses.readFile(path.join(__dirname, 'project-dist', 'index.html'), 'utf-8');
  fs.readdir(path.join(__dirname, 'components'), async (err, files) => {
    if(err){
      return console.log(err);
    }
    files.forEach(async (file) => {
      const readableFile = await promisses.readFile(path.join(__dirname, 'components', file), 'utf-8');
      templateFile = templateFile.replace(`{{${path.basename(file, path.extname(file))}}}`, readableFile);
      await promisses.writeFile(path.join(__dirname, 'project-dist', 'index.html'), (templateFile));
    });
  });
})();

fs.readdir(path.join(__dirname, 'styles'), (err, files) => {
  if(err){
    return console.log(err);
  }
  const writeStyleFile = fs.createWriteStream(path.join(__dirname, 'project-dist', 'style.css'));
  files.reverse().forEach((file) => {
    let readStyleFile = fs.createReadStream(path.join(__dirname, 'styles', file));
    readStyleFile.pipe(writeStyleFile);
  });
});
fs.mkdir(path.join(__dirname, 'project-dist', 'assets'), {recursive: true}, (err) => {
  if(err) {
    return console.error(err); 
  }
  console.log('You created a new directory assets');
});
let readDir = path.join(__dirname, 'assets');
let writeDir = path.join(__dirname, 'project-dist', 'assets');

copyFile(readDir, writeDir);
function copyFile (readDir, writeDir){
  fs.readdir(readDir, (err, files) => {
    files.forEach( (file) => {
      fs.lstat(path.join(readDir, file), (err, stats) => {
        if(stats.isFile()){
          fs.copyFile(path.join(readDir, file), path.join(writeDir, file), (err) => {
            if(err){
              return console.log(err);
            }
          });
    
        } else {
          fs.mkdir(path.join(writeDir, file), (err) =>{
            if(err){
              return console.log(err);
            }
          });
          copyFile(path.join(readDir, file), path.join(writeDir, file) );
        }
      });
      
    });
  });
}
