import argon2 from 'argon2';

export async function hashPassword(password: string): Promise<string> {
  return argon2.hash(password);
}

export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  return argon2.verify(hashedPassword, password);
}
