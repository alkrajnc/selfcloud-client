import { spawnSync } from 'child_process';
import dotenv from 'dotenv';

dotenv.config();

const remote = `${process.env.REMOTE_USERNAME}@${process.env.REMOTE_HOSTNAME}:${process.env.REMOTE_DIR}`;

export function linuxSyncer(dirToSync: string, args: string[]) {
  const rsync = spawnSync('rsync', [
    '-' + args.join(''),
    dirToSync + '/',
    remote,
  ]);
  console.log(rsync.stdout);
  console.log(rsync.stderr);
  console.log(rsync.status);
}
