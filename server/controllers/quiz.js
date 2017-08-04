module.exports = function(app){
    app.get('/quiz', function(req, res){
        db.collection('data').find({}, modelQuiz.quizPageModel).toArray(function(err, results){
            if (err) console.log(err)
            else{
                res.render('quiz', {
                    brand: results[0].brand,
                    titleQuiz: results[0].titleQuiz,
                    description: results[0].description,
                    button1: results[0].button1,
                    button2: results[0].button2,
                    button3: results[0].button3,
                    button4: results[0].button4,
                    sendText: results[0].sendText
                });
            };
        });
    });
};
