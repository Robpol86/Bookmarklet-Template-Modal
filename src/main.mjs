/**
 * The bookmarklet's main code.
 */

import { logError, logInfo } from "./log.mjs";
import { modal } from "./modal.mjs";
import { sleep } from "./utils.mjs";

/**
 * Remainder of the main function that runs within one modal.
 *
 * @param {HTMLDivElement} dialog - The dialog's main body div.
 */
async function inModal(dialog) {
    logInfo(__FNAME_LINENO__, "Showing message");
    // TODO first show just Hello World. Show button same line (right justified) when clicked replaces Hello World with the
    // 100 lines below.
    dialog.replaceChildren(
        ...Array.from({ length: 100 }, (_, i) => {
            const p = document.createElement("p");
            p.textContent = `Hello World ${i}`;
            return p;
        }),
    );
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
