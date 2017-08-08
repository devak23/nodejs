//
// 02. Asynchronously writing the file
//
"use strict"

const fs = require('fs');

fs.writeFile('target.txt', "A witty remark", (err) => {
  if (err) {
    throw err;
  }

  console.log('Done.');
});
