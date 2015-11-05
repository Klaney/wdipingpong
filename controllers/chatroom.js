var express = require("express");
var router = express.Router();
var http = require('http').Server(router);
var io = require('socket.io')(http);

router.use(express.static(__dirname + '/static'));


var db = require("../models");
router.get('/', function(req, res){
	var currentUser = req.currentUser;
	res.render('chatroom', {currentUser:currentUser});
});


module.exports = router;
