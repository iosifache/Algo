module.exports = function(app){
    app.get('/search', function(req, res){
        db.collection('data').find({}, modelSearch.searchPageModel).toArray(function(err, results){
            if (err) console.log(err)
            else{
                res.render('search', {
                    brand: results[0].brand,
                    titleSearch: results[0].titleSearch,
                    button1: results[0].button1,
                    button2: results[0].button2,
                    button3: results[0].button3,
                    button4: results[0].button4,
                });
            };
        });
    });
};
