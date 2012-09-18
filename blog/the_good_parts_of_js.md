# javascript语言精粹学习笔记

什么是javascript精粹，我认为js的精粹=原型链+函数+闭包。

## 写在前面的话

要想了解这些知识我们要先了解一些基础的知识

### 数据类型

5种简单数据类型（Undefined，Null，Boolean，Number,String）+1中复杂数据类型(Object)。

**注意这里说的是类型（大写开头）不是值。类型是一个抽象的概念，而其值是对抽象概念的实体化。**

这里值得一提的是Undefined，Null和Object。

#### Undefined类型

Undefined类型只有一个值：undefined，当我们声明一个变量后，没有为其赋值，执行环境会为其自动赋予undefined。

    var f;
    alert(f);//undefined

当代码执行前（预解释），js引擎为我们做了这件事：创建一个**局部变量对象**，里面保存了这个环境的变量，并为这个变量赋予undefined，把这个局部变量对象放到作用域链对象的最上面。

#### Null类型

Null类型也只有一个值：null，null其实是一个指向空空对象的引用，所以当我们这样

	typeof(null)//"object"

我们何时使用null呢？很明显了。当我们准备为一个变量赋予对象时可以提前为这个变量赋予null。

#### Object类型

这个概念好难解释。

### ===全等符

## 原型链

js不像别的语言使用类来实现继承思想，因为在js的世界里没有类的概念，而使用原型链实现继承。

### prototype（原型）

首先我们要知道原型是一个对象。js中除了Object.prototype没有对原型外，其他对象都有对各自的原型引用，null是一个特殊的object（它到底属不属于object呢）。

#### 对象如何引用原型呢

\_\_prototype\_\_。在一个对象里对其原型引用的属性是\_\_prototype\_\_。有些浏览器提供这个内部属性用来访问其原型（部分浏览器支持这个功能）。

    var o = {};
    var oo = {a:1}
    alert(o.a);//undefined
    o.__proto__ = oo;
    alert(o.a);//1

继续看下去。当我们为o设置了一个原型对象oo，那么oo的原型在哪里？我们知道所有字面量对象都是Object的实例(Object是一个函数)。所以oo的原型是Object.prototype。

    alert(oo.__proto__ === Object.prototype);//true

#### Object.prototype是个啥

function在js中是一个对象，它们有方法和属性。它其中的一个属性就是prototype，当你使用new 运算符创建一个对象时,创建的对象的\_\_prototype\_\_内部属性会指向先前的prototype指向的对象。

	var o = {};
	function F() {
	}
	F.prototype = o;
	var f = new F();
	//用new操作符创建的对象的__proto__指向F.prototype
	alert(f.__proto__ === o);//true
	//o是Object的实例，所以指向Object.prototype
	alert(f.__proto__.__proto__ === Object.prototype);//true

#### 原型链

当我使用f.\_\_proto\_\_.\_\_proto\_\_，就可以体现原型链了。当我们试图在一个对象里查找一个属性时。

    var o = {a:1};//字面量一个对象
    var oo = {b:2};//字面量一个对象
    var ooo = {c:3};//字面量一个对象

    o.__proto__ = oo;//修改o的原型指向oo
    oo.__proto__ = ooo;//修改oo的原型指向ooo

    alert(o.a);//输出1，因为在o本地a中查找a 
    alert(o.b);//输出2，因为沿着o的原型oo查找b
    alert(o.c);//输出3，因为沿着oo的原型ooo查找c




	





