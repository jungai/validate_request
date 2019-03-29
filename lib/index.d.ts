import { RequestHandler } from 'express';
import { SchemaMap, ObjectSchema } from 'joi';
export declare type GetSchemaFunction = (schemaMap: SchemaMap) => ObjectSchema;
export declare function getDefaultSchema(schemaMap: SchemaMap): ObjectSchema;
export declare function isError(val: any): val is Error;
export declare function validate(prop: 'body' | 'params' | 'query', schemaMap: SchemaMap, getSchema?: GetSchemaFunction): RequestHandler;
export declare function body(schemaMap: SchemaMap, getSchema?: GetSchemaFunction): RequestHandler;
export declare function params(schemaMap: SchemaMap, getSchema?: GetSchemaFunction): RequestHandler;
export declare function query(schemaMap: SchemaMap, getSchema?: GetSchemaFunction): RequestHandler;
//# sourceMappingURL=index.d.ts.map