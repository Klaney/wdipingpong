$(document).ready(function(){
	$('#chatinput').submit(function(){
	    socket.emit('server message', $('#m').val());
	    $('#m').val('');
	    return false;
	});
	socket.on('client message', function(newMsg){
		console.log(newMsg);
		$('#messages').append($('<li>').text(newMsg.username+":"+newMsg.content));

	})
 });

// var tweet = {user: "nodesource", text: "Hello, world!"};
// socket.emit("tweet", tweet);