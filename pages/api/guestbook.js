// pages/api/guestbook.js
import db from '../../lib/db'

// Rate limiting storage (in production, use Redis or a proper cache)
const rateLimitStore = new Map()

// Profanity and spam filters
const bannedWords = [
  // Add common inappropriate words, spam terms, etc.
  'spam', 'bot', 'scam', 'hack', 'porn', 'xxx', 
  // Add more based on your specific abuse patterns
]

const spamPatterns = [
  /(.)\1{4,}/g, // Repeated characters (aaaaa, 11111)
  /https?:\/\/[^\s]+/gi, // URLs
  /\b\d{3}[-.]?\d{3}[-.]?\d{4}\b/g, // Phone numbers
  /[A-Z]{5,}/g, // Excessive caps
  /@[^\s]+\.(com|net|org|io|co)/gi, // Email addresses
]

function checkRateLimit(ip, limit = 3, windowMs = 60000) {
  const now = Date.now()
  const userRequests = rateLimitStore.get(ip) || []
  
  // Clean old requests
  const validRequests = userRequests.filter(time => now - time < windowMs)
  
  if (validRequests.length >= limit) {
    return false // Rate limit exceeded
  }
  
  validRequests.push(now)
  rateLimitStore.set(ip, validRequests)
  return true
}

function sanitizeInput(text) {
  if (!text || typeof text !== 'string') return ''
  
  // Basic XSS prevention
  return text
    .replace(/[<>]/g, '') // Remove < and >
    .replace(/javascript:/gi, '') // Remove javascript: protocol
    .replace(/on\w+=/gi, '') // Remove event handlers
    .trim()
}

function validateContent(name, message) {
  const errors = []
  
  // Length validation
  if (name.length < 1 || name.length > 50) {
    errors.push('Name must be between 1 and 50 characters')
  }
  
  if (message.length < 1 || message.length > 500) {
    errors.push('Message must be between 1 and 500 characters')
  }
  
  // Check for banned words
  const combinedText = (name + ' ' + message).toLowerCase()
  const foundBannedWords = bannedWords.filter(word => 
    combinedText.includes(word.toLowerCase())
  )
  
  if (foundBannedWords.length > 0) {
    errors.push('Content contains inappropriate language')
  }
  
  // Check for spam patterns
  const hasSpamPattern = spamPatterns.some(pattern => 
    pattern.test(name) || pattern.test(message)
  )
  
  if (hasSpamPattern) {
    errors.push('Content appears to be spam')
  }
  
  // Check for excessive punctuation or special characters
  const specialCharCount = (name + message).replace(/[a-zA-Z0-9\s]/g, '').length
  const totalLength = name.length + message.length
  
  if (totalLength > 0 && (specialCharCount / totalLength) > 0.3) {
    errors.push('Too many special characters')
  }
  
  return errors
}

function getClientIp(req) {
  return req.headers['x-forwarded-for'] || 
         req.headers['x-real-ip'] || 
         req.connection?.remoteAddress || 
         req.socket?.remoteAddress || 
         '127.0.0.1'
}

export default function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const entries = db.prepare('SELECT * FROM guestbook_entries ORDER BY created_at DESC LIMIT 50').all()
      res.status(200).json(entries)
    } catch (error) {
      console.error('Database error:', error)
      res.status(500).json({ error: 'Failed to fetch entries' })
    }
  } 
  
  else if (req.method === 'POST') {
    try {
      const clientIp = getClientIp(req)
      
      // Rate limiting check
      if (!checkRateLimit(clientIp, 3, 60000)) { // 3 posts per minute
        return res.status(429).json({ 
          error: 'Too many submissions. Please wait before posting again.' 
        })
      }
      
      const { name: rawName, message: rawMessage } = req.body
      
      if (!rawName || !rawMessage) {
        return res.status(400).json({ error: 'Name and message are required' })
      }
      
      // Sanitize inputs
      const name = sanitizeInput(rawName)
      const message = sanitizeInput(rawMessage)
      
      // Validate content
      const validationErrors = validateContent(name, message)
      if (validationErrors.length > 0) {
        return res.status(400).json({ 
          error: 'Invalid content', 
          details: validationErrors 
        })
      }
      
      // Check for duplicate recent entries (prevent spam)
      const recentDuplicate = db.prepare(`
        SELECT id FROM guestbook_entries 
        WHERE name = ? AND message = ? 
        AND created_at > datetime('now', '-1 hour')
        LIMIT 1
      `).get(name, message)
      
      if (recentDuplicate) {
        return res.status(400).json({ 
          error: 'Duplicate entry detected. Please wait before posting the same content again.' 
        })
      }
      
      // Insert the entry
      const result = db.prepare(
        'INSERT INTO guestbook_entries (name, message, ip_address) VALUES (?, ?, ?)'
      ).run(name, message, clientIp)
      
      const newEntry = db.prepare(
        'SELECT id, name, message, created_at FROM guestbook_entries WHERE id = ?'
      ).get(result.lastInsertRowid)
      
      res.status(201).json(newEntry)
      
    } catch (error) {
      console.error('Error adding entry:', error)
      res.status(500).json({ error: 'Failed to add entry' })
    }
  } 
  
  else {
    res.setHeader('Allow', ['GET', 'POST'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}
