//
// 03. Node module
//
"use strict";
const
    events = require('events'),
    util = require('util'),
// Define a LDJCLient class. This is the constructor
    LDJClient = function (stream) {
        // the input parameter stream is the one that emits event
        events.EventEmitter.call(this); // this is roughly equivalent of calling super() in Java

        let
            self = this,
            buffer = '';
        stream.on('data', (data) => {
            // keep on appending the data
            buffer += data;
            // if a newline is sent, get the index
            let boundary = buffer.indexOf('\n');
            // if you do get a valid index (which means you received a '\n',
            // then process the message
            while (boundary !== -1) {
                // take the entire input from the buffer
                let input = buffer.substr(0, boundary);
                // empty the buffer
                buffer = buffer.substr(boundary+1);
                // emit the message
                self.emit('message', JSON.parse(input));
                boundary = buffer.indexOf('\n');
            }
        });

    };
util.inherits(LDJClient, events.EventEmitter); // this line says class LDJClient extends EventEmitter.
// What it does is: it makes the LDJClient's prototypal parent object as EventEmitter


// now exposing the LDJClient and a function called connect which returns an instance of the client
exports.LDJClient = LDJClient;
exports.connect = function (stream) {
  return new LDJClient(stream)
};