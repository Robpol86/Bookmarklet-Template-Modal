import jest from "jest-mock";

Object.assign(global, {
    __FNAME_LINENO__: "__FNAME_LINENO__:0",
    _localStorage: { getItem: jest.fn(), setItem: jest.fn(), removeItem: jest.fn(), clear: jest.fn() },
    alert: jest.fn(),
});
