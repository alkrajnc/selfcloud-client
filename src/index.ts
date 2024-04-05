#!/usr/bin/env node
import * as chokidar from 'chokidar';
import { statSync } from 'fs';
import db from './db.js';
import { files as filesSchema } from './db/schema.js';
import { linuxSyncer } from './syncer.js';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const main = async () => {
  const files = await db.select().from(filesSchema);

  chokidar.watch('/home/dev/selfcloud').on('all', async (event, path) => {
    const fileDetails = statSync(path);
    switch (event) {
      case 'add':
        if (
          !files.find((file) => {
            return (
              file.fileName ===
              (process.platform === 'linux'
                ? path.split('/').pop()!
                : path.split('\\').pop()!)
            );
          })
        ) {
          linuxSyncer(dirname(new URL(path, __filename).toString()), ['avrzP']);
          await db.insert(filesSchema).values({
            fileName:
              process.platform === 'linux'
                ? path.split('/').pop()!
                : path.split('\\').pop()!,
            fileSize: fileDetails.size,
            isFile: fileDetails.isFile(),
            modifyTimestamp: fileDetails.mtime,
            createTimestamp: fileDetails.birthtime,
            insertTimestamp: new Date(),
            watcherID: 1,
          });
        }

        break;
      case 'addDir':
        break;
      case 'change':
        break;
      case 'unlink':
        break;
      case 'unlinkDir':
        break;
      default:
        break;
    }
    console.log(event, path);
  });
};

main();
