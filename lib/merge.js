var typeOf = require('./typeof'),
	extend = require('./extend').shallow,
	slice = Array.prototype.slice;

module.exports = {
	shallow: merge,
	deep: deepMerge
};

function merge(a, b /*, [b2..n] */) {
	slice.call(arguments, 1).forEach(function(b) {
		Object.getOwnPropertyNames(b).forEach(function(p) {
			if(a.hasOwnProperty(p)) a[p] = b[p];
		});
	});
	return a;
}

function deepMerge(a, b /*, [b2..n] */) {
	slice.call(arguments, 1).forEach(function(b) {
		Object.getOwnPropertyNames(b).forEach(function(p) {
			if(a.hasOwnProperty(p)) {
				if(typeOf(b[p]) === 'object') {
					if(typeOf(a[p]) === 'object')
						deepMerge(a[p], b[p]);
					else
						a[p] = extend({}, b[p]);
				} else
					a[p] = b[p];
			}
		});
	});
	return a;
}
