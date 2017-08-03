/* Socket.io */
var socket = io();
socket.on('connect', function(data){
    console.log("Connected");
});

/* Vue */
var list = new Vue({
  el: '#list',
  data: {
    items: []
  },
  created: function (){
    socket.emit('search');
    socket.on('searchResult', function(data){
        this.items = data;
        this.items.forEach(function(entry){
           document.getElementById("list").innerHTML+= "<li id='item'><div id='half'><h1>" + entry.title + "</h1><p>" + entry.info + "</p><pre>" + entry.syntax + "</pre></div><div id='half'><img src='img/" + entry.image + "'></div></li>";
        });
    });
  }
})
