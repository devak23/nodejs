//
// 02. Reading a stream
//
"use strict";
const 
  fs = require('fs'),
  stream = fs.createReadStream(process.argv[2]);

// writing the buffer to stdout takes care of the encoding
// and hence no need to do a toString(). If you use console.log
// you need to invoke toString() on the chunk (buffer)
stream.on('data', (chunk) => {
  process.stdout.write(chunk);
});

stream.on('error', (err) => {
  process.stderr.write('Error' + err.message + '\n');
});
