import { RequestHandler } from 'express';
import * as Joi from 'joi';
export declare function getSchema(schemaMap: Joi.SchemaMap): Joi.ObjectSchema;
export declare function isError(val: any): val is Error;
export declare function validate(prop: 'body' | 'params' | 'query', schemaMap: Joi.SchemaMap): RequestHandler;
export declare function body(schemaMap: Joi.SchemaMap): RequestHandler;
export declare function params(schemaMap: Joi.SchemaMap): RequestHandler;
export declare function query(schemaMap: Joi.SchemaMap): RequestHandler;
