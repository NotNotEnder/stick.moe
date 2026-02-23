// components/Guestbook.js
import { useState, useEffect } from 'react'
import styles from '../styles/Guestbook.module.css'

export default function Guestbook() {
  const [entries, setEntries] = useState([])
  const [name, setName] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [remainingChars, setRemainingChars] = useState({ name: 15, message: 100 })

  const fetchEntries = async () => {
    try {
      const response = await fetch('/api/guestbook')
      
      // Handle non-OK responses
      if (!response.ok) {
        const text = await response.text()
        console.error('Server error response:', text)
        throw new Error(`Server error: ${response.status} ${response.statusText}`)
      }
      
      const data = await response.json()
      setEntries(data)
    } catch (error) {
      console.error('Failed to fetch entries:', error)
      setError('Failed to load entries. The server might be restarting or configured incorrectly.')
    }
  }

  useEffect(() => {
    fetchEntries()
  }, [])

  useEffect(() => {
    setRemainingChars({
      name: 15 - name.length,
      message: 100 - message.length
    })
  }, [name, message])

  const validateInput = () => {
    if (!name.trim()) {
      setError('Please enter your name')
      return false
    }
    if (!message.trim()) {
      setError('Please enter a message')
      return false
    }
    if (name.length > 15) {
      setError('Name is too long (max 15 characters)')
      return false
    }
    if (message.length > 100) {
      setError('Message is too long (max 100 characters)')
      return false
    }
    
    // Client-side spam detection
    if (/(.)\1{4,}/.test(name + message)) {
      setError('Please avoid repeating characters')
      return false
    }
    
    if (/[A-Z]{10,}/.test(name + message)) {
      setError('Please don\'t use excessive capital letters')
      return false
    }
    
    return true
  }

  const addEntry = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')
    
    if (!validateInput()) return

    setLoading(true)
    try {
      const response = await fetch('/api/guestbook', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: name.trim(), message: message.trim() }),
      })

      const data = await response.json()

      if (response.ok) {
        setName('')
        setMessage('')
        setSuccess('Thanks for signing my guestbook! ✨')
        fetchEntries() // Refresh entries
      } else {
        setError(data.error || 'Failed to add entry')
        if (data.details && Array.isArray(data.details)) {
          setError(data.details.join('. '))
        }
      }
    } catch (error) {
      console.error('Failed to add entry:', error)
      setError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={styles.guestbook}>
      <h3 className={styles.header}>★ SIGN MY GUESTBOOK ★</h3>
      
      {error && (
        <div className={styles.errorMessage}>
          ❌ {error}
        </div>
      )}
      
      {success && (
        <div className={styles.successMessage}>
          ✨ {success}
        </div>
      )}
      
      <form onSubmit={addEntry} className={styles.form}>
        <div className={styles.inputGroup}>
          <input
            type="text"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={styles.input}
            maxLength={15}
            required
          />
          <div className={styles.charCount}>
            {remainingChars.name} characters remaining
          </div>
        </div>
        
        <div className={styles.inputGroup}>
          <textarea
            placeholder="Your Message (be nice!)"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className={styles.textarea}
            maxLength={100}
            rows={4}
            required
          />
          <div className={styles.charCount}>
            {remainingChars.message} characters remaining
          </div>
        </div>
        
        <button 
          type="submit" 
          className={styles.button}
          disabled={loading || !name.trim() || !message.trim()}
        >
          {loading ? 'Signing...' : 'Sign Guestbook!'}
        </button>
      </form>
      
      <div className={styles.entries}>
        <h4 className={styles.entriesHeader}>★ RECENT SIGNATURES ★</h4>
        {entries.length === 0 ? (
          <p className={styles.noEntries}>No entries yet. Be the first to sign!</p>
        ) : (
          entries.slice(0, 10).map(entry => (
            <div key={entry.id} className={styles.entry}>
              <div className={styles.entryHeader}>
                <strong>{entry.name}</strong>
                <span className={styles.entryDate}>
                  {new Date(entry.created_at).toLocaleString()}
                </span>
              </div>
              <div className={styles.entryMessage}>{entry.message}</div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
