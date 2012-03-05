describe('ctwitter', function() {
    var ct;
    beforeEach(function() {
	ct = new CTwitter();
    });

    describe('stream method', function() {
	xit('should accept mode, options and callback', function() {
	    var goodCall = function() {
		ct.stream('public_timeline', { }, function(stream) { 
		    stream.destroy();
		});
	    };
	    expect(goodCall).not.toThrow();
	});

	it('should accept mode and callback with no options', function() {
	    var goodCall = function() {
		ct.stream('public_timeline', function() {
		    stream.destroy();
		});
		expect(goodCall).not.toThrow();
	    };
	});

	xit('should deliver data to the client one tweet at a time', function() {

	});

	it('should throw an error if options exists but is not an object', function() {
	    var badCall = function() {
		ct.stream('public_timeline', 156, function() {
		    stream.destroy();
		});
	    };
	    expect(badCall).toThrow('stream requires options parameter to be an object');
	});

	it('should throw an error when no mode is specified', function() {
	    var badCall = function() {
		ct.stream();
	    };
	    expect(badCall).toThrow(new Error('stream requires mode and it must be a string'));
	});

	it('should throw an error when no callback is specified', function() {
	    var badCall = function() {
		ct.stream('public_timeline', { });
	    };
	    expect(badCall).toThrow(new Error('stream requires callback and it must be a function'));
	});

	it('should throw an error when callback is not a function', function() {
	    var badCall = function() {
		ct.stream('public_timeline', { }, 5);
	    };
	    expect(badCall).toThrow(new Error('stream requires callback and it must be a function'));
	});

	it('should throw an error when mode is not a string', function() {
	    var badCall = function() {
		ct.stream(5, { }, function(stream) { 
		    stream.destroy();
		});
	    };
	    expect(badCall).toThrow(new Error('stream requires mode and it must be a string'));
	});
    });
});