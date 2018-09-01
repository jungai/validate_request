import Joi = require('joi');
import { validate } from './index';

it('should call next function with badData error', () => {
    const schemaMap = {
        a: Joi.string(),
        b: Joi.string().required(),
    };

    const middleware = validate('body', schemaMap);

    const mockReq = {} as any;
    const mockRes = {} as any;
    const mockNextFn = jest.fn();

    // tslint:disable-next-line:no-unsafe-any
    middleware(mockReq, mockRes, mockNextFn);

    expect(mockNextFn.mock.calls.length).toBe(1);

    expect(mockNextFn.mock.calls[0][0]).toBeInstanceOf(Error);

    // tslint:disable-next-line:no-unsafe-any
    expect(mockNextFn.mock.calls[0][0].output.statusCode).toBe(422);
});

it('should call next function with no param', () => {
    const schemaMap = {
        a: Joi.string(),
        b: Joi.string().required(),
    };

    const middleware = validate('body', schemaMap);

    const mockReq = {
        body: {
            b: 'b',
        },
    } as any;
    const mockRes = {} as any;
    const mockNextFn = jest.fn();

    // tslint:disable-next-line:no-unsafe-any
    middleware(mockReq, mockRes, mockNextFn);

    expect(mockNextFn.mock.calls.length).toBe(1);

    expect(mockNextFn.mock.calls[0]).toHaveLength(0);
});
