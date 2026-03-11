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
        // Patch requestAnimationFrame to resolve immediately, since jsdom doesn't implement it.
        jest.spyOn(global, "requestAnimationFrame").mockImplementation((callback) => callback(0));
    });

    afterEach(() => {
        document.body.innerHTML = "";
        document.head.innerHTML = "";
        jest.clearAllMocks();
    });

    test.todo("closed by close button");

    test.todo("closed by esc");

    test.todo("closed by wrapped function");

    test.todo("propagate abort via signal");

    test.todo("bubble up exceptions");

    test.todo("style removed from head");

    test("close immediately", async () => {
        let dialog;

        const result = await modal((dialogBodyDiv) => {
            expect(requestAnimationFrame).toHaveBeenCalledTimes(1);
            dialog = dialogBodyDiv.closest("dialog");
            expect(dialog.open).toBe(true);
            expect(document.body.children).toHaveLength(1);
            expect(document.head.children).toHaveLength(1);
            return; // No sleep means the dialog should close immediately after opening.
        });

        expect(result).toBeUndefined();
        expect(dialog.open).toBe(false);
        expect(document.body.children).toHaveLength(0);
        expect(document.head.children).toHaveLength(0);
    });

    test.todo("closed by user");

    test.todo("pass arguments to wrapped function");
});
