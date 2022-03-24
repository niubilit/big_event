$(function() {
    let query = {
        pagenum: 1, // 页码默认为1
        pagesize: 2, // 每页显示几条数据，默认每页显示2条
        cate_id: '', // 文章分类的 id
        state: '' // 文章的发布状态
    };

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
    const initArtList = function() {
        $.ajax({
            type: "get",
            url: "/my/article/list",
            data: query,
            success: function(response) {
                if (response.status != 0) return false
            }
        });
    }
    const initCates = function() {
        $.ajax({
            type: "get",
            url: "/my/article/cates",
            success: function(response) {
                if (response.status != 0) return false
                let dl = $('div.layui-unselect').eq(0).find('.layui-anim');
                dl.html(template('tpl-cate', response));
            }
        });
    }
    template.defaults.imports.dateFormat = function(date) {
        const dt = new Date();

        function padZero(n) {
            return n < 10 ? '0' + n : n;
        }
        let y = dt.getFullYear();
        let m = padZero(dt.getMonth() + 1);
        let d = padZero(dt.getDate());
        let hh = padZero(dt.getHours());
        let mm = padZero(dt.getMinutes());
        let ss = padZero(dt.getSeconds());
        return y + '-' + m + '-' + d + ' ' + hh + ':' + mm + ':' + ss;
    }

    initCates();
    // layui不能动态生成添加的dom元素, 下列是为生成的dd添加事件,使input显示选择的文本
    $('.layui-inline').eq(0).on('click', 'dd', function(even) {
        $(this).parents('.layui-inline').find('.layui-input').val($(this).html()); // 不能用箭头函数,因为箭头指向window
    })


    $('tbody').html(template('tpl-table', data));
})