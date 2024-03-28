const fs = require('fs');
const fsPromises = require('fs/promises');
const path = require('path');


const fileOps = async () => {
  try {
    const data = await fsPromises.readFile(path.join(__dirname, 'files', 'lorem.txt'),  'utf8');
    console.log('promise read');
    console.log(data);

    await fsPromises.writeFile(path.join(__dirname, 'files', 'reply.txt'), 'Nice to meet you\n');
    console.log('write complete');
    
    await fsPromises.appendFile(path.join(__dirname, 'files', 'reply.txt'), 'thanks');
    console.log('append complete');
    
    await fsPromises.rename(path.join(__dirname, 'files', 'reply.txt'), path.join(__dirname, 'files', 'reply2.txt'));
    console.log('rename completed');
    
    await fsPromises.rename(path.join(__dirname, 'files', 'reply2.txt'), path.join(__dirname, 'files', 'reply.txt'));
    console.log('rename again completed');
  } catch (err) {
    console.error(err);
  }
}

fileOps();


fs.readFile(path.join(__dirname, 'files', 'lorem.txt'), 'utf8', (err, data) => {
  if (err) throw err;
  console.log('callback read');
  console.log(data);
});

try {
  const data = fs.readFileSync(path.join(__dirname, 'files', 'lorem.txt'), 'utf8');
  console.log('sync read');
  console.log(data);
} catch (err) {
  throw err;
}
console.log('LOGGING');

/* 
fs.writeFile(path.join(__dirname, 'files', 'reply.txt'), 'Nice to meet you\n', (err) => {
  if (err) throw err;
  console.log('write complete');

  fs.appendFile(path.join(__dirname, 'files', 'reply.txt'), 'thanks', (err) => {
    if (err) throw err;
    console.log('append complete');

    fs.rename(path.join(__dirname, 'files', 'reply.txt'), path.join(__dirname, 'files', 'reply2.txt'), (err) => {
      if (err) throw err;
      console.log('rename completed');

      fs.rename(path.join(__dirname, 'files', 'reply2.txt'), path.join(__dirname, 'files', 'reply.txt'), (err, data) => {
        if (err) throw err;
        console.log('rename again completed');
      });
    });
  });
});
*/


process.on('uncaughtException', err => {
  console.error('Error', err);
  process.exit();
})
