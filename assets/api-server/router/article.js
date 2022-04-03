const express = require('express');
const expressJoi = require('@escook/express-joi');
const router = express.Router();
const article_handler = require('../router-handler/article');
const schema = require('../schema/article');
// 配置解析 formDate 格式表单数据
const multer = require('multer');
const path = require('path');
const upload = multer({ dest: path.join(__dirname, '../images') });

router.post('/add', upload.single('cover_img'), expressJoi(schema.add_article_schema), article_handler.addArticle); // 添加api
router.get('/listQuery', expressJoi(schema.query_article_schema), article_handler.listQuery); // 查询api 分页
router.get('/delete/:id', expressJoi(schema.delete_id_schema), article_handler.deleteArticle);


module.exports = router;