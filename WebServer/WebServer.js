'use strict'
const http = require('http');
const url = require('url');
const fs = require('fs');
const path = require('path');
let mimes = {
	'.htm': 'text/html',
	'.css': 'text/css',
	'.js' : 'text/javascript',
	'.gif' : 'image/gif',
	'.jpg' : 'image/jpeg',
	'.png' : 'image/png'
}


function webserver(req, res) {
	let baseURI = url.parse(req.url);
	let filepath = __dirname + '/WebServerBegin' + (baseURI.pathname === '/' ? '/index.htm' : baseURI.pathname);
	
	fs.access(filepath, fs.F_OK, error => {
		if (!error){
			// Read and Server file
			fs.readFile(filepath, (error, content) => {
				if (!error){
					console.log('Serving: ' + filepath);
					//Resolve the content type
					let contentType = mimes[path.extname(filepath)]; //get mime type
					//Server the file from buffer
					res.writeHead(200, {'Content-type': contentType});
					res.end(content, 'utf-8');
				} else {
					// Server a 500
					res.writeHead(500);
					res.end('The server could not read the file requested.');
				}
			})
		} else {
			// Server a 404
			res.writeHead(404);
			res.end('Content not found!');
		}
	});

}


http.createServer(webserver).listen(4000, () => {
	console.log('Webserver running on port 4000');
})

