var http = require('http')

var server = http.createServer();

server.listen(8080, function() {
  console.log('Listening on port 8080');
});

// This program will accept the incoming connections but wont do
// anything as it has no handler to process it.
