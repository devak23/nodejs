//
// 03. Writing a client to listen to data
//
"use strict";
const
    net = require('net'),
    client = net.connect({port: 5432});

client.on('data', (data) => {
    let reply = JSON.parse(data);
    if (reply.action === 'watching') {
        console.log('Server is watching the file', reply.file, 'for changes. Date: ', reply.timestamp);
    } else if (reply.action === 'changed') {
        console.log('The file', reply.file, 'changed. Date: ', reply.timestamp);
    }
});

client.on('close', () => {
   console.log('Server terminated the connection');
});