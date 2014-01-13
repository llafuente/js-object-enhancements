# js-object-enhancements [![Build Status](https://secure.travis-ci.org/llafuente/js-object-enhancements.png?branch=master)](http://travis-ci.org/llafuente/js-object-enhancements)
==========

## Introduction
============

Functions included

```js

// proper typeof implementation
Object.typeof(): String

// loop an object, like forEach
Object.forEach(obj, callback(value[, key]))
Object.each(obj, callback(value[, key]))

// recursive clone the object, no only the structure also the values
Object.clone(obj): Mixed

// merge two objects recursive.
// to merge only existing keys in from object: must_exists = true
// to also clone values: clone = true
Object.merge(from, to[, clone = false[, must_exists = false]]): Object

// combine two arrays into an object given keys-values
Object.combine(array_keys, array_values): Object

// extract from an object given keys
// extract return an object with all keys given, if not found in obj will return default_value
Object.extract(obj, array_keys[, default_value = null]): Object

// check if an object don't have any key-value
Object.empty(obj): Boolean

// tell you how depth is the object structure
// note: also loop arrays
Object.depth(obj): Number

// sort object keys, so in loop will be sorted
Object.ksort(obj)

// recursive filter an object (sync!)
Object.rFilter(obj, callback, loop_arrays): Object

// create a new object with keys prefixed
Object.prefixKeys(obj, prefix, ignore_keys): Object

// create a new object with removing the prefix from keys (if exists)
Object.prefixKeys(obj, prefix, ignore_keys): Object


// note all return and object as you should suppose just by yourself

// compatibility layer for old browsers
Object.keys
Object.defineProperty // throws in case of setter/getter
Object.seal // just do nothing



```

## Install
==========

With [npm](http://npmjs.org) do:

```

npm install object-enhancements


```

## test (travis-ci ready!)
==========================

```

npm test
// or
cd /test
node test.js

```

## license
==========

MIT.
