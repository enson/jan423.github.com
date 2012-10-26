$(document).ready(function () {
    //预先绑定事件
    window.onhashchange = function () {
        getBlog(location.hash.slice(1));
    }

    var blog = $('#J_Blog')[0],
        converter = new Markdown.Converter(),
        baseBlogURL = 'http://' + document.domain + '/blog/',
        dataCache = {},
        loading = $("#J_Loading")[0],
        blogItems = $("#J_BlogItems dd");

    if (location.hash.slice(1).length == 0)location.hash = 'index';

    function getBlog(blogName) {
        if (blogName in dataCache) {
            blog.innerHTML = dataCache[blogName].data;
            return;
        }
        blog.innerHTML = "";
        blog.display = "none";
        loading.style.display = "block";
        $.ajax({url:baseBlogURL + blogName + ".md",
            success:function (data) {
                var html = converter.makeHtml(data);
                dataCache[blogName] = {data:html};
                blog.innerHTML = html;
                loading.style.display = "none";
                blog.style.display = "block";
            }
        });
    }

    $('#J_BlogItems').on('click', function (e) {
        var target = e.target;
        if (target.tagName.toLowerCase() != "dd")return;
        location.hash = target.getAttribute('data-blog');
    });

    window.onhashchange();
});