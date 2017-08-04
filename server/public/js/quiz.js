/* Socket.io */
var socket = io();
socket.on('connect', function(data){
    console.log("Connected");
});
socket.emit('quiz');
var answer;
socket.on('quizResult', function(data){
    document.getElementById("text").innerHTML=data.text;
    document.getElementById("one").innerHTML=data.raspunsuri[0];
    document.getElementById("two").innerHTML=data.raspunsuri[1];
    document.getElementById("three").innerHTML=data.raspunsuri[2];
    document.getElementById("four").innerHTML=data.raspunsuri[3];
    answer = data.corect;
});
document.getElementById("send").addEventListener("click", sendAnswer);
function sendAnswer(){
  var selected = document.querySelector('input[name="answer"]:checked').value;
  if (selected==answer) alert("Corect")
  else alert("Incorect")
}
