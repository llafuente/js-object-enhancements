(function () {
    "use strict";

    require("../index.js");
    var tap = require("tap"),
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


        t.end();
    });

}());