const mysql = require('mysql');

const dp = mysql.createPool({
    host: '127.0.0.1', // 登录的ip地址
    user: 'root', // 登录的账号
    password: 'zhanglei.123', // 登录的密码
    database: 'my_db_01' //登录哪个数据库
});


module.exports = dp;