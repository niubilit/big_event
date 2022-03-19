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
                if (response.status != 0) return layer.msg('修改失败');
                layer.msg('修改成功', function() {
                    console.log(123);
                });

            }
        });
    })
})