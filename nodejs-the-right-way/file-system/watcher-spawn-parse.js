//
// 02. Capturing Data from an EventEmitter
//
"use strict"

const
  fs = require('fs'),
  spawn = require('child_process').spawn, // this is imported to spawn a new child-process
  filename = process.argv[2];

if (!filename) {
  throw Error('A file is required to watch');
}

// watch for changes in the filename
fs.watch(filename, () => {
  // run the command 'ls -lh' by forking a child process using the spawn() function
  // childProcess has stdout, stdin and stderr as properties of the object
  let 
    childProcess = spawn('ls',['-lh',filename]),
    output = '';

  // listen for 'data' on the stdout of the childProcess.
  // data events pass along a buffer object to the callback. A buffer is Node's way of representing
  // binary data. It points to a blob of memory pointed by Node's core outside the Javascript engine.
  // Buffers cannot be resized and they need to be encoded and decoded.
  childProcess.stdout.on('data', (chunk) => {
    // and append the chunks that come in into an output variable.
    output += chunk.toString();     
    // Calling toString() converts the buffer's content to a text string with UTF-8 encoding. This 
    // essentially copies the data from outside into Node's heap and that could be a slow operation. 
    // Therefore it is generally efficient to work with buffers, however working with strings is rather 
    // convenient.
  });

  // when the childProcess flushes data and terminates, it emits a close event.
  childProcess.on('close', () => {
    // split the output variable on space
    let parts = output.split(/\s+/);

    // and dump the output.
    console.dir(parts[0], parts[4], parts[8]);
  });

  // we use the child process's stdout property and relay the output to stdout (console)
  childProcess.stdout.pipe(process.stdout)
});

console.log('Now watching',filename,'for changes')
