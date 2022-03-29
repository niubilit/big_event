const dp = require('../dp/index');
const moment = require('moment');

exports.listArticle = (req, res) => {
    res.send('ok');
};

exports.addArticle = (req, res) => {
    const sql = 'insert into ev_articles set ?';
    req.body.pub_date = moment().format('YYYY-MM-DD HH:mm:ss');
    dp.query(sql, req.body, (err, results) => {
        if (err) return res.cc(err);
        if (results.affectedRows != 1) return res.cc('发布文章失败');
        res.send({
            status: 0,
            msg: '发布成功'
        })
    });
}