var lib = require('./lib/deap');

var deap = module.exports = lib.extendShallow;

deap(deap, {
	clone: lib.clone,
	extend: lib.extendShallow,
	merge: lib.mergeShallow
});
