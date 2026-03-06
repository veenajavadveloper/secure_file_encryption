import fs from "fs";
import { encryptData } from "../crypto/encryption.ts";

export function encryptFile(
  inputFile: string,
  outputFile: string,
  password: string
) {

  const fileData = fs.readFileSync(inputFile);

  const encrypted = encryptData(fileData, password);

  fs.writeFileSync(
    outputFile,
    JSON.stringify(encrypted, null, 2)
  );

}