import crypto from "crypto";

export function deriveKey(password: string, salt: Buffer): Buffer {

  return crypto.pbkdf2Sync(
    password,
    salt,
    100000,
    32,
    "sha256"
  );

}