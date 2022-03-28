$(function() {
    let query = {
        pagenum: 1, // 页码默认为1
        pagesize: 2, // 每页显示几条数据，默认每页显示2条
        cate_id: '', // 文章分类的 id
        state: '' // 文章的发布状态
    };
    let laypage = layui.laypage;
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
        }, {
            id: 3,
            title: 'adsfasdf',
            pub_date: '2022-03-26 23:32',
            stats: '已发布',
            cate_name: 'cs'
        }],
        total: 3
    }
    const initArtList = function() {
        $.ajax({
            type: "get",
            url: "/my/article/list",
            data: query,
            success: function(response) {
                if (response.status != 0) return false
                initCates();
                renderPage()
            }
        });
    }
    const initCates = function() {
        $.ajax({
            type: "get",
            url: "/my/artcate/cates",
            success: function(response) {
                if (response.status != 0) return false
                let dl = $('div.layui-unselect').eq(0).find('.layui-anim');
                let html = template('tpl-cate', response);
                $('[name=cate_id]').html(html)
                layui.form.render()
                    // dl.html(template('tpl-cate', response));
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

    // layui不能动态生成添加的dom元素, 下列是为生成的dd添加事件,使input显示选择的文本
    // $('.layui-inline').eq(0).on('click', 'dd', function(even) {
    //     console.log(132);
    //     $(this).parents('.layui-inline').find('.layui-input').val($(this).html()); // 不能用箭头函数,因为箭头指向window
    // })

    // 自定义的假数据
    $('tbody').html(template('tpl-table', data));


    $('#form-search').on('submit', function(even) {
        even.preventDefault();
        // 获取表单选择的值
        query.cate_id = $('[name=cate_id]').val();
        query.state = $('[name=state]').val();
        console.log(query);
        // $.ajax({
        //     type: 'post',
        //     ulr: ''
        // })
    });

    // 渲染分页方法
    const renderPage = function(total) {
        console.log(laypage);
        laypage.render({
            elem: 'pageBox',
            count: total, //总数据调试
            limit: query.pagesize, // 一页显示几条数据
            limits: ['5', '10', '15', '20'],
            curr: query.pagenum, // 默认被选择的分页
            jump: function(obj, first) {
                if (first) return 0;
                query.pagenum = obj.curr;
                query.pagesize = obj.limit;
                // initArtList();
            },
            layout: ['count', 'limit', 'prev', 'page', 'next', 'skip'],
        });
    }

    initCates();
    renderPage(7);
})