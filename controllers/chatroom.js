var express = require("express");
var router = express.Router();

var db = require("../models");

router.get('/chatroom', function(req, res){
	res.render('chatroom.ejs');
});

module.exports = router;