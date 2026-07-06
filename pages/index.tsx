// pages/index.tsx
import Head from 'next/head'
import dynamic from 'next/dynamic'
import styles from '../styles/desktop.module.css'

// Desktop is client-only: it relies on window measurement + drag.
const Desktop = dynamic(() => import('../components/desktop/Desktop'), { ssr: false })

export default function Home() {
  return (
    <>
      <Head>
        <title>stick.moe ☆ desktop</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <Desktop />

      {/* Shown only on small screens (desktop OS is desktop-only) */}
      <div className={styles.mobileNotice}>
        <h1>☆ stick.moe ☆</h1>
        <div className="win">
          <p>this site is a lil desktop and is <b>NOT made for mobile</b>!</p>
          <p style={{ marginTop: 12 }}>come back on a computer to drag the windows around :3</p>
        </div>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center' }}>
          <a href="https://x.com/NotNotEnder" style={{ color: '#00f0ff' }}>twitter</a>
          <a href="https://bsky.app/profile/stick.stick.moe" style={{ color: '#00f0ff' }}>bluesky</a>
          <a href="https://github.com/NotNotEnder" style={{ color: '#00f0ff' }}>github</a>
        </div>
      </div>
    </>
  )
}
