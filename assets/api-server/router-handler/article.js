const dp = require('../dp/index');
const moment = require('moment');

exports.listArticle = (req, res) => {
    const sql = 'select * from ev_articles where is_delete = 0 limit 0, 5';
    dp.query(sql, req.body.pagesize, (err, results) => {
        if (err) return err.cc(err);
        res.send({
            status: 0,
            msg: '获取文章成功',
            data: results
        })
    });
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