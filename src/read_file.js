console.log('Reading a file');
var content = '';
var fs = require('fs');
fs.readFile('./sherlock.txt', 'UTF-8', function(err, data) {
  content = data;
  console.log("Content: ", data);
});
