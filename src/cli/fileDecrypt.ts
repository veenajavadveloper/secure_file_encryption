import fs from "fs";
import { decryptData } from "../crypto/encryption.ts";

export function decryptFile(
  inputFile: string,
  outputFile: string,
  password: string
) {

  const payload = JSON.parse(
    fs.readFileSync(inputFile, "utf8")
  );

  const decrypted = decryptData(payload, password);

  fs.writeFileSync(outputFile, decrypted);

}