	//create function
    function foo() {} // 声明，因为它是程序的一部分

    var bar = function foo() {}; // 表达式，因为它是赋值表达式的一部分

    new function bar() {}; // 表达式，因为它是new表达式

    (function () {
        function bar() {
        } // 声明，因为它是函数体的一部分
    })();

    (function foo() {
    }); // 函数表达式：包含在分组操作符()内
***
    //vo test1
    (function () {
        alert(test);

        function test() {
        }
    })();

    //vo test2
    (function () {
        alert(test);

        var test = 10;
        alert(test);

        function test() {
        }

        alert(test);
    })();

    //vo test3
    (function () {
        alert(test);

        var test = 10;

        alert(test);

        var test = function () {
        }

        alert(test);
    })();
***
    //[[scope]]test
    (function () {
        var a = 1;

        function f() {
            var b = 2;
            return a + b;
        }

        alert(f());
    })();
***
    //closure test
    (function () {
        var a = 1;

        function f() {
            var a = 2;
            return function () {
                return a;
            }
        }

        var temp = f();

        alert(temp());
    })();
***
    //this test1
    (function () {
        var o = {
            a:1,
            f:function () {
                return this.a;
            }
        }

        alert(o.f === o.f.prototype.constructor);
        alert(o.f());
        alert(o.f.prototype.constructor());

    })();

    //this test2
    (function () {
        var o = {a:1};

        function f() {
            return this;
        }

        f.call(o);
        f.apply(o);
        f.call(null);
        f.apply(null);

    })();

    //this test3
    (function () {
        var object1 = {
            a:1,
            f:function () {
                return this.a;
            }
        };

        var object2 = {
            a:2
        };

        alert(object1.f());

        object2.f = object1.f;

        alert(object2.f());

    })();