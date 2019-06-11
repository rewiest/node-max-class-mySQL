const http = require('http');

const server = http.createServer((req, res) => {
  const url = req.url;
  const method = req.method;
  // check for '/' path, and if so, respond with HTML greeting, username input field, and button
  if (url === '/') {
    console.log('Path of "/" encountered...');
    res.write('<html>');
    res.write('<head><title>Main Page</title></head>');
    res.write('<body><h1>Welcome to Main Page</h1><form action="/create-user" method="POST"><label>Username</label><input type="text" name="username"><button type="submit">Send</button></form></body>');
    res.write('</html>');
    return res.end();
  }
  // check for '/users' path, and if so, respond with HTML user list
  if (url === '/users') {
    console.log('Path of "/users" encountered...');
    res.write('<html>');
    res.write('<head><title>User List</title></head>');
    res.write('<body><h1>User List</h1><ul><li>User 1</li><li>User 2</li><li>User 3</li></ul></body>');
    res.write('</html>');
    return res.end();
  }// check for '/create-user' path, and if so, read in form data and console.log username
  if (url === '/create-user' && method === 'POST') {
    console.log('Path of "/create-user" encountered...');
    const body = [];
    // async code - register listener to look for data chunks and run code block when triggered
    req.on('data', (chunk) => {
      body.push(chunk);
    });
    // async code - register listener to look for end and then return, run code block when triggered 
    return req.on('end', () => {
      const parsedBody = Buffer.concat(body).toString();
      const username = parsedBody.split('=')[1];
      console.log(username);
      res.statusCode = 302;
      res.setHeader('Location', '/');
      return res.end(); 
    })
  }
});

server.listen(3000);
