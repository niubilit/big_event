$(function() {
    const getUser = function(cls) {
        return {
            username: $('.' + cls + ' [name="username"]').val(),
            password: $('.' + cls + ' [name="password"]').val()
        }
    }
    $('#login').on('submit', (even) => {
        $.ajax({
            type: "post",
            url: "/api/login",
            data: getUser('loginBox'),
            success: function(response) {
                console.log(response);
            }
        });
        even.preventDefault();
    });
    $('#register').on('submit', (even) => {
        $.ajax({
            type: "post",
            url: "/api/register",
            data: getUser('regBox'),
            success: function(response) {
                console.log(response);
                layer.msg('注册成功')
            }
        });
        even.preventDefault();
    });

    $('#btn-reg').on('click', () => {
        $('.loginBox').hide();
        $('.regBox').show();
    })
    $('#btn-login').on('click', () => {
        $('.regBox').hide();
        $('.loginBox').show();
    })
    layui.form.verify({
        username: function(value) {
            if (!new RegExp("^[a-zA-Z0-9_\u4e00-\u9fa5\\s·]+$").test(value)) {
                return '用户名不能有特殊字符';
            }
            if (/(^_)|($_)/.test(value)) {
                return '用户名首尾不能出现下划线';
            }
            if (/^\d+\d+\d$/.test(value)) {
                return '用户名不能为全数字';
            }
            if (/\s/.test(value)) {
                return '不能出现空格'
            }
            if (/^[\s]{1,6}$/.test(value)) {
                return '用户名需要在1-6位之间'
            }
        },
        repwd: function(value, item) {
            if ($('.regBox [name=password]').val() != value) {
                return '两次密码不一致';
            }
        },
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位且不能出现空格']
    });
})