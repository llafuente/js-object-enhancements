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
        dontEnumsLength = dontEnums.length;


    function __typeof(val) {
        if (val === null) {
            return "null";
        }
        // dont deal with undefine...
        if (val === undefined) {
            return "null";
        }
        if (val === true || val === false) {
            return "boolean";
        }

        var type = (typeof val).toLowerCase();

        if (type === "object") {
            if (typeof val.length === "number") {
                if (val instanceof Array) {
                    return "array";
                }

                if (hasOwnProperty.call(val, "callee")) {
                    return "arguments";
                }

            } else if (val instanceof Date) {
                return "date";
            } else if (val instanceof RegExp) {
                return "regexp";
            }
        }

        if (type === "number" && isNaN(val)) {
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
        }
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
                    if (key === "prototype") {
                        continue;
                    }

                    if (ret[key] === undefined) {
                        if (must_exists) {
                            continue;
                        }
                        ret[key] = {};
                    }
                    ret[key] = Object.merge(ret[key] || {}, from[key], clone, must_exists);
                }

                return ret;
            case "regexp":
                return new RegExp(obj.source);
            case "date":
                return clone ? new Date(from) : from;
            }
            // unknown type... just return
            return from;
        };
    }

    if (!Object.combine) {
        Object.combine = function(keys, values) {
            values = values || [];
            var i,
                ret = {};

            for (i = 0; i < keys.length; ++i) {
                ret[keys[i]] = values[i] === undefined ? null : values[i];
            }
            return ret;
        }
    }

    if (!Object.ksort) {
        Object.ksort = function(from) {
            var keys = Object.keys(from);

            var i,
                ret = {};

            for (i = 0; i < keys.length; ++i) {
                ret[keys[i]] = from[keys[i]];
            }

            return ret;
        }
    }

    if (!Object.extract) {
        Object.extract = function(from, keys, default_value) {
            var i,
                ret = {};

            default_value = default_value === undefined ? null : default_value;

            for (i = 0; i < keys.length; ++i) {
                ret[keys[i]] = from[keys[i]] === undefined ? default_value : from[keys[i]];
            }

            return ret;
        }
    }

}());