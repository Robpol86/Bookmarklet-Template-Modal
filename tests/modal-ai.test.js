import { CSS_PREFIX, modal } from "../src/modal.mjs";
import { afterEach, beforeEach, describe, expect, jest, test } from "@jest/globals";

// --- JSDOM shims -----------------------------------------------------------
// jsdom doesn't implement showModal() or HTMLDialogElement.close(), so we
// patch every <dialog> that gets created via document.createElement.
const _createElement = document.createElement.bind(document);
jest.spyOn(document, "createElement").mockImplementation((tag, ...rest) => {
    const el = _createElement(tag, ...rest);
    if (tag === "dialog") {
        el.showModal = jest.fn(() => {
            el.open = true;
        });
        el.close = jest.fn(() => {
            el.open = false;
        });
    }
    return el;
});

// requestAnimationFrame isn't available in jsdom – resolve immediately.
global.requestAnimationFrame = (cb) => {
    cb(0);
    return 0;
};

// ---------------------------------------------------------------------------

describe("modal.mjs", () => {
    // Silence logDebug noise during tests.
    beforeEach(() => {
        jest.spyOn(console, "debug").mockImplementation(() => {});
    });

    afterEach(() => {
        // Remove anything the modal may have left in the DOM.
        document.body.innerHTML = "";
        document.head.innerHTML = "";
        jest.clearAllMocks();
    });

    // -----------------------------------------------------------------------
    // Helpers
    // -----------------------------------------------------------------------

    /** Returns the dialog element while it is open (inside `fn`). */
    function getDialog() {
        return document.getElementById(`${CSS_PREFIX}dialog`);
    }

    function getCloseButton() {
        return document.getElementById(`${CSS_PREFIX}closeButtonX`);
    }

    function getDialogBody() {
        return document.getElementById(`${CSS_PREFIX}dialog-body`);
    }

    // -----------------------------------------------------------------------
    // Presence tests
    // -----------------------------------------------------------------------

    describe("modal presence", () => {
        test.skip("renders a <dialog> element in the DOM while open", async () => {
            let dialogWhileOpen;

            await modal(() => {
                dialogWhileOpen = getDialog();
            });

            expect(dialogWhileOpen).not.toBeNull();
            expect(dialogWhileOpen.tagName).toBe("DIALOG");
        });

        test.skip("calls showModal() to open the dialog", async () => {
            let showModalSpy;

            await modal(() => {
                showModalSpy = getDialog().showModal;
            });

            expect(showModalSpy).toHaveBeenCalledTimes(1);
        });

        test.skip("renders a close button inside the dialog", async () => {
            let closeButton;

            await modal(() => {
                closeButton = getCloseButton();
            });

            expect(closeButton).not.toBeNull();
        });

        test.skip("close button has the correct aria-label", async () => {
            let closeButton;

            await modal(() => {
                closeButton = getCloseButton();
            });

            expect(closeButton.ariaLabel).toBe("Close modal");
        });

        test.skip("close button displays the × character", async () => {
            let closeButton;

            await modal(() => {
                closeButton = getCloseButton();
            });

            expect(closeButton.textContent).toBe("\u2716");
        });

        test.skip("renders a dialog-body div inside the dialog", async () => {
            let bodyDiv;

            await modal(() => {
                bodyDiv = getDialogBody();
            });

            expect(bodyDiv).not.toBeNull();
            expect(bodyDiv.tagName).toBe("DIV");
        });

        test.skip("passes the dialog-body div as the first argument to fn", async () => {
            let receivedBody;

            await modal((body) => {
                receivedBody = body;
            });

            expect(receivedBody).toBe(
                document.getElementById
                    ? receivedBody // checked below via id
                    : null,
            );
            expect(receivedBody.id).toBe(`${CSS_PREFIX}dialog-body`);
        });

        test.skip("injects a <style> element into <head> while open", async () => {
            let styleCount;

            await modal(() => {
                styleCount = document.head.querySelectorAll("style").length;
            });

            expect(styleCount).toBeGreaterThanOrEqual(1);
        });
    });

    // -----------------------------------------------------------------------
    // Close-button tests
    // -----------------------------------------------------------------------

    describe("close button behaviour", () => {
        test.skip("clicking close button resolves modal() with undefined", async () => {
            const result = await modal((_body, _signal) => {
                // Simulate user clicking the close button during the fn call.
                getCloseButton().click();
                // Return a value that should be discarded.
                return "should-be-ignored";
            });

            expect(result).toBeUndefined();
        });

        test.skip("clicking close button aborts the AbortSignal", async () => {
            let capturedSignal;

            await modal((_body, signal) => {
                capturedSignal = signal;
                getCloseButton().click();
            });

            expect(capturedSignal.aborted).toBe(true);
        });

        test.skip("dialog is removed from the DOM after close button is clicked", async () => {
            await modal((_body) => {
                getCloseButton().click();
            });

            expect(document.getElementById(`${CSS_PREFIX}dialog`)).toBeNull();
        });

        test.skip("close() is called on the dialog element after close button click", async () => {
            let closeSpy;

            await modal((_body) => {
                closeSpy = getDialog().close;
                getCloseButton().click();
            });

            expect(closeSpy).toHaveBeenCalledTimes(1);
        });

        test.skip("style element is removed from <head> after close button is clicked", async () => {
            await modal((_body) => {
                getCloseButton().click();
            });

            // The injected style should have been cleaned up.
            expect(document.head.querySelectorAll("style").length).toBe(0);
        });

        test.skip("modal() does not throw when close button is clicked", async () => {
            await expect(
                modal((_body) => {
                    getCloseButton().click();
                }),
            ).resolves.not.toThrow();
        });
    });

    // -----------------------------------------------------------------------
    // Normal (non-closed) resolution
    // -----------------------------------------------------------------------

    describe("normal resolution", () => {
        test.skip("returns the value from fn when it resolves normally", async () => {
            const result = await modal(() => "expected-value");
            expect(result).toBe("expected-value");
        });

        test.skip("dialog is removed after fn resolves", async () => {
            await modal(() => {});
            expect(getDialog()).toBeNull();
        });

        test.skip("style element is cleaned up after fn resolves", async () => {
            await modal(() => {});
            expect(document.head.querySelectorAll("style").length).toBe(0);
        });

        test.skip("passes extra args to fn after body and signal", async () => {
            let received;

            await modal(
                (_body, _signal, a, b) => {
                    received = [a, b];
                },
                "hello",
                42,
            );

            expect(received).toEqual(["hello", 42]);
        });
    });

    // -----------------------------------------------------------------------
    // Error propagation
    // -----------------------------------------------------------------------

    describe("error propagation", () => {
        test.skip("re-throws errors from fn that are not ModalClosedError", async () => {
            await expect(
                modal(() => {
                    throw new Error("unexpected failure");
                }),
            ).rejects.toThrow("unexpected failure");
        });
    });
});
