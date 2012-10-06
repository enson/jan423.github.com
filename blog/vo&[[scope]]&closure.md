# (VO|AO)&[[scope]]&closure

参考资料

* [深入理解JavaScript系列（12）：变量对象（Variable Object）](http://www.cnblogs.com/TomXu/archive/2012/01/16/2309728.html)
* [深入理解JavaScript系列（14）：作用域链(Scope Chain)](http://www.cnblogs.com/TomXu/archive/2012/01/18/2312463.html)

要想了解作用域链就必须要了解vo。

首先我们要知道代码的执行分为2个部分

* 进入上下文
* 执行代码

所有代码的执行环境就2个

* 全局环境中
* 函数中

## 全局环境的vo
	
	global = {
	  Math: <...>,
	  String: <...>
	  ...
	  ...
	  window: global //引用自身
	};

## 函数的vo

函数的VO叫AO(活动对象)。

当进入执行上下文AO会有如下属性：

* 函数的所有形参(如果我们是在函数执行上下文中)

	由名称和对应值组成的一个变量对象的属性被创建；没有传递对应参数的话，那么由名称和undefined值组成的一种变量对象的属性也将被创建。

* 所有函数声明(FunctionDeclaration, FD)

	由名称和对应值（函数对象(function-object)）组成一个变量对象的属性被创建；如果变量对象已经存在相同名称的属性，则完全替换这个属性。

* 所有变量声明(var, VariableDeclaration)

	由名称和对应值（undefined）组成一个变量对象的属性被创建；如果变量名称跟已经声明的形式参数或函数相同，则变量声明不会干扰已经存在的这类属性。

可以看到声明的函数优先级大于变量的声明。

	alert(x); // function
	var x = 10;
	alert(x); // 10
	x = 20;
	function x() {};
	alert(x); // 20

## [[scope]]

[[scope]]是函数的内部属性，它指向一个数组对象，这个数组对象会包含父亲函数的一直到global的VO或AO。

	[[scope]]-->AO+[[scope]]

这个对象在2种环境（进入执行环境，执行代码）有不同状态。

    function f() {
        var a = 1;
    }

针对这个函数来说。

* 进入执行环境
	
        f.AO={
            a:undefined
        }
		f.scope=[global.VO];//全局vo在进入f的执行环境前已经创建了。

* 执行，把f的AO推入[[scope]]指向的数据对象第一位。

        f.AO={
        	a:1
        }
		f.scope=[f.AO，global.VO];

### catch,with

会在执行时把参数推入[[scope]]指向的数组对象第一位

	witch({a:1}){
		alert(a);//1
		var a=2;
		alert(a);//2
	}

* 进入环境

		vo={
			a:undefined
		}

* 执行

		scope=[{a:1},vo,global.vo]--->alert(a)//1
		var a=2;//执行到这里时a的值发生了改变并且影响到scope
		scope=[{a:2},vo,global.vo]--->alert(a)//2,

从本质上了解了作用域链，就很容易理解闭包了。

## 闭包

当函数内部定义了其他函数，就创建了闭包，闭包有权访问父级函数们的所有VO。所有函数都可以叫闭包，因为所有函数都直接或者间接引用了global.vo。