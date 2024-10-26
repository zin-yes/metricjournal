import { Logger } from "@/utils/logger";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { type SessionResult, type UserResult } from "./auth.service.types";

class AuthService {
  private readonly logger = new Logger(AuthService.name);

  public async getSession(): Promise<SessionResult> {
    this.logger.debug(`Getting session.`);

    const session = await auth.api.getSession({
      headers: headers(),
    });

    return session;
  }

  public async getUser(): Promise<UserResult> {
    this.logger.debug(`Getting user.`);

    const session = await this.getSession();

    const user = session?.user;

    if (!user) {
      throw new Error("User not authenticated.");
    }

    return user;
  }

  public async signOut(): Promise<void> {
    this.logger.debug(`Signing out user.`);

    await auth.api.signOut({
      headers: headers(),
    });
  }
}

export const authService = new AuthService();
