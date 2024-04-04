#!/usr/bin/env node
import * as chokidar from 'chokidar';
import { statSync } from 'fs';

const main = () => {
  console.log('hello Node.js and Tyescript world :]');

  chokidar.watch('./watcher').on('all', (event, path) => {
    const fileDetails = statSync(path);
    console.log(fileDetails);
    switch (event) {
      case 'add':
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
