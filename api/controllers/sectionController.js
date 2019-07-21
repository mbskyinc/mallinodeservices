'use strict';

const bcrypt = require('bcrypt');
var mongoose = require('mongoose'),
section = mongoose.model('Sections');

exports.list_all_sections = function(req, res) {
    section.find({}, function(err, section) {
    if (err)
      res.send(err);
    res.json(section);
  });
};

exports.create_a_section = function(req, res) {
  //section.init();
  var new_section = new section(req.body);
  if(new_section.password){
	const salt = bcrypt.genSaltSync();
	new_section.password = bcrypt.hashSync(new_section.password, salt);
	}
  new_section.save(function(err, section) {
    if (err) {
      console.log('err', err);
      if (err.name == 'MongoError'){
        res.status(409).json({'name': 'ValidationError', 'message':'sections already exists'});
      } else { 
        res.status(400).json(err);
      }
    } else{
      res.json(section);
    }
  });
};

exports.read_a_section = function(req, res) {
    section.findById(req.params.sectionId, function(err, section) {
    if (err)
      res.send(err);
    res.json(section);
  });
};

exports.delete_a_section = function(req, res) {
    section.remove({
    _id: req.params.sectionId
  }, function(err, section) {
    if (err)
      res.send(err);
    res.json({ message: 'section successfully deleted' });
  });
};


