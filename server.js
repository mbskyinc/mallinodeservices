var express = require('express'),
  cors = require('cors'),
  app = express(),
  port = process.env.PORT || 3001;

  mongoose = require('mongoose'),
  Task1 = require('./api/models/userModel'), //created model loading here
  Task2 = require('./api/models/sectionModel'),
  Task3 = require('./api/models/questionSetModel'),
  bodyParser = require('body-parser');
  
// mongoose instance connection url connection
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/MalliMongodb'); 

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


var routes = require('./api/routes/userRoutes'); //importing route
routes(app); //register the route

var section_routes = require('./api/routes/sectionRoutes'); //importing route
section_routes(app); //register the route

var questionSet_routes = require('./api/routes/questionSetRoutes'); //importing route
questionSet_routes(app); //register the route


app.listen(port);

console.log('Malli RESTful API server started on: ' + port);
