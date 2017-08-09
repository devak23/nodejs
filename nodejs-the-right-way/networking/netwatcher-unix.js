"use strict";
const
    net = require('net'),
    fs = require('fs'),
    df = require('dateformat'),
    filename = process.argv[2];

// check if the file name was passed
if (!filename) {
    console.log("No target file was specified");
    return;
}

// check if the file exists
try {
    fs.accessSync(filename, fs.R_OK | fs.W_OK);
} catch (e) {
    console.log('The file', filename, 'does not exist');
    return;
}

// create a server and listen to unix sockets
const server = net.createServer((connection) => {
    console.log("subscriber connected...");
    connection.write("Now watching " + filename + " for changes...\n");

    let watcher = fs.watch(filename, () => {
        connection.write("File " + filename + " changed: " + df(Date.now(), "mmmm dS, yyyy h:MM:ss TT") + "\n");
    });

    connection.on('close', () => {
        console.log("subscriber disconnected");
        watcher.close();
    })
}).listen("/tmp/netwatcher-unix.sock", () => {
    console.log("Listening for subscribers...");
});
