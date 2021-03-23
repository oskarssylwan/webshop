const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const config = require('../config.js')

const UserSchema = new mongoose.Schema({
  email: {
    type:     String,
    unique:   true,
    required: true,
    trim:     true
  },
  username: {
    type:     String,
    unique:   true,
    required: true,
    trim:     true
  },
  password: {
    type:     String,
    required: true
  },
  userGroup: {
    type:     String,
    required: true
  },
  cart: {
    type: [{}],
    default: [{}]
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now
  }
})

const User = mongoose.model('User', UserSchema)

UserSchema.statics.authenticate = function(id, password, callback) {
  User.findOne({ $or: [{username: id}, {email: id}]})
    .exec((error, user) => {
      if (error) {
        return callback(error)
      } else if (!user) {
        const err = new Error('User not found')
        err.status = 401
        return callback(err)
      } else {
        bcrypt.compare(password, user.password, (error, result) => {
          if (result === true) {
            return callback(null, user)
          } else if (!result){
            const err = new Error('Credentials do not match')
            return callback(err)
          } else {
            console.log(result)
            return callback(error)
          }
        })
      }
    })
}

UserSchema.pre('save', function(next) {
  const user = this
  if (user.password) {
    bcrypt.hash(user.password, config.hashRounds, (error, hashed) => {
      if (error) {
        return next(error)
      } else {
        user.password = hashed
        next()
      }
    })
  } else {
    next()
  }
})

module.exports = User
