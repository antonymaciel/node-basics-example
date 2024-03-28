const EventEmitter = require('events');


const emiter = new EventEmitter();

setInterval(
  () => {
    emiter.emit('hello', { param: Date.now() });
  },
  1000
)

emiter.on('hello', (param) => console.log(param));