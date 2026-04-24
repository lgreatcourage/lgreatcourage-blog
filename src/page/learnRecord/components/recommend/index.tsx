import { useMemo } from "react"
import { useNavigate } from "react-router-dom"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

type RecommendItem = {
    id: number
    title: string
    date: string
    category: string
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
        <Card className="w-[300px] shadow-none">
            <CardHeader className="pb-3">
                <div className="text-sm font-bold text-slate-900">推荐文章</div>
            </CardHeader>
            <CardContent className="flex flex-col gap-2 pt-0">
                {recommended.length ? (
                    recommended.map((item) => (
                        <Button
                            key={item.id}
                            type="button"
                            variant="ghost"
                            className="h-auto w-full justify-start !whitespace-normal rounded-xl border border-slate-200 !bg-white px-3 py-2 text-left hover:!bg-slate-50"
                            onClick={() => navigate(`/category/learn/${item.id}`)}
                        >
                            <div className="flex w-full flex-col gap-1">
                                <div className="text-sm font-semibold text-slate-900">{item.title}</div>
                                <div className="flex items-center gap-2 text-[12px] text-slate-500">
                                    <span className="rounded-full bg-indigo-50 px-2 py-0.5 text-indigo-600">
                                        {item.category}
                                    </span>
                                    <span>{item.date}</span>
                                </div>
                            </div>
                        </Button>
                    ))
                ) : (
                    <div className="text-sm text-slate-500">暂无推荐</div>
                )}
            </CardContent>
        </Card>
    )
}
