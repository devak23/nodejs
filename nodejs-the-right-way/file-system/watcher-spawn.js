//
// 02. Spawning a Child Process
//
"use strict"

const
  fs = require('fs'),
  spawn = require('child_process').spawn, // this is imported to spawn a new child-process
  filename = process.argv[2];

if (!filename) {
  throw Error('A file is required to watch');
}

try {
  fs.accessSync(filename, fs.R_OK | fs.W_OK);
} catch (e) {
  console.log('File: ', filename, 'does not exist');
  return;
}

// watch for changes in the filename
fs.watch(filename, () => {
  // run the command 'ls -lh' by forking a child process using the spawn() function
  let childProcess = spawn('ls',['-lh',filename])

  // childProcess has stdout, stdin and stderr as properties of the object

  // we use the child process's stdout property and relay the output to stdout (console)
  childProcess.stdout.pipe(process.stdout)
});

console.log('Now watching',filename,'for changes')
