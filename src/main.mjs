/**
 * The bookmarklet's main code.
 */

import { logError, logInfo } from "./log.mjs";
import { modal } from "./modal.mjs";
import { sleep } from "./utils.mjs";

/**
 * Remainder of the main function that runs within one modal.
 *
 * Initially show a link. When user clicks the link the modal contents will be replaced with 100 lines of "Hello World x" to
 * test vertical scrolling.
 *
 * @param {HTMLDivElement} dialog - The dialog's main body div.
 */
async function inModal(dialog) {
    logInfo(__FNAME_LINENO__, "Showing initial message");
    const message = document.createElement("a");
    message.textContent = "Click here to expand.";
    message.href = "#";
    message.addEventListener("click", (event) => {
        event.preventDefault();
        logInfo(__FNAME_LINENO__, "Replacing initial message");
        dialog.replaceChildren(
            ...Array.from({ length: 100 }, (_, i) => {
                const p = document.createElement("p");
                p.textContent = `Hello World ${i}`;
                return p;
            }),
        );
    });
    dialog.replaceChildren(message);
    await sleep(0); // Sleep forever (or until user closes dialog)
}

/**
 * Main function.
 */
export async function main() {
    // Enforce single instance.
    if (window.__BOOKMARKLET_MODAL_RUNNING__) return logError(__FNAME_LINENO__, "Another instance already running");
    window.__BOOKMARKLET_MODAL_RUNNING__ = true;

    try {
        // Continue in modal.
        await modal(inModal);
    } finally {
        window.__BOOKMARKLET_MODAL_RUNNING__ = false;
    }
}
