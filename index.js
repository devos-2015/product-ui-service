var fs = require('fs');
var restify = require('restify');

var SERVICE_CHECK_HTTP = process.env.SERVICE_CHECK_HTTP || '/healthcheck';
var PORT = process.env.PORT || 3000;

var app = restify.createServer();

app.get('/', restify.serveStatic({
    directory: __dirname + '/UI',
    file: 'index.html'
}));

app.get('/UI/index.js', restify.serveStatic({
    directory: __dirname + '/UI',
    file: 'index.js'
}));

app.get(SERVICE_CHECK_HTTP, function(req, res, next){
    res.send(200,{message : 'ok'});
});


app.get('/products', function (req, res, next) {
    res.send([
        {
            album: "Karaoke Fun",
            preis: -1.00,
            interpret: "Wolfgang Petri"
        },
        {
            album: "Sonic Highway",
            preis: 3.99,
            interpret: "Foo Fighters"
        }
    ]);
});

app.listen(PORT || 3000);