'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var QandASchema = new Schema({
  question: {type: String, required: 'question is required'},
  enteredAnswer: {type: String, required: 'enteredanswer is required'}
});

module.exports = mongoose.model('QandA', QandASchema).init();

var practiceSchema = new Schema({
  practiceNumber: {type: String, required: 'practiceNumber is required'},
  practiceDateTime:{type: Date, default: Date.now},
  QandA: [QandASchema],
  section:{
    type: Schema.Types.ObjectId,
    ref: 'Sections'
  }
  });
  
  module.exports = mongoose.model('Practices', practiceSchema).init();