# newwork

参考资料

* [计算机网络（第五版）谢希仁](http://www.baidu.com/s?ie=utf-8&bs=%E6%97%A9%E6%9C%9F%E7%9A%84%E5%B1%80%E5%9F%9F%E7%BD%91&f=8&rsv_bp=1&wd=%E8%AE%A1%E7%AE%97%E6%9C%BA%E7%BD%91%E7%BB%9C%EF%BC%88%E7%AC%AC%E4%BA%94%E7%89%88%EF%BC%89%E8%B0%A2%E5%B8%8C%E4%BB%81&rsv_n=2&rsv_sug3=1&rsv_sug4=44&inputT=1000)
* [互联网协议入门](http://www.ruanyifeng.com/blog/2012/05/internet_protocol_suite_part_i.html)


现在的互联网可以说是TCP/IP协议栈和Ethernet的天下。早起互联网还没有诞生，各个公司在内部有各自的局域网，到后来有个叫Ethernet的局域网协议成为了主流，以至于奠定了现在互联网的基础。

## 一切从网卡开始

网卡里有自己的处理器，RAM，ROM，它的作用就是将计算机发往网络的数据封装成帧，将网络上正确的帧通过cpu中断交付给计算机。这个帧就是Ethernet的Frame。

## Frame

以太网规定，一组电信号构成一个数据包，叫做"帧"（Frame）。每一帧分成两个部分：标头（Head）和数据（Data）。

