// components/desktop/Desktop.js
import { useState, useEffect, useCallback } from 'react'
import styles from '../../styles/desktop.module.css'
import Window from './Window'
import {
  AboutContent,
  LinksContent,
  ProjectsContent,
  CreditsContent,
  GuestbookContent,
} from './content'
import SongOfWeek from './SongOfWeek'
import { SotwArchiveListContent, SotwArchivePlayerContent } from './SotwArchive'

const APPS = [
  { id: 'about', title: 'About Me', icon: '/assets/computer.png', Component: AboutContent, initial: { x: 40, y: 40, w: 440, h: 520 } },
  { id: 'sotw', title: 'Song of the Week', icon: '/assets/cd.png', Component: SongOfWeek, initial: { x: 660, y: 60, w: 320, h: 430 } },
  { id: 'links', title: 'Links', icon: '/assets/directory.png', Component: LinksContent, initial: { x: 520, y: 70, w: 360, h: 280 } },
  { id: 'guestbook', title: 'Guestbook', icon: '/assets/notepad.png', Component: GuestbookContent, initial: { x: 500, y: 300, w: 420, h: 440 } },
  { id: 'projects', title: 'Projects', icon: '/assets/appwizard.png', Component: ProjectsContent, initial: { x: 120, y: 140, w: 440, h: 420 } },
  { id: 'credits', title: 'Credits', icon: '/assets/painticon.png', Component: CreditsContent, initial: { x: 180, y: 200, w: 420, h: 440 } },
  { id: 'games', title: 'Games', icon: '/assets/game.png', Component: null, initial: { x: 260, y: 120, w: 320, h: 300 } },
]

// ─────────────────────────────────────────────────────────────
//  GAMES — each opens in its own window from the Games list.
//  { id, title, icon (optional), src: path to the game's HTML
//  file in /public }. Add new entries below the existing ones.
// ─────────────────────────────────────────────────────────────
const GAMES = [
  { id: 'furbox', title: 'Furbox', icon: '/assets/appwizard.png', src: '/furbox/index.html', initial: { x: 200, y: 80, w: 700, h: 560 } },
  { id: 'sim', title: 'Sim', icon: '/assets/appwizard.png', src: '/sim/index.html', initial: { x: 260, y: 100, w: 700, h: 560 } },

  // { id: 'yourgame', title: 'Your Game', icon: '/assets/appwizard.png', src: '/yourgame/index.html', initial: { x: 220, y: 90, w: 700, h: 560 } },
  // { id: 'yourgame2', title: 'Your Game 2', icon: '/assets/appwizard.png', src: '/yourgame2/index.html', initial: { x: 240, y: 100, w: 700, h: 560 } },
]

// ─────────────────────────────────────────────────────────────
//  BACKGROUND BLINKIES — paste blinkie image URLs here (~10).
//  They stack up the left side of the desktop. Pick your own!
//  Empty strings are skipped, so you can leave blanks for now.
// ─────────────────────────────────────────────────────────────
const BLINKIES = [
  'https://64.media.tumblr.com/d06b1ad286c0e16334f7a8d6277e7b38/1898667ad91aaa3f-55/s250x400/60952020f21c18a77854082d73c05c36bda0825d.gifv',
  'https://adriansblinkiecollection.neocities.org/62.gif',
  'https://adriansblinkiecollection.neocities.org/27.gif',
  'https://adriansblinkiecollection.neocities.org/64.gif',
  'https://adriansblinkiecollection.neocities.org/x8.gif',
  'https://adriansblinkiecollection.neocities.org/l11.gif',
  'https://adriansblinkiecollection.neocities.org/l4.gif',
  'https://adriansblinkiecollection.neocities.org/e93.gif',
  'https://adriansblinkiecollection.neocities.org/k24.gif',
  'https://adriansblinkiecollection.neocities.org/e1.gif',
  'https://adriansblinkiecollection.neocities.org/v10.gif',
  'https://adriansblinkiecollection.neocities.org/e14.gif',
  'https://adriansblinkiecollection.neocities.org/g77.gif',
  'https://adriansblinkiecollection.neocities.org/g86.gif',
  'https://adriansblinkiecollection.neocities.org/g126.gif',
  'https://adriansblinkiecollection.neocities.org/x57.gif',
]

