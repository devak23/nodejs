//
// 03. Writing Data to a Socket
//

"use strict";
const
    net = require('net'),
    fs = require('fs'),
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
    connection.write("Now watching " + filename + " for changes...\n");

    // Note here that the file watcher is configured within the server.
    // Meaning it will be invoked for each connecting client. This is different
    // from the zero MQ server implementation (in zmq-watcher-pub.js
    let watcher = fs.watch(filename, () => {
        connection.write("File " + filename + " changed: " + Date.now() + "\n");
    });

    connection.on('close', () => {
        console.log("subscriber disconnected");
        watcher.close();
    })
}).listen(5432, () => {
    console.log("server started on port 5432\nListening for subscribers...");
});
