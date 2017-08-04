/* Socket.io */
var socket = io();
socket.on('connect', function(data){
});

/* Admin */
var admin = new Vue({
    el: '#login',
    data: {
      user: "",
      password: ""
    },
    methods: {
        login: function(){
          socket.emit('login', {
              "user": admin.user,
              "password": admin.password
          });
          socket.on('AUTH', function(data){
            window.location.replace("/admin");
          })
          socket.on('nonAUTH', function(data){
            window.location.replace("/");
          })
        }
    }
});
