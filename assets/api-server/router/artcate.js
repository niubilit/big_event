const express = require('express');
const expressJoi = require('@escook/express-joi');
const router = express.Router();
const artcate_handler = require('../router-handler/artcate');
const schema = require('../schema/artcate');

router.get('/cates', expressJoi(schema.add_cate_schema), artcate_handler.getArticleCates);

module.exports = router;