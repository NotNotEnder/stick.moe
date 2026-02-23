// pages/api/debug.js
import path from 'path'
import fs from 'fs'

export default function handler(req, res) {
  const dbPath = path.join(process.cwd(), 'guestbook.db')
  const debugInfo = {
    cwd: process.cwd(),
    dbPath: dbPath,
    dbExists: fs.existsSync(dbPath),
    nodeVersion: process.version,
    platform: process.platform,
    arch: process.arch,
    env: process.env.NODE_ENV
  }

  try {
    // Try to require better-sqlite3 dynamically to see if it loads
    const Database = require('better-sqlite3')
    debugInfo.moduleLoaded = true
    
    // Try to open DB
    const db = new Database(dbPath, { readonly: true })
    const tables = db.prepare("SELECT name FROM sqlite_master WHERE type='table'").all()
    debugInfo.tables = tables
    debugInfo.connectionSuccess = true
    
  } catch (error) {
    debugInfo.error = {
      message: error.message,
      stack: error.stack,
      code: error.code
    }
  }

  res.status(200).json(debugInfo)
}
