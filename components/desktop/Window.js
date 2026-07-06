// components/desktop/Window.js
import { useState, useRef, useEffect } from 'react'
import styles from '../../styles/desktop.module.css'

export default function Window({
  id,
  title,
  icon,
  initial,
  zIndex,
  active,
  minimized,
  maximized,
  onFocus,
  onClose,
  onMinimize,
  onMaximize,
  bodyClassName,
  children,
}) {
  const [pos, setPos] = useState({ x: initial.x, y: initial.y })
  const [size, setSize] = useState({ w: initial.w, h: initial.h })
  const drag = useRef(null) // { mode, startX, startY, origX, origY, origW, origH }

  useEffect(() => {
    function onMove(e) {
      const d = drag.current
      if (!d) return
      const dx = e.clientX - d.startX
      const dy = e.clientY - d.startY
      if (d.mode === 'move') {
        setPos({
          x: Math.max(0, Math.min(window.innerWidth - 60, d.origX + dx)),
          y: Math.max(0, Math.min(window.innerHeight - 60, d.origY + dy)),
        })
      } else {
        setSize({
          w: Math.max(240, d.origW + dx),
          h: Math.max(120, d.origH + dy),
        })
      }
    }
    function onUp() {
      drag.current = null
      document.body.style.userSelect = ''
    }
    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseup', onUp)
    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseup', onUp)
    }
  }, [])

  function startDrag(e, mode) {
    if (maximized) return
    onFocus(id)
    drag.current = {
      mode,
      startX: e.clientX,
      startY: e.clientY,
      origX: pos.x,
      origY: pos.y,
      origW: size.w,
      origH: size.h,
    }
    document.body.style.userSelect = 'none'
    e.preventDefault()
  }

  if (minimized) return null

  const style = maximized
    ? { left: 0, top: 0, width: '100vw', height: 'calc(100vh - 34px)', zIndex }
    : { left: pos.x, top: pos.y, width: size.w, height: size.h, zIndex }

  return (
    <div
      className={`${styles.window} ${maximized ? styles.windowMax : ''}`}
      style={style}
      onMouseDown={() => onFocus(id)}
    >
      <div
        className={`${styles.titlebar} ${active ? '' : styles.titlebarBlur}`}
        onMouseDown={(e) => startDrag(e, 'move')}
        onDoubleClick={() => onMaximize(id)}
      >
        <span className={styles.titleText}>
          {icon ? <img className={styles.titleIcon} src={icon} alt="" /> : null}
          {title}
        </span>
        <span className={styles.titleButtons}>
          <button
            className={styles.titleBtn}
            onClick={(e) => { e.stopPropagation(); onMinimize(id) }}
            aria-label="Minimize"
          >_</button>
          <button
            className={styles.titleBtn}
            onClick={(e) => { e.stopPropagation(); onMaximize(id) }}
            aria-label="Maximize"
          >□</button>
          <button
            className={`${styles.titleBtn} ${styles.titleBtnClose}`}
            onClick={(e) => { e.stopPropagation(); onClose(id) }}
            aria-label="Close"
          >×</button>
        </span>
      </div>

      <div className={`${styles.windowBody} ${bodyClassName || ''}`}>{children}</div>

      {!maximized && (
        <div
          className={styles.resizeHandle}
          onMouseDown={(e) => { e.stopPropagation(); startDrag(e, 'resize') }}
        />
      )}
    </div>
  )
}
