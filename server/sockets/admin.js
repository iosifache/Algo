module.exports = function(client){
    client.on('getData', function(data){
      db.collection('data').find({}).toArray(function(err, resultsAll){
        io.emit('receiveData', {
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
                loginText: resultsAll[0].loginText,
                sendText: resultsAll[0].sendText
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
          titleAlgorithm: data.titleAlgorithm,
          titleQuiz: data.titleQuiz,
          description: data.description,
          button1: data.button1,
          button2: data.button2,
          button3: data.button3,
          button4: data.button4,
          loginText: data.loginText,
          sendText: data.sendText
        }, function(err, results){
            if (err) console.log(err)
        });
    });
    client.on('login', function(data){
      var user = md5(data.user);
      var password = md5(data.password);
      db.collection('admin').find({}).toArray(function(err, results){
          if (err) console.log(err)
          else{
            if ((user == results[0].email)&&(password==results[0].password)){
              io.emit('AUTH');
              login = 1;
            }
            else io.emit('nonAUTH')
          };
      });
    });
};
