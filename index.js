"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const boom_1 = require("boom");
const Joi = require("joi");
function validate(prop, schemaMap) {
    const schema = Joi.object()
        .keys(schemaMap)
        .required();
    return (req, _res, next) => {
        const { error } = Joi.validate(req[prop], schema);
        if (!(error instanceof Error)) {
            next();
        }
        else {
            next(boom_1.badData(error.name, error.details));
        }
    };
}
exports.validate = validate;
function body(schemaMap) {
    return validate('body', schemaMap);
}
exports.body = body;
function params(schemaMap) {
    return validate('params', schemaMap);
}
exports.params = params;
function query(schemaMap) {
    return validate('query', schemaMap);
}
exports.query = query;
