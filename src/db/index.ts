import "server-only";

/**
 * The app-facing database entry point. The `server-only` guard makes any
 * accidental client-component import a build error instead of a leaked
 * credential.
 */
export { db, client, schema } from "./client";
