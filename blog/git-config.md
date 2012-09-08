# Git 配置相关

## 配置的作用域

	git config  xxxx
	git config --global xxxx
	git config --system xxxx

三个参数（null，global，system）分别对应于版本库，用户级别，系统级别。

## 配置别名
	
	//为用户级别config配置一个别名
	git config --global alias.conf "config --global"
	//打开显示颜色
	git conf color.ui true
	//配置你的姓名
	git conf user.name "yingyi.zj"
	//配置你的邮箱
	git conf user.email "xxx.xxx"
	//配置一些简单的别名demo
	git conf alias.st status
	git conf alias.br branch
	git conf alias.comm "commit -am"

## Log命令的一些配置
	
### 参数
	--graph 图形显示log
	--oneline 单行显示log
	--raw 原生的log信息显示

###alias

	git conf alias.lo "log --graph --raw"