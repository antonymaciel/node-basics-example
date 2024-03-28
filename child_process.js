const { spawn, exec } = require('child_process');



const child = spawn('wc');

process.stdin.pipe(child.stdin);

child.on('exit', (code, signal) => {
  console.log('exit', code, signal);
});

child.on('close', () => {
  console.log('close')
});

child.stdout.on('data', (chunk) => {
  console.log('child stdout\n', chunk.toString());
});

child.stderr.on('data', (chunk) => {
  console.log('child stderr', chunk.toString())
});




const childLs = spawn('ls', ['-help']);
const childWc = spawn('wc', ['-l']);


childLs.stdout.on('data', (chunk) => {
  console.log('chunk ls', chunk.toString())
})

childLs.stdout.pipe(childWc.stdin);


childWc.stdout.on('data', (chunk) => {
  console.log('chunk wc', chunk.toString());
});

exec("ls", (err, stdout, stderr) => {
  console.log("result EXEC", stdout);
});



