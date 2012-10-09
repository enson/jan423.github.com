# ECMAScript中的this

学习资料：[This? Yes,this!](http://www.cnblogs.com/TomXu/archive/2012/01/17/2310479.html)

这篇文章看得我是**云里雾里**的，我现在总结下我的理解，但是也合乎情理。

当代码执行在相应的作用域时，这个作用域环境会产生一个活动对象，这个活动对象包如下：
	
	activeExecutionContext = {
	  VO: {...},
	  this: thisValue
	};

我们知道VO指向的对象包含这个作用域的变量，函数或者是参数。但是this指向的是什么？可以说是千奇百怪。

先按代码执行时所在作用域来说明this更为清晰

## 顶级作用域global。

代码在global中执行，this永远都是global。

## 代码在函数作用域

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

如果函数被引用，那么this指向这个引用函数的东东的所属环境。

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

#### 当函数没有被引用

this指向null，但是浏览器不会让你这么干，它会把null变为global。

**注：第5版的ECMAScript中，已经不强迫转换成全局变量了，而是赋值为undefined。**

    (function (){
        alert(this);//window
    })();

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
