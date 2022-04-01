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
            url: "/my/article/list",
            data: query,
            success: function(response) {
                if (response.status != 0) return false
                $('tbody').html(template('tpl-table', response))
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
                console.log(obj.limit);
                initArtList();
            },
            layout: ['count', 'limit', 'prev', 'page', 'next', 'skip'],
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
    let query = {
        pagenum: 1, // 页码默认为1
        pagesize: 5 // 每页显示几条数据，默认每页显示2条
    };
    // cate_id  文章分类的 id
    // state  文章的发布状态
    let laypage = layui.laypage;


    let indexEdit = null;

    initArtList((item) => renderPage(item.total));
    initCates();


    $('#form-search').on('submit', function(even) {
        even.preventDefault();
        let cate_id = $('[name=cate_id]')[0]
        let state = $('[name=state]')[0]
        let data = {
            state: state.children[state.selectedIndex].value,
            cate_id: cate_id.children[cate_id.selectedIndex].value
        }
        $.ajax({
            type: "get",
            url: "/my/article/listQuery",
            data,
            success: function(response) {
                console.log(response);
                if (response.status != 0) return layer.msg('获取失败');
            }
        });
    })


    $('tbody').on('click', '.formSet', (even) => { // 编辑弹窗
        even.preventDefault();
        indexEdit = layer.open({
            type: 1,
            area: ['600px', '550px'],
            title: '修改文章分类',
            content: template('tpl-revise', {})
        });
    })
})