import { RequestHandler } from 'express';
import { SchemaMap } from 'joi';
export declare function getSchema(schemaMap: SchemaMap): import("joi").ObjectSchema;
export declare function isError(val: any): val is Error;
export declare function validate(prop: 'body' | 'params' | 'query', schemaMap: SchemaMap): RequestHandler;
export declare function body(schemaMap: SchemaMap): RequestHandler;
export declare function params(schemaMap: SchemaMap): RequestHandler;
export declare function query(schemaMap: SchemaMap): RequestHandler;
//# sourceMappingURL=index.d.ts.map