const dp = require('../dp/index');
exports.getUserInfo = function(req, res) {
    const sql = 'select id, username, nickname, email, user_pic from ev_users where id = ?';
    dp.query(sql, req.user.id, function(err, results) {
        if (err) return res.cc(err);
        if (results.length != 1) return res.cc('获取用户信息失败');
        res.send({
            status: 0,
            msg: '获取成功',
            data: results[0]
        })
    })
};