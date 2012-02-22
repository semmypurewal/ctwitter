require(["event_emitter"], function(ee) {
    Stream.prototype = new ee();
    function Stream() {
	this.hello = function() {
	    console.log("hello");
	}
    }
    
    
    var s = new Stream();
    for(var k in s) {
	console.log(k);
    }
});