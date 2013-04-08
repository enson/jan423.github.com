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
        var _data = data.data;

        if (fs.statSync(path + '/' + item).isDirectory()) {
            var _dir = {"name" : item, data : [], "type" : "dir"};

            _data.push(_dir);

            walk(path + '/' + item, _data[_data.length - 1], relativePath + "/" + encodeURIComponent(item));

        } else {
            var _fileInfo = item.split("__");
            var _fileName = _fileInfo[0];
            try {
                var _createDate = _fileInfo[1].split(".")[0];
            } catch (e) {
                debugger;
            }
            var _extension = _fileInfo[1].replace(_createDate, "").slice(1);
            var _file = {
                "name"       : _fileName,
                "path"       : relativePath + "/" + encodeURIComponent(item),
                "type"       : "file",
                "createDate" : _createDate,
                "extension"  : _extension
            };

            if (_data.length == 0) {
                _data.unshift(_file);
            } else {
                //排序
                var dirCount = 0;
                for (var i = 0, l = _data.length; i < l; i++) {
                    var item = _data[i];

                    if (item.createDate && new Date(item.createDate).getTime() <= new Date(_file.createDate).getTime()) {
                        _data.splice(i, 0, _file);
                        break;
                    }

                    dirCount++;

                    if (l == dirCount) {
                        _data.unshift(_file);
                    }
                }
            }

        }
    });
}

walk(blogDir, blogData, "/blog");

fs.writeFile(blogIndexFile, "var blogIndex=" + JSON.stringify(blogData));