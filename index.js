var express = require("express");
var app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));

var ejsLayouts = require("express-ejs-layouts");
app.use(ejsLayouts);

var request = require('request');

var session = require('express-session');
app.use(session({
  secret: 'wdipingpong',
  resave: false,
  saveUninitialized: true
}));

var flash = require('connect-flash');
app.use(flash());

var db = require('./models');

app.use(express.static(__dirname + '/static'));
app.set("view engine", "ejs");


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

app.use("/auth", require("./controllers/auth"));
app.use("/profile", require("./controllers/profile"));
app.use("/chatroom", require("./controllers/chatroom"));
// app.use("/input", require("./controllers/input"));
// app.use("/players", require("./controllers/players"));
// app.use("/getbetter", require("./controllers/getbetter"));
app.listen(process.env.PORT || 3000);