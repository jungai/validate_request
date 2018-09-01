"use strict";
// tslint:disable:no-unsafe-any
Object.defineProperty(exports, "__esModule", { value: true });
const boom_1 = require("boom");
const Joi = require("joi");
const index_1 = require("./index");
it('should fail, call next(error), if prop is not found (empty schemaMap)', () => {
    const schemaMap = {};
    const middleware = index_1.validate('query', schemaMap);
    const mockReq = {};
    const mockRes = {};
    const mockNextFn = jest.fn();
    middleware(mockReq, mockRes, mockNextFn);
    expect(mockNextFn.mock.calls.length).toBe(1);
    expect(mockNextFn.mock.calls[0][0]).toBeInstanceOf(Error);
    expect(boom_1.isBoom(mockNextFn.mock.calls[0][0])).toBe(true);
    expect(mockNextFn.mock.calls[0][0].output.statusCode).toBe(422);
});
it('should fail, call next(error), if prop is undefined (empty schemaMap)', () => {
    const schemaMap = {};
    const middleware = index_1.validate('query', schemaMap);
    const mockReq = {
        query: undefined,
    };
    const mockRes = {};
    const mockNextFn = jest.fn();
    middleware(mockReq, mockRes, mockNextFn);
    expect(mockNextFn.mock.calls.length).toBe(1);
    expect(mockNextFn.mock.calls[0][0]).toBeInstanceOf(Error);
    expect(boom_1.isBoom(mockNextFn.mock.calls[0][0])).toBe(true);
    expect(mockNextFn.mock.calls[0][0].output.statusCode).toBe(422);
});
it('should pass, call next(), if prop is empty object (empty schemaMap)', () => {
    const schemaMap = {};
    const middleware = index_1.validate('query', schemaMap);
    const mockReq = { query: {} };
    const mockRes = {};
    const mockNextFn = jest.fn();
    middleware(mockReq, mockRes, mockNextFn);
    expect(mockNextFn.mock.calls.length).toBe(1);
    expect(mockNextFn.mock.calls[0]).toHaveLength(0);
});
it('should fail, call next(error), if prop condition not match (invalid type)', () => {
    const schemaMap = {
        a: Joi.string(),
    };
    const middleware = index_1.validate('body', schemaMap);
    const mockReq = { body: { a: 1 } };
    const mockRes = {};
    const mockNextFn = jest.fn();
    middleware(mockReq, mockRes, mockNextFn);
    expect(mockNextFn.mock.calls.length).toBe(1);
    expect(mockNextFn.mock.calls[0][0]).toBeInstanceOf(Error);
    expect(boom_1.isBoom(mockNextFn.mock.calls[0][0])).toBe(true);
    expect(mockNextFn.mock.calls[0][0].output.statusCode).toBe(422);
});
it('should fail, call next(error), if prop condition not match (undefined)', () => {
    const schemaMap = {
        a: Joi.string().required(),
    };
    const middleware = index_1.validate('body', schemaMap);
    const mockReq = { body: {} };
    const mockRes = {};
    const mockNextFn = jest.fn();
    middleware(mockReq, mockRes, mockNextFn);
    expect(mockNextFn.mock.calls.length).toBe(1);
    expect(mockNextFn.mock.calls[0][0]).toBeInstanceOf(Error);
    expect(boom_1.isBoom(mockNextFn.mock.calls[0][0])).toBe(true);
    expect(mockNextFn.mock.calls[0][0].output.statusCode).toBe(422);
});
it('should pass, call next(), if prop conditon match', () => {
    const schemaMap = {
        a: Joi.string().required(),
    };
    const middleware = index_1.validate('query', schemaMap);
    const mockReq = { query: { a: 'a' } };
    const mockRes = {};
    const mockNextFn = jest.fn();
    middleware(mockReq, mockRes, mockNextFn);
    expect(mockNextFn.mock.calls.length).toBe(1);
    expect(mockNextFn.mock.calls[0]).toHaveLength(0);
});
