[![Build Status](https://secure.travis-ci.org/selfcontained/deap.png?branch=master)](http://travis-ci.org/bmharris/slikcalc)

deap
====

extend and merge objects, deep or shallow, in javascript


### installation

```bash
npm install deap
```

```javascript
var deap = require('deap');
```

---

### deap() and deap.extend()

Deep extend.  Copy all the properties from one object onto another, cloning objects deeply.

Takes *n* number of arguments, modifies the first argument and returns it.

```javascript
var a = { name: 'Joe' };

deap.extend(a, { age: 26 }); // returns: a => { name: 'Joe', age: 26 }
deap.extend({}, someObj); // clone someObj
```

### deap.merge()

Deep merge.  Fill an object's existing properties from another object.

Takes *n* number of arguments, modifies the first argument and returns it. 

```javascript
var a = { name: 'Joe', phone: '' };
deap.merge(a, { age: 26, phone: '555-555-5555' }); // returns: a => { name: 'Joe', phone: '555-555-5555' }
```
