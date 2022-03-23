$(function() {
    let indexAdd = undefined;
    let indexEdit = undefined;
    initArtCateList();
    // 添加 表单数据
    $('#add-cate').on('click', function() {
        indexAdd = layer.open({
            type: '1',
            area: ['500px', '250px'],
            title: '添加文章分类',
            content: $('#dialog-add').html()
        })
    });
    $('body').on('submit', '#form-add', function(even) {
        even.preventDefault();
        new Promise((resolve, reject) => {
            $.ajax({
                type: "post",
                url: "/my/article/addcates",
                data: $(this).serialize(),
                success: function(response) {
                    if (response.status != 0) {
                        return layer.msg('新增分类失败');
                    }
                    layer.msg('新增分类成功');
                    layer.close(indexAdd)
                    resolve();
                }
            });
        }).then(() => {
            let data = {
                data: [{
                    name: $('#form-add [name=name]').val(),
                    alias: $('#form-add [name=alias]').val()
                }]
            };
            $('tbody')[0].insertAdjacentHTML('beforeend', template('tpl-table', data))
        })
    });
    // 修改对应的 表单数据 事件委托
    $('.layui-table').on('click', '.formSet', function(even) {
        even.preventDefault();
        indexEdit = layer.open({
            type: 1,
            area: ['500px', '250px'],
            title: '修改文章分类',
            content: $('#dialog-edit').html()
        });

    });
    $('body').on('submit', $('#submit-set'), function(even) {
        even.preventDefault();
        let This = $(this);
        let data = null;
        new Promise((resolve, reject) => {
            $.ajax({
                type: "post",
                url: "/my/article/updatecate",
                data: $(this).serialize(),
                success: function(response) {
                    if (response.status != 0) return layer.msg('修改分类失败');
                    layer.msg('修改分类成功');
                    layer.close(indexEdit);
                    resolve();
                }
            });
        }).then(() => {
            // This.parents('tr').
        });
    });
    // 删除
    $('.layui-table').on('click', '.formDelete', function(even) {
        let id = $(this).attr('data-id');
        let This = $(this);
        layer.confirm('确认删除?', { icon: 3, title: '提示' }, function(index) {
            $.ajax({
                type: "get",
                url: "/my/article/deletecate/" + id,
                success: function(response) {
                    if (response.status != 0) return layer.msg('删除失败');
                    layer.msg('删除成功');
                    This.parents('tr').remove()
                }
            });
            layer.close(index);
        });
    })

    function initArtCateList() {
        $.ajax({
            type: "get",
            url: "/my/article/cates",
            success: function(response) {
                $('tbody').html(template('tpl-table', response));
                console.log(response);
            }
        });
    }
})