module.exports = function(client){
    client.on('quiz', function(data){
        db.collection('quiz').count({}, function(err, resultsCount){
            var randomNumber = Math.floor(Math.random() * resultsCount) + 1
            db.collection('quiz').find({"id" : randomNumber}).toArray(function(err, results){
                if (err) console.log(err)
                else{
                  io.emit('quizResult', results[0]);
                };
            });
        });
    });
};
