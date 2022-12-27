import { exec } from 'child_process';
import util from 'util';

const execute = util.promisify(exec);

console.log('Removing old build...');
await execute('npm run clear');
console.log('Building generators...');
await execute('npx tsc -p ./config/tsconfig.json');
console.log('Generating gateway...');
await execute('node dist/generators/generateGateway');
console.log('Generating types...');
await execute('npm run codegen');
console.log('Cleaning up...');
await execute('npm run cleanup');
console.log('Final build...');
await execute('npx tsc -p ./config/tsconfig.json');
console.log('Sentinel ready for deployment');
