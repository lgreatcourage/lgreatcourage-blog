import styles from "./footer.module.css"
import LOGO from "@/assets/logo.png"
import { Github, Mail, Rss } from "lucide-react"
export function Footer() {
    // const year = new Date().getFullYear()

    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                <div className={styles.content}>
                    <div className={styles.brand}>
                        <img className={styles.logoImg} src={LOGO} alt="LGreatCourage" />
                        <div className={styles.tagline}>人生没有白走的路，每一步都算数!</div>
                        {/* <div className={styles.metaRow}>
                            <span>写代码</span>
                            <span>做作品</span>
                            <span>记录成长</span>
                        </div> */}
                        <div className={styles.badgeRow}>
                            <span className={`${styles.badge} ${styles.badgeAccent}`}>#Frontend</span>
                            <span className={styles.badge}>#Engineering</span>
                            <span className={styles.badge}>#Life</span>
                        </div>
                    </div>

                    <div className={styles.columns}>
                        <div>
                            <div className={styles.columnTitle}>站点</div>
                            <nav className={styles.nav}>
                                <a className={styles.navLink} href="#">
                                    首页
                                </a>
                                <a className={styles.navLink} href="#">
                                    学习记录
                                </a>
                                <a className={styles.navLink} href="#">
                                    随笔
                                </a>
                            </nav>
                        </div>
                        <div>
                            <div className={styles.columnTitle}>内容</div>
                            <nav className={styles.nav}>
                                <a className={styles.navLink} href="#">
                                    文章分类
                                </a>
                                <a className={styles.navLink} href="#">
                                    友链
                                </a>
                                <a className={styles.navLink} href="#">
                                    留言板
                                </a>
                            </nav>
                        </div>
                        <div>
                            <div className={styles.columnTitle}>关于</div>
                            <nav className={styles.nav}>
                                <a className={styles.navLink} href="#">
                                    关于我
                                </a>
                                <a className={styles.navLink} href="#">
                                    使用说明
                                </a>
                                <a className={styles.navLink} href="#">
                                    隐私与版权
                                </a>
                            </nav>
                        </div>
                    </div>
                </div>

                <div className={styles.bottomBar}>
                    {/* <div className={styles.copy}>© {year} LGreatCourage. All rights reserved.</div> */}
                    <div className={styles.copy}>备案</div>
                    <div className={styles.socialRow}>
                        <a className={styles.socialLink} href="#" aria-label="GitHub">
                            <Github className={styles.socialIcon} />
                            GitHub
                        </a>
                        <a className={styles.socialLink} href="#" aria-label="Email">
                            <Mail className={styles.socialIcon} />
                            Email
                        </a>
                        <a className={styles.socialLink} href="#" aria-label="RSS">
                            <Rss className={styles.socialIcon} />
                            RSS
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    )
}
