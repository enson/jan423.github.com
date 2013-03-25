$(function () {

    var tmpls = {
        navTmpl : $("#J_NavTmpl").html()
    };
    var datas = {
        blogIndex : blogIndex
    };
    var navCtn = $("#J_NavCtn");
    var converter = new Markdown.Converter();
    var blogCtn = $("#J_Blog");
    var cached = {};

    //filter blogname
    function filterBlogName (data) {
        return data.slice(0, -3);
    }

    //recursive
    function recursive (data) {
        return juicer(tmpls.navTmpl, {data : [data]});
    }

    juicer.register("filterBlogName", filterBlogName);
    juicer.register("recursive", recursive);

    function renderNav () {
        navCtn.html(juicer(tmpls.navTmpl, blogIndex));
    }

    renderNav();

    //绑定nav展示代理
    navCtn.on('click', '.J_BlogSort', function (e) {
        event.preventDefault();

        var target = $(this);

        target.parent().toggleClass('show');
    });

    var requesting = false;

    navCtn.on('click', '.J_BlogLink', function (e) {
        event.preventDefault();
        if (requesting) {return;}
        requesting = true;

        var target = $(this);
        var path = target.attr('data-path');

        getFile(path);
    });

    function getFile (path) {
        if (path.length == 0) {
            path = "/blog/首页.md";
        }

        if (cached[path]) {
            blogCtn.html(cached[path]);
            requesting = false;
            return;
        }

        $.ajax({url : decodeURIComponent(path)}).done(function (content) {
            var content = converter.makeHtml(content);
            blogCtn.html(content);
            cached[path] = content;
            location.hash = path;

            window.scroll(0, 0);
            requesting = false;
        })
    }

    getFile(location.hash.slice(1));
});