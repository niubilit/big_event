const express = require('express');
const cors = require('cors');
const app = express();
const userRouter = require('./router/user.js');
const expressJoi = require('@escook/express-joi');
const { reg_login_schema } = require('./schema/user');
const joi = require('joi');

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

app.use('/bigEvent/api/', expressJoi(reg_login_schema), userRouter);

app.use((err, req, res, next) => {
    if (err instanceof joi.ValidationError) {
        return res.cc(err);
    }
    res.cc(err)
})

app.listen(8088, () => {
    console.log('api server running at http://127.0.0.1:8088')
});