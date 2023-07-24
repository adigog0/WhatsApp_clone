const Pool = require("pg").Pool;
const conString = process.env.DATABASE_URL;

const pool = new Pool({
    connectionString: conString,
    max: 4, 
    idleTimeoutMillis: 30000, 
    connectionTimeoutMillis: 2000,
    
})

export default pool;
