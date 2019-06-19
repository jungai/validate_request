import { badData } from '@hapi/boom';
import { object as joiObject, validate as joiValidate } from '@hapi/joi';
export function getDefaultSchema(schemaMap) {
    return joiObject()
        .keys(schemaMap)
        .required();
}
/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
export function isError(val) {
    return val instanceof Error;
}
export function validate(prop, schemaMap, getSchema = getDefaultSchema) {
    const schema = getSchema(schemaMap);
    return (req, _res, next) => {
        const { error } = joiValidate(req[prop], schema);
        if (!isError(error)) {
            next();
            return;
        }
        next(badData(error.name, error.details));
    };
}
export function body(schemaMap, getSchema = getDefaultSchema) {
    return validate('body', schemaMap, getSchema);
}
export function params(schemaMap, getSchema = getDefaultSchema) {
    return validate('params', schemaMap, getSchema);
}
export function query(schemaMap, getSchema = getDefaultSchema) {
    return validate('query', schemaMap, getSchema);
}
//# sourceMappingURL=index.js.map