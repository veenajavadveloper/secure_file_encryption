import { expect } from "chai";
import { encryptData, decryptData } from "../src/crypto/encryption.ts";
import { describe, it } from "node:test";

describe("Secure message encryption using password-based encryption", () => {

  const password = "password";

  const message = Buffer.from(
    "Confidential data",
    "utf8"
  );

  it("should encrypt and decrypt correctly", () => {

    const encrypted = encryptData(
      message,
      password
    );

    const decrypted = decryptData(
      encrypted,
      password
    );

    expect(
      decrypted.toString("utf8")
    ).to.equal(message.toString("utf8"));

  });

  it("should produce different ciphertext each time due to random IV", () => {

    const encrypted1 = encryptData(
      message,
      password
    );

    const encrypted2 = encryptData(
      message,
      password
    );

    expect(
      encrypted1.ciphertext
    ).to.not.equal(
      encrypted2.ciphertext
    );

  });

  it("should fail if ciphertext is tampered", () => {

    const encrypted = encryptData(
      message,
      password
    );

    // modify ciphertext
    encrypted.ciphertext =
      "00" + encrypted.ciphertext.slice(2);

    expect(() =>
      decryptData(encrypted, password)
    ).to.throw();

  });

  it("should fail if authTag is tampered", () => {

    const encrypted = encryptData(
      message,
      password
    );

    encrypted.authTag =
      "00" + encrypted.authTag.slice(2);

    expect(() =>
      decryptData(encrypted, password)
    ).to.throw();

  });

  it("should fail with wrong password", () => {

    const encrypted = encryptData(
      message,
      password
    );

    expect(() =>
      decryptData(encrypted, "wrongpassword")
    ).to.throw();

  });

  it("should generate valid metadata fields", () => {

    const encrypted = encryptData(
      message,
      password
    );

    expect(encrypted).to.have.property("salt");
    expect(encrypted).to.have.property("iv");
    expect(encrypted).to.have.property("authTag");
    expect(encrypted).to.have.property("ciphertext");

  });

});