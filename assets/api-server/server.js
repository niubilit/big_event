const express = require('express');
const cors = require('cors');
const app = express();
const userRouter = require('./router/user.js');
const joi = require('joi');
const expressJwt = require('express-jwt');
const config = require('./schema/config');

app.use(cors());
app.use(express.urlencoded({ urlencoded: false }));
app.use(function(req, res, next) {
    res.cc = function(err, status = 1) {
        res.send({
            status,
            msg: err instanceof Error ? err.message : err
        });
    }
    next();
});
console.log(config.jwtSecretKey);
// app.use(expressJwt({ secret: config.jwtSecretKey, algorithms: ['HS256'] }).unless({ path: [/^\/api\//] }));
app.use(expressJwt({ secret: config.jwtSecretKey, algorithms: ['HS256'] }).unless({ path: { url: '/bigEvent/api/login', methods: ['POST'] } }));
// app.use(expressJwt({ secret: config.jwtSecretKey, algorithms: ['HS256'] }).unless({
//     path: {
//         url: '/bigEvent/api',
//         method: 'post'
//     }
// }));
app.use('/bigEvent/api/', userRouter);

app.use((err, req, res, next) => {
    if (err instanceof joi.ValidationError) {
        return res.cc(err);
    }
    if (err.name == 'UnauthorizedError') return res.cc('身份认证失败')
    res.cc(err)
})

app.listen(8088, () => {
    console.log('api server running at http://127.0.0.1:8088')
});