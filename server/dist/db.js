"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Pool = require("pg").Pool;
const conString = process.env.DATABASE_URL;
const pool = new Pool({
    connectionString: conString,
    max: 4,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
});
exports.default = pool;
