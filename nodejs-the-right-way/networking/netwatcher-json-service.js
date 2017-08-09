//
// 03. Writing JSON to the Socket
//

"use strict";
const
    net = require('net'),
    fs = require('fs'),
    df = require('dateformat'),
    filename = process.argv[2];

if (!filename) {
    console.log("No target file was specified");
    return;
}

try {
    fs.accessSync(filename, fs.R_OK | fs.W_OK);
} catch (e) {
    console.log('The file', filename, 'does not exist');
    return;
}

const server = net.createServer((connection) => {
    console.log("subscriber connected...");
    connection.write(JSON.stringify({
        action: 'watching',
        file: filename,
        timestamp: df(Date.now(), "mmmm dS, yyyy h:MM:ss TT")
    }) + '\n');  // <---- This newline character acts as boundary between two messages.

    // Also, it is important to note that the data event boundaries matches with the message event boundaries
    // The client program netwatcher-json-client.js relies on this behavior.

    let watcher = fs.watch(filename, () => {
        connection.write(JSON.stringify({
            action: 'changed',
            file: filename,
            timestamp: df(Date.now(), "mmmm dS, yyyy h:MM:ss TT")
        }) + '\n'); // <---- This newline character acts as boundary between two messages
    });

    connection.on('close', () => {
        console.log("subscriber disconnected");
        watcher.close();
    })
}).listen(5432, () => {
    console.log("server started on port 5432\nListening for subscribers...");
});
