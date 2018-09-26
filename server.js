var express = require("express");
var createError = require('http-errors');
var bodyParser = require("body-parser");
var logger = require("morgan");
var mongoose = require("mongoose");

var PORT = process.env.PORT || 8080;

// Initialize Express
var app = express();


// Configure middleware

// Use morgan logger for logging requests
app.use(logger("dev"));
// Use body-parser for handling form submissions
app.use(bodyParser.urlencoded({ extended: true }));
// parse application/json
app.use(bodyParser.json());
// Use express.static to serve the public folder as a static directory
app.use(express.static("public"));


// Set Handlebars.
var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Routes
// var routes = require("./controllers/controller.js");
var articleRouter=require('./routes/api/articles')
app.use('/',articleRouter);
var scrapeRouter=require('./routes/api/scrape')
app.use('/scrape',scrapeRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});
// // error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// If deployed, use the deployed database. Otherwise use the local mongoHeadlines database
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/hiFructose";

// Connect to the Mongo DB
mongoose.connect(MONGODB_URI);
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
// Start the server
app.listen(PORT, function() {
  console.log("App running on http://localhost:" + PORT);
});
