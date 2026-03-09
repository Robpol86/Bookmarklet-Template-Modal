import jest from "jest-mock";

Object.assign(global, {
    __FNAME_LINENO__: "mocked.mjs:123",
    _localStorage: { getItem: jest.fn(), setItem: jest.fn(), removeItem: jest.fn(), clear: jest.fn() },
    alert: jest.fn(),
});
