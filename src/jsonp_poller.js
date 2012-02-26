define(function(require, exports, module) {
    require(["event_emitter"], function(EventEmitter) {
	JSONPPoller.prototype = new EventEmitter();
	JSONPPoller.instanceCount = 0;
	function JSONPPoller() {
	    var url;
	    var timer = null;
	    var polling = false;
	    var timeout = 0;
	    JSONPPoller.instanceCount++;
	    var prefix = "__jp_";
	    var name = prefix+JSONPPoller.instanceCount;

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

	    this.name = function() {
		return name;
	    };

	    this.start = function() {
		try {
		    this.url();
		} catch(e) {
		    throw new Error('start requires a url to have been specified');
		}

		polling = true;
		var thisPoller = this;
		
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


	    this.stop = function() {
		polling = false;
	    };

	    this.process = function() {

	    };

	    this.timeout = function(t) {
		if(t === undefined) {
		    return timeout;
		} else if(typeof(t) !== 'number') {
		    throw new Error('timeout requires the parameter to be an integer');
		} else {
		    timeout = t;
		};
	    };

	    this.isPolling = function() {
		return polling;
	    };
	};

	module.exports = JSONPPoller;
    });
});