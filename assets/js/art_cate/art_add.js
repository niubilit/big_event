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
    initArtSelect();
    // 文本插件
    tinymce.init({
        language: 'zh',
        selector: '#textCount',
    });
    // 切图插件
    let option = {
        aspectRatio: 1,
        viewMode: 1,
        dragMode: 'move',
        movable: false,
        preview: '.preview'
    }
    let cropper = new Cropper($('#image')[0], option);
    // 切换图片
    $('#fileImg').on('click', function(even) {
        $('#file').click();
    });
    $('#file').on('change', function(even) {
        let newImage = URL.createObjectURL(even.target.files[0]);
        cropper.replace(newImage, false);
    });

    // 发送ajax请求

})