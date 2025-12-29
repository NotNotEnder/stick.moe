// lib/db.js - Updated version that safely handles existing databases
import Database from 'better-sqlite3'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const dbPath = path.join(process.cwd(), 'guestbook.db')
console.log(`[DB] Opening database at: ${dbPath}`)

let db;

// Singleton pattern helper
function getDatabase() {
  if (db) return db;

  try {
    // Check if directory is writable if creating new DB
    // (This is just a helpful check, better-sqlite3 will throw anyway)
    
    db = new Database(dbPath, { verbose: console.log })
    
    // Initialize schema
    initSchema(db);
    
    return db;
  } catch (error) {
    console.error('[DB] FATAL ERROR: Failed to initialize database:', error)
    throw error // This will crash the API route, which is intended if DB is required
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
// This prevents top-level crashes during build/import
const dbProxy = new Proxy({}, {
  get: function(target, prop) {
    const database = getDatabase();
    return database[prop];
  }
});

export default dbProxy;

