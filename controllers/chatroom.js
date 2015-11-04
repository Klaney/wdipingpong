var express = require("express");
var router = express.Router();
var http = require('http').Server(router);
var io = require('socket.io')(http);

router.use(express.static(__dirname + '/static'));


var db = require("../models");

router.get('/', function(req, res){
	res.render('chatroom');
});

// io.on('connection', function(socket){
//   console.log( currentUser.name + ' connected');
// });
module.exports = router;
// module.exports.respond = function(socket_io){
//     // this function expects a socket_io connection as argument

// 	socket_io.on('connect', function() {
// 		console.log('Socket.io connection successful');
// 	});
//     // now we can do whatever we want:
//     socket_io.on('chatroom',function(chat){
//         // as is proper, protocol logic like
//         // this belongs in a controller:

//         socket.emit('chat', chat);
//     });
// }