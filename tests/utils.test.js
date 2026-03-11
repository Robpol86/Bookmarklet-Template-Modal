import { afterEach, beforeEach, describe, expect, jest, test } from "@jest/globals";
import { sleep } from "../src/utils.mjs";

describe("utils.mjs", () => {
    describe("sleep()", () => {
        beforeEach(() => {
            jest.useFakeTimers();
        });

        afterEach(() => {
            jest.clearAllTimers();
            jest.useRealTimers();
        });

        test("sleep 60s", async () => {
            let resolved = false;
            const sleepPromise = sleep(60);
            sleepPromise.then(() => (resolved = true));

            jest.advanceTimersByTime(59900);
            await Promise.resolve(); // Flush microtask queue.
            expect(resolved).toBe(false);
            // expect(sleepPromise).resolves.toBeDefined(); // TODO?

            jest.advanceTimersByTime(100);
            await Promise.resolve();
            expect(resolved).toBe(true);
            expect(sleepPromise).resolves.toBeUndefined();
        });

        test.todo("sleep forever");
    });
});
