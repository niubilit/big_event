const dp = require('../dp/index');
const moment = require('moment');
const { object, expression } = require('joi');

function paging(obj) {
    // obj = object.assign() 都是必要参数
    dp.query(obj.sql, [(obj.pagenum - 1) * obj.pagesize, +obj.pagesize], (err, results) => { // pagesize 需要转义为 number类型
        if (err) return obj.res.cc(err);
        obj.callback && obj.callback(results)

    });
}
exports.listQuery = (req, res) => { // 最初获取数据何尝不是一种查询，只不过是没有参数而已
    const query = req.query;
    let sql = `select * from ev_articles where is_delete = 0
    ${req.query.cate_id ? ' and cate_id = "' + query.cate_id + '"' : ''}
    ${req.query.state ? ' and state = "' + query.state + '"' : ''}`;

    new Promise((resolve, reject) => { // 获取总数据
        dp.query(sql, (err, results) => { // 需要分页
            if (err) return res.cc(err);
            resolve(results);
        });
    }).then((results) => { // 分页处理
        paging({
            sql: sql + ` limit ?, ?`,
            res,
            pagenum: query.pagenum,
            pagesize: query.pagesize,
            callback: (result) => {
                res.send({
                    status: 0,
                    msg: '获取文章成功',
                    data: result,
                    total: results.length
                });
            }
        });
    });
    // res.cc('ok');
}
exports.addArticle = (req, res) => {
    const sql = 'insert into ev_articles set ?';
    req.body.pub_date = moment().format('YYYY-MM-DD HH:mm:ss');
    req.body.author_name = req.user.username;
    dp.query(sql, req.body, (err, results) => {
        if (err) return res.cc(err);
        if (results.affectedRows != 1) return res.cc('发布文章失败');
        res.send({
            status: 0,
            msg: '发布成功'
        })
    });
}

exports.deleteArticle = (req, res) => {
    const params = req.params;
    const sql = 'update ev_articles set is_delete = 1 where id = ?';
    dp.query(sql, params.id, (err, results) => {
        if (err) return res.cc(err);
        console.log(results);
        if (results.affectedRows != 1) return res.cc('删除文章失败');
        res.cc('删除文章成功', 0);
    })
}