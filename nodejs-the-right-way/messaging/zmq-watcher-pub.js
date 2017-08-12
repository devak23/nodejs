//
// 04. Messaging services. This is the server which uses zero MQ to publish messages
//
"use strict";
const
    fs = require('fs'),
    zmq = require('zmq'),

    // create the publisher endpoint
    publisher = zmq.createSocket('pub'),

    filename = process.argv[2];

// Validate the file
if (!filename) {
    throw Error("Need a file to watch changes into");
}

try {
    fs.accessSync(filename, fs.R_OK | fs.W_OK)
} catch(ex) {
    throw ex;
    //throw Error("File: " + filename + " does not exist!");
}


// note that the file watcher is invoked just once regardless
// the number of clients connecting to the server.
fs.watch(filename, () => {
    // send message to any subscribers. We need to "JSONify" the objects
    // as zeroMQ will not take care of things. It's only interested in
    // sending the bytes through the wire.
    publisher.send(JSON.stringify({
        type: 'changed',
        file: filename,
        timestamp: Date.now()
    }));

});

// listen on 5432 port
publisher.bind('tcp://*:5432', (err) => {
   console.log('Server listening to subscribers on port 5432.');
});


// We cannot use telnet to connect to the server (even though this is a TCP service)
// because zeroMQ uses a high performance binary protocol