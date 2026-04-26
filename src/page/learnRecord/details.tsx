import { useMemo } from "react"
import { useParams } from "react-router-dom"
import MarkdownPage from "@/components/markdownReader/index.tsx"
import styles from "./details.module.css"
import { MySmallInfoCard } from "@/components/mySmallInfoCard"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { RecommendArticles } from "@/page/learnRecord/components/recommend"
import LearnRecordlist from "@/data/js/learnRecode/index.json"


type LearnRecordDetail = {
    id: number
    title: string
    date: string
    category: string
    summary: string
    coverUrl?: string
    markdown: string
}

export function LearnRecordDetails() {
    const params = useParams()
    const slug = params.id ?? ""

    const record = useMemo<LearnRecordDetail | null>(() => {
        const list = Array.isArray(LearnRecordlist) ? (LearnRecordlist as LearnRecordDetail[]) : []
        const hit = list.find((x) => String(x.id) === slug)
        return hit ?? null
    }, [slug])

    const recommendItems = useMemo(() => {
        const list = Array.isArray(LearnRecordlist) ? (LearnRecordlist as LearnRecordDetail[]) : []
        return list
    }, [])
    return (
        <div className={styles.detailsPage}>
            <div className={styles.leftPane}>
                <MySmallInfoCard />
                <div className={styles.desktopRecommend}>
                    <RecommendArticles currentId={record?.id} items={recommendItems} />
                </div>
            </div>

            <div className={styles.rightPane}>
                <Card className="shadow-none">
                    <CardHeader className={styles.articleHeader}>
                        <div className={styles.articleMetaRow}>
                            <span className={styles.categoryTag}>{record?.category ?? "未知分类"}</span>
                            <span className={styles.articleDate}>{record?.date ?? ""}</span>
                        </div>
                        <div className={styles.articleTitle}>{record?.title ?? "文章不存在"}</div>
                        {record?.summary ? <div className={styles.articleSummary}>{record.summary}</div> : null}
                    </CardHeader>
                    <CardContent className={styles.articleBody}>
                        {record ? (
                            <div className={styles.markdown}>
                                <MarkdownPage mdPath={record.markdown} />
                            </div>
                        ) : (
                            <div className={styles.emptyState}>未找到对应文章</div>
                        )}
                    </CardContent>
                </Card>
            </div>
            <div className={styles.mobileRecommend}>
                <RecommendArticles currentId={record?.id} items={recommendItems} />
            </div>
        </div>
    )
}
