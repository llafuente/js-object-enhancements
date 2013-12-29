(function () {
    "use strict";

    var hasOwnProperty = Object.prototype.hasOwnProperty,
        hasDontEnumBug = !({toString: null}).propertyIsEnumerable('toString'),
        dontEnums = [
            'toString',
            'toLocaleString',
            'valueOf',
            'hasOwnProperty',
            'isPrototypeOf',
            'propertyIsEnumerable',
            'constructor'
        ],
        dontEnumsLength = dontEnums.length,
        ArrayPush = Array.prototype.push,
        ObjectConstructor = Object.prototype.constructor;

    function __typeof(val) {
        if (val === null || val === undefined) {
            return "null";
        }
        // dont deal with undefine...
        if (val === true || val === false) {
            return "boolean";
        }

        var type = typeof val;

        if (type === "object") {
            // for performance, we check if it's a plain object first
            if (type.constructor === ObjectConstructor) {
                return type;
            }

            if (val.push === ArrayPush && val.length != null) {
                return "array";
            }
            // for performance, I will keep this insecure
            // if (hasOwnProperty.call(val, "callee")) {
            if (val.hasOwnProperty && val.hasOwnProperty("callee")) {
                return "arguments";
            }
            if (val instanceof Date) {
                return "date";
            }
            if (val instanceof RegExp) {
                return "regexp";
            }

            // this is an instance of something?
        } else if (type === "number" && isNaN(val)) {
            return "null";
        }

        return type;
    }

    //
    // Object
    //

    // From https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/keys
    if (!Object.keys) {
        Object.keys = function (obj) {
            if (typeof obj !== 'object' && (typeof obj !== 'function' || obj === null)) {
                throw new TypeError('Object.keys called on non-object');
            }

            var result = [], prop, i;

            for (prop in obj) {
                if (hasOwnProperty.call(obj, prop)) {
                    result.push(prop);
                }
            }

            if (hasDontEnumBug) {
                for (i = 0; i < dontEnumsLength; i++) {
                    if (hasOwnProperty.call(obj, dontEnums[i])) {
                        result.push(dontEnums[i]);
                    }
                }
            }
            return result;
        };
    }

    // define Object.defineProperty if not found, no functionality just a replacement so your code not throw!
    if (!Object.defineProperty) {
        Object.defineProperty = function (obj, name, prop) {
            if (prop.get || prop.set) {
                throw new Error("this is not supported in your js.engine");
            }
            obj[name] = prop.value;
        };
    }


    // define Object.seal if not found, no functionality just a replacement so your code not throw!
    if (!Object.seal) {
        Object.seal = function (obj) {
            return obj;
        };
    }

    /**
     * get the keys of an object (or anything iterable for...in) note: remove prototype key
     *
     * @param {Object} object
     * @param {Function} fn
     * @returns {Object} object
     */
    if (!Object.each) {
        Object.each = function (object, fn) {
            var key = null;

            for (key in object) {
                fn(object[key], key);
            }

            return object;
        };
    }

    if (!Object.clone) {
        Object.clone = function (obj) {
            return Object.merge({}, obj, true, false);
        };
    }

    /**
     * merge two object
     *
     *
     * @params {Object} to, this parameter is modified
     * @params {Object} from
     * @params {Boolean} clone
     * @params {Boolean} must_exists do not allow undefined in the objects
     */
    if (!Object.merge) {
        Object.merge = function (to, from, clone, must_exists) {
            //console.log("Object.merge", from);
            clone = clone || false;
            must_exists = must_exists || false;

            var ftype = __typeof(from),
                key,
                ret;

            switch (ftype) {
            case "string":
                return clone ? "" + from : from;
            case "number":
                return clone ? 0 + from : from;
            case "array": // maybe need more deep clone ?

                if (clone) {
                    ret = [];
                    for (key = 0; key < from.length; ++key) {
                        ret[key] = Object.merge(to[key] || {}, from[key], clone, must_exists);
                    }

                    return ret;
                }

                return from;
            case "boolean":
                return clone ? (from ? true : false) : from;
            case "null":
                return null;
            case "function":
                return from;
            case "object":
                // to it not an object, overwrite!
                ret = __typeof(to) !== "object" ? {} : to || {};
                // if has prototype just copy
                key = null;

                for (key in from) {
                    if (key !== "prototype") {
                        if (ret[key] === undefined) {
                            if (must_exists) {
                                continue;
                            }
                            ret[key] = {};
                        }
                        ret[key] = Object.merge(ret[key] || {}, from[key], clone, must_exists);
                    }
                }

                return ret;
            case "regexp":
                return new RegExp(from.source);
            case "date":
                return clone ? new Date(from) : from;
            }
            // unknown type... just return
            return from;
        };
    }

    if (!Object.combine) {
        Object.combine = function (keys, values) {
            values = values || [];
            var i,
                ret = {};

            for (i = 0; i < keys.length; ++i) {
                ret[keys[i]] = values[i] === undefined ? null : values[i];
            }
            return ret;
        };
    }

    if (!Object.ksort) {
        Object.ksort = function (from) {
            var keys = Object.keys(from),
                i,
                ret = {};

            for (i = 0; i < keys.length; ++i) {
                ret[keys[i]] = from[keys[i]];
            }

            return ret;
        };
    }

    if (!Object.extend) {
        Object.extend = function () {
            var target = arguments[0] || {},
                o,
                p,
                i,
                len;

            for (i = 1, len = arguments.length; i < len; i++) {
                o = arguments[i];

                if ('object' === typeof o && o !== null) {
                    for (p in o) {
                        target[p] = o[p];
                    }
                }
            }

            return target;
        };
    }

    if (!Object.extract) {
        Object.extract = function (from, keys, default_value) {
            var i,
                ret = {};

            default_value = default_value === undefined ? null : default_value;

            for (i = 0; i < keys.length; ++i) {
                ret[keys[i]] = from[keys[i]] === undefined ? default_value : from[keys[i]];
            }

            return ret;
        };
    }

    if (!Object.empty) {
        Object.empty = function (obj) {
            var name;
            for (name in obj) {
                return false;
            }
            return true;
        };
    }

    if (!Object.depth) {
        Object.depth = function (obj) {
            var i,
                max,
                props = false,
                d = 0;

            if (obj === null || obj === undefined) {
                return 0;
            }

            if (Array.isArray(obj)) {
                // array

                for (i = 0, max = obj.length; i < max; ++i) {
                    d = Math.max(d, Object.depth(obj[i]));
                }
                props = max > 0;
            } else if ("object" === typeof obj) {
                // object

                for (i in obj) {
                    props = true;
                    d = Math.max(d, Object.depth(obj[i]));
                }
            }

            return (props ? 1 : 0) + d;
        };
    }

    if (!Object.rFilter) {
        Object.rFilter = function (obj, callback, loop_arrays) {
            var i,
                max;
            loop_arrays = loop_arrays === true;

            if (Array.isArray(obj)) {
                // array
                if (!loop_arrays) {
                    obj = callback(obj);
                } else {
                    for (i = 0, max = obj.length; i < max; ++i) {
                        obj[i] = Object.rFilter(obj[i], callback, loop_arrays);
                    }
                }

                return obj;
            }

            if ("object" === typeof obj) {
                // object
                if (!(obj instanceof Date || obj instanceof RegExp)) {

                    for (i in obj) {
                        obj[i] = Object.rFilter(obj[i], callback, loop_arrays);
                    }
                    return obj;
                }
            }

            return callback(obj);
        };
    }


    module.exports = {
        __typeof: __typeof
    };


}());