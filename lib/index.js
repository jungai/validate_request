"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const boom_1 = require("@hapi/boom");
const joi_1 = require("@hapi/joi");
function getDefaultSchema(schemaMap) {
    return joi_1.object()
        .keys(schemaMap)
        .required();
}
exports.getDefaultSchema = getDefaultSchema;
/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
function isError(val) {
    return val instanceof Error;
}
exports.isError = isError;
function validate(prop, schemaMap, getSchema = getDefaultSchema) {
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
function body(schemaMap, getSchema = getDefaultSchema) {
    return validate('body', schemaMap, getSchema);
}
exports.body = body;
function params(schemaMap, getSchema = getDefaultSchema) {
    return validate('params', schemaMap, getSchema);
}
exports.params = params;
function query(schemaMap, getSchema = getDefaultSchema) {
    return validate('query', schemaMap, getSchema);
}
exports.query = query;
//# sourceMappingURL=index.js.map