import { Command } from "commander";
import { encryptFile } from "./fileEncrypt.ts";
import { decryptFile } from "./fileDecrypt.ts";

const program = new Command();

program
  .command("encrypt")
  .requiredOption("-i, --input <file>")
  .requiredOption("-o, --output <file>")
  .requiredOption("-p, --password <password>")
  .action((opts:any) => {

    encryptFile(
      opts.input,
      opts.output,
      opts.password
    );

  });

program
  .command("decrypt")
  .requiredOption("-i, --input <file>")
  .requiredOption("-o, --output <file>")
  .requiredOption("-p, --password <password>")
  .action((opts:any) => {

    decryptFile(
      opts.input,
      opts.output,
      opts.password
    );

  });

program.parse();