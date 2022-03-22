const dp = require('../dp/index');
exports.getArticleCates = (req, res) => {
    const sql = 'select * ev_artcle_cate where is_delete = 0 order by id asc';
    dp.query('sql', function(err, results) {
        if (err) return res.cc(err);
        res.send({
            status: 0,
            message: '获取文章分类列表成功！',
            data: results,
        })
    })
}