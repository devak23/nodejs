var http = require('http');
var router = require('./route');
var server = http.createServer(router.handleRequest);

server.listen(8080, function() {
    console.log('Listening on port 8080');
});
