// components/desktop/content.js — window contents
import { useState } from 'react'
import styles from '../../styles/desktop.module.css'
import Guestbook from '../Guestbook'

export function AboutContent() {
  return (
    <div>
      <h1 className={styles.h}>★ ABOUT ME ★</h1>
      <img src="/Pictures/NotNotEnder.JPEG" alt="PFP" className={styles.pfp} />
      <div className={styles.statBlock}>
        <b>Name:</b> Ceres<br />
        <b>Aliases:</b> Stick, Not Ender<br />
        <b>Age:</b> 18 +1 +1 (canonically)<br />
        <b>Gender:</b> Enby!<br />
        <b>Location:</b> Lemonade!!<br />
        <b>Pronouns:</b> They/Them<br />
        <b>Favorites:</b> Games, Music, You❣
      </div>

      <h2 className={styles.h2}>★ MY STORY ★</h2>
      <p className={styles.p}>
        Hallo!! Welcome to my very <b>SILLY</b> and <b>AWESOME</b> website!
        This just has a little bit about me so you can get to know me better!
      </p>
      <p className={styles.p}>
        I love <span className={styles.rainbow}>making friends</span>,{' '}
        <span className={styles.rainbow}>gaming</span>, and{' '}
        <span className={styles.rainbow}>creating fun things</span>! Check out my
        socials if you need anything! My DM&apos;s are always open, though, try not
        to open with &quot;hey&quot; or I might think your a bot :3
      </p>

      <h2 className={styles.h2}>★ MY INTERESTS ★</h2>
      <ul className={styles.interests}>
        <li>🎮 Video Games</li>
        <li>🎵 Music</li>
        <li>🦊 Furries</li>
        <li>🧑‍💻 Coding</li>
      </ul>

      <h2 className={styles.h2}>★ FAVE BLINKIES ★</h2>
      <div className={styles.blinkies}>
        <img src="https://files.catbox.moe/v0yr85.gif" alt="Enby" />
        <img src="https://adriansblinkiecollection.neocities.org/52.gif" alt="Emoticons" />
        <img src="https://adriansblinkiecollection.neocities.org/n13.gif" alt="Rawr" />
        <img src="https://adriansblinkiecollection.neocities.org/61.gif" alt="Silly" />
        <img src="https://adriansblinkiecollection.neocities.org/13.gif" alt="Glitter" />
        <img src="https://adriansblinkiecollection.neocities.org/x50.gif" alt="Sniff" />
      </div>

      <div className={styles.marquee}>
        <div className={styles.marqueeInner}>
          ★ Thanks for visiting! Come back soon! ★ Open the other windows! ★ Sign my guestbook! ★
        </div>
      </div>
    </div>
  )
}

export function LinksContent() {
  const [copied, setCopied] = useState(false)
  const copyDiscord = () => {
    navigator.clipboard.writeText('notnotender')
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }
  return (
    <div>
      <h1 className={styles.h}>★ CONNECT WITH ME ★</h1>
      <div className={styles.linkGrid}>
        <a href="mailto:notnotender@icloud.com" className={styles.link}>📧 Email</a>
        <a href="https://x.com/NotNotEnder" className={styles.link}>🐦 Twitter</a>
        <a href="https://bsky.app/profile/stick.stick.moe" className={styles.link}>⭐ Bluesky</a>
        <a onClick={copyDiscord} className={styles.link}>💬 Discord {copied ? '(Copied!)' : ''}</a>
        <a href="https://open.spotify.com/playlist/0I1h2IttYrIJnQsaMNihP7?si=3fc4b6c0ec4c4358" className={styles.link}>🎵 Playlist</a>
        <a href="https://steamcommunity.com/id/notnotender/" className={styles.link}>🎮 Steam</a>
        <a href="https://github.com/NotNotEnder" className={styles.link}>🧑‍💻 GitHub</a>
        <a href="https://osu.ppy.sh/users/34467005" className={styles.link}>🕹️ Osu!</a>
      </div>
    </div>
  )
}

export function ProjectsContent() {
  return (
    <div>
      <h1 className={styles.h}>★ PROJECTS ★</h1>

      <h2 className={styles.h2}>★ tik.stick.moe ★</h2>
      <p className={styles.p}>
        My TikTok embedder makes sharing videos easier. Just replace{' '}
        <b>tiktok.com</b> in any TikTok URL with <b>tik.stick.moe</b> to create an
        embeddable page.
      </p>
      <p className={styles.p}>
        <a href="https://tik.stick.moe" className={styles.link} target="_blank" rel="noopener noreferrer">
          Open tik.stick.moe
        </a>
      </p>

      <h2 className={styles.h2}>★ insta.stick.moe ★</h2>
      <p className={styles.p}>
        Same idea for Instagram too. Replace <b>instagram.com</b> in an Instagram
        URL with <b>insta.stick.moe</b> for easier embeds and sharing.
      </p>
      <p className={styles.p}>
        <a href="https://insta.stick.moe" className={styles.link} target="_blank" rel="noopener noreferrer">
          Open insta.stick.moe
        </a>
      </p>

      <div className={styles.marquee}>
        <div className={styles.marqueeInner}>★ Build cool tools! ★ Share easier! ★ Keep it silly! ★</div>
      </div>
    </div>
  )
}

export function CreditsContent() {
  return (
    <div>
      <h1 className={styles.h}>★ ART CREDITS ★</h1>

      <h2 className={styles.h2}>★ BLINKIES, STAMPS, & BUTTONS ★</h2>
      <p className={styles.p}>
        The cool blinkies come from Adrian&apos;s collection and{' '}
        <b>createcore</b>!<br />
        <a href="https://adriansblinkiecollection.neocities.org/" className={styles.link} target="_blank" rel="noopener noreferrer">Adrian&apos;s Blinkie Collection</a>
        <br />
        <a href="https://www.tumblr.com/createcore" className={styles.link} target="_blank" rel="noopener noreferrer">createcore (Tumblr)</a>
      </p>

      <h2 className={styles.h2}>★ FAVICON ★</h2>
      <p className={styles.p}>
        The favicon was made by <b>rolo_stuff</b>!<br />
        <a href="https://x.com/rolo_stuff" className={styles.link} target="_blank" rel="noopener noreferrer">Twitter Profile</a>
      </p>

      <h2 className={styles.h2}>★ WALLPAPERS ★</h2>
      <p className={styles.p}>
        The desktop wallpapers are by <b>fishhwizard</b>!<br />
        <a href="https://www.tumblr.com/fishhwizard" className={styles.link} target="_blank" rel="noopener noreferrer">Tumblr</a>
      </p>

      <h2 className={styles.h2}>★ INSPIRATION ★</h2>
      <p className={styles.p}>
        This site&apos;s desktop look + some assets are inspired by{' '}
        <b>olliveen</b>! Go check them out:<br /><br />
        <a href="https://olliveen.neocities.org/" target="_blank" rel="noopener noreferrer">
          <img src="https://olliveen.neocities.org/img/button.gif" alt="olliveen" style={{ imageRendering: 'auto' }} />
        </a>
      </p>

      <h2 className={styles.h2}>★ SITE ★</h2>
      <p className={styles.p}>
        0 No Rights Reserved | Best viewed in Netscape Navigator 4.0!<br />
        Made with silliness in Cali 💜<br />
        <a href="https://github.com/NotNotEnder/stick.moe" className={styles.link} target="_blank" rel="noopener noreferrer">Website Source</a>
      </p>
    </div>
  )
}

export function GuestbookContent() {
  return <Guestbook />
}
