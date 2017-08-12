"use strict";
const
    zmq = require('zmq'),

    // create a subscriber endpoint
    subscriber  = zmq.socket('sub');

// subscribe to all messages
subscriber.subscribe("");

// handle the messages by the publisher
subscriber.on("message", (data) => {
    let
        message = JSON.parse(data),
        date = new Date(message.timestamp);
    console.log("File", message.file, "was changed at", date);
});

subscriber.connect("tcp://localhost:5432");