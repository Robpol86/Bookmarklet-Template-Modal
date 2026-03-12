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

            jest.advanceTimersByTime(100);
            await Promise.resolve();
            expect(resolved).toBe(true);
            await sleepPromise;
        });

        test("sleep forever", async () => {
            let resolved = false;
            const sleepPromise = sleep(0);
            sleepPromise.then(() => (resolved = true));

            jest.advanceTimersByTime(Number.MAX_SAFE_INTEGER);
            await Promise.resolve(); // Flush microtask queue.
            expect(resolved).toBe(false);
        });
    });
});
