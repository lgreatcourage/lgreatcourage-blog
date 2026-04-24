import type { ReactNode } from "react"
import { useMemo, useState } from "react"
import { useParams } from "react-router-dom"

import styles from "./details.module.css"
import { MySmallInfoCard } from "@/components/mySmallInfoCard"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { RecommendArticles } from "@/page/learnRecord/components/recommend"

type LearnRecordDetail = {
    id: number
    title: string
    summary: string
    date: string
    category: string
    markdown: string
}

type CommentItem = {
    id: string
    content: string
    createdAt: string
}

function renderInline(text: string): ReactNode[] {
    const nodes: ReactNode[] = []
    let i = 0

    const pushText = (value: string) => {
        if (!value) return
        nodes.push(value)
    }

    while (i < text.length) {
        const rest = text.slice(i)

        if (rest.startsWith("`")) {
            const end = rest.indexOf("`", 1)
            if (end > 0) {
                const code = rest.slice(1, end)
                nodes.push(<code key={`code-${i}`}>{code}</code>)
                i += end + 1
                continue
            }
        }

        if (rest.startsWith("**")) {
            const end = rest.indexOf("**", 2)
            if (end > 1) {
                const inner = rest.slice(2, end)
                nodes.push(<strong key={`strong-${i}`}>{renderInline(inner)}</strong>)
                i += end + 2
                continue
            }
        }

        if (rest.startsWith("[")) {
            const closeBracket = rest.indexOf("]")
            const openParen = closeBracket >= 0 ? rest.indexOf("](") : -1
            const closeParen = openParen >= 0 ? rest.indexOf(")", openParen + 2) : -1
            if (openParen === closeBracket && closeParen > openParen) {
                const label = rest.slice(1, closeBracket)
                const href = rest.slice(openParen + 2, closeParen)
                nodes.push(
                    <a key={`link-${i}`} href={href} target="_blank" rel="noreferrer">
                        {label}
                    </a>,
                )
                i += closeParen + 1
                continue
            }
        }

        const nextSpecial = (() => {
            const positions = [rest.indexOf("`"), rest.indexOf("["), rest.indexOf("**")]
                .filter((p) => p >= 0)
            return positions.length ? Math.min(...positions) : -1
        })()

        if (nextSpecial === -1) {
            pushText(rest)
            break
        }

        pushText(rest.slice(0, nextSpecial))
        i += nextSpecial
    }

    return nodes
}

function splitTableRow(line: string) {
    const trimmed = line.trim().replace(/^\|/, "").replace(/\|$/, "")
    return trimmed.split("|").map((c) => c.trim())
}

function isTableSeparator(line: string) {
    return /^\s*\|?(\s*:?-{3,}:?\s*\|)+\s*:?-{3,}:?\s*\|?\s*$/.test(line)
}

