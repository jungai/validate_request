import * as Joi from '@hapi/joi';
import { RequestHandler } from 'express';
export declare type GetSchemaFunction = (schemaMap: Joi.SchemaMap) => Joi.ObjectSchema;
export declare function getDefaultSchema(schemaMap: Joi.SchemaMap): Joi.ObjectSchema;
export declare function isError(val: any): val is Error;
export declare function validate(prop: 'body' | 'params' | 'query', schemaMap: Joi.SchemaMap, getSchema?: GetSchemaFunction): RequestHandler;
export declare function body(schemaMap: Joi.SchemaMap, getSchema?: GetSchemaFunction): RequestHandler;
export declare function params(schemaMap: Joi.SchemaMap, getSchema?: GetSchemaFunction): RequestHandler;
export declare function query(schemaMap: Joi.SchemaMap, getSchema?: GetSchemaFunction): RequestHandler;
//# sourceMappingURL=index.d.ts.map