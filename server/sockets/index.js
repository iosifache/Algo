module.exports = function(client){
    client.on('index', function(data){
        io.emit('indexResult', {
            text: "Hello World!"
        })
    });
};
