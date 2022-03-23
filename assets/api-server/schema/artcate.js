const joi = require('joi');
const id = joi.number().integer().min(1).required();
const name = joi.string().required();
const alias = joi.string().alphanum().required();
exports.add_cate_schema = {
    body: {
        name,
        alias
    }
}
exports.id_schema = {
    params: {
        id
    }
}
exports.update_id_schema = {
    body: {
        id,
        name,
        alias
    }
}