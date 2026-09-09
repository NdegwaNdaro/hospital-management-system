
import { spawn } from 'node:child_process';
import process from 'node:process';

const npm = process.platform === 'win32' ? 'npm.cmd' : 'npm';
const processes = [
  spawn(npm, ['run', 'dev:client'], { stdio: 'inherit', shell: true }),
  spawn(npm, ['run', 'dev:server'], { stdio: 'inherit', shell: true }),
];

function stop() {
  for (const child of processes) child.kill();
  process.exit();
}

process.on('SIGINT', stop);
process.on('SIGTERM', stop);

for (const child of processes) {
  child.on('exit', (code) => {
    if (code && code !== 0) stop();
  });
}