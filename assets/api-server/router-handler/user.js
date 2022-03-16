const dp = require('../dp/index');
const briypt = require('bcryptjs');
exports.login = function(req, res) {
    const body = req.body;
    const strQuery = `select * from ev_users where username = ?`;
    dp.query(strQuery, body.username, (err, results) => {
        if (err) return res.cc('登录失败');
        if (!results) return res.cc('用户不存在');
        if (briypt.hashSync(body.password) == results[0].password) {
            res.cc('登录成功', 0);
        } else {
            res.cc('登录失败');
        }
    });
}
exports.regUser = function(req, res) {
    const body = req.body;
    const strQuery = `select * from ev_users where username = ?`;
    const strSet = 'insert into ev_users set ?';
    dp.query(strQuery, body.username, function(err, results) {
        if (err) {
            return res.cc(err);
        }
        if (results[0] && results[0].username) {
            return res.cc('用户名已存在');
        }
        body.password = briypt.hashSync(body.password, 10);
        console.log(body);
        dp.query(strSet, { username: body.username, password: body.password }, function(err, results) {
            // 执行 SQL 语句失败
            if (err) return res.send({ status: 1, message: err.message })
                // SQL 语句执行成功，但影响行数不为 1
            if (results.affectedRows !== 1) {
                return res.send({ status: 1, message: '注册用户失败，请稍后再试！' })
            }
            // 注册成功
            res.send({ status: 0, message: '注册成功！' })
        });
    });
}