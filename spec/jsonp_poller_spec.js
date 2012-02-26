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
	var interface = ['url', 'start', 'stop', 'process', 'timeout', 'isPolling', 'name'];
	for(i = 0; i < interface.length; i++) {
	    expect(jp[interface[i]]).not.toBeUndefined();
	    expect(typeof(jp[interface[i]]) === 'function').toBeTruthy();
	}
    });

    describe('url method', function() {
	it('accepts a string that represents the url', function() {
	    jp.url('http://www.thisisajsonfeed.com/feed.json');
	});

	it('returns the object when called as a setter method', function() {
	    expect(jp.url('http://www.thisisajsonfeed.com/feed.json')).toEqual(jp);
	});

	it('returns a string that represents the current url it is polling', function() {
	    jp.url('http://www.thisisajsonfeed.com/feed.json');
	    var u = jp.url();
	    expect(u).toEqual('http://www.thisisajsonfeed.com/feed.json');
	});

	it('throws an error on a non-string argument', function() {
	    var badCall = function() {
		jp.url(5);
	    };
	    expect(badCall).toThrow(new Error('url only accepts a string argument'));
	});

	it('throws an error if url is called without url being set previously', function() {
	    var badCall = function() {
		var u = jp.url();
	    };
	    expect(badCall).toThrow(new Error('url needs to be set before you call it as a getter'));
	});
    });

    describe('timeout method', function() {
	it('defaults the timeout to 0', function() {
	    expect(jp.timeout()).toBe(0);
	});

	it('accepts an integer that represents the timeout in seconds and stores it in timeout', function() {
	    jp.timeout(30);
	    expect(jp.timeout()).toBe(30);
	});

	it('returns the object when called as a setter method', function() {
	    expect(jp.timeout(20)).toEqual(jp);
	});

	it('stops polling if the timeout is set to 0', function() {
	    jp.url('fixtures/public_timeline.json').timeout(20).start();
	    jp.timeout(0);
	    expect(jp.isPolling()).toBeFalsy();
	});



	it('throws an error on a non-numeric parameter', function() {
	    var badCall = function() {
		jp.timeout('hello');
	    };
	    expect(badCall).toThrow(new Error('timeout requires the parameter to be an integer'));
	});
    });

    describe('name method', function() {
	it('returns a string that is the name of this poller', function() {
	    expect(typeof(jp.name()) === 'string').toBeTruthy();
	});
    });

    describe('start method', function() {
	beforeEach(function() {
	    jp.url('fixtures/public_timeline.json').start();
	});

	it('starts polling', function() {
	    expect(jp.isPolling()).toBeTruthy();
	});

	it('adds a script tag with URL to DOM', function() {
	    var script = document.getElementById(jp.name()+"_script_tag_id");
	    expect(script.src.match(new RegExp(jp.url().substring(0,jp.url().indexOf('?'))))).toBeTruthy();
	});

	it('replaces the % in the callback with the name of this process function', function() {
	    var jp2 = new JSONPPoller();
	    jp2.url("fixtures/public_timeline.json?callback=%").start();

	    var script = document.getElementById(jp2.name()+"_script_tag_id");
	    expect(script.src.match(new RegExp("callback="+jp2.name()+".process"))).toBeTruthy();
	});

	it('removes previous script tag from the DOM if it exists', function() {
	    var scripts = [];
	    var script_tags;
	    var i;
	    jp.start(); //call it a second time to make sure we don't add an extra script tag
	    scripts = [];
	    script_tags = document.getElementsByTagName('script');
	    for(i = 0; i < script_tags.length; i++) {
		if(script_tags[i].id !== 'undefined' && script_tags[i].id.match(jp.name())) {
		    scripts.push(script_tags[i]);
		};
	    };
	    expect(scripts.length).toBe(1);
	});

	it('reloads and processes the data after the specified timeout', function() {
	    var jp2 = new JSONPPoller();
	    jp2.url('fixtures/public_timeline.json').timeout(1);
	    expect(jp2.count()).toBe(0);
	    jp2.start();
	    expect(jp2.count()).toBe(1);
	    waitsFor(function() {
		return (jp2.count() === 2);
	    }, "start never called a second time", 2000);
	});

	it('throws error if no URL has been specified', function() {
	    var jp2 = new JSONPPoller();
	    var badCall = function() {
		jp2.start();
	    };
	    expect(badCall).toThrow(new Error('start requires a url to have been specified'));
	});
    });

    describe('stop method', function() {
	var jp2;
	beforeEach(function() {
	    jp2 = new JSONPPoller();
	    jp2.url('fixtures/public_timeline.json').timeout(2).start();
	});

	it('stops polling', function() {
	    jp2.stop();
	    expect(jp2.isPolling()).toBeFalsy();
	});

	it('cancels the expected next call to start', function() {
	    jp2.stop();
	    waits(3000);
	    runs(function() {
		expect(jp2.count()).not.toBe(2);
	    });
	});

	it('removes the script tag from the head', function() {
	    var script_tags;
	    var i;
	    jp2.stop();
	    script_tags = document.getElementsByTagName('script');
	    for(i = 0; i < script_tags.length; i++) {
		expect(script_tags[i].id !== jp2.name()+'_script_tag_id');
	    };
	});
    });

    describe('process method', function()  {
	xit('accepts a function as an argument', function() {

	});

	xit('is called after polling starts and data is returned from the URL', function() {
	    var processStub = jasmine.createSpy();
	});

	xit('accepts a data object and then processes it', function() {

	});

	xit('emits data when new data is available', function() {

	});

	xit('emits error if an error is returned', function() {

	});

	xit('throws an error if the argument is not a function or an object', function() {
	    
	});

	xit('throws an error if the argument is an object but no function has been registered', function() {

	});
    });

    describe('isPolling method', function() {
	it('returns false if it has not started', function() {
	    expect(jp.isPolling()).toBeFalsy();
	});

	it('returns true if it has started', function() {
	    jp.url("fixtures/public_timeline.json");
	    jp.start();
	    expect(jp.isPolling()).toBeTruthy();
	});

	it('toggles true and false between calls', function() {
	    expect(jp.isPolling()).toBeFalsy();
	    jp.url("fixtures/public_timeline.json");
	    jp.start();
	    expect(jp.isPolling()).toBeTruthy();
	    jp.stop();
	    expect(jp.isPolling()).toBeFalsy();
	});
    });
});