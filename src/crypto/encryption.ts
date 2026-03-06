import crypto from "crypto";
import { deriveKey } from "./keyDerivation.ts";

export interface EncryptedPayload {
  salt: string;
  iv: string;
  authTag: string;
  ciphertext: string;
}

export function encryptData(
  data: Buffer,
  password: string
): EncryptedPayload {

  const salt = crypto.randomBytes(16);

  const key = deriveKey(password, salt);

  const iv = crypto.randomBytes(12);

  const cipher = crypto.createCipheriv(
    "aes-256-gcm",
    key,
    iv
  );

  const encrypted = Buffer.concat([
    cipher.update(data),
    cipher.final()
  ]);

  const authTag = cipher.getAuthTag();

  return {
    salt: salt.toString("hex"),
    iv: iv.toString("hex"),
    authTag: authTag.toString("hex"),
    ciphertext: encrypted.toString("hex")
  };
}

export function decryptData(
  payload: EncryptedPayload,
  password: string
): Buffer {

  const salt = Buffer.from(payload.salt, "hex");
  const key = deriveKey(password, salt);

  const iv = Buffer.from(payload.iv, "hex");

  const authTag = Buffer.from(payload.authTag, "hex");

  const decipher = crypto.createDecipheriv(
    "aes-256-gcm",
    key,
    iv
  );

  decipher.setAuthTag(authTag);

  const decrypted = Buffer.concat([
    decipher.update(Buffer.from(payload.ciphertext, "hex")),
    decipher.final()
  ]);

  return decrypted;
}