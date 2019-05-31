// adapted from https://geedew.com/remove-a-directory-that-is-not-empty-in-nodejs/
var fs = require('fs');

var deleteFolderContentsRecursive = function ( path ) {
  if ( fs.existsSync(path) ) {
    fs.readdirSync(path).forEach ( function ( file, index ) {
      var curPath = path + "/" + file;
      if (fs.lstatSync( curPath ).isDirectory()) { // recurse
        deleteFolderContentsRecursive( curPath );
        fs.rmdirSync( curPath );
      } else { // delete file
        fs.unlinkSync( curPath );
      }
    });
  }
};

deleteFolderContentsRecursive( process.argv[2] );
