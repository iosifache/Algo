/* Require server parts */
global.config = require('./server/config/config');

/* Require NPM modules */
global.fs = require('fs');
global.express = require("express");
global.mongo = require('mongodb').MongoClient;
global.session = require('express-session');
global.bodyParser = require('body-parser');
global.cookieParser = require('cookie-parser');
global.methodOverride = require('method-override');
global.partials = require('express-partials');
global.cors = require('cors');
global.request = require('request');
global.helmet = require('helmet');

/* Database connect */
mongo.connect(config.mongoUrl, function(err, db){
    if (err) console.log('Error connecting to database: ' + err)
    else{
        console.log ('Succeeded connected to database');
        global.db = db;
    }
});

/* Express.js framework initialization */
global.app = express();
app.use(helmet({
    frameguard: false
}))
app.use(express.static('./server/public'));
app.use(partials());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(methodOverride());
app.use(session({secret: 'keyboard cat', resave: false, saveUninitialized: false}));
app.set('views', './server/public/views');
app.set('view engine', 'pug');

/* Models */
global.modelIndex = require('./server/models/index');
global.modelSearch = require('./server/models/search');
global.modelCompiler = require('./server/models/compiler');
global.modelAdmin = require('./server/models/admin');

/* Controllers */
global.index = require('./server/controllers/index')(app);
global.search = require('./server/controllers/search')(app);
global.compiler = require('./server/controllers/compiler')(app);
global.admin = require('./server/controllers/admin')(app);

/* Listen */
global.server = app.listen(config.port, function(){
    console.log('App listening on port ' + config.port + '!');
});

/* Socket.io */
global.io = require('socket.io')(server);
io.on('connection', function(client){

    // Console
    console.log("Connection to socket.io");

    // Sockets
    global.socketIndex = require('./server/sockets/index')(client);
    global.socketSearch = require('./server/sockets/search')(client);
    global.socketCompiler = require('./server/sockets/compiler')(client);
    global.socketAdmin = require('./server/sockets/admin')(client);

});
