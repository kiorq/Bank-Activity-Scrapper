import { user, account_summary, transactions } from "./defaultData";

const lowdb = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");

const adapter = new FileSync("db.json");
const db = lowdb(adapter);

db.defaults({ user, account_summary, transactions }).write();

// Usage: https://github.com/typicode/lowdb#usage

export default db;
