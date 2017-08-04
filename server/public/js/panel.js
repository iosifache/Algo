/* Socket.io */
var socket = io();
socket.on('connect', function(data){
});

/* Login */
var admin = new Vue({
    el: '#infos',
    data: {
      brand: "",
      titleIndex: "",
      titleSearch: "",
      titleCompiler: "",
      titleAdmin: "",
      titleQuiz: "",
      titleAlgorithm: "",
      description: "",
      button1: "",
      button2: "",
      button3: "",
      button4: "",
      loginText: "",
      sendText: ""
    },
    created: function(){
        socket.emit('getData');
        socket.on('receiveData', function(data){
            admin.brand=data.brand;
            admin.titleIndex=data.titleIndex;
            admin.titleSearch=data.titleSearch;
            admin.titleCompiler=data.titleCompiler;
            admin.titleAdmin=data.titleAdmin;
            admin.titleQuiz=data.titleQuiz;
            admin.titleAlgorithm=data.titleAlgorithm;
            admin.description=data.description;
            admin.button1=data.button1;
            admin.button2=data.button2;
            admin.button3=data.button3;
            admin.button4=data.button4;
            admin.loginText=data.loginText;
            admin.sendText=data.sendText;
        });
    },
    methods: {
        update: function(){
          socket.emit('updateData', {
              "brand": admin.brand,
              "titleIndex": admin.titleIndex,
              "titleSearch": admin.titleSearch,
              "titleCompiler": admin.titleCompiler,
              "titleAdmin": admin.titleAdmin,
              "titleQuiz": admin.titleQuiz,
              "titleAlgorithm": admin.titleAlgorithm,
              "description": admin.description,
              "button1": admin.button1,
              "button2": admin.button2,
              "button3": admin.button3,
              "button4": admin.button4,
              "loginText": admin.loginText,
              "sendText": admin.sendText
          });
        }
    }
});
