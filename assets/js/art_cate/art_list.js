$(function() {
    let query = {
        pagenum: 1, // 页码默认为1
        pagesize: 2, // 每页显示几条数据，默认每页显示2条
        cate_id: '', // 文章分类的 id
        state: '' // 文章的发布状态
    };
    const intoArtList = function() {
        $.ajax({
            type: "get",
            url: "/my/article/list",
            data: query,
            success: function(response) {
                if (response.status != 0) return layer.msg('获取文章列表失败');
            }
        });
    }
    let data = {
        stauts: 0,
        msg: '获取成功',
        data: [{
            id: 1,
            title: 'abcd',
            pub_date: '2022-03-24 10:26',
            stats: '已发布',
            cate_name: '最新'
        }, {
            id: 2,
            title: '123',
            pub_date: '2022-03-24 10:27',
            stats: '已发布',
            cate_name: '股市'
        }],
        total: 5
    }
})