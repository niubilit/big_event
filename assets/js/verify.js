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
        if (value.length < 1 || value.length > 6) {
            return '用户名需要在1-6位之间'
        }
    },
    pwd: [/^[\S]{6,12}$/, '密码必须6到12位且不能出现空格'],
    repwd: function(value, item) {
        if ($('#pwd').val() != value) {
            return '两次密码不一致';
        }
    },
    samePwd: function(value) {
        console.log($('#oddpwd').val, value);
        if ($('#oldpwd').val() == value) {
            return '新密码不能和旧密码相同'
        }
    }
});