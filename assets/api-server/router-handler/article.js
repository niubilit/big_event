const dp = require('../dp/index');
const moment = require('moment');
const { object } = require('joi');

function paging(obj) {
    // obj = object.assign() 都是必要参数
    dp.query(obj.sql, [(obj.pagenum - 1) * obj.pagesize, obj.pagesize * obj.pagenum], (err, results) => {
        if (err) return obj.res.cc(err);
        obj.callback && obj.callback(results)

    });
}

exports.listArticle = (req, res) => {
    const { pagenum, pagesize } = {...req.query };
    const totalSql = 'select count(*) from ev_articles where is_delete = 0';
    const sql = 'select * from ev_articles where is_delete = 0 limit ?, ?';
    new Promise((resolve) => {
        dp.query(totalSql, (err, results) => {
            if (err) res.cc(err);
            resolve(results[0]['count(*)']);
        });
    }).then((leng) => {
        paging({
            sql,
            res,
            pagenum,
            pagesize,
            callback: (results) => {
                res.send({
                    status: 0,
                    msg: '获取文章成功',
                    data: results,
                    total: leng
                });
            }
        });
    })

};

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

exports.listQuery = (req, res) => {
    const query = req.query;
    console.log(query);
    let sql = `select * from ev_articles where is_delete = 0
    ${req.query.cate_id ? ' and cate_id = "' + query.cate_id + '"' : ''}
    ${req.query.state ? ' and state = "' + query.state + '"' : ''}`;

    new Promise((resolve, reject) => { // 获取总数据
        dp.query(sql, (err, results) => { // 需要分页
            if (err) return res.cc(err);
            // console.log(results.length);
            resolve(results);
        });
    }).then((results) => { // 分页处理
        console.log(results);
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