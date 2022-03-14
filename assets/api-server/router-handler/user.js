exports.login = (req, res) => {
    const body = req.body;
    res.send({
        status: 0,
        msg: '登录成功',
        data: body
    });
}
exports.regUser = (req, res) => {
    res.send('ok')
}