(function () {
    "use strict";

    require("../index.js");
    var tap = require("tap"),
        test = tap.test;


    test("Object tests", function (t) {

        var t1 = Object.merge({}, {ill: true}),
            t2 = Object.merge({abc: 123}, {ill: "yy", abc: [1,2,3]}, true),
            t3 = Object.merge({abc: 123}, {ill: "yy", abc: [1,2,3]}, false, true),
            t4  = Object.combine(["xxx", "yyy"], [1, 2]),
            t5  = Object.combine(["xxx", "yyy"], [1]),
            t6  = Object.combine(["xxx", "yyy"], [false]),
            t7  = Object.extract({ill: "yy", abc: [1,2,3]}, ["ill", "xxx"]),
            t8  = Object.ksort({a: true, c: false, b: 1});

            console.log(t8);

        t.deepEqual(t1, {ill: true}, "merge test 1");
        t.deepEqual(t2, {ill: "yy", abc: [1,2,3]}, "merge test 2");
        t.deepEqual(t3, {abc: [1,2,3]}, "merge test 3");

        t.deepEqual(t4, {xxx: 1, yyy: 2}, "combine test 1");
        t.deepEqual(t5, {xxx: 1, yyy: null}, "combine test 2");
        t.deepEqual(t6, {xxx: false, yyy: null}, "combine test 3");

        t.deepEqual(t7, {ill: "yy", xxx: null}, "extract test 1");

        t.deepEqual(t8, {a: true, b: 1, c: false}, "extract test 1");


        t.end();
    });

}());