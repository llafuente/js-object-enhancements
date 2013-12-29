(function () {
    "use strict";

    var oen = require("../index.js"),
        tap = require("tap"),
        test = tap.test,
        t;




    test("Object tests", function (t) {

        var t1_arg2 = {ill: true},
            t1 = Object.merge({}, t1_arg2),
            t2 = Object.merge({abc: 123}, {ill: "yy", abc: [1,2,3]}, true),
            t3 = Object.merge({abc: 123}, {ill: "yy", abc: [1,2,3]}, false, true),
            t4  = Object.combine(["xxx", "yyy"], [1, 2]),
            t5  = Object.combine(["xxx", "yyy"], [1]),
            t6  = Object.combine(["xxx", "yyy"], [false]),
            t7  = Object.extract({ill: "yy", abc: [1,2,3]}, ["ill", "xxx"]),
            t8  = Object.ksort({a: true, c: false, b: 1}),
            t9  = Object.merge(true, {a: true, c: false, b: {xxx: "xxx"}}, true, false),
            t10  = Object.merge(true, {a: true, c: false, b: {xxx: "xxx"}}, true, false),
            t11_arg2 = [1,2,3,4],
            t11  = Object.merge({}, t11_arg2, true, false),
            t12_arg2 = [1,2,3,4],
            t12  = Object.clone(t12_arg2),
            t13_arg2 = [{x:1, sub: {kk: 1}},{y:2},{z:3},{g:0}],
            t13  = Object.clone(t13_arg2);

        //console.log(t9);

        t.deepEqual(t1, {ill: true}, "merge test 1");
        t.deepEqual(t1_arg2, {ill: true}, "merge test 1 arg");

        t.deepEqual(t2, {ill: "yy", abc: [1,2,3]}, "merge test 2");
        t.deepEqual(t3, {abc: [1,2,3]}, "merge test 3");
        t.deepEqual(t10, {a: true, c: false, b: {xxx: "xxx"}}, "merge test 4");

        t.deepEqual(t11, [1,2,3,4], "merge test 5");
        t.deepEqual(t11_arg2, [1,2,3,4], "merge test 5 arg2");

        t.deepEqual(t12, [1,2,3,4], "merge test 6");
        t.deepEqual(t12_arg2, [1,2,3,4], "merge test 6 arg2");

        t.deepEqual(t13, [{x:1, sub: {kk: 1}},{y:2},{z:3},{g:0}], "merge test 7");
        t.deepEqual(t13_arg2, [{x:1, sub: {kk: 1}},{y:2},{z:3},{g:0}], "merge test 7 arg2");

        t.deepEqual(t4, {xxx: 1, yyy: 2}, "combine test 1");
        t.deepEqual(t5, {xxx: 1, yyy: null}, "combine test 2");
        t.deepEqual(t6, {xxx: false, yyy: null}, "combine test 3");

        t.deepEqual(t7, {ill: "yy", xxx: null}, "extract test 1");

        t.deepEqual(t8, {a: true, b: 1, c: false}, "extract test 1");


        t.equal(0, Object.depth({}), "empty obj depth 0");
        t.equal(1, Object.depth({a: true}), "no empty depth 1");
        t.equal(1, Object.depth({xxx: {}}), "no empty, empty 2 => depth 1");
        t.equal(2, Object.depth({xxx: {yyy: {}}}), "no empty, no empty, empty 3 => depth 2");


        //t.equal(2, Object.rFilter({xxx: {yyy: new Date(), zzz = new RegExp(), ar: []}}, oen.__typeof), "no empty, no empty, empty 3 => depth 2");

        t.deepEqual(
            {date: "date", regexp: "regexp", array: "array", number: "number", "null": "null", recurive: {string: "string"}},
            Object.rFilter({date: new Date(), regexp: new RegExp(), array: [], number: 10, "null": undefined, recurive: {string: "string"}}, oen.__typeof),
            "filter recursive"
        );

        t.deepEqual(
            ["number", "string"],
            Object.rFilter([10, "string"], oen.__typeof, true),
            "loop arrays"
        );

        t.deepEqual(
            "array",
            Object.rFilter([10, "string"], oen.__typeof),
            "dont loop arrays"
        );

        t.end();
    });

    test("typeof", function(t) {
        // typeof test
        t.equal(oen.__typeof(new Date()), "date", "type of string");

        t.equal(oen.__typeof("string"), "string", "type of string");
        t.equal(oen.__typeof([]), "array", "type of array");
        t.equal(oen.__typeof(new Array(1)), "array", "type of array");
        t.equal(oen.__typeof(1), "number", "number 1");
        t.equal(oen.__typeof(1.0), "number", "number 1.0");
        t.equal(oen.__typeof(NaN), "null", "Nan");
        t.equal(oen.__typeof(false), "boolean", "boolean");
        t.equal(oen.__typeof(true), "boolean", "boolean");
        t.equal(oen.__typeof(undefined), "null", "undefined");
        t.equal(oen.__typeof(null), "null", "null");
        t.equal(oen.__typeof({}), "object", "object");
        t.equal(oen.__typeof(new Object()), "object", "new Object()");
        t.equal(oen.__typeof(Object.create(null)), "object", "object.create(null)");
        t.equal(oen.__typeof(Infinity), "number", "object");
        t.equal(oen.__typeof(/^a$/), "regexp", "object");

        (function() {
            t.equal(oen.__typeof(arguments), "arguments", "undefined");
        }());

        (function() {
            t.equal(oen.__typeof(arguments), "arguments", "undefined");
        }({x:1}));

        (function() {
            t.equal(oen.__typeof(arguments), "arguments", "undefined");
        }(1, 1));

        t.end();
    });
}());
