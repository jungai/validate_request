"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const boom_1 = require("boom");
const joi_1 = require("joi");
function getSchema(schemaMap) {
    return joi_1.object()
        .keys(schemaMap)
        .required();
}
exports.getSchema = getSchema;
// tslint:disable-next-line no-any
function isError(val) {
    return val instanceof Error;
}
exports.isError = isError;
function validate(prop, schemaMap) {
    const schema = getSchema(schemaMap);
    return (req, _res, next) => {
        const { error } = joi_1.validate(req[prop], schema);
        if (!isError(error)) {
            next();
            return;
        }
        next(boom_1.badData(error.name, error.details));
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
//# sourceMappingURL=index.js.map