/**
 * The bookmarklet's main code.
 */

import { logError, logInfo } from "./log.mjs";
import { modal } from "./modal.mjs";
import { sleep } from "./utils.mjs";

/**
 * Remainder of the main function that runs within one modal.
 *
 * TODO abortsignal?
 *
 * @param {Element} dialog - The dialog's main body div.
 */
async function inModal(dialog) {
    logInfo(__FNAME_LINENO__, "Start");

    // Show message.
    const message = document.createElement("p");
    message.textContent = "Hello World";
    dialog.replaceChildren(message);
    await sleep(0); // Sleep forever (or until user closes dialog)

    logInfo(__FNAME_LINENO__, "End"); // TODO dead code
}

/**
 * Main function.
 */
export async function main() {
    // Enforce single instance. // TODO revisit, race condition
    if (window.__BOOKMARKLET_MODAL_RUNNING__) return logError(__FNAME_LINENO__, "Another instance already running.");
    window.__BOOKMARKLET_MODAL_RUNNING__ = true;

    try {
        // Continue in modal.
        await modal(inModal);
    } finally {
        window.__BOOKMARKLET_MODAL_RUNNING__ = false;
    }
}
