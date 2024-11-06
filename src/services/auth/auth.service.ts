import "server-only";

import { Logger } from "@/utils/logger";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export type Session = Awaited<ReturnType<typeof auth.api.getSession>>;
export type SessionResult = Session | undefined;

export type User = {
  id: string;
  email: string;
  emailVerified: boolean;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  image?: string | undefined;
};

export type UserResult = User;

class AuthService {
  private readonly logger = new Logger(AuthService.name);

  public async isAuthenticated(): Promise<boolean> {
    return !!(await this.getSession());
  }

  public async getSession(): Promise<SessionResult> {
    this.logger.debug(`Getting session.`);

    const session = await auth.api.getSession({
      headers: await headers(),
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
      headers: await headers(),
    });
  }
}

export const authService = new AuthService();
