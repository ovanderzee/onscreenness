var StaticServer = require('static-server');

var server = new StaticServer({
  rootPath: '.',            // required, the root of the server file tree
  port: 1248,               // required, the port to listen
  name: 'static-server',   // optional, will set "X-Powered-by" HTTP header
  host: '0.0.0.0',       // optional, defaults to any interface\
  debug: true,
  index: 'demo/basic.html',
  open: true,
  cors: '*',                // optional, defaults to undefined
  followSymlink: true,      // optional, defaults to a 404 error
  templates: {
//     index: 'foo.html',      // optional, defaults to 'index.html'
//     notFound: '404.html'    // optional, defaults to undefined
  }
});

server.start(function () {
  console.log ( `Started server on http://${server.host}/${server.port} for ${process.cwd()}` );
  console.log ( 'Press ctrl+C to shutdown.' );
});
