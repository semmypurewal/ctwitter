describe('JSONP Poller', function() {
    var jp;
    beforeEach(function() {
	jp = new JSONPPoller();
    });

    it('has a method called emits', function() {
	expect(jp.emits).not.toBeUndefined();
    });

    it('has a method called on', function() {
	expect(jp.on).not.toBeUndefined();
    });

    it('has a method called emit', function() {
	expect(jp.emit).not.toBeUndefined();
    });

    it('has a method called url', function() {
	expect(jp.url).not.toBeUndefined();
    });

    it('has a method called start', function() {
	expect(jp.start).not.toBeUndefined();
    });

    it('has a method called stop', function() {
	expect(jp.stop).not.toBeUndefined();
    });

    it('has a method called process', function() {
	expect(jp.process).not.toBeUndefined();
    });

    it('has a method called isPolling', function() {
	expect(jp.isPolling).not.toBeUndefined();
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

    });

    describe('stop method', function() {

    });

    describe('process method', function()  {

    });

    describe('isPolling method', function() {

    });
});