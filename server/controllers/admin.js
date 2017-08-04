module.exports = function(app){
    app.get('/admin', function(req, res){
            if (login==0){
                  db.collection('data').find({}).toArray(function(err, resultsAll){
                        res.render('admin', {
                            brand: resultsAll[0].brand,
                            titleIndex: resultsAll[0].titleIndex,
                            titleSearch: resultsAll[0].titleSearch,
                            titleCompiler: resultsAll[0].titleCompiler,
                            titleAdmin: resultsAll[0].titleAdmin,
                            titleAlgorithm: resultsAll[0].titleAlgorithm,
                            titleQuiz: resultsAll[0].titleQuiz,
                            description: resultsAll[0].description,
                            button1: resultsAll[0].button1,
                            button2: resultsAll[0].button2,
                            button3: resultsAll[0].button3,
                            button4: resultsAll[0].button4,
                            sendText: resultsAll[0].sendText,
                            loginText: resultsAll[0].loginText
                        });
                  });
            }
            if (login==1){
                  db.collection('data').find({}).toArray(function(err, resultsAll){
                        res.render('panel', {
                            brand: resultsAll[0].brand,
                            titleIndex: resultsAll[0].titleIndex,
                            titleSearch: resultsAll[0].titleSearch,
                            titleCompiler: resultsAll[0].titleCompiler,
                            titleAdmin: resultsAll[0].titleAdmin,
                            titleAlgorithm: resultsAll[0].titleAlgorithm,
                            titleQuiz: resultsAll[0].titleQuiz,
                            description: resultsAll[0].description,
                            button1: resultsAll[0].button1,
                            button2: resultsAll[0].button2,
                            button3: resultsAll[0].button3,
                            button4: resultsAll[0].button4,
                            sendText: resultsAll[0].sendText,
                            loginText: resultsAll[0].loginText
                        });
                  });
            }
    });
};
