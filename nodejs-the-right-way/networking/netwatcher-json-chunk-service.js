"use strict";
const
    net = require("net"),
    server = net.createServer((connection) => {
        console.log('Subscriber connected');

        // send the first chunk immediately
        connection.write('{"action" : "changed", "file" : "targ');

        // send the remaining part after a 2 second delay
        let timer = setTimeout(() => {
            connection.write('et.txt", "timestamp": "1358175758495"}' + '\n');
        }, 2000);

        // clear the timer when the connection ends.
        connection.on('end', () => {
            clearTimeout(timer);
            console.log('Subscriber disconnected');
        });

    }).listen(5432, () => {
       console.log('Chunk messaging server started at port 5432\nListening for clients...')
    });

// when used this server with our broken client netwatcher-json-client.js, we get the following output
// abhay@neptune ~/W/n/n/networking> node netwatcher-json-client.js
// undefined:1
// {'action' : 'changed', 'file' : 'targ
// ^
//
// SyntaxError: Unexpected token '
//     at Object.parse (native)
//     at Socket.<anonymous> (/home/abhay/Workspace/nodejs/nodejs-the-right-way/networking/netwatcher-json-client.js:10:22)
//     at emitOne (events.js:77:13)
//     at Socket.emit (events.js:169:7)
//     at readableAddChunk (_stream_readable.js:146:16)
//     at Socket.Readable.push (_stream_readable.js:110:10)
//     at TCP.onread (net.js:523:20)
//
//
// This is because the client erroneously thinks that the incoming message is a complete one and sends the chunk
// to JSON.parse(). To fix this problem, we need to
// 1. Buffer all the chunks of data into messages and
// 2. Parse the messages to be displayed

