const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
  const url = req.url;
  const method = req.method;
  // check for '/' path, and if so, respond with HTML form and then return
  if (url === '/') {
    console.log('Path of / encountered...');
    res.write('<html>');
    res.write('<head><title>Enter Message</title></head>');
    res.write('<body><form action="/message" method="POST"><input type="text" name="message"><button type="submit">Send</button></form></body>');
    res.write('</html>');
    return res.end();
  }
  // check for '/message' path, and if so, read in form data and write out to file
  if (url === '/message' && method === 'POST') {
    console.log('Path of /message encountered...');
    const body = [];
    // async code - register listener to look for data chunks and run code block when triggered
    req.on('data', (chunk) => {
      console.log(chunk);
      body.push(chunk);
    });
    // async code - register listener to look for end and then return, run code block when triggered 
    return req.on('end', () => {
      const parsedBody = Buffer.concat(body).toString();
      console.log(parsedBody);
      const message = parsedBody.split('=')[1];
      // async code - initiate file write, run code block when done that includes setting response
      fs.writeFile('message.txt', message, (err) => {
        console.log('Message written to file.')
        res.statusCode = 302;
        res.setHeader('Location', '/');
        return res.end(); 
      });
    })
  }
});

server.listen(3000);
