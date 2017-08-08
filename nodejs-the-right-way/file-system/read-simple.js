//
// 02. Read and Write file Asynchronously
//
"use strict";

const fs = require('fs')
fs.readFile('target.txt', (err, data) => {
  if (err) {
    throw err
  }

  // once again logging the data like this would log
  // the binary data.
  console.log(data)
  // now forcing it into String with UTF-8 encoding...
  console.log(data.toString())
});
