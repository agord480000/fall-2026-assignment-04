import { execSync } from 'child_process';
import path from 'path';

const inputFile = process.argv[2];
if (!inputFile) {
  console.error('Usage: node render_erd.js <input>');
  process.exit(1);
}

const outputFile = path.join(path.dirname(inputFile), 'erd.svg');

try {
  const env = {
    ...process.env,
    LD_LIBRARY_PATH: process.env.LD_LIBRARY_PATH
      ? `${process.env.HOME}/.local/lib:${process.env.LD_LIBRARY_PATH}`
      : `${process.env.HOME}/.local/lib`
  };
  execSync(`npx mmdc -i "${inputFile}" -o "${outputFile}"`, { stdio: 'pipe', env });
  console.log('SUCCESS');
  process.exit(0);
} catch (e) {
  console.error('SYNTAX_ERROR:');
  console.error(e.stderr ? e.stderr.toString() : e.message);
  process.exit(1);
}
