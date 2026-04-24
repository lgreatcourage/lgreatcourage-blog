import styles from './home.module.css'
import { TypingAnimation } from "@/components/ui/typing-animation"
import { AuroraText } from "@/components/ui/aurora-text"
import { MySmallInfoCard } from "@/components/mySmallInfoCard/index.tsx"
import { Card } from "@/components/ui/card"
import { ExternalLink, Github } from "lucide-react"
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button"
import blueTag from "@/assets/icon/tag/blueTag.png"

export const Home = ()=> {
    return <>
        <div className={styles.homeStyle}>
            <WelcomeSection />
                <ImagesSection />
                <BoldSection />
        </div>
    </>
}
import LWYIMAGE from  '@/assets/private/R-C.jpg'

function WelcomeSection() {
    return <>
        <div className={styles.firstSection}>
            <div className={styles.avater}>
                <img src={LWYIMAGE} alt="" />
            </div>
            <div className={styles.welcomeText}>
                <div>
                        您好！欢迎来到
                    
                </div>
                <div>
                    <AuroraText >LGreatCourage</AuroraText>
                    的博客
                </div>
                <TypingAnimation
                    typeSpeed={100}
                    style={{ textAlign: 'left' , fontSize:'20px' , color:'#999' }}
                    words={["人生没有白走的路，每一步都算数!"]}
                />
            </div>
        </div>
    </>
}

import {BlogList} from "./component/blogList/blogList.tsx"
import  { EssayList } from "./component/essayList/index.tsx"
import {LiveLogSection} from "./component/liveLog/index.tsx"
function BoldSection() {
    return <>
        <div className={styles.blogStyle}>
            <div className={styles.blogStyleLeft}>
                <MySmallInfoCard />
                <LiveLogSection />
                {/* <ProjectsSection /> */}
            </div>
            <div className={styles.blogStyleRight}>
                <BlogList />
                <EssayList />
            </div>
        </div>
    </>
}
import {
    ScrollVelocityContainer,
    ScrollVelocityRow,
} from "@/components/ui/scroll-based-velocity"

function ImagesSection() {
    return <>
        <div className="relative flex w-full flex-col items-center justify-center overflow-hidden py-8">
            <ScrollVelocityContainer className="w-full">
                <ScrollVelocityRow baseVelocity={6} direction={1} className="py-4">
                    {IMAGES_ROW_A.map((src, idx) => (
                        <img
                            key={idx}
                            src={`${src}&ixlib=rb-4.0.3`}
                            alt="Unsplash sample"
                            width={240}
                            height={160}
                            loading="lazy"
                            decoding="async"
                            className="mx-4 inline-block h-40 w-60 rounded-lg object-cover shadow-sm"
                        />
                    ))}
                </ScrollVelocityRow>
                <ScrollVelocityRow baseVelocity={6} direction={-1} className="py-4">
                    {IMAGES_ROW_B.map((src, idx) => (
                        <img
                            key={idx}
                            src={`${src}&ixlib=rb-4.0.3`}
                            alt="Unsplash sample"
                            width={240}
                            height={160}
                            loading="lazy"
                            decoding="async"
                            className="mx-4 inline-block h-40 w-60 rounded-lg object-cover shadow-sm"
                        />
                    ))}
                </ScrollVelocityRow>
            </ScrollVelocityContainer>
            <div className="from-background pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r"></div>
            <div className="from-background pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l"></div>
        </div>
    </>
}

type Project = {
    id: number
    name: string
    description: string
    tags: string[]
    github?: string
    demo?: string
}

function ProjectsSection() {
    const projects: Project[] = [
        {
            id: 1,
            name: "个人博客（React + TS）",
            description: "首页信息架构 + 内容聚合，持续把“我在做什么”展示出来。",
            tags: ["React", "TypeScript"],
        },
        {
            id: 2,
            name: "组件/动效小集",
            description: "沉淀可复用交互：卡片、按钮、动效与布局组件。",
            tags: ["UI", "Motion"],
        },
        {
            id: 3,
            name: "效率工具",
            description: "把重复劳动自动化：脚手架、格式化、批处理小工具。",
            tags: ["Tooling", "CLI"],
        },
    ]

    return (
        <Card className="relative w-[300px] shadow-none">
            <div className="absolute left-0 top-[10px] z-[1] h-[35px] w-[150px]">
                <div className="relative h-full w-full">
                    <img className="h-full w-full" src={blueTag} alt="" />
                    <span className="absolute left-0 top-0 block h-full w-full text-center text-[16px] font-bold leading-[35px] text-white">
                        项目
                    </span>
                </div>
            </div>

            <div className="flex flex-col gap-3 p-4 pt-[46px]">
                {projects.map((project) => (
                    <div
                        key={project.id}
                        className="rounded-xl border border-gray-100 bg-white p-4 transition-all duration-300 ease-in-out hover:-translate-y-0.5 hover:shadow-md dark:border-gray-700 dark:bg-gray-800 dark:hover:shadow-primary/10"
                    >
                        <div className="flex items-start justify-between gap-3">
                            <div className="min-w-0">
                                <div className="truncate text-sm font-semibold text-gray-900 dark:text-white">
                                    {project.name}
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                {project.github ? (
                                    <a
                                        href={project.github}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="rounded-md p-1.5 text-gray-600 transition-colors hover:bg-gray-50 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-700/40 dark:hover:text-white"
                                        aria-label="GitHub"
                                    >
                                        <Github className="h-4 w-4" />
                                    </a>
                                ) : null}
                                {project.demo ? (
                                    <a
                                        href={project.demo}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="rounded-md p-1.5 text-gray-600 transition-colors hover:bg-gray-50 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-700/40 dark:hover:text-white"
                                        aria-label="Demo"
                                    >
                                        <ExternalLink className="h-4 w-4" />
                                    </a>
                                ) : null}
                            </div>
                        </div>

                        <div className="mt-2 line-clamp-2 text-xs text-gray-600 dark:text-gray-300">
                            {project.description}
                        </div>

                        <div className="mt-3 flex flex-wrap gap-1.5">
                            {project.tags.map((tag) => (
                                <span
                                    key={tag}
                                    className="rounded-full border border-gray-200 bg-gray-50 px-2 py-0.5 text-[11px] text-gray-700 dark:border-gray-700 dark:bg-gray-700/40 dark:text-gray-200"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>
                ))}

                <div className="pt-1">
                    <InteractiveHoverButton>查看更多项目</InteractiveHoverButton>
                </div>
            </div>
        </Card>
    )
}

const IMAGES_ROW_A = [
    "https://images.unsplash.com/photo-1749738456487-2af715ab65ea?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://plus.unsplash.com/premium_photo-1720139288219-e20aa9c8895b?q=80&w=1810&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
]
const IMAGES_ROW_B = [
    "https://images.unsplash.com/photo-1749738456487-2af715ab65ea?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://plus.unsplash.com/premium_photo-1720139288219-e20aa9c8895b?q=80&w=1810&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
];
