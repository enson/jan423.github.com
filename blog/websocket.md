# websocket

基于传输层的TCP协议，现在还是一个草案状态，相关信息参照[RFC 6455](http://tools.ietf.org/html/rfc6455)。

很显然它是一个**socket**，WebSocket协议试图达到的目标是：在现有HTTP协议的架构上解决现有HTTP双向通信的问题; 正因为如此，它被设计在HTTP端口80和端口443上工作，也同样支持HTTP代理和网络中间件,即使这意味着一些特定的基于当前环境的复杂性。
想使用websocket技术，首先你的web容器需要支持websocket协议。

