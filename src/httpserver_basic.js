var http = require('http')

var count = 0;

var requestHandler = function(request, response) {
  var message;
  count += 1;
  response.writeHead(201, {
    'Content-Type' : 'text-plain'
  });
  message = 'Visitor count: ' + count;
  console.log(message);
  response.end(message);
}

var server = http.createServer(requestHandler);

server.listen(8080, function() {
  console.log('Listening on port 8080');
});

