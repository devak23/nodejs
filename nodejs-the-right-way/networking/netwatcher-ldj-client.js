"use strict";
const
    net = require('net'),
    ldj = require('./ldj'),
    netClient = net.connect({port: 5432}),
    ldjClient = ldj.connect(netClient);

ldjClient.on('message', (message) => {
    if (message.action === 'watching') {
        console.log('File', message.file, 'is being watched. TIMESTAMP:', message.timestamp);
    } else if (message.action === 'changed') {
        console.log('File', message.file, 'changed. TIMESTAMP:', message.timestamp)
    }
});