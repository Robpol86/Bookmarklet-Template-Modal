/** @type {import("jest").Config} */
export default {
    setupFiles: ["./jest.setup.mjs"],
    testEnvironment: "jsdom",
    transform: {},
    moduleNameMapper: {
        "\\.scss$": "<rootDir>/tests/__mocks__/scss.mjs",
    },
};
