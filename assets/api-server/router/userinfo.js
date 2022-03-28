const express = require('express');
const router = express.Router();
const expressJoi = require('@escook/express-joi');
const userinfo_handler = require('../router-handler/userinfo');
const schema = require('../schema/user');

router.get('/userinfo', userinfo_handler.getUserInfo);
router.post('/userinfo', expressJoi(schema.updata_userinfo_schema), userinfo_handler.upDateUserInfo);
router.post('/updatepwd', expressJoi(schema.update_password_schema), userinfo_handler.updatepwd);
router.post('/update/avatar', expressJoi(schema.update_avatar_schema), userinfo_handler.updateAvatar);

module.exports = router;