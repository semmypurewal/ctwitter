require(["event_emitter"], function(EventEmitter) {
    Stream.prototype = new EventEmitter();
    function Stream() {
	var varName =  "_tw";
	var lastScriptTag;
	
	this.emits(['connect', 'data', 'end', 'error', 'destroy']);
	
	this.destroy = function() {

	}
    }
});