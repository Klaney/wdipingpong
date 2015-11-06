var express = require("express");
var router = express.Router();
var http = require('http').Server(router);
var io = require('socket.io')(http);

router.use(express.static(__dirname + '/static'));


var db = require("../models");
router.get('/', function(req, res){
	res.render('chatroom');
});


module.exports = router;
