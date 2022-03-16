const express = require('express');
const router = express();
const userHandler = require('../router-handler/user');
const expressJoi = require('@escook/express-joi');
const { reg_login_schema } = require('../schema/user');

router.post('/login', expressJoi(reg_login_schema), userHandler.login);
router.post('/register', expressJoi(reg_login_schema), userHandler.regUser);

module.exports = router;