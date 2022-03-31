$(function() {
    const initArtSelect = function() {
            $.ajax({
                type: "get",
                url: "/my/artcate/cates",
                success: function(response) {
                    if (response.status != 0) return layer.msg('获取文章分类失败');
                    $('[name=cate_id]').html(template('tpl-option', response));
                    layui.form.render();
                }
            });
        }
        // 文章存储状态
    let art_state = '已发布';

    // 文本插件
    tinymce.init({
        language: 'zh',
        selector: '#textCount',
    });

    // 切换状态
    $('#state').on('click', () => art_state = '已发布');
    $('#temporary').on('click', () => art_state = '草稿');

    // 切换图片
    // 发送ajax请求
    $('#artAdd').on('submit', function(even) {
        even.preventDefault();
        let formDate = new FormData($(this)[0]);
        formDate.set('cate_name', $('select option').eq(formDate.get('cate_id')).html())
        formDate.set('state', art_state);
        $.ajax({
            processData: false, //这个必须有，不然会报错
            contentType: false, //这个必须有，不然会报错
            type: "post",
            url: "/my/article/add",
            data: formDate,
            success: function(response) {
                console.log(response);
                if (response.status != 0) return layer.msg('发布失败');
                layer.msg('发布成功');
            }
        });
    });
    initArtSelect();
})