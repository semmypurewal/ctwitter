describe('JSONP Poller', function() {
    var jp;
    beforeEach(function() {
	jp = new JSONPPoller();
    });

    it('is an instance of EventEmitter', function() {
	expect(jp instanceof EventEmitter).toBeTruthy();
    });

    it('responds to data and error', function() {
	expect(jp.emits().indexOf('error') > -1).toBeTruthy();
	expect(jp.emits().indexOf('data') > -1).toBeTruthy();
    });


    it('implements the JSONP Poller interface', function() {
	var i;
	var interface = ['url', 'start', 'stop', 'process', 'isPolling'];
	for(i = 0; i < interface.length; i++) {
	    expect(jp[interface[i]]).not.toBeUndefined();
	    expect(typeof(jp[interface[i]]) === 'function').toBeTruthy();
	}
    });

    describe('url method', function() {
	it('throws an error if url is called without url being set previously', function() {
	    var badCall = function() {
		var u = jp.url();
	    };
	    expect(badCall).toThrow(new Error('url needs to be set before you call it as a getter'));
	});

	it('accepts a string that represents the url', function() {
	    jp.url('http://www.thisisajsonfeed.com/feed.json');
	});

	it('throws an error on a non-string argument', function() {
	    var badCall = function() {
		jp.url(5);
	    };
	   expect(badCall).toThrow(new Error('url only accepts a string argument'));
	});

	it('returns a string that represents the current url it is polling', function() {
	    jp.url('http://www.thisisajsonfeed.com/feed.json');
	    var u = jp.url();
	    expect(u).toEqual('http://www.thisisajsonfeed.com/feed.json');
	});
    });

    describe('start method', function() {
	xit('starts polling', function() {

	});

	xit('adds a script tag to the head immediately', function() {

	});
    });

    describe('stop method', function() {
	xit('stops polling', function() {

	});

	xit('removes the script tag from the head immediately', function() {

	});
    });

    describe('process method', function()  {
	xit('accepts a function as an argument', function() {

	});

	xit('accepts a data object and then processes it', function() {

	});

	xit('is called when data is emitted', function() {

	});

	xit('throws an error if the argument is not a function or an object', function() {
	    
	});

	xit('throws an error if the argument is an object but no function has been registered', function() {

	});
    });

    describe('isPolling method', function() {
	xit('returns false if it has not started', function() {
	    expect(jp.isPolling()).toBeFalsy();
	});

	xit('returns true if it has started', function() {
	    jp.start();
	    expect(jp.isPolling()).toBeTruthy();
	});

	xit('toggles true and false between calls', function() {
	    expect(jp.isPolling()).toBeFalsy();
	    jp.start();
	    expect(jp.isPolling()).toBeTruthy();
	    jp.stop();
	    expect(jp.isPolling()).toBeFalsy();
	});
    });
});