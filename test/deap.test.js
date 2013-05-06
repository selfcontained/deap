var assert = require('chai').assert,
	deap = require('../index'),
	extend = require('../lib/extend'),
	merge = require('../lib/merge');

describe('deap', function() {

	it('should have extend exposed as a top level function', function() {
		assert.isFunction(deap);
		assert.equal(deap, extend.deep);
	});

	it('should have extend defined', function() {
		assert.isFunction(deap.extend);
		assert.deepEqual(deap.extend, extend.deep);
	});

	it('should have extendShallow defined', function() {
		assert.isFunction(deap.extendShallow);
		assert.deepEqual(deap.extendShallow, extend.shallow);
	});

	it('should have merge defined', function() {
		assert.isFunction(deap.merge);
		assert.deepEqual(deap.merge, merge.deep);
	});

	it('should have mergeShallow defined', function() {
		assert.isFunction(deap.mergeShallow);
		assert.deepEqual(deap.mergeShallow, merge.shallow);
	});


});
