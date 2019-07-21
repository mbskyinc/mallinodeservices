'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SectionSchema = new Schema({
    name: {type: String, required: 'Section name is required'}
  });
  
  module.exports = mongoose.model('Sections', SectionSchema).init();