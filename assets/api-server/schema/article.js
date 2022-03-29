const joi = require('joi');
const title = joi.string().min(1).required();
const cate_id = joi.number().integer().min(1).required();
const content = joi.string().required().allow('');
const cover_img = joi.string().dataUri().required();
const state = joi.string().valid('已发布', '草稿').required();

exports.add_article_schema = {
    body: {
        title,
        cate_id,
        content,
        cover_img,
        state
    }
}