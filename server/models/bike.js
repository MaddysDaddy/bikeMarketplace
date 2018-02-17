const mongoose = require('mongoose');

const bikeSchema = mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required.']
  },
  description: {
    type: String,
    maxLength: 200
  },
  price: {
    type: Number,
  },
  location: {
    type: String,
    required: [true, 'Location is required.']
  },
  image_url: {
    type: String,
    required: [true, 'Image is required.']
  },
  _owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, {
  timestamps: true,
  usePushEach: true
})

// bikeSchema.pre('save', function (next) {
//   console.log('Hello!');
//   const User = mongoose.model('User');
//   User.findById(request.session.id)
//     .then(user => {
//       console.log(user);
//       this._owner = user;
//       next();
//     })
//     .catch(next);
// })

module.exports = mongoose.model('Bike', bikeSchema);
