$(function() {
    let option = {
        aspectRatio: 1,
        viewMode: 1,
        dragMode: 'move',
        movable: false,
        preview: '.img-preview'
    }
    let cropper = new Cropper($('#image')[0], option);

    $('#fileImg').on('click', function() {
        $('#file').click();
    });

    $('#file').on('change', function(even) {
        let newImage = URL.createObjectURL(even.target.files[0]);
        cropper.replace(newImage, false);
    });

    $('#stroage').on('click', function() {
        let canvas = cropper.getCroppedCanvas({
            imageSmoothingQuality: "high",
        });
        let avatar = canvas.toDataURL('image/jpg');
        $.ajax({
            type: "post",
            url: "/my/update/avatar",
            data: {
                avatar
            },
            success: function(response) {
                console.log(response);
                if (response.status != 0) return layer.msg('修改头像失败');
                layer.msg('修改成功');
                window.parent.getUserInfo()
            }
        });
    });
});