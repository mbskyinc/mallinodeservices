'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var questionSchema = new Schema({
  question: {type: String, required: 'question is required'},
  answer: {type: String, required: 'answer is required'}
});

module.exports = mongoose.model('Question', questionSchema).init();

var questionSetSchema = new Schema({
  setname: {type: String, required: 'setname is required'},
  questions: [questionSchema],
  section:{
    type: Schema.Types.ObjectId,
    ref: 'Sections'
  }
  });
  
  module.exports = mongoose.model('QuestionSets', questionSetSchema).init();