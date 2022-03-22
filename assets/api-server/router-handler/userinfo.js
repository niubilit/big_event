const bodyParser = require('body-parser');
const dp = require('../dp/index');
const bcrypt = require('bcryptjs');
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

exports.upDateUserInfo = function(req, res) {
    const body = req.body;
    const sql = 'update ev_users set ? where id = ?';
    dp.query(sql, [body, body.id], function(err, results) {
        if (err) return res.cc(err);
        if (results.affectedRows != 1) return res.cc('修改用户信息失败');
        console.log(results);
        res.send({
            status: 0,
            msg: '修改成功',
            date: body
        })
    })
}

exports.updatepwd = function(req, res) {
    const body = req.body;
    const sql = 'select * from ev_users where id = ?';
    const setSql = 'update ev_users set password = ? where id = ?';
    dp.query(sql, req.user.id, function(err, results) {
        if (err) return res.cc(err);
        if (results.length != 1) return res.cc('修改失败');
        if (!bcrypt.compareSync(body.oldPwd, results[0].password)) return res.cc('旧密码错误')
        dp.query(setSql, [bcrypt.hashSync(body.newPwd, 10), req.user.id], function(err, results) {
            if (err) return res.cc(err);
            if (results.affectedRows != 1) return res.cc('修改失败');
            return res.cc('修改成功', 0);
        });
    });
}

exports.updateAvatar = function(req, res) {
    const sql = 'update ev_users ste user_pic = ? where id = ?';
    dp.query(sql, [req.body.avater, req.user.id], function(err, results) {
        if (err) return res.cc(err);
        if (results.affectedRows) return res.cc('修改头像失败');
        res.send({
            status: 0,
            msg: '修改成功'
        })
    })
}