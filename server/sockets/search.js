module.exports = function(client){
    client.on('search', function(data){
        db.collection('instructiuni').find({}).toArray(function(err, results){
            if (err) console.log(err)
            else{
              io.emit('searchResult', results);
            };
        });
    });
};
