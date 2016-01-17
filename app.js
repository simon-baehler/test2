var express = require('express');

// Port listening
var appListenOnPortConfig = process.env.PORT || 8080;

// config of express
var app = express();
//var router = express.Router();
//app.use('/', router);


// Binding the listening socket
var server = app.listen(appListenOnPortConfig, function () {
  console.log('Express server listening on port ' + appListenOnPortConfig);
});

function servIndex(req, res){
    res.sendFile('index.html', {root: __dirname + '/angulartest'});
}
// Static pages (such as angularjs, css and client-side js) are statically served
//app.use('/', express.static(__dirname + '/angulartest'));
//app.use('/*', express.static(__dirname + '/angulartest'));


/*
Important !!!
 */
app.use(express.static('angulartest'));
//mettre les routes des API avant
app.use('/',servIndex);
app.use('/*',servIndex);



