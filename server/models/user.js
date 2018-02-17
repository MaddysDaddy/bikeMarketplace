const mongoose = require('mongoose');
const bcrypt = require('bcrypt-as-promised');
const validator = require('validator');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = mongoose.Schema({
  firstName: {
    type: String,
    minLength: 2,
    required: [true, 'First name is required.']
  },
  lastName: {
    type: String,
    minLength: 2,
    required: [true, 'Last name is required.']
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    validate: {
      validator(value) {
        return validator.isEmail(value);
      }
    }
  },
  password: {
    type: String,
    required: true,
    minLength: 6
  },
  bikes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Bike'
  }]
}, {
  timestamps: true,
  usePushEach: true
})

userSchema.plugin(uniqueValidator, {
  message: `{PATH} must be unique`
});

userSchema.statics.validatePassword = function (testPass, hashedpw) {
  return bcrypt.compare(testPass, hashedpw)
}

userSchema.pre('save', function (next) {

  if (!this.isModified('password')) {
    return next();
  }

  bcrypt.hash(this.password, 10)
    .then(hashedpw => {
      this.password = hashedpw;
      next();
    })
    .catch(next);
})


module.exports = mongoose.model('User', userSchema);
