/**
 * The bookmarklet's main code.
 */

import { logInfo } from "./log.mjs";

/**
 * Main function.
 */
export function main() {
    // Show alert.
    logInfo(__FNAME_LINENO__, "Show alert");
    alert("Hello World");
}
