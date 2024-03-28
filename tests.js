const uuid = require('uuid');
const EventEmmitter = require('events');

const myEmitter = new EventEmmitter();


myEmitter.on('log', (msg) => console.log(uuid.v4(), msg))


setTimeout(() => {
  myEmitter.emit('log', 'message from timeout');
}, 3000);
