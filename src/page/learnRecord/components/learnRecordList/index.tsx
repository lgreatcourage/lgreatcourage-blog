import {useMemo, useState} from "react"
import { useNavigate } from "react-router-dom"
import styles from "./learnRecordList.module.css"
import { PaginationDemo } from "@/components/paginationDemo"
import LearnRecordlist from "@/data/js/learnRecode/index.json"
type LearnRecordItem = {
    id: number
    title: string
    date: string
    category: string
    coverUrl?: string
    markdown: string
    summary: string
    tags: string[]
}

export const Index = () => {
    const navigate = useNavigate()
    const [searchValue] = useState<string>("");
    const [page, setPage] = useState(1)
    const pageSize = 10

    const items = useMemo<LearnRecordItem[]>(() => LearnRecordlist, [])
    items.reverse()

    const filteredItems = useMemo(() => {
        const keyword = searchValue.trim().toLowerCase()
        if (!keyword) return items
        return items.filter((item) => {
            const haystack = `${item.title} ${item.category} ${item.date}`.toLowerCase()
            return haystack.includes(keyword)
        })
    }, [items, searchValue])

    const total = filteredItems.length
    const pageCount = Math.max(1, Math.ceil(total / pageSize))
    const safePage = Math.min(Math.max(1, page), pageCount)
    const pagedItems = useMemo(() => {
        const start = (safePage - 1) * pageSize
        return filteredItems.slice(start, start + pageSize)
    }, [filteredItems, safePage])

    return (
        <div className={styles.listWrap}>
            <div className={styles.listHeader}>
                <div className={styles.listTitle}>学习记录</div>
                <div className={styles.listDesc}>
                    {/* <Input
                        placeholder="搜索"
                        value={searchValue}
                        onChange={(e) => {
                            setSearchValue(e.target.value)
                            setPage(1)
                        }}
                    /> */}
                </div>
            </div>

            <div className={styles.list}>
                {pagedItems.map((item) => {
                    const hasCover = Boolean(item.coverUrl)
                    return (
                        <button
                            key={item.id}
                            type="button"
                            className={`${styles.card} ${hasCover ? "" : styles.cardNoCover}`}
                            onClick={() => navigate(`/category/learn/${item.id}`, { state: item })}
                        >
                            {hasCover && (
                                <div className={styles.coverWrap}>
                                    <img className={styles.cover} src={item.coverUrl} alt={item.title} loading="lazy" />
                                </div>
                            )}

                            <div className={styles.content}>
                                <div className={styles.metaRow}>
                                    <span className={styles.category}>{item.category}</span>
                                    {!hasCover && <span className={styles.noCoverTag}>无封面</span>}
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
                <PaginationDemo total={total} page={safePage} pageSize={pageSize} onChange={setPage} />
            </div>
        </div>
    )
}
