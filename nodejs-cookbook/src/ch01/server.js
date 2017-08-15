"use strict";
const
  http = require('http'),
  // to create a router we need the path package
  path = require('path');

const pages = [
  {route: '', output: 'Woohooo!'},
  {route: 'about', output: 'A simple routing with Nodejs'},
  {
    route: 'another page', output: function () {
    return 'Here\'s ' + this.route;
  }
  },
];


http.createServer((request, response) => {
  // extract the basename (final part of the path)
  // and reverse any URI encoding using decodeURI
  let lookup = path.basename(decodeURI(request.url));
  console.log(request.url);

  pages.forEach((page) => {
    if (page.route === lookup) {
      response.writeHead(200, {'Content-Type': 'text/html'});
      response.end(typeof page.output === 'function' ? page.output() : page.output);
    }
  });

  if (!response.finished) {
    response.writeHead(404);
    response.end('Page Not Found');
  }

}).listen(9000, () => {
  console.info('Server listening on port 9000');
});

