require(["jsonp_poller", "event_emitter"], function(JSONPPoller, EventEmitter) {
    ctwitter.prototype = new EventEmitter();
    function ctwitter(options) {
	this.stream = function(mode, options, callback) {
	    var twitterPoller = new JSONPPoller();
	    var buffer = [];

	    //process mode

	    //process options

	    twitterPoller.url('').timeout(60).process(function(data) {
		//check frequency of data to set up bufferTimeout
		//and next polling timeout

		//set up buffer to deliver data

		//update poller and timeout for next request
		twitterPoller.url('')
	    });

	    var stream = { on:this.on,
			   destroy: function() {
			       twitterPoller.emit('destroy');
			   }
			 };
	    //set up the poller as specified
	    callback(stream);
	    
	    //start the poller
	    twitterPoller.start();
	}
    }
});