# Test

## start

### 开启服务

在根目录（磁盘所在目录）创建 data/db 文件夹

运行 mongod 文件，将会开启27017端口服务

    ./mongod

http://localhost:28017/ 为db的信息、管理web页面


### 终端访问

运行 mongo 文件，可以打开一个控制台控制DB

    ./mongo

### 关闭服务

    use admin
    db.shutdownServer()

##  ?

### _id

用于标示文档唯一性的_id,默认类型为ObjectId，但是可以为任意类型。


