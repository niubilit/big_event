$(function() {
    let indexAdd = undefined;
    let indexEdit = undefined;
    let date = {
        date: [{
                id: 1,
                name: '科技',
                alias: 'ZuiXian'
            },
            {
                id: 2,
                name: '科技',
                alias: 'KeJi'
            }
        ]
    };
    $('tbody').html(template('tpl-table', date));

    $('#add-cate').on('click', function() {
        indexAdd = layer.open({
            type: '1',
            area: ['500px', '250px'],
            title: '添加文章分类',
            content: $('#dialog-add').html()
        })
    });
    // 添加 表单数据
    $('body').on('submit', '#form-add', function(even) {
        even.preventDefault();
        $.ajax({
            type: "post",
            url: "/my/article/addcates",
            data: $(this).serialize(),
            success: function(response) {
                if (response.status != 0) return layer.msg('新增分类失败');
                initArtCateList();
                layer.msg('新增分类成功');
                layer.close(indexAdd)
            }
        });
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

        $.ajax({
            type: "post",
            url: "/my/article/updatecate",
            data: $(this).serialize(),
            success: function(response) {
                if (response.status != 0) return layer.msg('修改分类失败');
                layer.close(indexEdit);
                layer.msg('修改分类成功');
                initArtCateList()
            }
        });
    });

    $('.layui-table').on('click', '.formDelete', function(even) {
        even.preventDefault();
        let This = $(this);
        let id = $(this).attr('data-id');
        layer.config('确认删除?', { icon: 3, title: '提示' }, function(index) {
            $.ajax({
                type: "get",
                url: "/my/article/deletecate/" + id,
                success: function(response) {
                    if (response.status != 0) return layer.msg('删除失败');
                    layer.msg('修改成功');
                    initArtCateList()
                }
            });
            layer.close(index);
        })
    })
})

function initArtCateList() {
    $.ajax({
        type: "get",
        url: "/my/article/cates",
        success: function(response) {
            $('tbody').html(template('tpl-table', date));
        }
    });
}