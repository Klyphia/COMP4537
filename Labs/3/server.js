const http = require('http');
const url = require('url');
const fs = require('fs');

const utils = require('./modules/utils');
const greeting = require('./lang/messages/en/en.js');

class Server {
  constructor(port) {
    this.port = port;
    this.server = http.createServer(this.handleRequest.bind(this));
  }

  start() {
    this.server.listen(this.port, () => {
      console.log(`Server running on port ${this.port}`);
    });
  }

  handleRequest(req, res) {
    const parsedUrl = url.parse(req.url, true);
    const pathname = parsedUrl.pathname;
    const query = parsedUrl.query;

    if (pathname === '/COMP4537/labs/3/getDate/') {
      // Part B
      const name = query.name || 'Guest';
      const date = utils.getDate();
      const message = greeting.replace('%1', name) + ' ' + date;
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(`<p style="color:blue">${message}</p>`);
    } else if (pathname === '/COMP4537/labs/3/writeFile/') {
      // Part C.1 - Append to fixed file.txt
      const text = query.text;
      if (!text) {
        res.writeHead(400, { 'Content-Type': 'text/plain' });
        res.end('No text provided');
        return;
      }
      fs.appendFile('file.txt', text + '\n', (err) => {
        if (err) {
          res.writeHead(500, { 'Content-Type': 'text/plain' });
          res.end('Error appending to file');
        } else {
          res.writeHead(200, { 'Content-Type': 'text/plain' });
          res.end('Text appended to file.txt');
        }
      });
    } else if (pathname.startsWith('/COMP4537/labs/3/readFile/')) {
      // Part C.2 - Read dynamic file from path
      const filename = pathname.split('/readFile/')[1];
      if (!filename) {
        res.writeHead(400, { 'Content-Type': 'text/plain' });
        res.end('No filename provided');
        return;
      }
      fs.readFile(filename, 'utf8', (err, data) => {
        if (err) {
          res.writeHead(404, { 'Content-Type': 'text/plain' });
          res.end(`File ${filename} not found`);
        } else {
          res.writeHead(200, { 'Content-Type': 'text/plain' });
          res.end(data);
        }
      });
    } else {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('Not found');
    }
  }
}

const app = new Server(3000);
app.start();