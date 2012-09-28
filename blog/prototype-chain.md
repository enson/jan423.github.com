# prototype chain

写在前面的话

所谓的原型链就是一个一个的原型通过其\_\_proto\_\_属性连接起来的数据结构（链）。

* 每个对象都有一个\_\_proto\_\_属性，它默认指向另一个对象或者为null（null是一个空对象，什么也没有），现代浏览器都支持这个属性。
* 当引擎需要一个变量时，引擎会先沿着作用域链查找，然后查找原型链，引擎会根据对象中的\_\_proto\_\_属性指向的对象查找变量，一直递归查询到Object.prototype指向的对象为止，因为Object.prototype.\_\_proto\_\_===null。
* 每个Function对象都有一个prototype属性，它指向一个对象，这个对象有一个constructor属性默认指向这个引用对象函数对象。
* js中的函数是一个对象，一个特殊的对象。

## 函数对象和对象

可以说函数对象是对象扩展，相比普通对象函数对象多了一个**逻辑代码**+**prototype**属性。prototype属性指向一个对象，这个对象有一个constructor属性指向函数对象。

## new操作符

当我们使用new调用构造函数时会自动的创建一个对象，因此构造函数本身只要初始化这个新对象的状态。调用构造函数的一个特征就是把构造函数的**prototype**属性被用作新对象的原型,即新对象的\_\_proto\_\_属性会指向构造函数的prototype指向的对象。多个对象的\_\_proto\_\_都指向同一个prototype对象。

## 函数执行的本质
当我们调用一个函数时是这样的：查找函数对象中逻辑代码，执行之。

## 构造函数和函数

2个都是函数，只不过是调用的方式不同导致他们叫法不一样。当使用new操作符调用函数时函数叫构造器，使用(),apply,call时叫函数。

## instanceof运算符的原理

	A instanceof B

流程：先计算B.prototype，然后查询A.\_\_proto\_\_判断是否相同，不同则继续沿着A.\_\_proto\_\_.\_\_proto\_\_查找是否相同，直到原型链的头Object.prototype.\_\_proto\_\_。

## Object，Function

Object是所有对象直接或者间接构造器，Function是所有函数的直接或者间接构造器，但是他们指向的对象都是函数对象。

### 谁是上帝

回想下instanceof的原理吧。

    Function instanceof Function;
    Function instanceof Object;
    Object instanceof Function;
    Object instanceof Object;

![prototype chain](http://jan423.github.com/blog/res/img/prototype.jpg)

## TEST

    Object.prototype.sth = "O";
    Function.prototype.sth = "F";
    function f() {
        return function () {
            return sth;
        }
    }
    alert(f()());

输出是多少呢？这要从作用域链和原型链说起。自己去悟吧。

### 提示

* 作用域在js里也是对象，查找变量也是在作用域对象中查找的。
* typeof window === 'object'

## 原型链的优势

