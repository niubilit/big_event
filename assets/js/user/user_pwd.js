$(function() {
    $('.layui-form').on('submit', function(even) {
        even.preventDefault();
        $.ajax({
            type: "post",
            url: "/my/updatepwd",
            data: {
                oldPwd: $('#oldpwd').val(),
                newPwd: $('#rePwd').val()
            },
            success: function(response) {
                if (response.status != 0) return layer.msg(response.msg);
                layer.msg('修改成功', function() {
                    window.parent.location.href = '../../login.html'
                });
            }
        });
    })
});