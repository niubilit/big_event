// 每次调用$.get() 或 $.post() 都会调用这个函数
// 这个函数会拿到给ajax提供的配置对象
$.ajaxPrefilter(function(options) {
    if (options.url.indexOf('/my/') != -1) {
        options.headers = {
            Authorization: localStorage.getItem('token') || ''
        }
    }
    options.url = 'http://127.0.0.1:8088/bigEvent' + options.url;
    options.complete = function(res) {
        if (res.responseJSON.msg == '登录失败' && res.responseJSON.status == 1) {
            localStorage.removeItem('token');
            location.href = '../../login.html';
        }
    }
});

/* $.ajaxPrefilter(function(options) {
    if (options.url.indexOf('/my/' != -1)) {
        options.headers = {
            Authorization: localStorage.getItem('token')
        }
    }
    options.url = 'http://127.0.0.1:8088/bigEvent' + options.url;
    options.complete = function(res) {
        if (res.responseJSON.status == 1) {
            localStorage.removeItem('token');
            location.href = '../../login.html';
        }
    }
}) */