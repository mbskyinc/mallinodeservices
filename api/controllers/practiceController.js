'use strict';

const bcrypt = require('bcrypt');
var mongoose = require('mongoose'),
practice = mongoose.model('Practices');

exports.list_all_practices = function(req, res) {
    practice.find({}, function(err, practice) {
    if (err)
      res.send(err);
    res.json(practice);
  });
};

exports.create_a_practice = function(req, res) {
 // practices.init();
  var new_practice = new practice(req.body);
  if(new_practice != null){
      console.log('req.params.sectionId'+req.params.sectionId) ;
      var sectionId = req.params.sectionId;
      new_practice.section = sectionId;
	}
  new_practice.save(function(err, practice) {
    if (err) {
      console.log('err', err);
      if (err.name == 'MongoError'){
        res.status(409).json({'name': 'ValidationError', 'message':'practice already exists'});
      } else { 
        res.status(400).json(err);
      }
    } else{
      res.json(practice);
    }
  });
};

exports.read_a_practice = function(req, res) {
    practice.findById(req.params.practiceId, function(err, practice) {
    if (err)
      res.send(err);
    res.json(practice);
  });
};

exports.update_a_practice = function(req, res) {
    var update_practice = new practice(req.body);
    if(update_practice != null){
        console.log('req.params.sectionId'+req.params.sectionId) ;
        var sectionId = req.params.sectionId;
        update_practice.section = sectionId;
      }
    practice.findOneAndUpdate({_id: req.params.practiceId}, update_practice, {new: true}, function(err, practice) {
    if (err)
       res.status(400).json(err);
       else
       res.json(practice);
      });
};

exports.delete_a_practice = function(req, res) {
    practice.remove({
    _id: req.params.practiceId
  }, function(err, practice) {
    if (err)
      res.send(err);
    res.json({ message: 'practice successfully deleted' });
  });
};

