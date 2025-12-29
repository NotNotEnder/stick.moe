// pages/credit.js
import styles from '../styles/Home.module.css'
import Link from 'next/link'

export default function Credit() {
  return (
    <div className={styles.container}>
      <table width="100%" cellPadding="0" cellSpacing="0">
        <tbody>
        <title>Credits!!</title>
          <tr>
            <td align="center" valign="middle">
              <table width="800" cellPadding="10" cellSpacing="0" className={styles.mainTable}>
                <tbody>
                  <tr>
                    <td align="center">
                      {/* Animated Header */}
                      <div className={styles.animatedHeader}>
                        <h1>★ ART CREDITS ★</h1>
                      </div>
                      
                      {/* Main Content */}
                      <table width="100%" cellPadding="10" cellSpacing="5" className={styles.contentTable}>
                        <tbody>
                          <tr>
                            <td valign="top" className={styles.mainContent}>
                              
                              <h2 className={styles.contentHeader}>★ STAMPS ★</h2>
                              <p className={styles.contentText}>
                                The awesome stamps you see on this site are by <b>babykttn</b>!<br/>
                                <a href="https://www.deviantart.com/babykttn" className={styles.retroLink} target="_blank" rel="noopener noreferrer">DeviantArt</a>
                                <br/><br/>
                                They are hosted on:<br/>
                                <a href="https://decohoard.carrd.co" className={styles.retroLink} target="_blank" rel="noopener noreferrer">DecoHoard Carrd</a>
                              </p>
                              
                              <br/>
                              
                              <h2 className={styles.contentHeader}>★ BLINKIES ★</h2>
                              <p className={styles.contentText}>
                                The cool blinkies come from Adrian's collection!<br/>
                                <a href="https://adriansblinkiecollection.neocities.org/" className={styles.retroLink} target="_blank" rel="noopener noreferrer">Adrian's Blinkie Collection</a>
                              </p>
                              
                              <div className={styles.linksContainer}>
                                <Link href="/" className={styles.retroLink}>
                                  ⬅️ Back to Home
                                </Link>
                              </div>

                              {/* Animated Marquee */}
                              <div className={styles.marqueeContainer}>
                                <div className={styles.marqueeText}>
                                  ★ Support artists! ★ Respect copyright! ★ Be creative! ★
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
                        </p>
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
