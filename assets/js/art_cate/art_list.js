$(function() {
    const initCates = function() { // 渲染分类下拉栏
        $.ajax({
            type: "get",
            url: "/my/artcate/cates",
            success: function(response) {
                if (response.status != 0) return false
                let dl = $('div.layui-unselect').eq(0).find('.layui-anim');
                let html = template('tpl-cate', response);
                $('[name=cate_id]').html(html)
                layui.form.render()
                dl.html(template('tpl-cate', response));
            }
        });
    }
    const initArtList = function(callback) { // 渲染文章列表
        $.ajax({
            type: "get",
            url: "/my/article/listQuery",
            data: query,
            success: function(response) {
                if (response.status != 0) return false
                $('tbody').html(template('tpl-table', response))
                renderPage(response.total);
                callback && callback(response)
            }
        });
    }

    const renderPage = function(total) {
        laypage.render({
            elem: 'pageBox',
            count: total, //总数据调试
            limit: query.pagesize, // 一页显示几条数据
            limits: ['5', '10', '15'],
            curr: query.pagenum, // 默认被选择的分页
            jump: function(obj, first) {
                if (first) return 0;
                query.pagenum = obj.curr;
                query.pagesize = obj.limit;
                initArtList(); // 渲染对应页面的数据
            },
            layout: ['count', 'limit', 'prev', 'page', 'next', 'skip'],
        });
    }
    const getSelectDate = () => {
        let obj = {
            pagenum: 1,
            pagesize: 5
        };
        let cate_id = $('[name=cate_id]')[0];
        let state = $('[name=state]')[0];

        cate_id = cate_id.children[cate_id.selectedIndex].value;
        state = state.children[state.selectedIndex].value;

        cate_id ? obj.cate_id = cate_id : 0;
        state ? obj.state = state : 0;
        return obj;
    }
    let query = {
        pagenum: 1, // 页码默认为1
        pagesize: 5, // 每页显示几条数据，默认每页显示2条
    };
    // cate_id  文章分类的 id
    // state  文章的发布状态
    let laypage = layui.laypage;


    let indexEdit = null;

    initArtList();
    initCates();


    $('#form-search').on('submit', function(even) { // 查询指定项
        even.preventDefault();
        query = getSelectDate();
        if (!query.state && !query.cate_id) {
            query = {
                pagenum: 1,
                pagesize: 5,
            }
            initArtList();
            return 0;
        }
        $.ajax({
            type: "get",
            url: "/my/article/listQuery",
            data: query,
            success: function(response) {
                if (response.status != 0) return layer.msg('获取失败');
                console.log(response);
                $('tbody').html(template('tpl-table', response))
                renderPage(response.total);
            }
        });
    });


    $('tbody').on('click', '.formSet', (even) => { // 编辑弹窗
        even.preventDefault();
        indexEdit = layer.open({
            type: 1,
            area: ['600px', '550px'],
            title: '修改文章分类',
            content: template('tpl-revise', {})
        });
    });

    $('tbody').on('click', '.formDelete', function(even) { // 删除对应项
        even.preventDefault();
        const id = $(this).siblings('input').attr('id');
        $.ajax({
            type: "get",
            url: "/my/article/delete/" + id,
            success: function(response) {
                if (response.status != 0) return layer.msg('删除失败');
                initArtList();
            }
        });
    })
});