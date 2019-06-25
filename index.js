const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const routeConfig = require('./routes');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(function(req, res, next) {
  res.header(
    'Access-Control-Allow-Origin',
    'warpfox-schedule-client.herokuapp.com'
  );
  res.header('Vary', 'Origin');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  res.header('Access-Control-Allow-Methods', 'GET, PUT, DELETE, POST');
  next();
});

routeConfig(app);

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(process.env.PORT || 3001);
console.log(`Server listening on port ${process.env.PORT}...`);
