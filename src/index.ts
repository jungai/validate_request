import { badData } from '@hapi/boom';
import { object as joiObject, SchemaMap, validate as joiValidate, ObjectSchema } from '@hapi/joi';
import { RequestHandler } from 'express';

export type GetSchemaFunction = (schemaMap: SchemaMap) => ObjectSchema;

export function getDefaultSchema(schemaMap: SchemaMap): ObjectSchema {
    return joiObject()
        .keys(schemaMap)
        .required();
}

/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
export function isError(val: any): val is Error {
    return val instanceof Error;
}

export function validate(
    prop: 'body' | 'params' | 'query',
    schemaMap: SchemaMap,
    getSchema: GetSchemaFunction = getDefaultSchema,
): RequestHandler {
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

export function body(schemaMap: SchemaMap, getSchema: GetSchemaFunction = getDefaultSchema) {
    return validate('body', schemaMap, getSchema);
}

export function params(schemaMap: SchemaMap, getSchema: GetSchemaFunction = getDefaultSchema) {
    return validate('params', schemaMap, getSchema);
}

export function query(schemaMap: SchemaMap, getSchema: GetSchemaFunction = getDefaultSchema) {
    return validate('query', schemaMap, getSchema);
}
