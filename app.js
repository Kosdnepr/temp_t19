var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res) {
	res.sendFile(__dirname + '/index.html');
});

var users = [];
io.on('connection', function(socket) {
	console.log('A user connected');
	socket.on('setUsername', function(data) {
		console.log(data);
		if(users.indexOf(data) > -1) {
			socket.emit('userExists', '<p class="bg-primary"> User ' + '<b>' + data + '</b>' + ' already exists. Take another nick!</p>');
		} else {
			users.push(data);
			socket.emit('userSet', {userName: data});
		}
	});

	socket.on('message', function(data) {
		io.sockets.emit('newMessage', data);
	});
});


http.listen(3000, function() {
	console.log('listening on port: 3000');
});