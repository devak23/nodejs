#!/usr/bin/node --harmony
//
// 02. Creating Read and Write Streams
//
require('fs').createReadStream(process.argv[2]).pipe(process.stdout);
