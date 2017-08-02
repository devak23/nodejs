var http = require('http');
var fs = require('fs');

var requestHandler = function(request, response) {
    response.writeHead(201, {
        'Content-Type' : 'text-html'
    });

    fs.readFile('./index.html', null, function(error, data) {
        if (error != null) {
            response.writeHead(404, "File not found");
        } else {
            response.end(data);
        }
    });
};

var server = http.createServer(requestHandler);

server.listen(8080, function() {
    console.log('Listening on port 8080');
});
