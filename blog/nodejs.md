# nodejs

一个单线程、非阻塞的事件编程模式；

## 一些概念

### 计算机体系结构（i/o）

**I/O操作**：cpu线程在执行中如果遇到磁盘读写或网络通信

**阻塞调度**：通常I/O要耗费较长的时间，这时操作系统会剥夺这个线程的 CPU 控制权，使其暂停执行，同时将资源让给其他的工作线程

#### 同步 i/o

阻塞后，当 I/O 操作完毕时，操作系统将这个线程的阻塞状态解除，恢复其对CPU的控制权，令其继续执行。
	
#### 异步 i/o

当线程遇到 I/O 操作时，不会以阻塞的方式等待 I/O 操作的完成或数据的返回，而只是将 I/O 请求发送给操作系统，继续执行下一条语句。当操作
系统完成 I/O 操作时，以**事件**的形式通知执行 I/O 操作的线程，线程会在特定时候处理这个事件。为了处理异步 I/O，线程必须有**事件循环**，不断地检查有没有未处理的事件，依次予以处理。

#### 优点和缺点

同步式 I/O（阻塞式）
				   
* 利用多线程提供吞吐量				 	
* 通过事件片分割和线程调度利用多核CPU	 	
* 需要由操作系统调度多线程使用多核 CPU 	
* 难以充分利用 CPU 资源 			 	
* 内存轨迹大，数据局部性弱            	
* 符合线性的编程思维					 	

异步式 I/O（非阻塞式）

* 单线程即可实现高吞吐量
* 通过功能划分利用多核CPU
* 可以将单进程绑定到单核 CPU
* 可以充分利用 CPU 资源
* 内存轨迹小，数据局部性强
* 不符合传统编程思维

## nodejs 基本概念

### nodejs

javascript = ec + BOM + DOM

nodejs = ec + 本地接口

### module ,package,npm

基于CommonJS规范的模块和包管理
exports:模块的接口，本质为空对象{};
require:获取模块对象

#### 模块

模块就是一个文件，如何创建、引用、使用一个模块。

exports为模块的对外接口，require为获取模块方法，module为一个全局属性。

	//age.js
	var personAge = 20;
	exports.getAge = function () {
	    return personAge;
	};
	exports.setAge = function (age) {
	    personAge = age;
	};
	//readAge.js
	var age = require('./age');
	console.info(age.getAge());//20
	age.setAge("23");
	console.info(age.getAge());//23

exports 本质为空对象，我们可以覆盖这个引用
	
	//age.js
	module.exports = {
   	 personAge : 20,
	    getAge    : function () {
	        return this.personAge;
	    },
	    setAge    : function (age) {
	        this.personAge = age;
	    }
	};
	
不可以通过对 exports 直接赋值代替对 module.exports 赋值。exports 实际上只是一个和 module.exports 指向同一个对象的变量，它本身会在模块执行结束后释放，但 module 不会，因此只能通过指定module.exports 来改变访问接口。

	module.exports===exports;//true
	exports--->{}<---module.exports

#### 模块加载

模块可以是js-->json-->node文件,
	
	下面总结一下使用 require(some_module) 时的加载顺序。
	(1) 如果some_module以“ / ”、“ ./ ”或“ ../ ”开头，按路径加载 some_module，结束。
	(2) 如果some_module 是一个核心模块（fs、http、net、vm），直接加载，结束。
	(3) 假设当前目录为 current_dir，按路径加载 current_dir/node_modules/some_module。
		如果加载成功，结束。
		如果加载失败，令current_dir为其父目录。
		重复这一过程，直到遇到根目录，抛出异常，结束。

#### 模块只会实例化一次

	var age1 = require('./age');
	var age2 = require('./age');
	
	age1.setAge("23");
	console.info(age2.getAge());//23
	
#### package

抽象概念为类库，将一系列功能打包起来，发布、更新等。

#### npm

Node Package Manager

	npm [install/i] -g [package_name]

## 基于事件的nodejs

事件是单线程、异步编程nodejs的核心。

模块：EventEmitter

	var events = require('events');
	var emitter = new events.EventEmitter();
	emitter.on('someEvent', function(arg1, arg2) {
		console.log('listener1', arg1, arg2);//listener1 byvoid 1991
	});
	emitter.on('someEvent', function(arg1, arg2) {
		console.log('listener2', arg1, arg2);//listener2 byvoid 1991
	});
	emitter.emit('someEvent', 'byvoid', 1991);

通常我们会继承EventEmitter用在自己的模块里。

	var events = require('events');
	var task = Object.create(events.EventEmitter.prototype, {
	    name : {
	        value : "yingyi"
	    }
	});
	task.on('say', function () {
	    console.info(this.name);
	});
	task.emit('say');

## DEMO

一个简单web server demo

## debug

使用webstorm调试

## 参考资料

《深入理解计算机系统》
《Node.js开发指南》


