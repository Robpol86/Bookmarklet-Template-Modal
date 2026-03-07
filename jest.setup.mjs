import jest from "jest-mock";

Object.assign(global, {
    alert: jest.fn(),
    _localStorage: { getItem: jest.fn(), setItem: jest.fn(), removeItem: jest.fn(), clear: jest.fn() },
});
