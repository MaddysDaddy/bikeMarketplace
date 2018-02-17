const mongoose = require('mongoose');
const Bike = mongoose.model('Bike');
const User = mongoose.model('User');

module.exports = {
  index(req, res) {
    Bike.find({})
      .populate('_owner')
      .then(bikes => res.json(bikes))
      .catch(error => {
        const errors = Object.keys(error.errors).map(key => error.errors[key].message);
        console.log('Bike controller error: ', errors);
      });
  },
  create(request, response) {
    User.findById(request.session.user)
      .then(user => {
        const bike = new Bike(request.body);
        bike._owner = user._id;
        user.bikes.push(bike);

        bike.save()
          .then(savedBike => {
            response.json(savedBike);

            user.save()
              .then(savedUser => {
                console.log('User saved');
                //response.json(savedUser);
              })
          })
      })
      .catch(error => {
        const errors = Object.keys(error.errors).map(key => error.errors[key].message);
      });
  },
  findUserBikes(request, response) {
    User.findById(request.session.user)
      .populate('bikes')
      .then(user => response.json(user))
      .catch(error => console.log(error));
  },
  update(request, response) {
    Bike.findByIdAndUpdate(request.params.id, request.body)
      .then(updatedBike => response.json(updatedBike))
      .catch(error => {
        const errors = Object.keys(error.errors).map(key => error.errors[key].message);
        console.log(errors);
      });
  },
  delete(request, response) {
    Bike.findByIdAndRemove(request.params.id)
      .then(deletedBike => response.json(deletedBike))
      .catch(error => {
        const errors = Object.keys(error.errors).map(key => error.errors[key].message);
        console.log(errors);
      });
  },
  getRandomBike(request, response) {
    console.log('getting a random bike: controller');
    Bike.aggregate()
      .sample(1)
      .then(randomBike => response.json(randomBike))
      .catch(error => {
        console.log('error', error.message);
      });
  }
}
