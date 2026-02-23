import styles from '../styles/Home.module.css'
import Link from 'next/link'

export default function Projects() {
  return (
    <div className={styles.container}>
      <table width="100%" cellPadding="0" cellSpacing="0">
        <tbody>
          <title>Projects!!</title>
          <tr>
            <td align="center" valign="middle">
              <table width="800" cellPadding="10" cellSpacing="0" className={styles.mainTable}>
                <tbody>
                  <tr>
                    <td align="center">
                      <div className={styles.animatedHeader}>
                        <h1>★ PROJECTS ★</h1>
                      </div>

                      <table width="100%" cellPadding="10" cellSpacing="5" className={styles.contentTable}>
                        <tbody>
                          <tr>
                            <td valign="top" className={styles.mainContent}>
                              <h2 className={styles.contentHeader}>★ tik.stick.moe ★</h2>
                              <p className={styles.contentText}>
                                My TikTok embedder makes sharing videos easier.<br/>
                                Just replace <b>tiktok.com</b> in any TikTok URL with <b>tik.stick.moe</b> to create an embeddable page.
                              </p>
                              <p className={styles.contentText}>
                                <a href="https://tik.stick.moe" className={styles.retroLink} target="_blank" rel="noopener noreferrer">
                                  Open tik.stick.moe
                                </a>
                              </p>

                              <br/>

                              <h2 className={styles.contentHeader}>★ insta.stick.moe ★</h2>
                              <p className={styles.contentText}>
                                I made the same idea for Instagram too.<br/>
                                Replace <b>instagram.com</b> in an Instagram URL with <b>insta.stick.moe</b> for easier embeds and sharing.
                              </p>
                              <p className={styles.contentText}>
                                <a href="https://insta.stick.moe" className={styles.retroLink} target="_blank" rel="noopener noreferrer">
                                  Open insta.stick.moe
                                </a>
                              </p>

                              <div className={styles.linksContainer}>
                                <Link href="/" className={styles.retroLink}>
                                  ⬅️ Back to Home
                                </Link>
                              </div>

                              <div className={styles.marqueeContainer}>
                                <div className={styles.marqueeText}>
                                  ★ Build cool tools! ★ Share easier! ★ Keep it silly! ★
                                </div>
                              </div>
                            </td>
                          </tr>
                        </tbody>
                      </table>

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
