const mongoose = require('mongoose');
const User = mongoose.model('User');

module.exports = {
  login(req, res) {
    console.log(req.body.email);
    User.findOne({
        email: req.body.email
      })
      .then(user => {
        if (!user) throw new Error();

        console.log(req.body.password, user.password);

        return User.validatePassword(req.body.password, user.password)
          .then(() => {
            completeLogin(req, res, user);
          })
      })
      .catch(error => {
        res.status(401).json('Email/password combo does not exist');
      });
  },
  register(req, res) {
    console.log('registering...', req.body);
    User.create(req.body)
      .then(user => {
        completeLogin(req, res, user);
      })
      .catch(error => {
        const errors = Object.keys(error.errors).map(key => error.errors[key].message);
        console.log(errors);
      });

  },
  logout(request, response) {
    const user = request.session.user;
    console.log('logging out server side', user, request.session);

    request.session.destroy();
    response.clearCookie('userID');
    response.clearCookie('expiration');

    response.json(user);
  }

};

function completeLogin(request, response, user) {
  request.session.user = user.toObject();
  delete request.session.user.password;

  console.log('completing login', request.session.user);

  response.cookie('userID', user._id.toString());
  response.cookie('expiration', Date.now() + 50000 * 1000);

  response.json(user || true);
}
