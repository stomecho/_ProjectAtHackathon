var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var port = process.env.PORT || 3456;
//var tick = 0;
var masterSocket;
var nowId=0;
server.listen(port, function () {
  console.log('Server listening at port %d', port);
});

app.use(express.static(__dirname + '/public'));

io.on('connection', function (socket) {
    
    
    socket.on('join', function (data) {
        console.log('new id '+nowId);
        socket.emit('join', {id: nowId});
        nowId++;
    });
              
    socket.on('upload', function (data) {
        if(masterSocket!=undefined){
            console.log('uploadNew');
            masterSocket.emit('update', data);
        }
    });
    
    socket.on('master', function (data) {
        console.log('setMaster');
        masterSocket = socket;
    });
});