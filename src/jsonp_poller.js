define(function(require, exports, module) {
    require(["event_emitter"], function(EventEmitter) {
	JSONPPoller.prototype = new EventEmitter();
	JSONPPoller.instanceCount = 0;
	function JSONPPoller() {
	    var url;
	    var count = 0; //number of requests made
	    var timer = null; //timeout for next request
	    var polling = false;
	    var timeout = 0;
	    var processor = function(data) { return {update:true, data:data}; }; //default process implementation
	    JSONPPoller.instanceCount++;
	    var prefix = "__jp_";
	    var name = prefix+JSONPPoller.instanceCount;
	    window[name] = this;

	    this.emits(['error','data']);

	    /**
	     * url setter/getter
	     * accepts a string that sets the URL of the JSONP feed
	     * returns the current URL if called with no parameter
	     * throws an error if:
	     *   --non-string argument
	     *   --called as a getter before the url is set
	     */
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
		return this;
	    };

	    /**
	     * name
	     * returns the global name of this object
	     */
	    this.name = function() {
		return name;
	    };

	    /**
	     * start
	     * starts polling
	     * adds a script with the URL to the DOM
	     * replaces callback=% with the actual callback based on the name
	     * removes the previous script tag if it exists
	     * reloads and reprocesses the data after the timeout
	     * throws error if
	     *   --url has not been specified
	     */
	    this.start = function() {
		var thisPoller = this;
		try {
		    this.url();
		} catch(e) {
		    throw new Error('start requires a url to have been specified');
		}

		polling = true;
		count++;
		var head = document.getElementsByTagName('head')[0]; //assuming there is only 1 head?
		var script = document.getElementById(this.name()+'_script_tag_id');
		if(script) {
		    head.removeChild(script);
		};
		script = document.createElement('script');
		script.type = 'text/javascript';
		script.id = this.name()+'_script_tag_id';
		script.src = this.url().replace('=%',"="+this.name()+'.process');
		head.appendChild(script);

		if(this.timeout() > 0) {
		    timer = setTimeout(function() {
			thisPoller.start();
		    }, thisPoller.timeout()*1000);
		};
	    };

	    /**
	     * stop
	     * stops polling
	     * cancels the next call to start
	     * removes script tag from head
	     */
	    this.stop = function() {
		polling = false;
		if(timer) {
		    clearTimeout(timer);
		}
		var script = document.getElementById(this.name()+'_script_tag_id');
		if(script !== null) {
		    var head = document.getElementsByTagName('head')[0];
		    head.removeChild(script);
		}
	    };

	    //method only used for testing
	    //keeps track of the number of times the
	    //URL has been polled
	    this.count = function() {
		return count;
	    };

	    /**
	     * process
	     * accepts a function as an argument and sets it to the pre-processor
	     * accepts an object as an argument and processes it, emitting new data
	     *   if it is available
	     * throws an error if
	     *   --argument is not a function or an object
	     */
	    this.process = function(f) {
		var thisPoller = this;
		var result;
		if(typeof(f) === 'function') {
		    processor = f;
		    return thisPoller;
		} else if (typeof(f) === 'object') {
		    //do object stuff
		    result = processor(f);
		    if(result && result.error) {
			this.emit('error', result.error);
		    } else if(result && result.update) {
			this.emit('data', result.data);
		    }
		    //return result.data;
		} else {
		    throw new Error('process requires the parameter to be an object or a function');
		}
	    };

	    /**
	     * timeout
	     * the default timeout is set to 0
	     * accepts an integer that represents a timeout and stores it in timeout
	     * returns the timeout when called with no parameters
	     * throws error on:
	     *   --non numeric parameter
	     */
	    this.timeout = function(t) {
		if(t === undefined) {
		    return timeout;
		} else if(typeof(t) !== 'number') {
		    throw new Error('timeout requires the parameter to be an integer');
		} else {
		    timeout = t;
		    if(timeout === 0 && polling) {
			this.stop();
		    }
		};
		return this;
	    };

	    this.isPolling = function() {
		return polling;
	    };
	};

	module.exports = JSONPPoller;
    });
});