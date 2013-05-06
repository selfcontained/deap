var merge = require('../lib/merge'),
	assert = require('chai').assert;

describe('shallow merge', function() {
	var shallowMerge = merge.shallow;

	it('should not merge anything into an empty object', function() {
		var result = shallowMerge({}, { foo: 'bar' });

		assert.deepEqual(result, {});
	});

	it('should replace existing values only', function() {
		var a = { burp: 'adurp' },
			b = { burp: 'zing', grr: 'arghh' };

		var result = shallowMerge(a, b);

		assert.deepEqual(result, a);
		assert.equal(a.burp, b.burp);
		assert.isUndefined(a.grr);
	});

});

describe('deep merge', function() {
	var deepMerge = merge.deep;

	it('should merge a nested object one level deep', function() {
		var a = { foo: 'bar', deep: { foo: 'bar', baz: 'buzz' }},
			b = { deep: { foo: 'beep' } };

		var result = deepMerge(a, b);

		assert.equal(result.foo, a.foo);
		assert.equal(result.deep.foo, b.deep.foo);
		assert.equal(result.deep.baz, a.deep.baz);
	});

	it('should merge a nested object two levels deep', function() {
		var a = { foo: 'bar', deep: { hi: 'hello', deeper: { foo: 'bar', baz: 'buzz' }}},
			b = { deep: { deeper: { foo: 'beep' } } };

		var result = deepMerge(a, b);

		assert.equal(result.foo, a.foo);
		assert.isObject(result.deep);
		assert.equal(result.deep.hi, a.deep.hi);
		assert.isObject(result.deep.deeper);
		assert.equal(result.deep.deeper.foo, b.deep.deeper.foo);
		assert.equal(result.deep.deeper.baz, a.deep.deeper.baz);
	});

	it('should merge properties from multiple objects', function() {
		var a = { foo: ['one'], boo: 'far', poo: 'tar' },
			b = { foo: ['two', 'three'], zoo: 'car' },
			c = { boo: 'star', two: 'czar' };

		var result = deepMerge(a, b, c);

		assert.deepEqual(result, {
			foo: b.foo,
			boo: c.boo,
			poo: a.poo
		});
	});

	it('should not merge properties that are not on the first argument', function() {
		var a = { foo: 'bar', deep: { deeper: { foo: 'bar' } } },
			b = { boo: 'far', deep: { hi: 'hello', deeper: { foo: 'beep', baz: 'buzz' } } };

		var result = deepMerge(a, b);

		assert.isUndefined(result.boo);
		assert.isObject(result.deep);
		assert.isUndefined(result.deep.hi);
		assert.isObject(result.deep.deeper);
		assert.isUndefined(result.deep.deeper.baz);
		assert.equal(result.deep.deeper.foo, b.deep.deeper.foo);
	});


});
