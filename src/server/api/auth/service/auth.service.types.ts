import { auth } from "@/lib/auth";

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
