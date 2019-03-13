import { isBoom } from 'boom';
import * as Joi from 'joi';
import { validate } from './index';

it('should fail, call next(error), if prop is not found (empty schemaMap)', () => {
    const schemaMap = {};

    const middleware = validate('query', schemaMap);

    const mockReq = {} as any;
    const mockRes = {} as any;
    const mockNextFn = jest.fn();

    middleware(mockReq, mockRes, mockNextFn);

    expect(mockNextFn.mock.calls.length).toBe(1);
    expect(mockNextFn.mock.calls[0][0]).toBeInstanceOf(Error);
    expect(isBoom(mockNextFn.mock.calls[0][0])).toBe(true);
    expect(mockNextFn.mock.calls[0][0].output.statusCode).toBe(422);
});

it('should fail, call next(error), if prop is undefined (empty schemaMap)', () => {
    const schemaMap = {};

    const middleware = validate('query', schemaMap);

    const mockReq = {
        query: undefined,
    } as any;
    const mockRes = {} as any;
    const mockNextFn = jest.fn();

    middleware(mockReq, mockRes, mockNextFn);

    expect(mockNextFn.mock.calls.length).toBe(1);
    expect(mockNextFn.mock.calls[0][0]).toBeInstanceOf(Error);
    expect(isBoom(mockNextFn.mock.calls[0][0])).toBe(true);
    expect(mockNextFn.mock.calls[0][0].output.statusCode).toBe(422);
});

it('should pass, call next(), if prop is empty object (empty schemaMap)', () => {
    const schemaMap = {};

    const middleware = validate('query', schemaMap);

    const mockReq = { query: {} } as any;
    const mockRes = {} as any;
    const mockNextFn = jest.fn();

    middleware(mockReq, mockRes, mockNextFn);

    expect(mockNextFn.mock.calls.length).toBe(1);
    expect(mockNextFn.mock.calls[0]).toHaveLength(0);
});

it('should fail, call next(error), if prop condition not match (invalid type)', () => {
    const schemaMap = {
        a: Joi.string(),
    };

    const middleware = validate('body', schemaMap);

    const mockReq = { body: { a: 1 } } as any;
    const mockRes = {} as any;
    const mockNextFn = jest.fn();

    middleware(mockReq, mockRes, mockNextFn);

    expect(mockNextFn.mock.calls.length).toBe(1);
    expect(mockNextFn.mock.calls[0][0]).toBeInstanceOf(Error);
    expect(isBoom(mockNextFn.mock.calls[0][0])).toBe(true);
    expect(mockNextFn.mock.calls[0][0].output.statusCode).toBe(422);
});

it('should fail, call next(error), if prop condition not match (undefined)', () => {
    const schemaMap = {
        a: Joi.string().required(),
    };

    const middleware = validate('body', schemaMap);

    const mockReq = { body: {} } as any;
    const mockRes = {} as any;
    const mockNextFn = jest.fn();

    middleware(mockReq, mockRes, mockNextFn);

    expect(mockNextFn.mock.calls.length).toBe(1);
    expect(mockNextFn.mock.calls[0][0]).toBeInstanceOf(Error);
    expect(isBoom(mockNextFn.mock.calls[0][0])).toBe(true);
    expect(mockNextFn.mock.calls[0][0].output.statusCode).toBe(422);
});

it('should pass, call next(), if prop conditon match', () => {
    const schemaMap = {
        a: Joi.string().required(),
    };

    const middleware = validate('query', schemaMap);

    const mockReq = { query: { a: 'a' } } as any;
    const mockRes = {} as any;
    const mockNextFn = jest.fn();

    middleware(mockReq, mockRes, mockNextFn);

    expect(mockNextFn.mock.calls.length).toBe(1);
    expect(mockNextFn.mock.calls[0]).toHaveLength(0);
});
