const { application } = require('express');
const dp = require('../dp/index');

exports.getArticleCates = (req, res) => {
    const sql = 'select * from ev_artcle_cate where is_delete = 0 order by id asc';
    dp.query(sql, function(err, results) {
        if (err) return res.cc(err);
        res.send({
            status: 0,
            message: '获取文章分类列表成功！',
            data: results,
        });
    });
}

exports.addArticleCates = (req, res) => {
    const body = req.body;
    new Promise((resolve) => {
        const repeatSql = 'select * from ev_artcle_cate where name = ? or alias = ?';
        dp.query(repeatSql, [body.name, body.alias], function(err, results) {
            if (err) return res.cc(err);
            if (results.length === 2) return res.cc('分类名称与别名被占用，请更换后重试！');
            else if (results.length === 1 && results[0].name === req.body.name && results[0].alias === req.body.alias) return res.cc('分类名称与别名被占用，请更换后重试！');
            else if (results.length === 1 && results[0].name === req.body.name) return res.cc('分类名称被占用，请更换后重试！');
            else if (results.length === 1 && results[0].alias === req.body.alias) return res.cc('分类别名被占用，请更换后重试！');
            resolve();
        })
    }).then(() => {
        const sql = 'insert into ev_artcle_cate set ?';
        dp.query(sql, body, function(err, results) {
            if (err) return res.cc(err);
            console.log();
            if (results.affectedRows !== 1) return res.cc('添加文章分类失败');
            res.cc('添加文字分类成功', 0);
        })
    })

}

exports.updateCate = (req, res) => {

}

exports.deleteArticleCates = (req, res) => {
    console.log(123);
    const sql = 'update ev_artcle_cate set is_delete = 1 where id = ?';
    console.log(req.params.id);
    dp.query(sql, req.params.id, function(err, results) {
        if (err) return res.cc(err);
        console.log();
        if (results.affectedRows != 1) return res.cc('删除文章分类失败');
        res.cc('删除文章分类成功', 0);
    })
}