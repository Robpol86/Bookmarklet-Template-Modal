import { fn } from "jest-mock";

Object.assign(global, {
    __FNAME_LINENO__: "__FNAME_LINENO__:0",
    _localStorage: { getItem: fn(), setItem: fn(), removeItem: fn(), clear: fn() },
    alert: fn(),
});