// ─────────────────────────────────────────────────────────────
//  BUTTONS — left wall. Classic 88x31 web buttons.
//  Each entry: { src: 'image-url', href: 'link-or-empty' }.
//  href optional — leave '' for a non-clickable button.
//  Empty src is skipped. 2-column grid; add/remove slots to
//  keep the left wall even with the middle stamp wall.
// ─────────────────────────────────────────────────────────────
const BUTTONS = [
  { src: 'https://adriansblinkiecollection.neocities.org/buttons/a46.jpg', href: 'https://archlinux.org/' }, // <- your 88x31 button here
  { src: 'https://adriansblinkiecollection.neocities.org/buttons/a80.gif', href: 'https://www.reddit.com/r/catpictures/' },
  { src: 'https://adriansblinkiecollection.neocities.org/buttons/a97.png', href: 'https://furscience.com/' },
  { src: 'https://adriansblinkiecollection.neocities.org/buttons/a93.gif', href: 'https://www.firefox.com' },
  { src: 'https://adriansblinkiecollection.neocities.org/buttons/a101.jpg', href: 'https://claude.ai' },
  { src: 'https://adriansblinkiecollection.neocities.org/buttons/e2.gif', href: 'https://www.blackmagicdesign.com/event/davinciresolvedownload' },
  { src: 'https://adriansblinkiecollection.neocities.org/buttons/b14.png', href: 'https://en.wikipedia.org/wiki/Year_2000_problem' },
  { src: 'https://adriansblinkiecollection.neocities.org/buttons/a79.gif', href: 'https://catbox.moe' },
]

// ─────────────────────────────────────────────────────────────
//  STAMPS — middle wall. Classic 104x56 stamps.
//  Just image URLs (like blinkies). Empty strings skipped.
//  2-column grid; add/remove slots to balance with buttons.
// ─────────────────────────────────────────────────────────────
const STAMPS = [
  'https://adriansblinkiecollection.neocities.org/stamps/a3.gif', // <- your 104x56 stamp here
  'https://adriansblinkiecollection.neocities.org/stamps/a2.png',
  'https://adriansblinkiecollection.neocities.org/stamps/e32.gif',
  'https://adriansblinkiecollection.neocities.org/stamps/d34.gif',
  'https://adriansblinkiecollection.neocities.org/stamps/c15.png',
  'https://adriansblinkiecollection.neocities.org/stamps/e43.gif',
  'https://adriansblinkiecollection.neocities.org/stamps/a69.gif',
  'https://adriansblinkiecollection.neocities.org/stamps/a57.png',
  '',
  '',
]

const GAME_WINDOW_PREFIX = 'game:'
const ARCHIVE_WINDOW_PREFIX = 'archive:'
const gameById = (gameId) => GAMES.find((g) => g.id === gameId)

// dynamic game/archive windows are addressed as "game:<id>" / "archive:<week>"
// so they reuse the same open/order/minimized/maximized bookkeeping as APPS.
// These must return plain data (no inline Component closures) — a new
// component identity per render makes React remount the window body,
// which kills clicks mid-flight and resets any playing audio.
function appById(id) {
  if (id.startsWith(GAME_WINDOW_PREFIX)) {
    const game = gameById(id.slice(GAME_WINDOW_PREFIX.length))
    if (!game) return null
    return {
      id,
      title: game.title,
      icon: game.icon,
      initial: game.initial,
      isGame: true,
      src: game.src,
    }
  }
  if (id.startsWith(ARCHIVE_WINDOW_PREFIX)) {
    const week = id.slice(ARCHIVE_WINDOW_PREFIX.length)
    return {
      id,
      title: `Archive of ${week}`,
      icon: '/assets/cd.png',
      initial: { x: 660, y: 60, w: 320, h: 430 },
      isArchive: true,
      week,
    }
  }
  if (id === 'archive-list') {
    return {
      id,
      title: 'SOTW Archive',
      icon: '/assets/directory.png',
      initial: { x: 560, y: 90, w: 300, h: 360 },
      Component: null,
    }
  }
  return APPS.find((a) => a.id === id)
}

function IframeContent({ src, title }) {
  return <iframe className={styles.gameFrame} src={src} title={title} />
}

