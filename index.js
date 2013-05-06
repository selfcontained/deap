var extend = require('./lib/extend'),
	merge = require('./lib/merge');

var deap = module.exports = extend.deep;

deap(deap, {
	extend: extend.deep,
	merge: merge.deep,
	extendShallow: extend.shallow,
	mergeShallow: merge.shallow
});
