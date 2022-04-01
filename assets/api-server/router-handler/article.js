const dp = require('../dp/index');
const moment = require('moment');

exports.listArticle = (req, res) => {
    const { pagenum, pagesize } = {...req.query };
    const sql = 'select * from ev_articles where is_delete = 0 limit ?, ?';
    const totalSql = 'select count(*) from ev_articles where is_delete = 0';
    let total = 0;
    dp.query(totalSql, (err, results) => {
        if (err) res.cc(err);
        total = results[0]['count(*)'];
    });

    dp.query(sql, [(pagenum - 1) * pagesize, pagesize * pagenum], (err, results) => {
        if (err) return err.cc(err);
        res.send({
            status: 0,
            msg: '获取文章成功',
            data: results,
            total
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

exports.listQuery = (req, res) => {
    const query = req.query;
    let sql = `select * from ev_articles where is_delete = 0 and state = ? ${query.cate_id == '*' ? '' : 'and cate_id = ?'}`;
    dp.query(sql, [query.state, query.cate_id], (err, results) => { // 需要分页
        if (err) return res.cc(err);
        res.send({
            status: 0,
            msg: '获取成功',
            data: results,
            total: results.length
        });
    });
    // res.cc('ok');
}