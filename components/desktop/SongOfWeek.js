// components/desktop/SongOfWeek.js
import styles from '../../styles/desktop.module.css'
import { songOfTheWeek as song } from '../../lib/sotw'
import SotwPlayer from './SotwPlayer'

export default function SongOfWeek({ onOpenArchive }) {
  return (
    <div className={styles.sotw}>
      <SotwPlayer
        label={`♪ THIS WEEK ${song.week} ♪`}
        title={song.title}
        artist={song.artist}
        cover={song.cover}
        audio={song.audio}
        link={song.link}
      />
      <button className={`${styles.sotwBtn} ${styles.sotwArchiveBtn}`} onClick={onOpenArchive}>
        <img className={styles.sotwBtnIcon} src="/assets/calendar.png" alt="" /> Archive
      </button>
    </div>
  )
}
