function CTwitter() {
  
    /**
     * stream
     * should accept mode, options and callback
     * options argument is, of course, optional
     * deliver data to the client one tweet at a time
     * throws error on
     *   --mode not a string
     *   --callback not a function
     *   --no callback
     *   --no mode
     */
    this.stream = function(mode, options, callback) {
	var twitterPoller = new JSONPPoller()
	, stream = new EventEmitter()
	, buffer = [];

	if(arguments.length === 2) {
	    callback = arguments[1];
	    options = null;
	}
	
	if(typeof(mode) !== 'string') {
	    throw new Error('stream requires mode and it must be a string');
	} else if(typeof(callback) !== 'function') {
	    throw new Error('stream requires callback and it must be a function');
	} else if(options !== null && typeof(options) !== 'object') {
	    throw new Error('stream requires options parameter to be an object');
	}
	
	stream.emits(['data','error','destroy']);
	stream.destroy = function() { stream.emit('destroy'); };
	stream.on('destroy', twitterPoller.stop);

	
	//process mode
	
	//process options
	
	twitterPoller.url('').timeout(60).process(function(data) {
	    //check frequency of data to set up bufferTimeout
	    //and next polling timeout
	    
	    //set up buffer to deliver data
	    
	    //update poller and timeout for next request
	    twitterPoller.url('').timeout(60);
	});

	//set up the poller as specified by the client
	callback(stream);
	
	//start the poller
	//twitterPoller.start();
    };
}