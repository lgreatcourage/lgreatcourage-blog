import { MySmallInfoCard } from "@/components/mySmallInfoCard"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { MapPin } from "lucide-react"
import {RelationshipCard}  from "@/components/relationship/index"
import styles from "./about.module.css"

export const AboutMe = () => {
    const skills = [
        "C",
        "JAVA",
        "Python",
        "HTML",
        "JavaScript",
        "CSS",
        "MySQL",
        "sqlite",
        "Git",
        "SVN",
        "VUE",
        "Uni-App",
        "React",
        "React-Native",
        "TypeScript",
        "Vite",
        "Tailwind CSS",
        "CSS Modules",
        "Node.js",
        "Spring",
        "SpringBoot",
        "Maven",
        "Fast API",
        "MyBatis"
    ]

    return (
        <div className={styles.page}>
            <div className={styles.leftCol}>
                <MySmallInfoCard />
                <RelationshipCard />
            </div>

            <div className={styles.rightCol}>
                <div className={styles.pageBanner}>
                    <span className={styles.bannerText}>持续学习 · 持续输出 · 持续迭代</span>
                    <div className={styles.bannerTags}>
                        <span className={styles.bannerTag}>关于我</span>
                        <span className={styles.bannerTag}>关于本站</span>
                        <span className={styles.bannerTag}>技能栈</span>
                    </div>
                </div>

                <Card id="about" className={styles.card}>
                    <CardHeader className={styles.sectionHeader}>
                        <div className={styles.title}>关于我</div>
                        <div className={styles.intro}>
                            <p>你好，我是 LGreatCourage，目前在北京从事软件开发与 Web 应用开发。</p>
                            <p>我更偏向全能型开发：从需求分析、技术选型、系统设计到功能实现、联调上线，均可独立推进并保障交付质量。</p>
                            <p>我坚持长期主义：在每一次迭代中同步优化业务效果、工程质量与系统稳定性。</p>
                        </div>
                    </CardHeader>
                    <CardContent className={styles.content}>
                        <div className={styles.rowWrap}>
                            <span className={styles.pill}>
                                <MapPin className={styles.iconSm} />
                                <span>北京</span>
                            </span>
                            <span className={styles.pill}>
                                <span>目标：成为具备端到端交付能力的全能型工程师</span>
                            </span>
                        </div>
                        <div className={styles.paragraph}>
                            我关注的是“从想法到上线”的全链路能力：既能在业务侧快速理解需求并拆解方案，也能在技术侧完成核心实现、性能优化与稳定性治理，让项目在迭代中持续可控、可扩展、可维护。
                        </div>
                    </CardContent>
                    <CardHeader className={styles.sectionHeader}>
                        <div className={styles.title}>关于本站</div>
                    </CardHeader>
                    <CardContent className={styles.content}>
                        <div className={styles.paragraph}>
                            这个站点最初是我的学习记录工具，随后逐步演变为个人内容中枢：用于沉淀技术文章、复盘项目实践、整理端到端解决方案与工程经验。
                        </div>
                        <div className={styles.paragraph}>
                            我坚持从真实场景出发构建与迭代本站，尽量覆盖从架构设计、接口协作、功能实现到部署优化的完整链路，把“能实现”进一步提升为“可持续交付”。
                        </div>
                        <div className={styles.paragraph}>
                            未来我会继续围绕内容质量、交互体验与工程稳定性进行持续优化，让它不仅是博客，也是一份可验证、可复用、可进化的长期作品集。
                        </div>
                    </CardContent>
                </Card>

                <Card id="skills" className={styles.card}>
                    <CardHeader className={styles.sectionHeader}>
                        <div className={styles.title}>技能栈</div>
                        {/*<div className="text-sm text-slate-500">把你常用技术放这里，突出“熟练/了解/正在学”。</div>*/}
                    </CardHeader>
                    <CardContent className={styles.skillsWrap}>
                        <div className={styles.skillsList}>
                            {skills.map((s) => (
                                <span
                                    key={s}
                                    className={styles.skillTag}
                                >
                                    {s}
                                </span>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
