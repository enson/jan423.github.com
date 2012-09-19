# 《html揭秘》学习笔记

## 一些基础的东西

### doctype

这个东西的诞生是因为IE5 for Mac支持标准化html的产物。先前的html编写是按照当时主流的ie4和netscape4开发的，由于这2款浏览器渲染模式是按照非标准来的（quirks模式），当一个浏览器ie5想按照标准渲染html问题就来了——以前的页面怎么办。

解决方案是在html文档第一行加入doctype，ie5会先检查是否有doctype而采用按照什么模式渲染html（存在doctype使用标准模式，不存在使用quirks模式）。