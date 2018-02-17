const mongoose = require('mongoose');
const path = require('path');
const fs = require('fs');

mongoose.connect('mongodb://localhost/bike_market');
mongoose.connection.on('connected', () => console.log('connected to mongodb!'));

const modelsPath = path.join(__dirname, './../models');

fs.readdirSync(modelsPath).forEach(file => {
  if (file.indexOf('.js')) {
    require(path.join(modelsPath, file));
  }
});

mongoose.Promise = global.Promise;
