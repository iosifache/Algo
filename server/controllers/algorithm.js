module.exports = function(app){
    app.get('/algorithm', function(req, res){
        db.collection('data').find({}, modelAlgorithm.algorithmPageModel).toArray(function(err, results){
            if (err) console.log(err)
            else{
                res.render('algorithm', {
                    brand: results[0].brand,
                    titleAlgorithm: results[0].titleAlgorithm,
                    button1: results[0].button1,
                    button2: results[0].button2,
                    button3: results[0].button3,
                    button4: results[0].button4,
                });
            };
        });
    });
};
