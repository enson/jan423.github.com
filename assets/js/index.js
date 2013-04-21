$(function () {

    var tmpls = {
        nav      : $("#J_BlogNavTmpl").html(),
        loading  : '<div class="loading"></div>',
        timeout  : '<h3 class="text-center">网络异常，<a href="{uri}" target="_self">请重新加载</a>试试</h3>',
        notFound : '<h3 class="text-center">访问的资源不存在</h3>'
    };

    var navCtn = $("#J_NavCtn");
    var converter = new Markdown.Converter();
    var blogCtn = $("#J_Blog");

    var AJAX_TIMEOUT = 10 * 1000;
    var ROOT_URI = "";
    var INDEX_URI = "/blog/%E9%A6%96%E9%A1%B5__2013-01-01.html";

    var cache = {};

    function hashChangeHandler () {
        var uri = location.hash.slice(2);

        if (uri.length == 0) {
            location.hash = '#!' + INDEX_URI;
            uri = INDEX_URI;
        }

        if (uri.length > 0) {

            if (cache[uri] != undefined) {

                renderBlog(cache[uri]);
            } else {

                blogCtn.html(tmpls.loading);
                getResource(uri);
            }

        }

        return hashChangeHandler;

    }

    function getResource (uri) {
        $.ajax({
            url     : ROOT_URI + uri,
            timeout : AJAX_TIMEOUT,
            success : requestSuccess,
            error   : requestError
        });
    }

    function requestSuccess (data) {
        var blogHTML = converter.makeHtml(data);
        var uri = location.hash.slice(2);

        cache[uri] = blogHTML;

        renderBlog(blogHTML);
    }

    function renderBlog (data) {
        blogCtn.html(data);
    }

    function requestError (xhr, errorType, error) {
        var responseHTML = '';

        if ("404" == xhr.status) {
            responseHTML = tmpls.notFound;
        }

        if ("timeout" == errorType) {
            responseHTML = tmpls.timeout.replace("{uri}", location.hash);
        }

        blogCtn.html(responseHTML);
    }

    function recursive (data) {

        return juicer(tmpls.nav, data);

    }

    function renderNav (data) {

        juicer.register('recursive', recursive);

        var navHTML = juicer(tmpls.nav, data);

        navCtn.html(navHTML);
    }

    navCtn.on('click', '.J_Dir', function () {

        var target = $(this);
        var blogList = target.next();

        if (blogList.hasClass('show')) {
            blogList.removeClass('show');
            target.find('i').removeClass('icon-minus').addClass('icon-plus');
        } else {
            blogList.addClass('show');
            target.find('i').removeClass('icon-plus').addClass('icon-minus');
        }

    });

    window.onhashchange = hashChangeHandler();

    renderNav(window.blogIndex.data);

});