function GamesListContent({ onOpenGame }) {
  return (
    <div>
      <h1 className={styles.h}>★ GAMES ★</h1>
      <div className={styles.linkGrid}>
        {GAMES.map((game) => (
          <a key={game.id} className={styles.link} onClick={() => onOpenGame(game.id)}>
            🎮 {game.title}
          </a>
        ))}
      </div>
    </div>
  )
}

export default function Desktop() {
  // order: stacking order, last = top/active
  const [order, setOrder] = useState(['guestbook', 'sotw', 'about'])
  const [open, setOpen] = useState(['about', 'guestbook', 'sotw'])
  const [minimized, setMinimized] = useState([])
  const [maximized, setMaximized] = useState([])
  const [startOpen, setStartOpen] = useState(false)
  const [bg, setBg] = useState(1) // 1 or 2 -> /backgrounds/{bg}.jpg

  // load saved background choice
  useEffect(() => {
    const saved = Number(window.localStorage.getItem('stickmoe-bg'))
    if (saved === 1 || saved === 2) setBg(saved)
  }, [])

  const cycleBg = useCallback(() => {
    setBg((b) => {
      const next = b === 1 ? 2 : 1
      window.localStorage.setItem('stickmoe-bg', String(next))
      return next
    })
    setStartOpen(false)
  }, [])

  const activeId = order[order.length - 1]

  const focus = useCallback((id) => {
    setOrder((o) => [...o.filter((x) => x !== id), id])
  }, [])

  const openApp = useCallback((id) => {
    setOpen((o) => (o.includes(id) ? o : [...o, id]))
    setMinimized((m) => m.filter((x) => x !== id))
    focus(id)
    setStartOpen(false)
  }, [focus])

  const openGame = useCallback((gameId) => {
    const id = `${GAME_WINDOW_PREFIX}${gameId}`
    openApp(id)
    // games open fullscreen so they have room to render properly
    setMaximized((m) => (m.includes(id) ? m : [...m, id]))
  }, [openApp])

  const openArchiveList = useCallback(() => openApp('archive-list'), [openApp])
  const openArchive = useCallback((week) => openApp(`${ARCHIVE_WINDOW_PREFIX}${week}`), [openApp])

  const closeApp = useCallback((id) => {
    setOpen((o) => o.filter((x) => x !== id))
    setOrder((o) => o.filter((x) => x !== id))
    setMinimized((m) => m.filter((x) => x !== id))
    setMaximized((m) => m.filter((x) => x !== id))
  }, [])

  const minimizeApp = useCallback((id) => {
    setMinimized((m) => (m.includes(id) ? m : [...m, id]))
  }, [])

  const toggleMax = useCallback((id) => {
    setMaximized((m) => (m.includes(id) ? m.filter((x) => x !== id) : [...m, id]))
    focus(id)
  }, [focus])

  // taskbar click: restore if minimized, else focus, else minimize if active
  const taskClick = useCallback((id) => {
    if (minimized.includes(id)) {
      setMinimized((m) => m.filter((x) => x !== id))
      focus(id)
    } else if (id === activeId) {
      minimizeApp(id)
    } else {
      focus(id)
    }
  }, [minimized, activeId, focus, minimizeApp])

  return (
    <>
      <div
        className={styles.desktop}
        style={{
          backgroundImage: `url(/backgrounds/${bg}.jpg)`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
        onMouseDown={() => setStartOpen(false)}
      >
        {/* top wall — ring blinkie (Transing the Internet webring) */}
        <div className={styles.ringBanner}>
          <a href="https://transring.neocities.org" target="_blank" rel="noopener noreferrer">
            <img src="https://transring.neocities.org/widget/nb/button.png" alt="Transing the Internet webring" />
          </a>
        </div>

        {/* left wall — buttons (edit BUTTONS above) */}
        <div className={styles.buttonWall}>
          {BUTTONS.filter((b) => b && b.src).map((b, i) =>
            b.href ? (
              <a key={i} href={b.href} target="_blank" rel="noopener noreferrer">
                <img src={b.src} alt="" />
              </a>
            ) : (
              <img key={i} src={b.src} alt="" />
            )
          )}
        </div>

        {/* middle wall — stamps (edit STAMPS above) */}
        <div className={styles.stampWall}>
          {STAMPS.filter(Boolean).map((src, i) => (
            <img key={i} src={src} alt="" />
          ))}
        </div>

        {/* right wall — blinkies (edit BLINKIES above) */}
        <div className={styles.blinkieWall}>
          {BLINKIES.filter(Boolean).map((src, i) => (
            <img key={i} src={src} alt="" />
          ))}
        </div>

        <div className={styles.iconLayer}>
          {APPS.map((app) => (
            <div
              key={app.id}
              className={styles.icon}
              onDoubleClick={() => openApp(app.id)}
              title={`Open ${app.title}`}
            >
              <img className={styles.iconImg} src={app.icon} alt="" />
              <span className={styles.iconLabel}>{app.title}</span>
            </div>
          ))}
        </div>

        {open.map((id) => {
          const app = appById(id)
          if (!app) return null
          const Body = app.Component
          return (
            <Window
              key={id}
              id={id}
              title={app.title}
              icon={app.icon}
              initial={app.initial}
              zIndex={10 + order.indexOf(id)}
              active={id === activeId && !minimized.includes(id)}
              minimized={minimized.includes(id)}
              maximized={maximized.includes(id)}
              onFocus={focus}
              onClose={closeApp}
              onMinimize={minimizeApp}
              onMaximize={toggleMax}
              bodyClassName={app.isGame ? styles.gameBody : undefined}
            >
              {app.isGame ? <IframeContent src={app.src} title={app.title} />
                : app.isArchive ? <SotwArchivePlayerContent week={app.week} />
                : id === 'games' ? <GamesListContent onOpenGame={openGame} />
                : id === 'archive-list' ? <SotwArchiveListContent onOpenArchive={openArchive} />
                : id === 'sotw' ? <Body onOpenArchive={openArchiveList} />
                : <Body />}
            </Window>
          )
        })}
      </div>

      <Taskbar
        apps={APPS}
        open={open}
        activeId={activeId}
        minimized={minimized}
        startOpen={startOpen}
        onStart={() => setStartOpen((s) => !s)}
        onTask={taskClick}
        onOpenApp={openApp}
        onCycleBg={cycleBg}
      />
    </>
  )
}

function Taskbar({ apps, open, activeId, minimized, startOpen, onStart, onTask, onOpenApp, onCycleBg }) {
  const [time, setTime] = useState('')
  useEffect(() => {
    const tick = () =>
      setTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }))
    tick()
    const t = setInterval(tick, 1000 * 15)
    return () => clearInterval(t)
  }, [])

  return (
    <>
      {startOpen && (
        <div className={styles.startMenu} onMouseDown={(e) => e.stopPropagation()}>
          <div className={styles.startSidebar}>stick.moe</div>
          <div className={styles.startList}>
            {apps.map((app) => (
              <div key={app.id} className={styles.startItem} onClick={() => onOpenApp(app.id)}>
                <img src={app.icon} alt="" /> {app.title}
              </div>
            ))}
            <div className={styles.startDivider} />
            <div className={styles.startItem} onClick={onCycleBg}>
              <img src="/assets/paintcolors.png" alt="" /> Change Background
            </div>
            <a className={styles.startItem} href="https://github.com/NotNotEnder/stick.moe">
              <img src="/assets/shortcut.png" alt="" /> Source Code
            </a>
          </div>
        </div>
      )}

      <div className={styles.taskbar} onMouseDown={(e) => e.stopPropagation()}>
        <img
          className={styles.startImg}
          src={startOpen ? '/assets/startclick.png' : '/assets/startplain.png'}
          alt="Start"
          onClick={onStart}
        />
        <div className={styles.divider} />

        <div className={styles.taskButtons}>
          {open.map((id) => {
            const app = appById(id)
            if (!app) return null
            const isActive = id === activeId && !minimized.includes(id)
            return (
              <button
                key={id}
                className={`${styles.taskButton} ${isActive ? styles.taskButtonActive : ''}`}
                onClick={() => onTask(id)}
              >
                <img className={styles.taskIcon} src={app.icon} alt="" /> {app.title}
              </button>
            )
          })}
        </div>

        <div className={styles.clock}>{time}</div>
      </div>
    </>
  )
}
