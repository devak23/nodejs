//
// 02. Watching for file changes
//
"use strict";

const fs = require('fs');
try {
  fs.accessSync('./target.txt',fs.R_OK | fs.W_OK);
} catch (e) {
  console.log('File does not exist', e);
  return;
}

  fs.watch('./target.txt', () => {
    console.log("File 'target.txt' just changed!");
  });

  console.log("Watching 'target.txt' for changes...");



