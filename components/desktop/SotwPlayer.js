// components/desktop/SotwPlayer.js — shared audio player used by
// SongOfWeek (this week) and the SOTW archive windows.
import { useRef, useState, useEffect } from 'react'
import styles from '../../styles/desktop.module.css'

const VOLUME_KEY = 'stickmoe-sotw-volume'

function fmt(t) {
  if (!t || isNaN(t)) return '0:00'
  const m = Math.floor(t / 60)
  const s = Math.floor(t % 60)
  return `${m}:${String(s).padStart(2, '0')}`
}

export default function SotwPlayer({ label, title, artist, cover, audio, link }) {
  const audioRef = useRef(null)
  const [playing, setPlaying] = useState(false)
  const [cur, setCur] = useState(0)
  const [dur, setDur] = useState(0)
  const [broken, setBroken] = useState(false)
  const [volume, setVolume] = useState(1)

  // volume preference is shared across every sotw player on the site
  useEffect(() => {
    const saved = parseFloat(window.localStorage.getItem(VOLUME_KEY))
    if (!isNaN(saved)) setVolume(saved)
  }, [])

  useEffect(() => {
    const a = audioRef.current
    if (a) a.volume = volume
  }, [volume])

  useEffect(() => {
    const a = audioRef.current
    if (!a) return
    const onTime = () => setCur(a.currentTime)
    const onMeta = () => setDur(a.duration)
    const onEnd = () => setPlaying(false)
    a.addEventListener('timeupdate', onTime)
    a.addEventListener('loadedmetadata', onMeta)
    a.addEventListener('ended', onEnd)
    return () => {
      a.removeEventListener('timeupdate', onTime)
      a.removeEventListener('loadedmetadata', onMeta)
      a.removeEventListener('ended', onEnd)
    }
  }, [])

  const toggle = () => {
    const a = audioRef.current
    if (!a) return
    if (playing) { a.pause(); setPlaying(false) }
    else { a.play().then(() => setPlaying(true)).catch(() => setBroken(true)) }
  }

  const seek = (e) => {
    const a = audioRef.current
    if (!a || !dur) return
    a.currentTime = (e.target.value / 100) * dur
    setCur(a.currentTime)
  }

  const changeVolume = (e) => {
    const v = Number(e.target.value) / 100
    setVolume(v)
    window.localStorage.setItem(VOLUME_KEY, String(v))
  }

  return (
    <>
      <div className={styles.sotwCover}>
        {cover ? (
          <img src={cover} alt="album art" onError={(e) => { e.currentTarget.style.display = 'none' }} />
        ) : null}
        <div className={styles.sotwCoverGlow} />
      </div>

      <div className={styles.sotwInfo}>
        {label ? <div className={styles.sotwWeek}>{label}</div> : null}
        {title ? <div className={styles.sotwTitle}>{title}</div> : null}
        {artist ? <div className={styles.sotwArtist}>— {artist}</div> : null}
      </div>

      {audio ? (
        <>
          <audio ref={audioRef} src={audio} preload="metadata" />
          <div className={styles.sotwControls}>
            <button className={styles.sotwBtn} onClick={() => { const a = audioRef.current; if (a) a.currentTime = 0 }}>◀◀</button>
            <button className={styles.sotwBtnPlay} onClick={toggle}>{playing ? 'II' : '▶'}</button>
            <button className={styles.sotwBtn} onClick={() => { const a = audioRef.current; if (a) a.currentTime = a.duration || 0 }}>▶▶</button>
          </div>
          <div className={styles.sotwSeek}>
            <span>{fmt(cur)}</span>
            <input
              type="range"
              min="0"
              max="100"
              value={dur ? (cur / dur) * 100 : 0}
              onChange={seek}
              className={styles.sotwRange}
            />
            <span>{fmt(dur)}</span>
          </div>
          <div className={styles.sotwVolume}>
            <img className={`${styles.sotwVolIcon} ${styles.sotwVolIconFlip}`} src="/assets/volume.png" alt="" />
            <input
              type="range"
              min="0"
              max="100"
              value={volume * 100}
              onChange={changeVolume}
              className={styles.sotwRange}
            />
            <img className={styles.sotwVolIcon} src="/assets/volume.png" alt="" />
          </div>
          {broken && <div className={styles.sotwHint}>⚠ couldn&apos;t play — add an mp3 at {audio}</div>}
        </>
      ) : (
        <div className={styles.sotwHint}>no audio set</div>
      )}

      {link ? (
        <a className={styles.sotwLink} href={link} target="_blank" rel="noopener noreferrer">
          all songs of the week →
        </a>
      ) : null}
    </>
  )
}
