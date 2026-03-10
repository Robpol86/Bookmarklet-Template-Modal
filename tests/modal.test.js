import { CSS_PREFIX, modal } from "../src/modal.mjs";
import { afterAll, afterEach, beforeAll, describe, expect, jest, test } from "@jest/globals";
import { sleep } from "../src/utils.mjs";

describe("modal.mjs", () => {
    beforeAll(() => {
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
    });

    afterAll(() => {
        jest.clearAllMocks();
    });

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

    test("closed by close button", async () => {
        let closeButtonSetResolveFn;
        const closeButtonSetPromise = new Promise((resolve) => (closeButtonSetResolveFn = resolve));
        const callback = async (dialogBodyDiv) => {
            const dialog = dialogBodyDiv.closest("dialog");
            const closeButton = document.getElementById(`${CSS_PREFIX}closeButtonX`);
            closeButtonSetResolveFn([dialog, closeButton]);
            await sleep(0); // Sleep forever (or until close button is pressed)
        };
        const modalPromise = modal(callback); // Modal will open and callback will eventually be called

        const [dialog, closeButton] = await closeButtonSetPromise; // Wait for callback to reach the sleep function
        expect(dialog.open).toBe(true);

        closeButton.click();
        const result = await modalPromise;
        expect(result).toBeUndefined();
        expect(dialog.open).toBe(false);
    });

    test.todo("closed by esc");

    test.todo("propagate abort via signal");

    test.todo("bubble up exceptions");

    test.todo("pass arguments to wrapped function");
});
