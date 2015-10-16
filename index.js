var fs = require('fs');
var restify = require('restify');
var sdk = require('lc-sdk-node.js');

var client = sdk({
  discoveryServers : [
    '46.101.245.190:8500',
    '46.101.132.55:8500',
    '46.101.193.82:8500'
    ]
});

var SERVICE_CHECK_HTTP = process.env.SERVICE_CHECK_HTTP || '/healthcheck';
var PORT = process.env.PORT || 3000;

var app = restify.createServer();
app.use(restify.queryParser());
app.use(restify.bodyParser());

app.get(SERVICE_CHECK_HTTP, function(req, res, next){
    res.send(200,{message : 'ok'});
});

app.get('/', restify.serveStatic({
    directory: __dirname + '/UI',
    file: 'index.html'
}));

app.get('/UI/index.js', restify.serveStatic({
    directory: __dirname + '/UI',
    file: 'index.js'
}));

app.get('/products', function (req, res, next) {
  client.get('product-service', '/Products').then(data => res.send(200, data).);
});

app.del('/products/:id', function(req, res, next){
  client.del('product-service','/Products' + req.params.id);
})

app.put('/products/:id', function(req, res, next){
  client.put('product-service', '/Products'+ req.params.id ,request.body);
})

app.post('/products', function(req, res, next){
  client.put('product-service', '/Products',request.body).then(data => res.send(201, data));
})


app.listen(PORT || 3000);
