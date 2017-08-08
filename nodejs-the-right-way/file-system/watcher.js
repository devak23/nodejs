//
// 02. Watching for file changes
//
"use strict";

const fs = require('fs');
fs.watch('./target.txt', () => {
  console.log("File 'target.txt' just changed!");
});

console.log("Watching 'target.txt' for changes...");

