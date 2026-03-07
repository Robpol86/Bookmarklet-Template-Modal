/**
 * Entrypoint of the bookmarklet.
 */

import { logInfo } from "./log.mjs";
import { main } from "./main.mjs";

/**
 * Entrypoint function of the bookmarklet.
 */
function entrypoint() {
    logInfo(__FNAME_LINENO__, "Start");
    try {
        main();
    } finally {
        logInfo(__FNAME_LINENO__, "End");
    }
}

// Call immediately (required for Terser to produce IIFE).
entrypoint();
