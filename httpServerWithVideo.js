const http = require('http');
const fs = require('fs');
const path = require('path');


const server = http.createServer((req, res) => {
  switch(req.url) {
    case ('/video:buffer'):
      fs.readFile(path.join(__dirname, "files", "2022-07-09.mp4"), (error, data) => {
        if (error) { 
          res.statusCode = 500;
          res.end();
        }

        res.writeHead(200, { 'Content-Type': 'video/mp4' })
        res.write(data);
        res.end();
      })
      break;
    case ('/video:stream'):
      const readable = fs.createReadStream(path.join(__dirname, "files", "2022-07-09.mp4"));
      res.writeHead(200, { 'Content-Type': 'video/mp4' })
      readable.pipe(res);
      readable.on('error', () => {
        res.statusCode = 500;
        res.end();
      })

      break;
    default:
      res.writeHead(404, { 'Content-Type': 'text/plain'});
      res.write("Resource not found")
      res.end();
  }
})

server.listen(8085, () => console.log('up and running'));
