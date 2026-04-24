import { MySmallInfoCard } from "@/components/mySmallInfoCard"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ExternalLink, Github, Mail, MapPin } from "lucide-react"
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
            </div>

            <div className={styles.rightCol}>
                <Card id="about" className={styles.card}>
                    <CardHeader className={styles.sectionHeader}>
                        <div className={styles.title}>关于我</div>
                        <div className={styles.intro}>
                            <p>我是LGreatCourage，25年本科毕业，一名练习时长很长的兹申软件攻城狮</p>
                            <p>目前人在北京做一个小小的软件攻城狮</p>
                            <p>永远在自我提升的路上砥砺前行</p>
                        </div>
                    </CardHeader>
                    <CardContent className={styles.content}>
                        <div className={styles.rowWrap}>
                            <span className={styles.pill}>
                                <MapPin className={styles.iconSm} />
                                <span>北京</span>
                            </span>
                            <span className={styles.pill}>
                                <span>目标：把个人站点做成内容与作品集入口</span>
                            </span>
                        </div>
                        <div className={styles.paragraph}>
                            我关注“可维护的 UI 与工程化”，喜欢把页面结构拆清楚，把交互沉淀成可复用组件，并且用更稳定的代码风格维护长期项目。
                        </div>
                    </CardContent>
                    <CardHeader className={styles.sectionHeader}>
                        <div className={styles.title}>关于本站</div>
                    </CardHeader>
                    <CardContent className={styles.content}>
                        <div className={styles.paragraph}>
                            偶然萌生了搭建个人博客的想法，秉持着不将就的开发原则，我拒绝了低代码工具的便捷性，也未套用任何现成的前端框架，决心全程从零手写开发，用最纯粹的方式完成这个项目。
                        </div>
                        <div className={styles.paragraph}>
                            本站前端采用 React 技术栈进行构建，在此之前，我对 React 仅停留在理论认知阶段，仅有过基础的学习经历，并无任何实际项目的落地开发经验，对其生态与实战技巧更是了解甚少。本次建站的核心初衷之一，就是希望借助这个项目，主动接触并实践更多自己不熟悉、未掌握的技术，在实际开发中完成技术积累与能力打磨。
                        </div>
                        <div className={styles.paragraph}>
                            因此，选择 React 开发个人博客，对我而言既是一场全新的技术挑战，也是一次突破自我的进步。从环境搭建到功能实现，从逻辑调试到页面优化，每一个环节都是一次新的尝试，而在这个过程中攻克的每一个难题，都是对自己技术能力的一次提升。
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

                <Card id="contact" className={styles.card}>
                    <CardHeader className={styles.sectionHeader}>
                        <div className={styles.title}>联系方式</div>
                        <div className={styles.subtitle}>把常用的联系入口放这里，建议保持 2–4 个。</div>
                    </CardHeader>
                    <CardContent className={styles.contactWrap}>
                        <Button type="button" variant="outline" className={styles.contactBtn}>
                            <Mail className={styles.iconSm} />
                            <span>邮箱（待补）</span>
                        </Button>
                        <Button type="button" variant="outline" className={styles.contactBtn}>
                            <Github className={styles.iconSm} />
                            <span>GitHub（待补）</span>
                        </Button>
                        <Button type="button" variant="outline" className={styles.contactBtn}>
                            <ExternalLink className={styles.iconSm} />
                            <span>主页链接（待补）</span>
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
