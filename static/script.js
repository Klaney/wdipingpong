$(document).ready(function(){
	$('#chatinput').submit(function(e){
	    socket.emit('chat message', $('#m').val());
	    $('#m').val('');
	    return false;
	});
	socket.on('chat message', function(msg){
		console.log(msg);
		$('#messages').append($('<li>').text(currentUser.name+':'+msg));
	});
});