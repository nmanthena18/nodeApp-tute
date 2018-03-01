var express = require('express');
var path = require('path');
//var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
//var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
//app.use('/users', users);




// DB //


//const db = require('./db/mongoClient');
const mongoose = require('./db/mongoose');
const {User} = require('./models/users');


app.post('/users', (req, res) =>{
	var user = new User({
		name:req.body.name,
		email:req.body.email,
	});	
	user.save().then((doc) => {
		res.send(doc)
	}, (e) => {
		res.status(400).send(e)
	});
});

app.get('/users', (req, res) =>{
	User.find().then( (users) =>{
		res.send(users)
	}, (e) =>{
		console.log(e)
	})
});

//get by id
app.get('/getById/:id', (req, res) =>{
	let id = req.params.id;
	User.findById(id).then( (users) =>{
		res.send(users)
	}).catch((e)=>{
		res.status(400).send(e)
	})
});


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});


// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

const port = process.env.PORT || '3000'

app.listen(port, ()=> {
	console.log(`app listening at ${port}`)
})

module.exports = app;
