'use strict';

const bcrypt = require('bcrypt');
var mongoose = require('mongoose'),
questionSet = mongoose.model('QuestionSets');

exports.list_all_questionSets = function(req, res) {
    questionSet.find({}, function(err, questionSet) {
    if (err)
      res.send(err);
    res.json(questionSet);
  });
};

exports.create_a_questionSets = function(req, res) {
 // questionSets.init();
  var new_questionSet = new questionSet(req.body);
  if(new_questionSet != null){
      console.log('req.params.sectionId'+req.params.sectionId) ;
      var sectionId = req.params.sectionId;
      new_questionSet.section = sectionId;
	}
  new_questionSet.save(function(err, questionSet) {
    if (err) {
      console.log('err', err);
      if (err.name == 'MongoError'){
        res.status(409).json({'name': 'ValidationError', 'message':'questionSet already exists'});
      } else { 
        res.status(400).json(err);
      }
    } else{
      res.json(questionSet);
    }
  });
};

exports.read_a_questionSet = function(req, res) {
    questionSet.findById(req.params.questionSetId, function(err, questionSet) {
    if (err)
      res.send(err);
    res.json(questionSet);
  });
};

exports.update_a_questionSet = function(req, res) {
    var update_questionSet = new questionSet(req.body);
    if(update_questionSet != null){
        console.log('req.params.sectionId'+req.params.sectionId) ;
        var sectionId = req.params.sectionId;
        update_questionSet.section = sectionId;
      }
    questionSet.findOneAndUpdate({_id: req.params.questionSetId}, update_questionSet, {new: true}, function(err, questionSet) {
    if (err)
       res.status(400).json(err);
       else
       res.json(questionSet);
      });
};

exports.delete_a_questionSet = function(req, res) {
    questionSet.remove({
    _id: req.params.questionSetId
  }, function(err, questionSet) {
    if (err)
      res.send(err);
    res.json({ message: 'questionSet successfully deleted' });
  });
};

