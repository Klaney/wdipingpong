var express = require("express");
var app = express();
var bodyParser = require('body-parser');
var ejsLayouts = require("express-ejs-layouts");
var request = require('request');
var session = require('express-session');
var flash = require('connect-flash');
//var db = require('./models');

app.use(ejsLayouts);
app.use(flash());
app.use(express.static(__dirname + '/static'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(session({
  secret: 'wdipingpong',
  resave: false,
  saveUninitialized: true
}));
app.set("view engine", "ejs");

app.get("/", function(req, res){
	res.render("index");
});

app.use("/auth", require("./controllers/auth"));
app.use("/profile", require("./controllers/profile"));
// app.use("/chatroom", require("./controllers/chatroom"));
// app.use("/input", require("./controllers/input"));
// app.use("/players", require("./controllers/players"));
// app.use("/getbetter", require("./controllers/getbetter"));
app.listen(process.env.PORT || 3000);