const { expression } = require('joi');
const joi = require('joi');

const pagenum = joi.number().integer().min(1).required();


const title = joi.string().min(1).required();
const cate_id = joi.number().integer().min(1);
const content = joi.string().required().allow('');
const state = joi.string().valid('已发布', '草稿');
const cate_name = joi.string().required();
exports.getList_article_schema = {
    query: {
        pagenum,
        pagesize: pagenum,
        cate_id,
        state
    }
}

exports.add_article_schema = {
    body: {
        title,
        cate_id: cate_id.required(),
        content,
        cate_name,
        state: state.required()
    }
}

exports.query_article_schema = {
    query: {
        pagenum,
        pagesize: pagenum,
        cate_id,
        state
    }
}