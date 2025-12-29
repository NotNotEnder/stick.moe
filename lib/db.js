// lib/db.js - Updated version that safely handles existing databases
import Database from 'better-sqlite3'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const dbPath = path.join(process.cwd(), 'guestbook.db')
console.log(`[DB] Opening database at: ${dbPath}`)
let db;

try {
  db = new Database(dbPath, { verbose: console.log })
} catch (error) {
  console.error('[DB] Failed to open database:', error)
  // Fallback or rethrow depending on needs, but let's throw to make it obvious
  throw error
}

// Create table if it doesn't exist (original structure)
db.exec(`
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
    const tableInfo = db.prepare(`PRAGMA table_info(${tableName})`).all()
    const columnExists = tableInfo.some(col => col.name === columnName)
    
    if (!columnExists) {
      db.exec(`ALTER TABLE ${tableName} ADD COLUMN ${columnName} ${columnDefinition}`)
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
  db.exec(`CREATE INDEX IF NOT EXISTS idx_created_at ON guestbook_entries(created_at)`)
  db.exec(`CREATE INDEX IF NOT EXISTS idx_ip_address ON guestbook_entries(ip_address)`)
  db.exec(`CREATE INDEX IF NOT EXISTS idx_approved ON guestbook_entries(is_approved)`)
} catch (error) {
  console.error('Error creating indexes:', error)
}

export default db
