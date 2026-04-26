import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"

type PaginationDemoProps = {
    total?: number
    page?: number
    pageSize?: number
    onChange?: (nextPage: number) => void
}

function getPageItems(page: number, pageCount: number) {
    const safePage = Math.min(Math.max(1, page), Math.max(1, pageCount))
    if (pageCount <= 7) {
        return Array.from({ length: pageCount }, (_, i) => i + 1)
    }

    const pages = new Set<number>([1, pageCount])
    for (let p = safePage - 1; p <= safePage + 1; p += 1) {
        if (p >= 1 && p <= pageCount) pages.add(p)
    }
    pages.add(2)
    pages.add(pageCount - 1)

    const sorted = Array.from(pages).sort((a, b) => a - b)
    const result: Array<number | "ellipsis"> = []
    for (let i = 0; i < sorted.length; i += 1) {
        const cur = sorted[i]
        const prev = sorted[i - 1]
        if (i > 0 && prev != null && cur - prev > 1) {
            result.push("ellipsis")
        }
        result.push(cur)
    }
    return result
}

export function PaginationDemo({ total = 0, page = 1, pageSize = 10, onChange }: PaginationDemoProps) {
    const pageCount = Math.max(1, Math.ceil(total / pageSize))
    const safePage = Math.min(Math.max(1, page), pageCount)
    const canPrev = safePage > 1
    const canNext = safePage < pageCount
    const items = getPageItems(safePage, pageCount)

    const go = (nextPage: number) => {
        const clamped = Math.min(Math.max(1, nextPage), pageCount)
        if (clamped === safePage) return
        onChange?.(clamped)
    }

    return (
        <Pagination>
            <PaginationContent>
                <PaginationItem>
                    <PaginationPrevious
                        href="#"
                        aria-disabled={!canPrev}
                        className={!canPrev ? "pointer-events-none opacity-50" : undefined}
                        onClick={(e) => {
                            e.preventDefault()
                            if (!canPrev) return
                            go(safePage - 1)
                        }}
                    />
                </PaginationItem>
                {items.map((it, idx) => {
                    if (it === "ellipsis") {
                        return (
                            <PaginationItem key={`e-${idx}`}>
                                <PaginationEllipsis />
                            </PaginationItem>
                        )
                    }
                    return (
                        <PaginationItem key={it}>
                            <PaginationLink
                                href="#"
                                isActive={it === safePage}
                                onClick={(e) => {
                                    e.preventDefault()
                                    go(it)
                                }}
                            >
                                {it}
                            </PaginationLink>
                        </PaginationItem>
                    )
                })}
                <PaginationItem>
                    <PaginationNext
                        href="#"
                        aria-disabled={!canNext}
                        className={!canNext ? "pointer-events-none opacity-50" : undefined}
                        onClick={(e) => {
                            e.preventDefault()
                            if (!canNext) return
                            go(safePage + 1)
                        }}
                    />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    )
}
