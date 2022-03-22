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

    $('#fileImg').on('click', function() {
        $('#file').click();
    });

    $('#file').on('change', function(even) {
        let newImage = URL.createObjectURL(even.target.files[0]);
        cropper.replace(newImage, false);
    });

    $('#stroage').on('click', function() {
        let fileReader = new FileReader()
        let canvas = cropper.getCroppedCanvas({
            imageSmoothingQuality: "high",
        });
        console.log(canvas, canvas.getImageData);
        canvas.toBlob(function(blobObj) {
            let file = new window.File([blobObj], {
                type: 'image/png'
            });
            console.log(file);
        })
    });
    console.log(cropper);

    // cropper 剪切转base 失败 方法不存在

    function getBase64Image(context, x1, y1, x2, y2) {
        var dataImg = context.getImageData(x1, y1, x2, y2);
        var canvas2 = document.createElement("canvas");
        var context2 = canvas2.getContext("2d");
        var width = Math.abs(x1 - x2);
        var height = Math.abs(y1 - y2);
        canvas2.width = width;
        canvas2.height = height;
        context2.putImageData(dataImg, 0, 0, 0, 0, width, height);
        var res = canvas2.toDataURL('image/jpeg');
        return res;
    }
});