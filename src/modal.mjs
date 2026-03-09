/**
 * Implements a native javascript modal using the dialog element.
 *
 * Based on Lucas Menezes's post: https://dev.to/lucasm/amazing-native-modal-with-just-html-meet-element-4jpl
 */

import css from "./modal.scss";
import { logDebug } from "./log.mjs";

export const CSS_PREFIX = "bkmrklt-mdl-";
const MODAL_CLOSED_ERROR = "ModalClosedError";

/**
 * Create a modal, yields to the wrapped function call, and then removes the modal when wrapped function call ends.
 *
 * @param {(dialog: HTMLDivElement, signal: AbortSignal, ...args: *) => (Promise<*>|*)} fn - Wrapped function to call.
 * @param {...*} args - Arguments to pass to the wrapped function after dialog and signal.
 *
 * @returns {Promise<*|undefined>} -
 *      The value returned by the wrapped function or undefined if the modal was closed by the user.
 */
async function displayModal(fn, ...args) {
    // Import styles from css.
    const style = document.createElement("style");
    style.textContent = css;
    document.head.appendChild(style);

    // Create dialog element.
    const dialog = document.createElement("dialog");
    dialog.id = `${CSS_PREFIX}dialog`;
    const closeButton = document.createElement("button");
    closeButton.id = `${CSS_PREFIX}closeButtonX`;
    closeButton.ariaLabel = "Close modal";
    closeButton.textContent = "\u2716";
    dialog.appendChild(closeButton);
    document.body.appendChild(dialog);

    // Hook up close button to an AbortController.
    const abortController = new AbortController();
    const abortSignal = abortController.signal;
    const abortPromise = new Promise((_, reject) => {
        const abortFn = (event) => {
            if (abortSignal.aborted) return;
            event?.preventDefault();
            logDebug(__FNAME_LINENO__, "Modal closed by user, sending abort signal.");
            abortController.abort();
            reject(new DOMException("Modal closed by user", MODAL_CLOSED_ERROR));
        };
        closeButton.addEventListener("click", abortFn);
        dialog.addEventListener("cancel", abortFn);
    });

    // Show the modal and run wrapped function.
    const dialogBodyDiv = document.createElement("div");
    dialogBodyDiv.id = `${CSS_PREFIX}dialog-body`;
    dialog.appendChild(dialogBodyDiv);
    await new Promise((resolve) => requestAnimationFrame(resolve)); // Notify browser DOM is about to change
    dialog.showModal();
    const wrappedPromise = Promise.resolve(fn(dialogBodyDiv, abortSignal, ...args)).catch((error) => {
        if (abortSignal.aborted) {
            logDebug(__FNAME_LINENO__, "Wrapped function rejected after modal abort", error);
            return new Promise(() => {});
        }
        throw error;
    });
    try {
        return await Promise.race([wrappedPromise, abortPromise]);
    } finally {
        // Clean up.
        dialog.close();
        dialog.remove();
        style.remove();
    }
}

/**
 * Displays a modal whilst the wrapped function is being called.
 *
 * The wrapped function is called as:
 *  fn(dialogBodyDiv, abortSignal, ...args)
 *
 * @param {(dialog: HTMLDivElement, signal: AbortSignal, ...args: *) => (Promise<*>|*)} fn - Wrapped function to call.
 * @param {...*} args - Arguments to pass to the wrapped function after dialog and signal.
 *
 * @returns {Promise<*|undefined>} -
 *      The value returned by the wrapped function or undefined if the modal was closed by the user.
 */
export async function modal(fn, ...args) {
    try {
        return await displayModal(fn, ...args);
    } catch (error) {
        if (error?.name === MODAL_CLOSED_ERROR) {
            logDebug(__FNAME_LINENO__, "Modal was closed by the user");
            return undefined;
        } else {
            throw error;
        }
    }
}
