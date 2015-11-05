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

//INCLUDING MY STATIC FOLDER
app.use(express.static(__dirname + '/static'));
app.set("view engine", "ejs");

//INCLUDE AND USE CLOUDINARY AND MULTER
var cloudinary = require("cloudinary");
var multer = require("multer");
var upload = multer({ dest: './uploads/' });


app.use(function(req, res, next){
	if (req.session.user) {
		db.user.findById(req.session.user).then(function(user){
			if (user){
				req.currentUser = user;
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

//var controller = require('./controllers/chatroom.js');

io.on('connection', function(socket){
	console.log("connected");
});

// app.use("/input", require("./controllers/input"));
// app.use("/players", require("./controllers/players"));
// app.use("/getbetter", require("./controllers/getbetter"));
app.listen(process.env.PORT || 3000);