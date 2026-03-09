import { afterEach, describe, expect, jest, test } from "@jest/globals";
import { modal } from "../src/modal.mjs";

describe("modal.mjs", () => {
    afterEach(() => {
        document.body.innerHTML = "";
        document.head.innerHTML = "";
        jest.clearAllMocks();
    });

    describe("displayModal()", () => {
        test.todo("closed by close button");

        test.todo("closed by esc");

        test.todo("closed by wrapped function");

        test.todo("propagate abort via signal");

        test.todo("bubble up exceptions");

        test.todo("style removed from head");
    });

    describe("modal()", () => {
        test.skip("close immediately", async () => {
            const result = await modal(() => {
                // No sleep means the dialog should close immediately after opening.
            });
            expect(result).toBeUndefined();
            // TODO assert DOM is back to normal.
        });

        test.todo("closed by user");

        test.todo("closed by wrapped function");

        test.todo("pass arguments to wrapped function");
    });
});
