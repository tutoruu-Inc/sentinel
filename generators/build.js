import { exec, spawn } from "child_process";
import util from "util";

const execute = util.promisify(exec);

console.log("Removing old build...");
await execute("npm run clear");
console.log("Building generators...");
await execute("npx tsc -p ./config/tsconfig.json");
console.log("Generating gateway...\n");

const generator = spawn("node", ['dist/generators/generateGateway.js']);

generator.stdout.on("data", (data) => {
  console.log(`${data}`);
});

generator.stdout.on("close", async () => {
  console.log("Generating types...");
  await execute("npm run codegen");
  console.log("Generating client code...");
  await execute("node dist/generators/generateClient.js");
  await execute("cd ./@tutoruu-inc/sentinel && npm install && npm run build");
  await execute("cd ..");
  console.log("Cleaning up...");
  await execute("npm run cleanup");
  console.log("Final build...");
  await execute("npx tsc -p ./config/tsconfig.json");
  console.log("Sentinel ready for deployment");
});
