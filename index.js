//CREATE APP
var express = require("express");
var app = express();

//CREATING THE SOCKET IO SERVER
var server = require('http').createServer(app);
var io = require('socket.io')(server);

//INCLUDE BODY PARSER
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));

//INCLUDE AND USE EJS LAYOUTS
var ejsLayouts = require("express-ejs-layouts");
app.use(ejsLayouts);

//INCLUDE REQUEST
var request = require('request');

//INCLUDE EXPRESS SESSION IN APP
var session = require('express-session');
app.use(session({
  secret: 'wdipingpong',
  resave: false,
  saveUninitialized: true
}));

//INCLUDE AND USE FLASH
var flash = require('connect-flash');
app.use(flash());

//INCLUDE THE DATABASE TO BE ACCESSED ON THE PAGE
var db = require('./models');


//INCLUDE AND USE CLOUDINARY AND MULTER
var cloudinary = require("cloudinary");
var multer = require("multer");
var upload = multer({ dest: './uploads/' });

//USE MY STATIC FOLDER
app.use(express.static(__dirname + '/static'));
app.set("view engine", "ejs");

//CREATE GLOBAL CURRENT USER VARIABLE FOR SOCKET TO USE
var currentUser;

app.use(function(req, res, next){
	if (req.session.user) {
		db.user.findById(req.session.user).then(function(user){
			if (user){
				req.currentUser = user;
				currentUser = req.currentUser;
				next();
			} else {
				req.currentUser = false;
				next();
			}
		})

	} else{
		req.currentUser = false;
		next();
	}
});

app.use(function(req, res, next){
	res.locals.currentUser = req.currentUser;
	res.locals.alerts = req.flash();
	next();
});

app.get("/", function(req, res){
	res.render("index");
});

// io.on('connection', function(socket){
//   console.log( currentUser.name + ' connected');
// });

app.use("/auth", require("./controllers/auth"));
app.use("/profile", require("./controllers/profile"));
app.use("/chatroom", require("./controllers/chatroom"));

io.on('connection', function(socket){
	console.log("connected");
	socket.on('disconnect', function(){
    	console.log('user disconnected');
  	});
	socket.on('server message', function(data) {
		console.log(currentUser);
	    //Create message
	    var newMsg = 
	    {
	      username: currentUser.name,
	      content: data
	  	};
	  	socket.emit('client message', newMsg);
	});
});

// app.use("/input", require("./controllers/input"));
// app.use("/players", require("./controllers/players"));
// app.use("/getbetter", require("./controllers/getbetter"));
server.listen(process.env.PORT || 3000);