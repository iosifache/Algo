module.exports = function(app){
    app.get('/', function(req, res){
        db.collection('data').find({}, modelIndex.indexPageModel).toArray(function(err, results){
            if (err) console.log(err)
            else{
                res.render('index', {
                    brand: results[0].brand,
                    titleIndex: results[0].titleIndex,
                    description: results[0].description,
                    button1: results[0].button1,
                    button2: results[0].button2,
                    button3: results[0].button3,
                    button4: results[0].button4,
                });
            };
        });
    });
};
