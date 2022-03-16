const express = require('express');
const router = express();
const userHandler = require('../router-handler/user');

router.post('/login', userHandler.login);
router.post('/register', userHandler.regUser);

module.exports = router;