# Encode

参考资料

* [编码大全](http://www.slideshare.net/guestf749d5/ss-3812216)
* [关于URL编码](http://www.ruanyifeng.com/blog/2010/02/url_encoding.html)
* [字符编码笔记：ASCII，Unicode和UTF-8](http://www.ruanyifeng.com/blog/2007/10/ascii_unicode_and_utf-8.html)

编码：用预先规定的方法将文字、数字或其他对象编成数码。说白了编码就是一种状态变为另一种状态的规则。

## ASCII

八位长度，只能表示2^7个字符，最高位为**校验位**，但是只能表示英文，所以需要国际化。

	0 000  0000 ~0 111  1111
		0	  ~		127

## 基于ASCII的国际化

* 西欧的字符集ISO8859-X
* 东亚的字符集GB2312（简体中文）,BIG5（繁体中文），SJIS（日文）

都是由ASCII演变而来，并且每个子集互不兼容，所以我们需要更大范围的编码来表示字符集。

#### GBK

GBK扩充了GB2312,可以显示简体/繁体中文

#### GB18030
	
对GBK的再次扩充，支持日文/韩文/简体/繁体/藏文/满文...

### ANSI

**双字节编码的统称**，根据OS的编码来智能保存文件。

eg中文操作系统中表示**GB2312**,日文为**SJIS**。

## 另一种国际化Unicode

Unicode 联盟开发了 Unicode 标准。用32位描述字符集。但是可能用32位描述一个字符造成空间浪费的问题。比如只要一个字节就可以储存的英文。

### Unicode & UTF

对可以用ASCII表示的字符使用UNICODE并不高效，因为UNICODE比ASCII占用大一倍的空间，而对ASCII来说高字节的0对他毫无用处。为了解决这个问题，就出现了一些中间格式的字符集，他们被称为通用转换格式，即UTF（Universal Transformation Format）。目前存在的UTF格式有：UTF-7,UTF-7.5,UTF-8,UTF-16，以及 UTF-32。可以说utf系列是对unicode的实现~


### UTF-8

UTF-8最大的一个特点，就是它是一种变长的编码方式。它可以使用1~4个字节表示一个符号，根据不同的符号而变化字节长度。

0x00 到 0x7F（0111 1111）和ASCII相同。故兼容ASCII编码。

#### Demo

在unicode中规定了“严”的unicode为0100 1110 0010 0101（4E25）。那么utf-8有一个算法计算“严”的utf-8编码。

	escape("严")//=>"%u4E25"

	Unicode符号范围		| UTF-8编码方式
	(十六进制) 			  | （二进制）
	-----------------------------------------------------------
	0000 0000 ~ 0000 007F | 0xxxxxxx
	0000 0080 ~ 0000 07FF | 110xxxxx 10xxxxxx
	0000 0800 ~ 0000 FFFF | 1110xxxx 10xxxxxx 10xxxxxx
	0001 0000 ~ 0010 FFFF | 11110xxx 10xxxxxx 10xxxxxx 10xxxxxx

从unicode的最后一位反推推出 为 1110**0100** 10**111000** 10**100101** =>E4B8A5

## Encode@前端

### URL编码。

#### URI & URL

**URL为URI的子集**。URL在万维网的环境下诞生的，URI早已在互联网时期诞生了。都是描述资源的位置。

RFC 1738规定URL必须由英文字母、数字、和某些标点符号组成。所以当我们想通过URL给server传递一些信息。就必须要将信息编码。

当浏览器发现你的URL不符合规范时，它会默认使用一种编码（GBK,UTF-8等等）帮为你的URL中不符合URL规范的部分进行编码。

### 按照URI生成方式分类编码规则

#### 由地址栏直接输入的**路径**为非URI规范字符

用utf-8编码字符

#### 由地址栏直接输入的查询**字符**为非URI规范字符

ie, firefox 用os的编码字符

chrome 用utf-8编码查询字符

#### 页面内容的链接字符为非URI规范字符

用页面的编码规则

#### js生成URI中有非URI规范字符

IE根据os的编码

chrome、firefox为utf-8编码

怎么多种情况只有在浏览器接收到url前对url处理才可以

* escape
* encodeURI
* encodeURIComponent

#### 区分

encodeURI是对uri进行编码，encodeURIComponent功能是URI的某个部分编码（参数什么的），当用encodeURIComponent对整个URI编码时会出现问题，其功能不是对URI编码，而是对URI部分编码。

	var uri="http://www.baidu.com";
	encodeURI(",/?:@&=+$#")//=>,/?:@&=+$#
	encodeURI(uri);//=>"http://www.baidu.com"
	encodeURIComponent(",/?:@&=+$#")//=>%2C%2F%3F%3A%40%26%3D%2B%24%23
	encodeURIComponent(uri);//=>"http%3A%2F%2Fwww.baidu.com"
