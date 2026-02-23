
const Database = require('better-sqlite3');
const path = require('path');

console.log('Testing better-sqlite3 connection...');
console.log('Node version:', process.version);

try {
  const dbPath = path.join(process.cwd(), 'guestbook.db');
  console.log('Opening DB at:', dbPath);
  
  const db = new Database(dbPath, { verbose: console.log });
  
  const row = db.prepare('SELECT 1 as val').get();
  console.log('Query result:', row);
  
  console.log('SUCCESS: Database connection works in raw Node.js');
} catch (err) {
  console.error('FAILURE: Database connection failed');
  console.error(err);
  process.exit(1);
}
