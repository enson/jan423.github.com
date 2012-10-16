# Execution Context(EC) in ECMAScript

参考资料

* [执行环境,作用域理解](http://wenku.baidu.com/view/358a14593b3567ec102d8ac3.html)
* [深入理解JavaScript系列（12）：变量对象（Variable Object）](http://www.cnblogs.com/TomXu/archive/2012/01/16/2309728.html)
* [深入理解JavaScript系列（13）：This? Yes,this!](http://www.cnblogs.com/TomXu/archive/2012/01/17/2310479.html)
* [深入理解JavaScript系列（14）：作用域链(Scope Chain)](http://www.cnblogs.com/TomXu/archive/2012/01/18/2312463.html)

代码的执行所处的环境，也叫执行上下文,它确定了代码的作用域，作用域链，this属性，代码的生存期等等。
	
	EC={
		VO:....,
		[[scope]]:...,
		this:...
	}

## 三种代码执行环境

* global
* function
* eval

## 代码执行的过程

首先我们要知道一段JS代码进入解释器到执行分为2步骤，这2步各自有各自的事要处理

* 进入执行环境
* 执行代码

## VO

我们声明的变量，声明的函数，传入的参数都放到哪里去了？引擎是在哪里寻找它们的额，其实它们都放入到一个叫VO的对象里去了，可以说了解VO是很重要的。

	VO={
		声明的变量,
		声明的函数，
		参数(函数内部VO拥有)
	}

EC确定了VO的不同，所以按EC给VO分类。

### 全局环境的VO
	
所有在global声明的函数，变量都会在global的VO中存在。

	global.vo = {
	  Math: <...>,
	  String: <...>
	  ...
	  ...
	  window: global //引用自身
	};

### 函数的VO

当进入执行上下文VO会有如下属性：

* 函数的所有形参(如果我们是在函数执行上下文中)

	由名称和对应值组成的一个变量对象的属性被创建；没有传递对应参数的话，那么由名称和undefined值组成的一种变量对象的属性也将被创建。

* 所有函数声明(FunctionDeclaration, FD)

	由名称和对应值（函数对象(function-object)）组成一个变量对象的属性被创建；如果变量对象已经存在相同名称的属性，则完全替换这个属性。

* 所有变量声明(var, VariableDeclaration)

	由名称和对应值（undefined）组成一个变量对象的属性被创建；如果变量名称跟已经声明的形式参数或函数相同，则变量声明不会干扰已经存在的这类属性。

**可以看到声明的函数优先级大于变量的声明**。

	alert(x); // function
	var x = 10;
	alert(x); // 10
	x = 20;
	function x() {};
	alert(x); // 20

## [[scope]]

[[scope]]是函数的内部属性，它指向一个数组对象（俗称作用域链对象），这个数组对象会包含父亲函数的VO一直到global的VO。

	[[scope]]-->VO+[[scope]]

这个对象在2种环境（进入执行环境，执行代码）有着不同状态。

eg

    function f() {
        var a = 1;
    }

针对这个函数来说。

* 进入执行环境(执行代码前)，函数的EC中的VO和[[scope]]
	
        f.VO={
            a:undefined
        }
		f.scope=[global.VO];//全局vo在进入f的执行环境前已经创建了。

* 执行时，把f的VO推入[[scope]]指向的数据对象第一位。

        f.VO={
        	a:1
        }
		f.scope=[f.VO，global.VO];

### catch,with可以改变[[scope]]指向的数组对象结构

catch，with关键词会在**执行**时把**参数**推入[[scope]]指向的数组对象第一位

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

### 闭包

>当函数内部定义了其他函数，就创建了闭包，闭包(子函数)有权访问父级函数的**VO**所有变量。

如果子函数[[scope]]**持续**引用了父函数的VO，就会使父函数的VO无法销毁掉。所以我们要妥善处理闭包的特性。

    function f() {
        var val = 1;
        return function () {
            return val;
        }
    }

	var temp=f();

返回的函数[[scope]]持有f函数的VO，已至于f执行后无法释放VO等所占用的内存。

	var temp=null;//让GC去处理f的内存吧。

## this

this是在代码进入执行环境时确认的，所以按代码进入执行环境时所在说明this更为清晰。

### 顶级执行环境global。

代码在global中执行，this永远都是global。

### 代码在函数执行环境

函数的EC中的this是由函数调用的方式来确定的。

#### 使用apply，call方法调用函数

this指向这些函数的第一个参数

    var sth = "global";
    function f() {
        alert(this.sth);
    }
    f();//global
    var o = {sth:"o"};
    f.apply(o);//o
    f.call(o);//o

#### 使用new调用函数

这是的函数叫构造函数

* 先生成一个对象
* this指向这个新对象~

#### 单独使用()调用函数

##### 当生成的函数对象有被引用

如果函数被引用，那么this指向这个引用函数的东东的所属环境，但是函数被函数的VO引用那么this指向null，再而转为global。

test1

	var sth = "global";
    function f() {
        alert(this.sth);
    }
    f();//global
    var o = {sth:"o"};
    o.f = f;
    o.f();//o

test2

	var a = 'global';
	function f() {
	    alert(this);
	}
	f();//global
	f.prototype.constructor();//f.prototype

test3

这种情况下，f被k的vo引用，f的执行环境的this指向null，转为global。

	function k() {
        function f() {
            alert(this);
        }
        f();//window
    }

	k.vo.f=function;
	f.this=null==>global;

##### 当函数没有被引用

this指向null，但是浏览器不会让你这么干，它会把null变为global。

**注：第5版的ECMAScript中，已经不强迫转换成全局变量了，而是赋值为undefined。**

    (function (){
        alert(this);//window
    })();

### eval执行环境中的this

	eval('alert(this)');//window

### 让我们回想下DOM事件

#### 以节点对象的属性注册事件处理函数

以这个概念注册事件处理函数有2种实现方法，但是殊途同归——都是给节点对象的事件属性注册事件处理函数。

##### 直接在html里写事件处理函数

	<div onclick="alert(this.innerHTML);">1</div>
	==>'1'

##### 用对象特性写事件处理函数

    <div id="J_Demo1">2</div>
    <script type="text/javascript">
        document.getElementById("J_Demo1").onclick = function () {
            alert(this.innerHTML);//2
        };
    </script>

#### addEventListener & attachEvent

>其实说这2个方法对理解function的this有点跑偏，但是还是要标记下。

2这不同的是addEventListener绑定事件处理函数后函数的this指向这个节点对象，attachEvent指向window（attachEvent存在于<=IE8）。
