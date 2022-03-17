const renewAvater = function(user) {
    if (user.user_pic) {
        $('.layui-nav-img').html(user.user_pic).show();
    } else {
        console.log(user.nickname ? user.nickname : user.username, $('.user-name'));
        $('.text-avater').html((user.nickname ? user.nickname : user.username)[0].toUpperCase()).show();
        $('#user-name').html(user.nickname ? user.nickname : user.username)
    }
}
const getUserInfo = function() {
    $.ajax({
        type: "get",
        url: "/my/userinfo",
        success: function(response) {
            if (response.status != 0) {
                return layer.msg('获取用户信息失败');
            }
            console.log(response);
            renewAvater(response.data);
        }
    });
}
$(function() {
    $('.layui-icon-home').click();
    getUserInfo();
});