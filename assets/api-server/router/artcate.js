const express = require('express');
const expressJoi = require('@escook/express-joi');
const schema = require('../schema/artcate');
const router = express.Router();
const artcate_handler = require('../router-handler/artcate');

router.get('/cates', artcate_handler.getArticleCates);
router.get('/deletecate/:id', expressJoi(schema.id_schema), artcate_handler.deleteArticleCates);
router.get('/cates/:id', expressJoi(schema.id_schema), artcate_handler.getArtCateById)
router.post('/addcates', expressJoi(schema.add_cate_schema), artcate_handler.addArticleCates);
router.post('/updatecate', expressJoi(schema.update_id_schema), artcate_handler.updateCate);

module.exports = router;