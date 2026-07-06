// components/desktop/SotwArchive.js — archive list + per-week player.
// The list is self-updating: it just reads /public/sotw/Archive on the
// server (see pages/api/sotw-archive.js), so dropping a new
// public/sotw/Archive/[week]/{song.mp3,cover.jpg} folder in is enough.
import { useEffect, useState } from 'react'
import styles from '../../styles/desktop.module.css'
import SotwPlayer from './SotwPlayer'

export function SotwArchiveListContent({ onOpenArchive }) {
  const [weeks, setWeeks] = useState(null) // null = loading
  const [error, setError] = useState(false)

  useEffect(() => {
    let cancelled = false
    fetch('/api/sotw-archive')
      .then((r) => r.json())
      .then((data) => { if (!cancelled) setWeeks(data.weeks || []) })
      .catch(() => { if (!cancelled) setError(true) })
    return () => { cancelled = true }
  }, [])

  return (
    <div>
      <h1 className={styles.h}>★ SOTW ARCHIVE ★</h1>
      {error && <div className={styles.sotwHint}>couldn&apos;t load archive</div>}
      {weeks && weeks.length === 0 && <div className={styles.sotwHint}>no archived weeks yet</div>}
      <div className={styles.linkGrid}>
        {weeks && weeks.map((week) => (
          <a key={week} className={styles.link} onClick={() => onOpenArchive(week)}>
            🎵 {week}
          </a>
        ))}
      </div>
    </div>
  )
}

export function SotwArchivePlayerContent({ week }) {
  // title/artist come from public/sotw/Archive/[week]/data.txt:
  //   TITLE: Song Name
  //   ARTIST: Artist Name
  const [info, setInfo] = useState({ title: '', artist: '' })

  useEffect(() => {
    let cancelled = false
    fetch(`/sotw/Archive/${week}/data.txt`)
      .then((r) => (r.ok ? r.text() : ''))
      .then((text) => {
        if (cancelled) return
        setInfo({
          title: (/^TITLE:\s*(.+)$/m.exec(text) || [])[1] || '',
          artist: (/^ARTIST:\s*(.+)$/m.exec(text) || [])[1] || '',
        })
      })
      .catch(() => {})
    return () => { cancelled = true }
  }, [week])

  return (
    <div className={styles.sotw}>
      <SotwPlayer
        label={`♪ ARCHIVE ${week} ♪`}
        title={info.title}
        artist={info.artist}
        cover={`/sotw/Archive/${week}/cover.jpg`}
        audio={`/sotw/Archive/${week}/song.mp3`}
      />
    </div>
  )
}
