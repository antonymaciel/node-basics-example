console.log('asdf');
console.log(globalThis);
console.log(global);
setTimeout(()=>{console.log('setTimeout')}, 1000);
queueMicrotask(()=>{console.log('microtask')});
setTimeout(()=>{console.log('setTimeout2')}, 1000);


const os = require('os');
const path = require('path');

console.log(os.type());
console.log(os.version());
console.log(os.homedir());


console.log(__dirname);
console.log(__filename);

console.log(path.dirname(__filename));
console.log(path.basename(__filename));
console.log(path.extname(__filename));

console.log(path.parse(__filename));

const { add, log } = require('./math');

console.log(add(1,2));
log("message");