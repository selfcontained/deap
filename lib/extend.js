var typeOf = require('./typeof'),
	slice = Array.prototype.slice;

module.exports = {
	shallow : extend,
	deep: deepExtend
};

function extend(a, b /*, [b2..n] */) {
	slice.call(arguments, 1).forEach(function(b) {
		Object.getOwnPropertyNames(b).forEach(function(p) {
			a[p] = b[p];
		});
	});
	return a;
};

function deepExtend(a, b /*, [b2..n] */) {
	slice.call(arguments, 1).forEach(function(b) {
		Object.getOwnPropertyNames(b).forEach(function(p) {
			if(typeOf(b[p]) === 'object') {
				if(typeOf(a[p]) === 'object')
					extend(a[p], b[p]);
				else
					a[p] = extend({}, b[p]);
			} else
				a[p] = b[p];
		});
	});
	return a;
};


