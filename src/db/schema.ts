import { time } from 'console';
import {
  int,
  mysqlTable,
  varchar,
  boolean,
  bigint,
  timestamp,
} from 'drizzle-orm/mysql-core';

export const watcher = mysqlTable('watcher', {
  watcherID: int('watcher_id').primaryKey().autoincrement(),
  watcherName: varchar('watcher_name', { length: 255 }).notNull(),
  watcherPath: varchar('watcher_path', { length: 4096 }).notNull(),
});

export const files = mysqlTable('files', {
  fileName: varchar('file_name', { length: 255 }).primaryKey(),
  fileSize: bigint('file_size', { mode: 'number' }).notNull(),
  isFile: boolean('is_file').notNull(),
  modifyTimestamp: timestamp('modify_timestamp').notNull(),
  createTimestamp: timestamp('create_timestamp').notNull(),
  insertTimestamp: timestamp('insert_timestamp').notNull(),
  watcherID: int('watcher_id')
    .notNull()
    .references(() => {
      return watcher.watcherID;
    }),
});
