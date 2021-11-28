import { Pool } from 'pg';

// You need string to connect BD data
const connectionString = process.env.BD_STRING;

const db = new Pool({ connectionString }); 

export default db;