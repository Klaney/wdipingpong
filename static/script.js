$(document).ready(function(){
	$('#chatinput').submit(function(){
	    socket.emit('message', {content: $('#m').val(), name: currentUser.name});
	    $('#m').val('');
	    return false;
	});
	socket.on('message', function(data){
		console.log(data);
		$('#messages').append($('<li>').text(data.name + ' - ' + data.content));
	});
	// socket.on('client message', function(name){
	// 	console.log(name);
	// })
 });

// var tweet = {user: "nodesource", text: "Hello, world!"};
// socket.emit("tweet", tweet);