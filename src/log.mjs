/**
 * Logging functions.
 */

export const PROJECT_KEY = "BOOKMARKLET-MODAL";

/**
 * Log an error.
 *
 * @param {string} message - Log message.
 * @param {...*} args - Additional arguments passed to console.error().
 */
export function logError(message, ...args) {
    console.error(PROJECT_KEY, message, ...args);
}

/**
 * Log an info message.
 *
 * @param {string} message - Log message.
 * @param {...*} args - Additional arguments passed to console.log().
 */
export function logInfo(message, ...args) {
    console.log(PROJECT_KEY, message, ...args);
}

/**
 * Log a debug message.
 *
 * @param {string} message - Log message.
 * @param {...*} args - Additional arguments passed to console.debug().
 */
export function logDebug(message, ...args) {
    console.debug(PROJECT_KEY, message, ...args);
}
