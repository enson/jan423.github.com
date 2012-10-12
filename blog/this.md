# ECMAScript中的this

学习资料

* [This? Yes,this!](http://www.cnblogs.com/TomXu/archive/2012/01/17/2310479.html)
* [执行环境,作用域理解](http://wenku.baidu.com/view/358a14593b3567ec102d8ac3.html)

## 执行环境

指的是代码执行所处的环境，也叫执行上下文（exection context），这个环境确定了代码的作用域，代码的生存期，this属性等等。

### 三种代码执行环境

* global
* function
* eval

当代码进入执行环境时会产一些属性如VO，this等等。我们知道当代码进入执行环境时，会创建一个VO属性，它指向的对象包含这个作用域的变量，函数或者是参数。但是this指向的是什么？可以说是千奇百怪。

因为this是在代码进入执行环境时确认的，所以按代码进入执行环境时所在说明this更为清晰

## 顶级执行环境global。

代码在global中执行，this永远都是global。

## 代码在函数执行环境

用调用函数的方式来确定this

### 使用apply，call方法调用函数

this指向这些函数的第一个参数

    var sth = "global";
    function f() {
        alert(this.sth);
    }
    f();//global
    var o = {sth:"o"};
    f.apply(o);//o
    f.call(o);//o

### 使用new调用函数

这是的函数叫构造函数

* 先生成一个对象
* this指向这个新对象~

### 单独使用()调用函数

#### 当生成的函数对象有被引用

如果函数被引用，那么this指向这个引用函数的东东的所属环境，但是函数被函数的VO引用那么this指向null，再而转为global。

* test1

    	var sth = "global";
	    function f() {
	        alert(this.sth);
	    }
	    f();//global
	    var o = {sth:"o"};
	    o.f = f;
	    o.f();//o

* test2

		var a = 'global';
		function f() {
		    alert(this);
		}
		f();//global
		f.prototype.constructor();//f.prototype

* test3
这种情况下，f被k的vo引用，f的执行环境的this指向null，转为global。

		function k() {
            function f() {
                alert(this);
            }
            f();//window
        }

		k.vo.f=function;
		f.this=null==>global;

#### 当函数没有被引用

this指向null，但是浏览器不会让你这么干，它会把null变为global。

**注：第5版的ECMAScript中，已经不强迫转换成全局变量了，而是赋值为undefined。**

    (function (){
        alert(this);//window
    })();

## eval执行环境中的this

	eval('alert(this)');//window

## 让我们回想下DOM事件

### 以节点对象的属性注册事件处理函数

以这个概念注册事件处理函数有2种实现方法，但是殊途同归——都是给节点对象的事件属性注册事件处理函数。

#### 直接在html里写事件处理函数

	<div onclick="alert(this.innerHTML);">1</div>
	==>'1'

#### 用对象特性写事件处理函数

    <div id="J_Demo1">2</div>
    <script type="text/javascript">
        document.getElementById("J_Demo1").onclick = function () {
            alert(this.innerHTML);//2
        };
    </script>

### addEventListener & attachEvent

>其实说这2个方法对理解function的this有点跑偏，但是还是要标记下。

2这不同的是addEventListener绑定事件处理函数后函数的this指向这个节点对象，attachEvent指向window（attachEvent存在于<=IE8）。
