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
  var new_user = new User(req.body);
  if(new_user.password){
	const salt = bcrypt.genSaltSync();
	new_user.password = bcrypt.hashSync(new_user.password, salt);
	}
  new_user.save(function(err, user) {
    if (err)
      res.send(err);
    res.json(user);
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
 //var db_userquery = User.findOne({'username': 'temp_user.username'});

User.findOne({ username: temp_user.username },function (err, user1) {
console.log('user', user1);
      if (err) {
        //res.send(err);
	res.json({ });
      } else if (!user1) {
        var err = new Error('User not found.');
        err.status = 401;
	res.json({ });
        //res.send(err);
      } else {
	//return 1;
	bcrypt.compare(temp_user.password, user1.password, function (err2, result) {
console.log('result', result);
        if (result === true) {
          res.json(user1);
        } else {
          res.json({ });
        }
      })

      }

});
/*
 User.findOne({ username: temp_user.username }).exec(function (err, user) {
console.log('user', user);
      if (err) {
        return 0;
      } else if (!user) {
        var err = new Error('User not found.');
        err.status = 401;
        return 0;
      }

bcrypt.compare(password, temp_user.password, function (err, result) {
console.log('result', result);
        if (result === true) {
          return 1;
        } else {
          return 0;
        }
      })
    });
*/
//var qpassword = User.findOne({ password: 'temp_user.password' }).exec(function (err, user) {});

console.log('temp_user.username', temp_user.username);
console.log('temp_user.password', temp_user.password );
/*
 const salt = bcrypt.genSaltSync();
 temp_user.password = bcrypt.hashSync(temp_user.password, salt);
console.log('temp_user.password', temp_user.password );

 if (db_user && (temp_user.password == qpassword)){
   return 1;
   } else{
      return 0;
   }
*/
};