function MarkdownView({ markdown }: { markdown: string }) {
    const blocks = useMemo(() => {
        const lines = markdown.replace(/\r\n/g, "\n").split("\n")
        const nodes: ReactNode[] = []
        let i = 0

        const isFence = (line: string) => line.trim().startsWith("```")
        const isHeading = (line: string) => /^#{1,6}\s+/.test(line)
        const isUl = (line: string) => /^\s*[-*]\s+/.test(line)
        const isOl = (line: string) => /^\s*\d+\.\s+/.test(line)
        const isTableRowLike = (line: string) => line.includes("|")

        while (i < lines.length) {
            const line = lines[i]

            if (!line.trim()) {
                i += 1
                continue
            }

            if (isFence(line)) {
                const lang = line.trim().slice(3).trim()
                i += 1
                const codeLines: string[] = []
                while (i < lines.length && !isFence(lines[i])) {
                    codeLines.push(lines[i])
                    i += 1
                }
                if (i < lines.length && isFence(lines[i])) i += 1
                const code = codeLines.join("\n")
                nodes.push(
                    <pre key={`pre-${i}`}>
                        <code data-lang={lang}>{code}</code>
                    </pre>,
                )
                continue
            }

            if (isHeading(line)) {
                const match = /^(#{1,6})\s+(.*)$/.exec(line)
                const level = match ? match[1].length : 1
                const content = match ? match[2] : line
                const Tag = (`h${Math.min(6, Math.max(1, level))}` as unknown) as keyof JSX.IntrinsicElements
                nodes.push(<Tag key={`h-${i}`}>{renderInline(content)}</Tag>)
                i += 1
                continue
            }

            if (isTableRowLike(line) && i + 1 < lines.length && isTableSeparator(lines[i + 1])) {
                const headerCells = splitTableRow(line)
                i += 2
                const bodyRows: string[][] = []
                while (i < lines.length && lines[i].trim() && isTableRowLike(lines[i])) {
                    bodyRows.push(splitTableRow(lines[i]))
                    i += 1
                }

                nodes.push(
                    <table key={`table-${i}`}>
                        <thead>
                            <tr>
                                {headerCells.map((c, idx) => (
                                    <th key={`th-${idx}`}>{renderInline(c)}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {bodyRows.map((row, rIdx) => (
                                <tr key={`tr-${rIdx}`}>
                                    {row.map((c, cIdx) => (
                                        <td key={`td-${rIdx}-${cIdx}`}>{renderInline(c)}</td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>,
                )
                continue
            }

            if (isUl(line)) {
                const items: ReactNode[] = []
                while (i < lines.length && isUl(lines[i])) {
                    const raw = lines[i].replace(/^\s*[-*]\s+/, "")
                    const todo = /^\[([ xX])\]\s+/.exec(raw)
                    if (todo) {
                        const checked = todo[1].toLowerCase() === "x"
                        const text = raw.replace(/^\[[ xX]\]\s+/, "")
                        items.push(
                            <li key={`ul-${i}`}>
                                {checked ? "☑ " : "☐ "}
                                {renderInline(text)}
                            </li>,
                        )
                    } else {
                        items.push(<li key={`ul-${i}`}>{renderInline(raw)}</li>)
                    }
                    i += 1
                }
                nodes.push(<ul key={`ul-block-${i}`}>{items}</ul>)
                continue
            }

            if (isOl(line)) {
                const items: ReactNode[] = []
                while (i < lines.length && isOl(lines[i])) {
                    const raw = lines[i].replace(/^\s*\d+\.\s+/, "")
                    items.push(<li key={`ol-${i}`}>{renderInline(raw)}</li>)
                    i += 1
                }
                nodes.push(<ol key={`ol-block-${i}`}>{items}</ol>)
                continue
            }

            const paragraphLines: string[] = []
            while (
                i < lines.length &&
                lines[i].trim() &&
                !isFence(lines[i]) &&
                !isHeading(lines[i]) &&
                !isUl(lines[i]) &&
                !isOl(lines[i]) &&
                !(isTableRowLike(lines[i]) && i + 1 < lines.length && isTableSeparator(lines[i + 1]))
            ) {
                paragraphLines.push(lines[i].trim())
                i += 1
            }
            const paragraph = paragraphLines.join(" ")
            nodes.push(<p key={`p-${i}`}>{renderInline(paragraph)}</p>)
        }

        return nodes
    }, [markdown])

    return <>{blocks}</>
}

function formatDateTime(value: Date) {
    const y = value.getFullYear()
    const m = String(value.getMonth() + 1).padStart(2, "0")
    const d = String(value.getDate()).padStart(2, "0")
    const hh = String(value.getHours()).padStart(2, "0")
    const mm = String(value.getMinutes()).padStart(2, "0")
    return `${y}-${m}-${d} ${hh}:${mm}`
}

function createCommentId() {
    return `${Date.now()}-${Math.random().toString(16).slice(2)}`
}

export function LearnRecordDetails() {
    const params = useParams()
    const recordId = Number(params.id)

    const records = useMemo<LearnRecordDetail[]>(
        () => [
            {
                id: 1,
                title: "React Router v7：嵌套路由与布局拆分",
                summary: "记录一次把 Layout + 分类页拆出来的过程，以及嵌套路由的常见坑。",
                date: "2026-01-20",
                category: "前端",
                markdown:
                    "这篇记录主要包含：\n\n" +
                    "- 如何把页面拆成 **Layout + 子路由**\n" +
                    "- 嵌套路由里常见的路径/重定向坑\n" +
                    "- 一些实践建议\n\n" +
                    "## 关键点\n\n" +
                    "1. 父路由负责结构（Header/Outlet/Footer）。\n" +
                    "2. 子路由负责具体内容。\n" +
                    "3. 尽量用相对路径维护子路由跳转。\n\n" +
                    "### 示例代码\n\n" +
                    "```tsx\n" +
                    "import { Outlet } from \"react-router-dom\"\n" +
                    "\n" +
                    "export function Layout() {\n" +
                    "  return (\n" +
                    "    <div>\n" +
                    "      <header>Header</header>\n" +
                    "      <main><Outlet /></main>\n" +
                    "      <footer>Footer</footer>\n" +
                    "    </div>\n" +
                    "  )\n" +
                    "}\n" +
                    "```\n\n" +
                    "## Checklist\n\n" +
                    "- [x] 路由层级清晰\n" +
                    "- [x] URL 结构稳定\n" +
                    "- [ ] 数据加载/缓存策略（后续补）\n",
            },
            {
                id: 2,
                title: "TypeScript 严格模式：从 any 走向可维护",
                summary: "在 strict + noUnusedLocals 下整理类型与可选字段的经验。",
                date: "2026-01-18",
                category: "TypeScript",
                markdown:
                    "# TypeScript 严格模式：从 any 走向可维护\n\n" +
                    "目标：在 `strict`、`noUnusedLocals` 等约束下，把代码从“能跑”整理成“可维护”。\n\n" +
                    "## 建议\n\n" +
                    "- 优先消灭 `any`：用 `unknown` + type guard 过渡\n" +
                    "- 把可选字段表达清楚（`?`、联合类型、判空）\n" +
                    "- 用类型让 UI 分支更少\n\n" +
                    "## 小例子\n\n" +
                    "```ts\n" +
                    "type ApiResult = unknown\n" +
                    "\n" +
                    "function isUser(v: unknown): v is { id: number; name: string } {\n" +
                    "  return Boolean(v) && typeof v === \"object\" && \"id\" in v && \"name\" in v\n" +
                    "}\n" +
                    "```\n",
            },
            {
                id: 3,
                title: "CSS Modules：组件化样式的边界与复用",
                summary: "原生 CSS 的组织方式、命名习惯与一些可复用的布局片段。",
                date: "2026-01-10",
                category: "CSS",
                markdown:
                    "# CSS Modules：组件化样式的边界与复用\n\n" +
                    "CSS Modules 适合做“组件私有样式”，但要注意边界：\n\n" +
                    "## 常见做法\n\n" +
                    "| 场景 | 建议 |\n" +
                    "| --- | --- |\n" +
                    "| 布局容器 | 放在页面/模块级 |\n" +
                    "| 原子工具类 | 用 Tailwind 或全局工具类 |\n" +
                    "| 组件样式 | CSS Modules |\n\n" +
                    "## 片段\n\n" +
                    "```css\n" +
                    ".row { display: flex; align-items: center; gap: 12px; }\n" +
                    ".col { display: flex; flex-direction: column; gap: 12px; }\n" +
                    "```\n",
            },
            {
                id: 4,
                title: "Vite 构建：tsc -b 与输出策略",
                summary: "为什么 build 里要跑 tsc -b，以及遇到的类型报错排查思路。",
                date: "2026-01-02",
                category: "工程化",
                markdown:
                    "# Vite 构建：tsc -b 与输出策略\n\n" +
                    "在 Vite 项目里把 `tsc -b` 放进 build，一般是为了：\n\n" +
                    "- 让类型检查变成构建的一部分\n" +
                    "- 在多 tsconfig/引用工程时提升一致性\n\n" +
                    "## 排错路径\n\n" +
                    "1. 看报错发生在哪个 tsconfig\n" +
                    "2. 检查 `paths` / `baseUrl` / `references`\n" +
                    "3. 缩小问题文件再定位\n",
            },
        ],
        [],
    )

    const record = records.find((r) => r.id === recordId)
    const recommendItems = useMemo(
        () =>
            records.map((r) => ({
                id: r.id,
                title: r.title,
                date: r.date,
                category: r.category,
            })),
        [records],
    )

    const [liked, setLiked] = useState(false)
    const [likeCount, setLikeCount] = useState(0)
    const [commentInput, setCommentInput] = useState("")
    const [comments, setComments] = useState<CommentItem[]>([])

    const handleToggleLike = () => {
        setLiked((prevLiked) => {
            setLikeCount((prevCount) => (prevLiked ? Math.max(0, prevCount - 1) : prevCount + 1))
            return !prevLiked
        })
    }

    const handleSubmitComment = () => {
        const content = commentInput.trim()
        if (!content) return

        const newComment: CommentItem = {
            id: createCommentId(),
            content,
            createdAt: formatDateTime(new Date()),
        }

        setComments((prev) => [newComment, ...prev])
        setCommentInput("")
    }

    return (
        <div className={styles.detailsPage}>
            <div className={styles.leftPane}>
                <MySmallInfoCard />
                <RecommendArticles currentId={recordId} items={recommendItems} />
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
                                <MarkdownView markdown={record.markdown} />
                            </div>
                        ) : (
                            <div className={styles.emptyState}>未找到对应文章</div>
                        )}

                        <div className={styles.actionsRow}>
                            <Button
                                type="button"
                                variant={liked ? "secondary" : "outline"}
                                onClick={handleToggleLike}
                                disabled={!record}
                            >
                                点赞 {likeCount > 0 ? `(${likeCount})` : ""}
                            </Button>
                        </div>

                        <div className={styles.commentSection}>
                            <div className={styles.commentHeader}>
                                <div className={styles.commentTitle}>评论</div>
                                <div className={styles.commentCount}>{comments.length}</div>
                            </div>

                            <div className={styles.commentComposer}>
                                <textarea
                                    className={styles.commentTextarea}
                                    value={commentInput}
                                    onChange={(e) => setCommentInput(e.target.value)}
                                    placeholder={record ? "写下你的评论…" : "暂无文章可评论"}
                                    disabled={!record}
                                    rows={4}
                                />
                                <div className={styles.commentSubmitRow}>
                                    <Button type="button" onClick={handleSubmitComment} disabled={!record}>
                                        发表评论
                                    </Button>
                                </div>
                            </div>

                            {comments.length ? (
                                <div className={styles.commentList}>
                                    {comments.map((c) => (
                                        <div key={c.id} className={styles.commentItem}>
                                            <div className={styles.commentMeta}>
                                                <span className={styles.commentAuthor}>访客</span>
                                                <span className={styles.commentDate}>{c.createdAt}</span>
                                            </div>
                                            <div className={styles.commentContent}>{c.content}</div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className={styles.commentEmpty}>还没有评论，来抢沙发吧</div>
                            )}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
