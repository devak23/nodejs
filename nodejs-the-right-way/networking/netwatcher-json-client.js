//
// 03. Writing a client to listen to data
//
"use strict";
const
    net = require('net'),
    client = net.connect({port: 5432});

client.on('data', (data) => {
    // This client makes a naive assumption that the data coming to the client
    // will not be "chunked". refer netwatcher-json-chunk-service.js

    let reply = JSON.parse(data);
    if (reply.action === 'watching') {
        console.log('Server is watching the file', reply.file, 'for changes. Date: ', new Date(reply.timestamp));
    } else if (reply.action === 'changed') {
        console.log('The file', reply.file, 'changed. Date: ', new Date(reply.timestamp));
    } else {
        throw Error('Un recognized message type:', message.action);
    }
});

client.on('close', () => {
   console.log('Server terminated the connection');
});