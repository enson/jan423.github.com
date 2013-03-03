# nodejs

一个单线程、非阻塞的事件编程模式；

## 一些概念

### 计算机体系结构（i/o）

**I/O操作**：cpu线程在执行中如果遇到磁盘读写或网络通信

**阻塞调度**：通常I/O要耗费较长的时间，这时操作系统会剥夺这个线程的 CPU 控制权，使其暂停执行，同时将资源让给其他的工作线程

#### 同步 i/o

阻塞后，当 I/O 操作完毕时，操作系统将这个线程的阻塞状态解除，恢复其对CPU的控制权，令其继续执行。
	
#### 异步i/o

当线程遇到 I/O 操作时，不会以阻塞的方式等待 I/O 操作的完成或数据的返回，而只是将 I/O 请求发送给操作系统，继续执行下一条语句。当操作
系统完成 I/O 操作时，以**事件的形式**通知执行 I/O 操作的线程，线程会在特定时候处理这个事件。为了处理异步 I/O，线程必须有事件循环，不断地检查有没有未处理的事件，依次予以处理。

#### 优点和缺点

## nodejs 基本概念

### nodejs

javascript = ec + BOM + DOM

nodejs = ec + 本地接口

### module ,package,npm

#### module，package

基于CommonJS规范的模块和包管理
exports:模块的接口，本质为空对象{};
require:获取模块对象

##### 模块加载
模块可以是js-->json-->node文件,
	
	下面总结一下使用 require(some_module) 时的加载顺序。
	(1) 如果some_module 是一个核心模块（fs、http、net、vm），直接加载，结束。
	(2) 如果some_module以“ / ”、“ ./ ”或“ ../ ”开头，按路径加载 some_module，结束。
	(3) 假设当前目录为 current_dir，按路径加载 current_dir/node_modules/some_module。
		如果加载成功，结束。
		如果加载失败，令current_dir为其父目录。
		重复这一过程，直到遇到根目录，抛出异常，结束。

#### npm

Node Package Manager

	npm [install/i] -g [package_name]

## DEMO

一个简单web server demo

## debug

使用webstorm调试

## 参考资料

《深入理解计算机系统》
《Node.js开发指南》


