var typeOf = require('./typeof'),
	slice = Array.prototype.slice;

module.exports = {
	clone: clone,
	extend: deepExtend,
	extendShallow: extend,
	update: deepUpdate,
	updateShallow: update,
	merge: deepMerge,
	mergeShallow: merge
};

function clone(val) {
	switch(typeOf(val)) {
		case 'object':
			return deepExtend({}, val);
		case 'array':
			return val.map(clone);
		case 'date':
			return new Date(val.getTime());
		case 'regexp':
			return new RegExp(val);
		default:
			return val;
	}
}

function extend(a, b /*, [b2..n] */) {
	slice.call(arguments, 1).forEach(function(b) {
		Object.keys(b).forEach(function(p) {
			a[p] = b[p];
		});
	});
	return a;
}

function deepExtend(a, b /*, [b2..n] */) {
	slice.call(arguments, 1).forEach(function(b) {
		Object.keys(b).forEach(function(p) {
			if(typeOf(b[p]) === 'object' && typeOf(a[p]) === 'object')
				deepExtend(a[p], b[p]);
			else
				a[p] = clone(b[p]);
		});
	});
	return a;
}

function update(a, b /*, [b2..n] */) {
	slice.call(arguments, 1).forEach(function(b) {
		Object.keys(b).forEach(function(p) {
			if(a.hasOwnProperty(p)) a[p] = b[p];
		});
	});
	return a;
}

function deepUpdate(a, b /*, [b2..n] */) {
	slice.call(arguments, 1).forEach(function(b) {
		var ap, bp, ta, tb;
		Object.keys(b).forEach(function(p) {
			if(a.hasOwnProperty(p)) {
				ap = a[p];
				bp = b[p];
				ta = typeOf(ap);
				tb = typeOf(bp);
				if(tb === 'object' && ta === 'object')
					deepUpdate(ap, bp);
				else if(tb === 'array' && ta === 'array') {
					ap.length = 0;
					ap.push.apply(ap, bp.map(clone));
				} else
					a[p] = clone(bp);
			}
		});
	});
	return a;
}

function merge(a, b /*, [b2..n] */) {
	slice.call(arguments, 1).forEach(function(b) {
		Object.keys(b).forEach(function(p) {
			if(!a.hasOwnProperty(p)) a[p] = b[p];
		});
	});
	return a;
}

function deepMerge(a, b /*, [b2..n] */) {
	slice.call(arguments, 1).forEach(function(b) {
		var ap, bp, ta, tb;
		Object.keys(b).forEach(function(p) {
			ap = a[p];
			bp = b[p];
			ta = typeOf(ap);
			tb = typeOf(bp);
			if(tb === 'object' && ta === 'object')
				deepMerge(ap, bp);
			else if(!a.hasOwnProperty(p))
				a[p] = clone(bp);
		});
	});
	return a;
}
