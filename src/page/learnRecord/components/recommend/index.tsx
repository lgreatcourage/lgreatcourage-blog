import { useMemo } from "react"
import { useNavigate } from "react-router-dom"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import styles from "./recommend.module.css"

type RecommendItem = {
    id: number
    title: string
    date: string
    category: string
    markdown: string
}

export function RecommendArticles({
    currentId,
    items,
}: {
    currentId?: number
    items: RecommendItem[]
}) {
    const navigate = useNavigate()

    const recommended = useMemo(() => {
        return items.filter((x) => x.id !== currentId).slice(0, 5)
    }, [currentId, items])

    return (
        <Card className={styles.recommendCard}>
            <CardHeader className={styles.recommendHeader}>
                <div className={styles.recommendTitle}>推荐文章</div>
            </CardHeader>
            <CardContent className={styles.recommendContent}>
                {recommended.length ? (
                    recommended.map((item) => (
                        <Button
                            key={item.id}
                            type="button"
                            variant="ghost"
                            className={styles.recommendButton}
                            onClick={() => navigate(`/category/learn/${item.markdown}`)}
                        >
                            <div className={styles.itemBody}>
                                <div className={styles.itemTitle}>{item.title}</div>
                                <div className={styles.itemMeta}>
                                    <span className={styles.categoryTag}>
                                        {item.category}
                                    </span>
                                    <span>{item.date}</span>
                                </div>
                            </div>
                        </Button>
                    ))
                ) : (
                    <div className={styles.emptyWrap}>
                        <div>暂无推荐</div>
                    </div>
                )}
            </CardContent>
        </Card>
    )
}
