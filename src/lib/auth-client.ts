import { createAuthClient } from "better-auth/react"; // make sure to import from better-auth/react
import { getBaseUrl } from "./utils";

export const authClient = createAuthClient({
  baseURL: getBaseUrl(),
});
