const dp = require('../dp/index');
const briypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../schema/config');
exports.login = function(req, res) {
    const body = req.body;
    const strQuery = `select * from ev_users where username = ?`;
    dp.query(strQuery, body.username, (err, results) => {
        if (err) return res.cc('登录失败');
        if (!results) return res.cc('用户不存在');
        if (results.length != 1) return res.cc('登录失败')
        if (!briypt.compareSync(body.password, results[0].password)) return res.cc('密码错误');
        const user = {...results[0], password: '', user_pic: '' }
        res.send({
            status: 0,
            msg: '登陆成功',
            token: 'Bearer ' + jwt.sign(user, config.jwtSecretKey, { expiresIn: config.expiresIn })
        });
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