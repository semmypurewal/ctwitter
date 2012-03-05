var fs = require('fs');
var exec = require('child_process').exec;

var build = '(function() {\n';

exec('ls src', function(err, result) {
    var results = result.split('\n').filter(function(filename) {
	return filename.match(/.*.js$/);
    });
    results.forEach(function(filename) {
	var file = fs.readFileSync('src/'+filename, 'utf8');
	build+=file;
    });

    build += '\nwindow.ctwitter = CTwitter;\n';
    build += '\n})();'

    console.log(build);
});



