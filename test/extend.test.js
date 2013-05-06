var assert = require('chai').assert,
	extend = require('../lib/extend');

describe('shallow extend', function() {
	var shallow = extend.shallow;

	it('should copy simple values', function() {
		var a = {},
			b = { s: 'string', n: 1, b: false, a: [], o: {}};

		var c = shallow(a, b);

		assert.deepEqual(c, a);
		assert.equal(c.s, b.s);
		assert.equal(c.n, b.n);
		assert.equal(c.b, b.b);
		assert.equal(c.a, b.a);
		assert.equal(c.o, b.o);
	});

	it('should only alter first param', function() {
		var a = { doom: 'song' },
			b = { burp: 'adurp' },
			c = { grr: 'argh' };

		var result = shallow({}, a, b, c);

		assert.deepEqual(a, { doom: 'song' });
		assert.deepEqual(b, { burp: 'adurp' });
		assert.deepEqual(c, { grr: 'argh' });
		assert.sameMembers(Object.keys(result), ['doom', 'burp', 'grr']);
		assert.equal(result.doom, a.doom);
		assert.equal(result.burp, b.burp);
		assert.equal(result.grr, c.grr);

	});

	it('should contain reference objects', function() {
		var deep = { foo: 'bar' },
			a = { burp: 'adurp' , nested: deep };


		var result = shallow({}, a);

		assert.strictEqual(result.nested, deep);
	});

});

describe('deep extend', function() {

	it('should not contain reference objects', function() {
		var deep = { foo: 'bar' },
			a = { burp: 'adurp' , nested: deep };


		var result = extend.deep({}, a);

		assert.notStrictEqual(result.nested, deep);
	});

});
