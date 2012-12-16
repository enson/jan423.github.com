# vim

## 换行符

换行符为控制符，一般不会输出，换行符有时使用在网络协议里作为每行的分割符。

### 基于DOS的OS换行符是 CR & LF

Carriage-Return Line-Feed，当时定义时是从[电传打印机](http://baike.baidu.com/view/377896.htm)那里学来的：先回到当前行的最左边\r，然后换行\n，有写协议是由CRLF作为分割符。

对应ASCII的码表

CR 13 \r ^m

LF 10 \n $

### 基于unix like的OS换行符是 LF

LF 10 \n $

这就是为什么我们有时用unixlike OS查看dos文件。末尾会有^M的原因了，因为os不是被\r的作用直接输出。

### 使用unix2dos命令转换文件格式

一些概念

* ！ 表示强制
* 数字 表示重复次数

## 一般模式

### 光标移动

* enter 向下移动行
* n*space 向右移n
* n*enter 向下移动n行
* ctrl+u up半页
* ctrl+d down半页
* ctrl+f forward一页
* ctrl+b back一页
* 0 首行
* $ 末行
* G 文档结尾
* n*G 文档第n行

### 文档处理

* X|n*X
* x|n*x
* dd
* n*dd
* yy