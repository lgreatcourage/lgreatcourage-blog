import {useMemo, useState} from "react"
import { useNavigate } from "react-router-dom"
import styles from "./learnRecordList.module.css"
import { Input } from "@/components/ui/input"
import { PaginationDemo } from "@/components/paginationDemo"
type LearnRecordItem = {
    id: number
    title: string
    summary: string
    date: string
    category: string
    coverUrl?: string
}

export const Index = () => {
    const navigate = useNavigate()
    const [searchValue, setSearchValue] = useState<string>("");

    const items = useMemo<LearnRecordItem[]>(
        () => [
            {
                id: 1,
                title: "React Router v7：嵌套路由与布局拆分",
                summary: "记录一次把 Layout + 分类页拆出来的过程，以及嵌套路由的常见坑。",
                date: "2026-01-20",
                category: "前端",
                coverUrl: "https://picsum.photos/640/360?random=11",
            },
            {
                id: 2,
                title: "TypeScript 严格模式：从 any 走向可维护",
                summary: "在 strict + noUnusedLocals 下整理类型与可选字段的经验。",
                date: "2026-01-18",
                category: "TypeScript",
            },
            {
                id: 3,
                title: "CSS Modules：组件化样式的边界与复用",
                summary: "原生 CSS 的组织方式、命名习惯与一些可复用的布局片段。",
                date: "2026-01-10",
                category: "CSS",
                coverUrl: "https://picsum.photos/640/360?random=23",
            },
            {
                id: 4,
                title: "Vite 构建：tsc -b 与输出策略",
                summary: "为什么 build 里要跑 tsc -b，以及遇到的类型报错排查思路。",
                date: "2026-01-02",
                category: "工程化",
            },
        ],
        [],
    )

    return (
        <div className={styles.listWrap}>
            <div className={styles.listHeader}>
                <div className={styles.listTitle}>学习记录</div>
                <div className={styles.listDesc}>
                    <Input placeholder="搜索" value={searchValue} onChange={(e) => setSearchValue(e.target.value)} />
                </div>
            </div>

            <div className={styles.list}>
                {items.map((item) => {
                    const hasCover = Boolean(item.coverUrl)
                    return (
                        <button
                            key={item.id}
                            type="button"
                            className={styles.card}
                            onClick={() => navigate(`/category/learn/${item.id}`)}
                        >
                            {hasCover ? (
                                <div className={styles.coverWrap}>
                                    <img className={styles.cover} src={item.coverUrl} alt={item.title} loading="lazy" />
                                </div>
                            ) : (
                                <div className={styles.coverEmpty} aria-hidden="true" />
                            )}

                            <div className={styles.content}>
                                <div className={styles.metaRow}>
                                    <span className={styles.category}>{item.category}</span>
                                    <span className={styles.date}>{item.date}</span>
                                </div>
                                <div className={styles.title}>{item.title}</div>
                                <div className={styles.summary}>{item.summary}</div>
                            </div>
                        </button>
                    )
                })}
            </div>

            <div>
                <PaginationDemo />
            </div>
        </div>
    )
}
