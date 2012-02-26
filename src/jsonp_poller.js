define(function(require, exports, module) {
    require(["event_emitter"], function(EventEmitter) {
	JSONPPoller.prototype = new EventEmitter();
	function JSONPPoller() {
	    var url;
	    this.emits(['error','data']);

	    this.url = function(u) {
		if(u === undefined && url === undefined) {
		    throw new Error('url needs to be set before you call it as a getter');
		} else if(u === undefined) {
		    return url;
		} else if(typeof(u) !== 'string') {
		    throw new Error('url only accepts a string argument');
		} else {
		    url = u;
		}
	    };

	    this.start = function() {

	    };

	    this.stop = function() {

	    };

	    this.process = function() {

	    };

	    this.isPolling = function() {

	    };
	};

	module.exports = JSONPPoller;
    });
});