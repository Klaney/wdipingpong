var express = require("express");
var router = express.Router();
var http = require('http').Server(router);
var io = require('socket.io')(http);

router.use(express.static(__dirname + '/static'));


var db = require("../models");
router.get('/', function(req, res){
	if (req.currentUser){
		res.render('chatroom');	
	} else {
		req.flash("Not logged in", "Please Sign in to access the Thunderdome!");
		res.redirect("/");
	}
});


module.exports = router;
