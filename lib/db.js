// lib/db.js - Updated version that safely handles existing databases
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const dbPath = path.join(process.cwd(), 'guestbook.db')

let db;

// Singleton pattern helper
function getDatabase() {
  if (db) return db;

  try {
    console.log(`[DB] Opening database at: ${dbPath}`)
    
    // Dynamically require better-sqlite3 to avoid build-time/import-time issues
    // and ensure it's treated as an external dependency
    const Database = require('better-sqlite3')
    
    db = new Database(dbPath, { verbose: console.log })
    
    // Initialize schema
    initSchema(db);
    
    return db;
  } catch (error) {
    console.error('[DB] FATAL ERROR: Failed to initialize database:', error)
    // We intentionally don't throw here to avoid crashing the process immediately.
    // Instead we return null or a dummy object so the API can at least respond with a 500 error
    // rather than a hard crash/502.
    throw new Error(`Database initialization failed: ${error.message}`);
  }
}

function initSchema(database) {
  // Create table if it doesn't exist (original structure)
  database.exec(`
    CREATE TABLE IF NOT EXISTS guestbook_entries (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      message TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `)

  // Function to safely add columns if they don't exist
  function addColumnIfNotExists(tableName, columnName, columnDefinition) {
    try {
      const tableInfo = database.prepare(`PRAGMA table_info(${tableName})`).all()
      const columnExists = tableInfo.some(col => col.name === columnName)
      
      if (!columnExists) {
        database.exec(`ALTER TABLE ${tableName} ADD COLUMN ${columnName} ${columnDefinition}`)
        console.log(`Added column ${columnName} to ${tableName}`)
      }
    } catch (error) {
      console.error(`Error adding column ${columnName}:`, error)
    }
  }

  // Add new columns safely
  addColumnIfNotExists('guestbook_entries', 'ip_address', 'TEXT')
  addColumnIfNotExists('guestbook_entries', 'is_approved', 'INTEGER DEFAULT 1')
  addColumnIfNotExists('guestbook_entries', 'is_flagged', 'INTEGER DEFAULT 0')

  // Add indexes safely
  try {
    database.exec(`CREATE INDEX IF NOT EXISTS idx_created_at ON guestbook_entries(created_at)`)
    database.exec(`CREATE INDEX IF NOT EXISTS idx_ip_address ON guestbook_entries(ip_address)`)
    database.exec(`CREATE INDEX IF NOT EXISTS idx_approved ON guestbook_entries(is_approved)`)
  } catch (error) {
    console.error('Error creating indexes:', error)
  }
}

// Export a proxy to handle initialization on first access
const dbProxy = new Proxy({}, {
  get: function(target, prop) {
    const database = getDatabase();
    // If database failed to load, getDatabase threw an error which is caught by the caller
    return database[prop];
  }
});

export default dbProxy;

