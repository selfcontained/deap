var lib = require('./lib/deap');

var deap = module.exports = lib.extend;

deap(deap, {
	clone: lib.clone,
	extend: lib.extend,
	update: lib.update,
	extendShallow: lib.extendShallow,
	updateShallow: lib.updateShallow
});
