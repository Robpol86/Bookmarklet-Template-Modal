/**
 * Entrypoint of the bookmarklet.
 */

import { logInfo } from "./log.mjs";
import { main } from "./main.mjs";

/**
 * Entrypoint function of the bookmarklet.
 */
async function entrypoint() {
    logInfo(__FNAME_LINENO__, "Start");
    try {
        await main();
    } finally {
        logInfo(__FNAME_LINENO__, "End");
    }
}

// Call immediately (required for Terser to produce IIFE).
entrypoint();
