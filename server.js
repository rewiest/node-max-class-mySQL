const express = require('express');

const app = express();

app.use('/add-product', (req, res, next) => {
  console.log('In add-product path...');
  res.send('<h1>Add Product Page</h1>');
});

app.use('/', (req, res, next) => {
  console.log('In home page...');
  res.send('<h1>Home Page</h1>');
});

app.listen(3000);
