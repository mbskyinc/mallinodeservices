'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var UserSchema = new Schema({
  username: {
    type: String,
    required: 'Enter username'
  },
  created_date: {
    type: Date,
    default: Date.now
  },
  password: {
    type: String,
    required: 'Enter password'
  }
});

module.exports = mongoose.model('Users', UserSchema);