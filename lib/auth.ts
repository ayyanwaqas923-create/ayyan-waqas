import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import type { DemoUser } from "@/lib/types";

const JWT_SECRET = process.env.JWT_SECRET || "o-level-demo-secret";

export const demoUsers: DemoUser[] = [
  {
    id: "demo-user-1",
    name: "Ayesha Rahman",
    email: "student@demo.com",
    passwordHash: bcrypt.hashSync("student123", 10),
    createdAt: new Date().toISOString(),
  },
];

export function createSessionToken(user: DemoUser) {
  return jwt.sign({ sub: user.id, email: user.email, name: user.name }, JWT_SECRET, {
    expiresIn: "7d",
  });
}

export function verifySessionToken(token: string) {
  try {
    return jwt.verify(token, JWT_SECRET) as { sub: string; email: string; name: string };
  } catch {
    return null;
  }
}

export function findUserByEmail(email: string) {
  return demoUsers.find((user) => user.email.toLowerCase() === email.toLowerCase());
}

export async function verifyCredentials(email: string, password: string) {
  const user = findUserByEmail(email);

  if (!user) {
    return null;
  }

  const matches = await bcrypt.compare(password, user.passwordHash);
  return matches ? user : null;
}

export function createDemoUser(name: string, email: string, password: string) {
  const existing = findUserByEmail(email);
  if (existing) return existing;

  const user: DemoUser = {
    id: `user-${Date.now()}`,
    name,
    email,
    passwordHash: bcrypt.hashSync(password, 10),
    createdAt: new Date().toISOString(),
  };

  demoUsers.push(user);
  return user;
}
