// src/lib/db.ts

import Database from "@tauri-apps/plugin-sql";

declare global {
    var db: Database | undefined
}

export const db = globalThis.db || await Database.load("mysql://root:123456@localhost:3306/yuque");
