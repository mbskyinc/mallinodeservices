'use strict';

const bcrypt = require('bcrypt');
var mongoose = require('mongoose'),
User = mongoose.model('Users');

exports.list_all_users = function(req, res) {
    User.find({}, function(err, user) {
    if (err)
      res.send(err);
    res.json(user);
  });
};

exports.create_a_user = function(req, res) {
  User.init();
  var new_user = new User(req.body);
  if(new_user.password){
	const salt = bcrypt.genSaltSync();
	new_user.password = bcrypt.hashSync(new_user.password, salt);
	}
  new_user.save(function(err, user) {
    if (err) {
      console.log('err', err);
      if (err.name == 'MongoError'){
        res.status(409).json({'name': 'ValidationError', 'message':'User already exists'});
      } else { 
        res.status(400).json(err);
      }
    } else{
      res.json(user);
    }
  });
};

exports.read_a_user = function(req, res) {
    User.findById(req.params.userId, function(err, user) {
    if (err)
      res.send(err);
    res.json(user);
  });
};

exports.update_a_user = function(req, res) {
  User.findOneAndUpdate({_id: req.params.userId}, req.body, {new: true}, function(err, user) {
    if (err)
      res.send(err);
    res.json(user);
  });
};

exports.delete_a_user = function(req, res) {
    User.remove({
    _id: req.params.userId
  }, function(err, user) {
    if (err)
      res.send(err);
    res.json({ message: 'User successfully deleted' });
  });
};

exports.authenticate_user = function(req, res) {
  var temp_user = new User(req.body);
  
 User.findOne({ username: temp_user.username },function (err, user1) {
 console.log('user', user1);
       if (err) {
          res.status(400).json({'name': 'ValidationError', 'message':err.message});
       } else if (!user1) {
          res.status(401).json({'name': 'ValidationError', 'message':'User not found'});
       } else {
   bcrypt.compare(temp_user.password, user1.password, function (err2, result) {
 console.log('result', result);
         if (result === true) {
           res.json({"username":user1.username});
         } else {
          res.status(400).json({'name': 'ValidationError', 'message': 'Invalid password!'});
         }
       })
 
       }
 
 });
 };

