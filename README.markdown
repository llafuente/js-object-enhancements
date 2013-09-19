# js-object-enhancements [![Build Status](https://secure.travis-ci.org/llafuente/js-object-enhancements.png?branch=master)](http://travis-ci.org/llafuente/js-object-enhancements)
==========

## Introduction
============

Functions included

``` js

Object.each(obj, callback(value, key))
Object.clone(obj) // clone the object and clone the values!!
Object.merge(from, to, clone, must_exists)
Object.combine(array_keys, array_values)
Object.extract(obj, array_keys)
Object.ksort(obj)

// note all return and object as you should suppose just by yourself

# compatibility layer for old browsers
Object.keys

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
