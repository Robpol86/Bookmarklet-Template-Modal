import { PROJECT_KEY, logDebug, logError, logInfo } from "../src/log.mjs";
import { afterEach, beforeEach, describe, expect, jest, test } from "@jest/globals";
import { modal } from "../src/modal.mjs";

describe("log.mjs", () => {
    let spyConsoleDebug;
    let spyConsoleError;
    let spyConsoleLog;

    beforeEach(() => {
        spyConsoleDebug = jest.spyOn(console, "debug").mockImplementation(() => {});
        spyConsoleError = jest.spyOn(console, "error").mockImplementation(() => {});
        spyConsoleLog = jest.spyOn(console, "log").mockImplementation(() => {});
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe("logError()", () => {
        test("assert modal", () => {
            expect(modal).toBeDefined();
        });

        test("calls console.error", () => {
            logError("log message");
            expect(spyConsoleError).toHaveBeenCalledTimes(1);
        });

        test("prefixes output with PROJECT_KEY", () => {
            logError("log message");
            expect(spyConsoleError).toHaveBeenCalledWith(PROJECT_KEY, "log message");
        });

        test("does not call console.log or console.debug", () => {
            logError("log message");
            expect(spyConsoleLog).not.toHaveBeenCalled();
            expect(spyConsoleDebug).not.toHaveBeenCalled();
        });

        test("passes additional arguments to console.error", () => {
            const err = new Error("boom");
            logError("log message", err, { context: 42 });
            expect(spyConsoleError).toHaveBeenCalledWith(PROJECT_KEY, "log message", err, { context: 42 });
        });

        test("works with no additional arguments", () => {
            expect(() => logError("bare message")).not.toThrow();
        });
    });

    describe("logInfo()", () => {
        test("calls console.log", () => {
            logInfo("log message");
            expect(spyConsoleLog).toHaveBeenCalledTimes(1);
        });

        test("prefixes output with PROJECT_KEY", () => {
            logInfo("log message");
            expect(spyConsoleLog).toHaveBeenCalledWith(PROJECT_KEY, "log message");
        });

        test("does not call console.error or console.debug", () => {
            logInfo("log message");
            expect(spyConsoleError).not.toHaveBeenCalled();
            expect(spyConsoleDebug).not.toHaveBeenCalled();
        });

        test("passes additional arguments to console.log", () => {
            logInfo("user loaded", { id: 7 }, "extra");
            expect(spyConsoleLog).toHaveBeenCalledWith(PROJECT_KEY, "user loaded", { id: 7 }, "extra");
        });

        test("works with no additional arguments", () => {
            expect(() => logInfo("bare message")).not.toThrow();
        });
    });

    describe("logDebug()", () => {
        test("calls console.debug", () => {
            logDebug("checkpoint reached");
            expect(spyConsoleDebug).toHaveBeenCalledTimes(1);
        });

        test("prefixes output with PROJECT_KEY", () => {
            logDebug("checkpoint reached");
            expect(spyConsoleDebug).toHaveBeenCalledWith(PROJECT_KEY, "checkpoint reached");
        });

        test("does not call console.error or console.log", () => {
            logDebug("checkpoint reached");
            expect(spyConsoleError).not.toHaveBeenCalled();
            expect(spyConsoleLog).not.toHaveBeenCalled();
        });

        test("passes additional arguments to console.debug", () => {
            logDebug("state", { x: 1 }, [2, 3]);
            expect(spyConsoleDebug).toHaveBeenCalledWith(PROJECT_KEY, "state", { x: 1 }, [2, 3]);
        });

        test("works with no additional arguments", () => {
            expect(() => logDebug("bare message")).not.toThrow();
        });
    });

    describe("PROJECT_KEY isolation", () => {
        test("each logger uses the same PROJECT_KEY prefix", () => {
            logError("e");
            logInfo("i");
            logDebug("d");

            expect(spyConsoleError.mock.calls[0][0]).toBe(PROJECT_KEY);
            expect(spyConsoleLog.mock.calls[0][0]).toBe(PROJECT_KEY);
            expect(spyConsoleDebug.mock.calls[0][0]).toBe(PROJECT_KEY);
        });
    });
});
