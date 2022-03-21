$(function() {
    let option = {
        aspectRatio: 1,
        viewMode: 1,
        dragMode: 'move',
        movable: false,
        cropBoxResizable: false,
        preview: '.img-preview'
    }
    let cropper = new Cropper($('#image')[0], option);

    // $('#reset').on('click', function() {
    //     cropper.reset();
    // });

    $('#fileImg').on('click', function() {
        $('#file').click();
    });

    $('#file').on('change', function(even) {
        let newImage = URL.createObjectURL(even.target.files[0]);
        cropper.replace(newImage, false);
    });

    $('#stroage').on('click', function() {
        console.log(cropper('getCroppedCanvas', {
            width: 100,
            height: 100
        }));
    });

    // var $image = $("#image");
    // let option = {
    //     aspectRatio: 1,
    //     dragMode: 'move',
    //     viewMode: 1,
    //     cropBoxResizable: false,
    //     preview: '.img-preview',
    //     // ready: function() {
    //     //     $("#clipImg").on("click", function() {
    //     //         $image.cropper('getCroppedCanvas', {
    //     //             width: 140, // 裁剪后的长宽
    //     //             height: 140
    //     //         }).toBlob(function(blob) {
    //     //             $("#showImg").attr('src', URL.createObjectURL(blob)); // 将裁剪后的图片放到指定标签展示
    //     //         });
    //     //     });
    //     // }
    // }
    // $image.cropper(option);
    // $('#btnChooseImage').on('click', function() {
    //     console.log(123);
    //     $('#file').click();
    // });
    // $('#file').on('change', function(even) {
    //     let fileList = even.target.files;
    //     if (fileList.length == 0) return layer.msg('请选择图片！');
    //     let newImgURL = URL.createObjectURL(fileList[0]);
    //     $image
    //         .cropper('destroy') // 销毁旧的裁剪区域
    //         .attr('src', newImgURL) // 重新设置图片路径
    //         .cropper(option); // 重新初始化裁剪区域
    //     let dataURL = $image.cropper('getCroppedCanvas', {
    //         width: 100, // 裁剪后的长宽
    //         height: 100
    //     })

    //     console.log($('#image').cropper());
    //     // console.log($image.cropper('getCroppedCanvas', {
    //     //     width: 100,
    //     //     height: 100
    //     // }).toBlob);



    //     console.log(dataURL);
    // })
});