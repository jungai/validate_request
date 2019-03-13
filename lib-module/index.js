import { badData } from 'boom';
import { object as joiObject, validate as joiValidate } from 'joi';
export function getSchema(schemaMap) {
    return joiObject()
        .keys(schemaMap)
        .required();
}
// tslint:disable-next-line no-any
export function isError(val) {
    return val instanceof Error;
}
export function validate(prop, schemaMap) {
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
export function body(schemaMap) {
    return validate('body', schemaMap);
}
export function params(schemaMap) {
    return validate('params', schemaMap);
}
export function query(schemaMap) {
    return validate('query', schemaMap);
}
//# sourceMappingURL=index.js.map