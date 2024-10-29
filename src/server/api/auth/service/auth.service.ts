import "server-only"

import { Logger } from "@/utils/logger";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { type SessionResult, type UserResult } from "./auth.service.types";

class AuthService {
  private readonly logger = new Logger(AuthService.name);

  public async getSession(headers: Headers): Promise<SessionResult> {
    this.logger.debug(`Getting session.`);

    const session = await auth.api.getSession({
      headers,
    });

    return session;
  }

  public async getUser(headers: Headers): Promise<UserResult> {
    this.logger.debug(`Getting user.`);

    const session = await this.getSession(headers);

    const user = session?.user;

    if (!user) {
      throw new Error("User not authenticated.");
    }

    return user;
  }

  public async signOut(headers: Headers): Promise<void> {
    this.logger.debug(`Signing out user.`);

    await auth.api.signOut({
        headers,
    });
  }
}

export const authService = new AuthService();
