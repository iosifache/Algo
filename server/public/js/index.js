/* Socket.io */
var socket = io();
socket.on('connect', function(data){
    console.log("Connected");
});
socket.emit('index');
socket.on('indexResult', function(data){
    console.log(data.text);
});
