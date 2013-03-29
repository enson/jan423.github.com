/**
 *  读取blog文件的索引，放入config.js文件里。
 *
 * */

var fs = require('fs');
var blogData = {data : []};
var blogDir = __dirname + "/blog";
var blogIndexFile = __dirname + "/assets/js/blog-index.js";

function walk (path, data, relativePath) {
    var dirList = fs.readdirSync(path);

    dirList.forEach(function (item) {
        if (fs.statSync(path + '/' + item).isDirectory()) {
            var _dir = {"name" : item, data : [], "type" : "dir"};

            data.data.push(_dir);
            walk(path + '/' + item, data.data[data.data.length - 1], relativePath + "/" + encodeURIComponent(item));

        } else {
            var _fileInfo = item.split("__");
            var _fileName = _fileInfo[0];
            var _createDate = _fileInfo[1].split(".")[0];
            var _extension = _fileInfo[1].replace(_createDate, "").slice(1);
            var _file = {
                "name"       : _fileName,
                "path"       : relativePath + "/" + encodeURIComponent(item),
                "type"       : "file",
                "createDate" : _createDate,
                "extension"  : _extension
            };

            data.data.unshift(_file);
        }
    });
}

walk(blogDir, blogData, "/blog");

fs.writeFile(blogIndexFile, "var blogIndex=" + JSON.stringify(blogData));