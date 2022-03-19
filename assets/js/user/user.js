$(function() {
    getUserInfo();

    $('#userForm').on('submit', function(even) {
        even.preventDefault();
        $.ajax({
            type: "post",
            url: "/my/userinfo",
            data: $(this).serialize(),
            success: function(response) {
                if (response.status != 0) return layer.msg('修改失败，请重试');
                window.parent.renewAvater(response.date);
                layer.msg('修改成功');
            }
        });
    });


    layui.form.verify({
        nickname: function(value) {
            if (!new RegExp("^[a-zA-Z0-9_\u4e00-\u9fa5\\s·]+$").test(value)) {
                return '用户名不能有特殊字符';
            }
            if (/(^_)|($_)/.test(value)) {
                return '用户名首尾不能出现下划线';
            }
            if (/\s/.test(value)) {
                return '不能出现空格'
            }
            if (value.length < 1 || value.length > 6) {
                return '用户名需要在1-6位之间'
            }
        }
    })
});

function getUserInfo() {
    $.ajax({
        type: "get",
        url: "/my/userinfo",
        success: function(response) {
            if (response.status != 0) {
                return layer.msg('获取用户信息失败');
            }
            layui.form.val('formUserinfo', response.data);
            $('#reset').on('click', function(even) {
                even.preventDefault();
                layui.form.val('formUserinfo', response.data);
            });
        }
    });
}

function setUserInfo() {

}