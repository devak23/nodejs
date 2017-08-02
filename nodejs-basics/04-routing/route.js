var url = require('url');
var fs = require('fs');

function renderHTML(path, response) {
    console.log('reading the file: ', path);
    fs.readFile(path, null, function (error, data) {
        if (error != null) {
            response.writeHead(404, "File not found");
        } else {
            response.writeHead(200, {'Content-type': 'text/html'});
            response.write(data);
        }
        response.end();
    });
}


module.exports = {
    handleRequest: function (request, response) {
        // browsers will mostly make the request twice.
        // once for actual URL and other for favicon.ico.
        // The header from the browser makes that request
        if (request.url == '/favicon.ico') {
            console.log('/favicon.ico was requested');
            response.writeHead(200, {'Content-Type' : 'image/x-icon'});
            response.end();
            return;
        }

        var path = url.parse(request.url).pathname;
        console.log(path);
        switch (path) {
            case '/':
                renderHTML('./index.html', response);
                break;
            case '/login':
                renderHTML('./login.html', response);
                break;
            default:
                response.writeHead(404);
                response.end('Route not found');
        }
    }
};