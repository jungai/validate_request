import { badData } from 'boom';
import { RequestHandler } from 'express';
import { object as joiObject, SchemaMap, validate as joiValidate } from 'joi';

export function getSchema(schemaMap: SchemaMap) {
    return joiObject()
        .keys(schemaMap)
        .required();
}

// tslint:disable-next-line no-any
export function isError(val: any): val is Error {
    return val instanceof Error;
}

export function validate(prop: 'body' | 'params' | 'query', schemaMap: SchemaMap): RequestHandler {
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

export function body(schemaMap: SchemaMap) {
    return validate('body', schemaMap);
}

export function params(schemaMap: SchemaMap) {
    return validate('params', schemaMap);
}

export function query(schemaMap: SchemaMap) {
    return validate('query', schemaMap);
}
