// const { PassThrough } = require('stream');

/* const fs = require('fs');

const rs = fs.createReadStream('./files/lorem.txt', {encoding: 'utf8'});

const ws = fs.createWriteStream('./files/new-lores.txt');

rs.on('data', (dataChunk) => {
  console.log('chunk', dataChunk);
  ws.write(dataChunk);
});

rs.pipe(ws);
*/

/*
const Stream = require('stream');

class StreamFromArray extends Stream.Readable {
  constructor(array) {
    super({ encoding: 'UTF-8' });
    this.array = array;
    this.index = 0;
  }

  _read() {
    if (this.index <= this.array.length) {
      const chunk = this.array[this.index];
      this.push(chunk);
      this.index += 1;
    } else {
      this.push(null);
    }
  }
}

const readable = new StreamFromArray(['chunkasdf', 'chunkasdf2']);

readable.on('data', (chunk) => {
  console.log('received chunk', chunk);
})

readable.on('error', (error) => {
  console.log('received error', error);
})



class ReadableStramTest extends Stream.Readable { 
  constructor() {
    super({ encoding: 'UTF-8' });
  }

  _read(size) {
    console.log('read size', size);
  }
}
const readable2 = new ReadableStramTest();

readable2.on('data', (chunk) => {
  console.log('received chunk', chunk);
})

readable2.on('error', (error) => {
  console.log('received error', error);
})

readable2.push('asdf3')
readable2.push('asdf4')
readable2.push('asdf5')




class WritableStramTest extends Stream.Writable { 
  constructor() {
    super({ objectMode: true });
  }

  _write(chunk, cb) {
    console.log('write data', chunk, cb);
    if (!this.write(chunk)) {
      console.log("pressure");
      this.once('drain', cb);
    } else {
      cb();
    }
  }
}

const writable = new WritableStramTest();
writable.write('test', () => { 
  console.log('Write completed, do more writes now.');
});

*/


const { PassThrough, Transform, Readable, Writable } = require('stream');

// Lectura
const fs = require('fs');
const streamLectura = fs.createReadStream('./archivo-texto.txt', { highWaterMark: 1 });

streamLectura.on('data', (chunk) => {
  console.log('receivded chunk', chunk, chunk instanceof Buffer );
  console.log('he recivido un chunk de tamanño', chunk.length);
  console.log('el contendio del chunk es', chunk.toString());
  process.stdout.write(chunk);
})

streamLectura.on('end', () => console.log("FIN!!!"))

// Escritura
process.stdout.setEncoding('utf8');
process.stdout.write("Que sugerencias quieres darle a Uco?");

process.stdin.once('data', (chunk) => {
  process.stdout.write("Has respondido");
  process.stdout.write(chunk);
  process.stdin.pause();
})



// Tuberia
const streamLectura2 = fs.createReadStream('./archivo-texto.txt', { highWaterMark: 1 });
const streamEscritura = fs.createWriteStream('./otro-archivo.txt');
const streamEscritura2 = fs.createWriteStream('./otro-archivo2.txt');

streamLectura2.pipe(streamEscritura);


streamLectura2.on('data', (chunk) => {
  console.log('chunk', chunk.toString());
   streamEscritura2.write(chunk);
})

streamLectura2.on('end', () => {
  console.log("lectura finalizada")
})


// Passthrough

const logger = new PassThrough();

logger.on('data', (chunk) => {
  console.log("Logger Data: ", new Date(), chunk.toString());
})

const streamEscritura3 = fs.createWriteStream('./otro-archivo3.txt');

streamLectura2.pipe(logger).pipe(streamEscritura3);


// Transform

const transformer = new Transform({
  transform: (chunk, encoding, callback) => {
    callback(null, chunk.toString() + ',');
  }
});


const streamEscritura4 = fs.createWriteStream('./otro-archivo4.txt');

streamLectura2.pipe(transformer).pipe(streamEscritura4);


// Readable 

const reader = new Readable({
  read: (size) => {
    console.log("size readable", size);
  }, 
  highWaterMark: 1
})


reader.on('data', (chunk) => {
  console.log(chunk.toString());
})

reader.push("READER CHUNK TEST");

// Writable

const writer = new Writable({
  write: (chunk, encoding, callback) => {
    callback(null);
    console.log("WRITER", chunk.toString());
  },
  highWaterMark: 1
})

streamLectura2.pipe(writer);

writer.write("hello");

