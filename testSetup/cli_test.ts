import { expect } from "chai";
import fs from "fs";
import { execSync } from "child_process";

describe("Secure File Encryption CLI", () => {

  const password = "password";

  const inputFile = "./testSetup/file_to_encrypt.txt";
  const encryptedFile = "./testSetup/file_encrypted.enc";
  const decryptedFile = "./testSetup/file_decrypted.txt";

  it("should encrypt and decrypt file using CLI", () => {

    execSync(
      `node ./src/cli/index.ts encrypt -i ${inputFile} -o ${encryptedFile} -p ${password}`
    );

    execSync(
      `node ./src/cli/index.ts decrypt -i ${encryptedFile} -o ${decryptedFile} -p ${password}`
    );

    const result = fs.readFileSync(
      decryptedFile,
      "utf8"
    );

    expect(result).to.equal(
      "Sensitive file content"
    );

  });
// remove the files if needed after the test
//   after(() => {

//     if(fs.existsSync(inputFile))
//       fs.unlinkSync(inputFile);

//     if(fs.existsSync(encryptedFile))
//       fs.unlinkSync(encryptedFile);

//     if(fs.existsSync(decryptedFile))
//       fs.unlinkSync(decryptedFile);

//   });

});

