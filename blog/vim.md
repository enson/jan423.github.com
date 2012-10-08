# vim

## DOS和unix的换行符

### 基于DOS的OS换行符是 CR & LF

Carriage-Return Line-Feed.

对应ASCII的码表

CR 13 \r ^m

LF 10 \n $

### 基于unix like的OS换行符是 LF

LF 10 \n $

这就是为什么我们有时用unixlike OS查看dos文件。末尾会有^M的原因了。

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