import { spawnSync } from 'child_process';
import dotenv from 'dotenv';

dotenv.config();

function bufferFromBufferString(bufferStr) {
  return Buffer.from(
    bufferStr
      .replace(/[<>]/g, '') // remove < > symbols from str
      .split(' ') // create an array splitting it by space
      .slice(1) // remove Buffer word from an array
      .reduce((acc, val) => acc.concat(parseInt(val, 16)), []), // convert all strings of numbers to hex numbers
  );
}

const remote = `${process.env.REMOTE_USERNAME}@${process.env.REMOTE_HOSTNAME}:${process.env.REMOTE_DIR}`;

export function linuxSyncer(dirToSync: string, args: string[]) {
  console.log(remote);
  const rsync = spawnSync('rsync', [
    '-' + args.join(''),
    dirToSync + '/',
    remote,
  ]);
  console.log(rsync.stdout);
  console.log(bufferFromBufferString(rsync.stderr.toString()));
  console.log(rsync.status);
}
