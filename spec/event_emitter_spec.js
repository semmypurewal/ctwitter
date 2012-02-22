describe('Event Emitter', function() {
    var e;
    beforeEach(function() {
	e = new EventEmitter();
    });

    describe('emits method', function() {
	it('accepts an array of events that it emits', function() {
	    e.emits(['event1', 'event2', 'event3']);
	});

	it('returns an array of events that it emits', function() {
	    expect(e.emits()).toEqual([]);
	    e.emits(['event1', 'event2', 'event3']);
	    expect(e.emits()).toEqual(['event1', 'event2', 'event3']);
	});

	it('throws an error if the argument is not undefined and also not an array', function() {
	    var badCall = function() {
		e.emits('event');
	    }
	    expect(badCall).toThrow(new Error('the argument to emits must be an array of events'));
	});
    });

    describe('on method', function() {
	beforeEach(function() {
	    e.emits(['event','event1','event2']);
	});

	it('registers a callback on an event', function() {
	    e.on('event', function() {});
	    expect(e.listeners('event').length).toBe(1);
	});
	
	it('registers multiple callbacks for a single event', function() {
	    e.on('event', function() { console.log("function 1") });
	    e.on('event', function() { console.log("function 2") });
	    expect(e.listeners('event').length).toBe(2);
	});
	
	it('registers callbacks for multiple events', function() {
	    e.on('event1', function() { });
	    e.on('event2', function() { });
	    expect(e.listeners('event1').length).toBe(1);
	    expect(e.listeners('event2').length).toBe(1);
	});

	it('throws an error if the event is not emitted', function() {
	    var badCall = function() {
		e.on('event3', function() {});
	    };
	    expect(badCall).toThrow(new Error("'event3' is not emitted by this EventEmitter"));
	});

	it('throws an error if the event is not a string', function() {
	    var badCall = function() {
		e.on(1, function() { });
	    }
	    expect(badCall).toThrow(new Error("first argument to 'on' should be a string"));
	});
	
	it('throws an error if the listener is not a function', function() {
	    var badCall = function() {
		e.on('event', 1);
	    }
	    expect(badCall).toThrow(new Error("second argument to 'on' should be a function"));
	});
    }); //end description of 'on method'

    describe('emit method', function() {
	var stubA;
	var stubB;
	beforeEach(function() {
	    e.emits(['event1','event2']);
	    stubA = jasmine.createSpy('stubA');
	    stubB = jasmine.createSpy('stubB');
	});

	it('responds with a correct listener and data when an event is emitted', function() {
	    e.on('event1', stubA);
	    e.emit('event1');
	    expect(stubA).toHaveBeenCalledWith(undefined);
	    e.emit('event1',5);
	    expect(stubA).toHaveBeenCalledWith(5);
	});

	it('does not respond with incorrect listener when an event is emitted', function() {
	    e.on('event1', stubA);
	    e.on('event2', stubB);
	    e.emit('event1');
	    expect(stubA).toHaveBeenCalledWith(undefined);
	    expect(stubB).not.toHaveBeenCalled();
	});

	it('responds with all listeners when an event is emitted', function() {
	    e.on('event1', stubA);
	    e.on('event1', stubB);
	    e.emit('event1', 5);
	    expect(stubA).toHaveBeenCalledWith(5);
	    expect(stubB).toHaveBeenCalledWith(5);
	});
    }); //end description of 'emit' method
});