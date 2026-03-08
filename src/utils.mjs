/**
 * Common strings, functions, and objects used throughout the bookmarklet.
 */

import { logDebug } from "./log.mjs";

/**
 * Async sleep.
 *
 * @param {number} seconds - Duration to sleep, in seconds.
 *
 * @returns {Promise<void>} A promise that resolves after the delay.
 */
export function sleep(seconds) {
    if (seconds > 0) {
        logDebug(__FNAME_LINENO__, `sleeping ${seconds} second${seconds === 1 ? "" : "s"}`);
        return new Promise((resolve) => setTimeout(resolve, seconds * 1000));
    }
    logDebug(__FNAME_LINENO__, "sleeping forever");
    return new Promise(() => {});
}
