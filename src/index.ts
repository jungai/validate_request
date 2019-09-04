import { badData } from '@hapi/boom';
import * as Joi from '@hapi/joi';
import { RequestHandler } from 'express';

export type GetSchemaFunction = (schemaMap: Joi.SchemaMap) => Joi.ObjectSchema;

export function getDefaultSchema(schemaMap: Joi.SchemaMap): Joi.ObjectSchema {
    return Joi.object()
        .keys(schemaMap)
        .required();
}

/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
export function isError(val: any): val is Error {
    return val instanceof Error;
}

export function validate(
    prop: 'body' | 'params' | 'query',
    schemaMap: Joi.SchemaMap,
    getSchema: GetSchemaFunction = getDefaultSchema,
): RequestHandler {
    const schema = getSchema(schemaMap);

    return (req, _res, next): void => {
        const { error } = Joi.validate(req[prop], schema);

        if (!isError(error)) {
            next();

            return;
        }

        next(badData(error.name, error.details));
    };
}

export function body(schemaMap: Joi.SchemaMap, getSchema: GetSchemaFunction = getDefaultSchema): RequestHandler {
    return validate('body', schemaMap, getSchema);
}

export function params(schemaMap: Joi.SchemaMap, getSchema: GetSchemaFunction = getDefaultSchema): RequestHandler {
    return validate('params', schemaMap, getSchema);
}

export function query(schemaMap: Joi.SchemaMap, getSchema: GetSchemaFunction = getDefaultSchema): RequestHandler {
    return validate('query', schemaMap, getSchema);
}
