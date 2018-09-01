import { badData } from 'boom';
import { RequestHandler } from 'express';
import * as Joi from 'joi';

export function getSchema(schemaMap: Joi.SchemaMap) {
    return Joi.object()
        .keys(schemaMap)
        .required();
}

export function isError(val: any): val is Error {
    return val instanceof Error;
}

export function validate(prop: 'body' | 'params' | 'query', schemaMap: Joi.SchemaMap): RequestHandler {
    const schema = getSchema(schemaMap);

    return (req, _res, next) => {
        const { error } = Joi.validate(req[prop], schema);

        if (!isError(error)) {
            next();

            return;
        }

        next(badData(error.name, error.details));
    };
}

export function body(schemaMap: Joi.SchemaMap) {
    return validate('body', schemaMap);
}

export function params(schemaMap: Joi.SchemaMap) {
    return validate('params', schemaMap);
}

export function query(schemaMap: Joi.SchemaMap) {
    return validate('query', schemaMap);
}
