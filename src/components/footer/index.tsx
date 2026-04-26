import styles from "./footer.module.css"
import LOGO from "@/assets/logo.png"
import { Github } from "lucide-react"
export function Footer() {
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
                            <div className={styles.columnTitle}>导航</div>
                            <nav className={`${styles.nav} ${styles.navGrid}`}>
                                <a className={styles.navLink} href="/home">
                                    首页
                                </a>
                                <a className={styles.navLink} href="/category/learn">
                                    学习记录
                                </a>
                                <a className={styles.navLink} href="/category/essay">
                                    随笔
                                </a>
                                <a className={styles.navLink} href="/archive">
                                    归档
                                </a>
                                <a className={styles.navLink} href="/message">
                                    留言板
                                </a>
                                <a className={styles.navLink} href="/about">
                                    关于我
                                </a>
                            </nav>
                        </div>
                        <div>
                            <div className={styles.columnTitle}>说明</div>
                            <nav className={styles.nav}>
                                <span className={styles.textLine}>本站聚焦学习记录、随笔与项目实践沉淀。</span>
                                <span className={styles.textLine}>页面与组件持续迭代中，欢迎交流建议。</span>
                            </nav>
                        </div>
                    </div>
                </div>

                <div className={styles.bottomBar}>
                    <div className={styles.copy}>LGreatCourage · 持续学习与分享</div>
                    <div className={styles.socialRow}>
                        <a
                            className={styles.socialLink}
                            href="https://github.com/lgreatcourage"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="GitHub"
                        >
                            <Github className={styles.socialIcon} />
                            GitHub
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    )
}
