const mongoose = require('mongoose');
const bikes = require('../controllers/bikes');
const router = require('express').Router();

module.exports = router
  .get('/', bikes.index)
  .post('/create', bikes.create)
  .get('/listings', bikes.findUserBikes)
  .put('/update/:id', bikes.update)
  .delete('/delete/:id', bikes.delete)
  .get('/random', bikes.getRandomBike)
