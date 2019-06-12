var StaticServer = require('static-server');

var randomPort = function () {
  // random private portnumber
  var low = 49152;
  var high = 65535;
  return Math.floor ( Math.random() * (high-low) ) + low;
}

var server = new StaticServer({
  rootPath: '.',            // required, the root of the server file tree
  port: randomPort(),               // required, the port to listen
  name: 'static-server',   // optional, will set "X-Powered-by" HTTP header
  host: '0.0.0.0',       // optional, defaults to any interface
  cors: '*',                // optional, defaults to undefined
  followSymlink: true,      // optional, defaults to a 404 error
  templates: {
//     index: 'foo.html',      // optional, defaults to 'index.html'
//     notFound: '404.html'    // optional, defaults to undefined
  }
});

// export a fully configured but idle server
module.exports = server;