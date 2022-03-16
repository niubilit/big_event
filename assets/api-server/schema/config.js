// 全局配置文件
module.exports = {
    jwtSecretKey: 'zhanglei.123',
    expiresIn: '10h',
    unRoute: [
        { url: '/bigEvent/api/login', methods: ['POST'] },
        // { url: '/bigEvent/api//register', methods: ['POST'] }
    ]
}