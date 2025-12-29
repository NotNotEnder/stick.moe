// pages/index.js
import styles from '../styles/Home.module.css'
import Guestbook from '../components/Guestbook'
import { useState } from 'react'

export default function Home() {
  const [discordCopied, setDiscordCopied] = useState(false);

  const copyDiscord = () => {
    navigator.clipboard.writeText('notnotender');
    setDiscordCopied(true);
    setTimeout(() => setDiscordCopied(false), 2000);
  };

  return (
    <div className={styles.container}>
      <table width="100%" cellPadding="0" cellSpacing="0">
        <tbody>
	<title>About Me!!</title>
          <tr>
            <td align="center" valign="middle">
              <table width="800" cellPadding="10" cellSpacing="0" className={styles.mainTable}>
                <tbody>
                  <tr>
                    <td align="center">
                      {/* Animated Header */}
		      <h1>ATTENTION!!! THIS IS A TEMP DOMAIN!!</h1>
                      <div className={styles.animatedHeader}>
                        <h1>★ WELCOME TO THE SILLINESS ★</h1>
                      </div>
                      {/* Main Content */}
                      <table width="100%" cellPadding="10" cellSpacing="5" className={styles.contentTable}>
                        <tbody>
                          <tr>
                            <td width="30%" valign="top" className={styles.sidebar}>
                              <div className={styles.sidebarContent}>
                                <h2 className={styles.sidebarHeader}>★ABOUT ME★</h2>
                                <img 
                                  src="https://files.catbox.moe/p8gbmd.JPEG" 
                                  alt="PFP" 
                                  className={styles.profilePic}
                                />
                                <p className={styles.sidebarText}>
                                  <b>Name:</b> Ceres<br/>
                                  <b>Aliases:</b> Stick, Not Ender<br/>
                                  <b>Age:</b> 18 +1 +1 (canonically)<br/>
				  <b>Gender:</b> Enby! <br/>
                                  <b>Location:</b> Lemonade!!<br/>
                                  <b>Pronouns:</b> They/Them<br/>
                                  <b>Favorites:</b> Games, Music, You❣
                                </p>
                                
                                {/* Animated GIFs */}
                                <div className={styles.gifs}>
                                  <img src="https://decohoard.carrd.co/assets/images/gallery06/9914c8fd.png?v=e0827b7e" alt="Vulpix" />
                                  <img src="https://decohoard.carrd.co/assets/images/gallery76/59cd8c67.gif?v=e0827b7e" alt="Oshowatt" />
                                </div>
                              </div>
                            </td>
                            
                            <td width="70%" valign="top" className={styles.mainContent}>
                              <h2 className={styles.contentHeader}>★ MY STORY ★</h2>
                              <p className={styles.contentText}>
                                Hallo!! Welcome to my very <b>SILLY</b> and <b>AWESOME</b> website! 
                                This just has a little bit about me so you can get to know me better!
                              </p>
                              <p className={styles.contentText}>
                                I love <span className={styles.rainbowText}>making friends</span>, 
                                <span className={styles.rainbowText}> gaming</span>, and 
                                <span className={styles.rainbowText}> creating fun things</span>! 
                                Check out my socials if you need anything! My DM's are always open, though, try not to open with "hey" or I might think your a bot :3
                              </p>
                              
                              <h3 className={styles.contentHeader}>★ MY INTERESTS ★</h3>
                              <ul className={styles.interestsList}>
                                <li>🎮 Video Games</li>
                                <li>🎵 Music</li>
                                <li>🦊 Furries</li>
                                <li>🎨 Digital Art</li>
                              </ul>
                              
                              <h3 className={styles.contentHeader}>★ CONNECT WITH ME ★</h3>
                              <div className={styles.linksContainer}>
                                <a href="mailto:notnotender@icloud.com" className={styles.retroLink}>📧 Email Me</a>
                                <a href="https://x.com/NotNotEnder" className={styles.retroLink}>🐦 My Twitter</a><br/>
                                <a href="https://bsky.app/profile/stick.ko6bxl.com" className={styles.retroLink}>⭐ My Bluesky</a>
                                <a onClick={copyDiscord} className={styles.retroLink}>
                                  💬 My Discord {discordCopied ? '(Copied!)' : ''}
                                </a>
                                <a href="https://open.spotify.com/playlist/0I1h2IttYrIJnQsaMNihP7?si=3fc4b6c0ec4c4358" className={styles.retroLink}>🎵 My Playlist</a>
                                <a href="https://steamcommunity.com/id/notnotender/" className={styles.retroLink}>🎮 My Steam</a><br/>
                                <a href="https://github.com/NotNotEnder" className={styles.retroLink}>🧑‍💻 My GitHub</a>
                                <a href="https://osu.ppy.sh/users/34467005" className={styles.retroLink}>🕹️ My Osu!</a>
                              </div>
                              
                              {/* Blinkies Section */}
                              <div className={styles.blinkiesSection}>
                                <h3 className={styles.blinkiesHeader}>★ FAVE BLINKIES ★</h3>
                                <div className={styles.blinkiesGrid}>
                                  <img src="https://files.catbox.moe/v0yr85.gif" alt="Enby" />
                                  <img src="https://adriansblinkiecollection.neocities.org/52.gif" alt="Emoticons!!" />
                                  <img src="https://adriansblinkiecollection.neocities.org/n13.gif" alt="Rawr" />
                                  <img src="https://adriansblinkiecollection.neocities.org/61.gif" alt="Silly" />
                                  <img src="https://adriansblinkiecollection.neocities.org/13.gif" alt="Glitter" />
                                  <img src="https://adriansblinkiecollection.neocities.org/x50.gif" alt="Sniff" />
                                </div>
                              </div>
                              
                              {/* Guestbook Section */}
                              <div className={styles.guestbookSection}>
                                <Guestbook />
                              </div>
                              
                		{/* Animated Marquee */}
                              <div className={styles.marqueeContainer}>
                                <div className={styles.marqueeText}>
                                  ★ Thanks for visiting! Come back soon! ★ Check out my other pages! ★ Sign my guestbook! ★
                                </div>
                              </div>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      
                      {/* Footer */}
                      <div className={styles.footer}>
                        <p className={styles.footerText}>
                          0 No Rights Reserved | Best viewed in Netscape Navigator 4.0!<br/> Made with silliness in Cali 💜 
                          <br/><span className={styles.blinkingText}> UNDER CONSTRUCTION</span>
                        </p>
                        <div className={styles.constructionGif}>
                          <a href="https://github.com/NotNotEnder/stick.moe">Webiste Source</a>
                        </div>
                        <div style={{ marginTop: '10px' }}>
                          <a href="/credit" style={{ color: '#ffffff', textDecoration: 'underline' }}>Art Credits</a>
                        </div>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}
