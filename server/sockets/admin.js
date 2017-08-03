module.exports = function(client){
    client.on('getData', function(data){
      db.collection('data').find({}).toArray(function(err, resultsAll){
        io.emit('receiveData', {
                brand: resultsAll[0].brand,
                titleIndex: resultsAll[0].titleIndex,
                titleSearch: resultsAll[0].titleSearch,
                titleCompiler: resultsAll[0].titleCompiler,
                titleAdmin: resultsAll[0].titleAdmin,
                description: resultsAll[0].description,
                button1: resultsAll[0].button1,
                button2: resultsAll[0].button2,
                button3: resultsAll[0].button3,
                button4: resultsAll[0].button4
            });
      });
    });
    client.on('updateData', function(data){
        db.collection('data').update({}, {
          brand: data.brand,
          titleIndex: data.titleIndex,
          titleSearch: data.titleSearch,
          titleCompiler: data.titleCompiler,
          titleAdmin: data.titleAdmin,
          description: data.description,
          button1: data.button1,
          button2: data.button2,
          button3: data.button3,
          button4: data.button4
        }, function(err, results){
            if (err) console.log(err)
        });
    });
};
