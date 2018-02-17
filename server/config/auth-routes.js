const mongoose = require('mongoose');
const users = require('../controllers/users');
const router = require('express').Router();

module.exports = router
  .post('/login', users.login)
  .post('/register', users.register)
  .delete('/logout', users.logout)
