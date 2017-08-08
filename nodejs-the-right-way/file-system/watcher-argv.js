"use strict";

const 
  fs = require('fs'),
  filename = process.argv[2];

if (!filename) {
  throw Error("A file to watch must be specified");
}

try {
  fs.accessSync(filename, fs.R_OK | fs.W_OK);
} catch (e) {
  console.log('File: ', filename, 'does not exist');
  return;
}

fs.watch(filename, () => {
  console.log('File', filename,'just changed!');
});

console.log("Watching", filename , "for changes...");

