var lib = require('./lib/deap');

var deap = module.exports = lib.extend;

deap(deap, {
	clone: lib.clone,
	extend: lib.extend,
	merge: lib.merge,
	extendShallow: lib.extendShallow,
	mergeShallow: lib.mergeShallow
});
