const bodyParser = require('body-parser');
const dp = require('../dp/index');
exports.getUserInfo = function(req, res) {
    const sql = 'select id, username, nickname, email, user_pic from ev_users where id = ?';
    dp.query(sql, req.user.id, function(err, results) {
        if (err) return res.cc(err);
        console.log(results.length != 1);
        if (results.length != 1) return res.cc('获取用户信息失败');
        res.send({
            status: 0,
            msg: '获取成功',
            data: results[0]
        })
    })
};

exports.upDateUserInfo = function(req, res) {
    const body = req.body;
    const sql = 'update ev_users set ? where id = ?';
    console.log(body);
    dp.query(sql, [body, body.id], function(err, results) {
        if (err) return res.cc(err);
        if (results.affectedRows != 1) return res.cc('修改用户信息失败');
        res.send({
            status: 0,
            msg: '修改成功'
        })
    })

}