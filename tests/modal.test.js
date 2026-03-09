import { afterEach, beforeEach, describe, expect, jest, test } from "@jest/globals";
import { modal } from "../src/modal.mjs";

describe("modal.mjs", () => {
    beforeEach(() => {
        // Patch createElement to add showModal() and close() methods to dialogs, since jsdom doesn't implement them.
        const originalCreateElement = document.createElement.bind(document);
        jest.spyOn(document, "createElement").mockImplementation((tag, ...args) => {
            const element = originalCreateElement(tag, ...args);
            if (tag === "dialog") {
                element.showModal = jest.fn(() => (element.open = true));
                element.close = jest.fn(() => (element.open = false));
            }
            return element;
        });
    });

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
        test("close immediately", async () => {
            let called = false;

            const result = await modal(() => {
                called = true;
                // TODO assert dialog is in the DOM.
                return; // No sleep means the dialog should close immediately after opening.
            });

            expect(result).toBeUndefined();
            expect(called).toBe(true);
            // TODO assert DOM is back to normal.
        });

        test.todo("closed by user");

        test.todo("closed by wrapped function");

        test.todo("pass arguments to wrapped function");
    });
});
