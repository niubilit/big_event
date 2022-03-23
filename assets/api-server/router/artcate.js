const express = require('express');
const expressJoi = require('@escook/express-joi');
const schema = require('../schema/artcate');
const router = express.Router();
const artcate_handler = require('../router-handler/artcate');

router.get('/cates', artcate_handler.getArticleCates);
router.post('/addcates', expressJoi(schema.add_cate_schema), artcate_handler.addArticleCates);
router.post('/updatecate', expressJoi(schema.add_cate_schema), artcate_handler.updateCate);
router.get('/deletecate/:id', expressJoi(schema.id_schema), artcate_handler.deleteArticleCates);
module.exports = router;