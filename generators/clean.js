import { exec } from "child_process";
import util from "util";

const execute = util.promisify(exec);

const tryExecuting = async (cmd) => {
  try {
    await execute(cmd);
  } catch (err) {}
};

await tryExecuting("rm -r dist");
await tryExecuting("rm -r generated");
await tryExecuting("rm -r services");
await tryExecuting("rm -r utils");
await tryExecuting("rm -r ../bridge/src");
await tryExecuting("rm server.ts");
