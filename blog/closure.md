# 闭包 Closure

我一直认为闭包是一种函数。但是这个效果为什么叫closure（闭包），我一直很纳闷。

产生闭包的情况是这样的：当函数内部定义了其他函数，就创建了闭包，闭包有权访问父级函数**们**的所有变量（通过作用域链的**变量对象**）。所以我们很有必要了解下**作用域链**

## 函数的作用域

要想了解闭包就不要用习惯思维去思考javascript的function。

有些语言（如：Java）的函数调用过程中局部变量保存在一个栈中，当function 执行完return后栈中的变量就销毁了。

但是javascript的function在执行过程中局部变量是保存在一个**对象**中的，不是在**栈**这种数据结构中。正是因为变量保存在一个对象中才造成了闭包这个效果。

###局部变量对象的组成

this arguments 变量

局部变量对象自动会保存2个特殊变量：this和arguments，并且这2个变量只有在本函数内访问，别的函数是无法访问的。

	function(){
		return function(){
			//你只能访问自己的执行环境
			alert(this);
			//你只能访问自己的arguments
			alert(argument);
		}
	}

## javascript的作用域链

每段代码都有在**定义**时期会确定其相关作用域链，当代码执行的时候，引擎会生成这个作用域链对象（注意哦它是一个对象），然后这个对象会被这个作用域中的特殊内部属性[[scope]]引用。与此同时会产生的那个**局部变量对象**会发在那个作用域链的链表对象第一位，所以查找变量时会第一时刻从第一位的局部变量对象中找。当函数执行完成后其作用域链会变为定义时状态。

这里有个ppt可以让你更好的理解closure
[closures-in-javascript](http://www.slideshare.net/hymanroth/closures-in-javascript),请翻墙~

其实关于作用域链的产生我觉得直接看js引擎理解作用域链是最快的。

一般情况下函数执行完后GC发现那个保存局部变量的对象没有被引用就回收了。但是如果这个对象被引用了那么就可以发生一些奇特的事——闭包产生了。

	function father(){
		var a=1;
		return function(){
			return a;
		}
	}
	var a=father();

father执行后返回一个匿名函数，但是这个匿名函数作用域链的第二位会引用father的变量对象。只要这个匿名函数不执行完，不修改自己的作用域链。那么father变量对象占用的内存一直无法释放。
在这里a引用这个匿名对象。很显然father无法释放内存。除非

	(function father(){
		var a=1;
		return function(){
			return a;
		}
	})()()
闭包返回后直接运行，没有被引用。

## 二维作用域链查找

学习资料来自[深入理解JavaScript系列（14）：作用域链(Scope Chain)](http://www.cnblogs.com/TomXu/archive/2012/01/18/2312463.html)。这个blog是翻译国外文献[ECMA-262-3 in detail. Chapter 4. Scope chain.](http://dmitrysoshnikov.com/ecmascript/chapter-4-scope-chain/)的。

一般函数查找变量会先沿着作用域链查找直到顶级变量对象global。但是还有另一个查找途径——**到原型链去找**。

	function foo() {
	  alert(x);
	}
	 
	Object.prototype.x = 10;
	 
	foo(); // 10

## with & catch 与作用域链

通过with和catch我们可以修改作用域链。可以把他们的参数插入作用域最顶端。

	with ({x: 20}) {
	  var x = 30, y = 30;
	  alert(x); // 30
	  alert(y); // 30
	}

通过with x变量插入到变量对象前一位，成为作用域链对象的第一位。