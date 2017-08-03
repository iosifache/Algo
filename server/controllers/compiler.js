module.exports = function(app){
    app.get('/compilator', function(req, res){
        db.collection('data').find({}, modelCompiler.compilerPageModel).toArray(function(err, results){
            if (err) console.log(err)
            else{
                res.render('compiler', {
                    brand: results[0].brand,
                    titleCompiler: results[0].titleCompiler,
                    button1: results[0].button1,
                    button2: results[0].button2,
                    button3: results[0].button3,
                    button4: results[0].button4,
                });
            };
        });
    });
};
