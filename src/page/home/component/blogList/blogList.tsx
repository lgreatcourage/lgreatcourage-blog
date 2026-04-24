import type { FC } from "react"
import { Card } from "@/components/ui/card";
import { Folder, Calendar, ArrowRight } from 'lucide-react';
interface ArticleProps {
    id: number;
    title: string;
    category: string;
    date: string;
    excerpt: string;
    link: string;
    cover?: string;
    tags?: string[];
}
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button"
import styles from "./blogList.module.css"
const BlogListItems: FC<ArticleProps> = ({
     title,
     category,
     date,
     excerpt,
     link,
     cover,
     tags
    }) => {
    return (
        <div className={styles.blogItemWrapper}>
            <article
                className={styles.article}
            >
                {cover ? (
                    <div className={styles.coverLayout}>
                        <div className={styles.coverContainer}>
                            <img
                                src={cover}
                                alt={title}
                                className={styles.coverImage}
                                loading="lazy"
                            />
                        </div>
                        <div className={styles.contentWithCover}>
                            <div>
                                <div className={styles.metaRow}>
                                    <span className={`${styles.metaItem} ${styles.metaItemFirst}`}>
                                        <Folder className={styles.metaIcon} />
                                          {category}
                                    </span>
                                    <span className={styles.metaItem}>
                                        <Calendar className={styles.metaIcon} />
                                        {date}
                                    </span>
                                </div>
                                <h2 className={styles.title}>
                                    <span>{title}</span>
                                </h2>
                                <p className={styles.excerpt}>
                                    {excerpt}
                                </p>
                                {tags?.length ? (
                                    <div className={styles.tagsRow}>
                                        {tags.map((tag) => (
                                            <span
                                                key={tag}
                                                className={styles.tagPill}
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                ) : null}
                            </div>
                            {/* <span
                                className={`${styles.readMoreLink} ${styles.readMoreLinkWithCover}`}
                            >
                                阅读全文
                                <ArrowRight className={styles.readMoreIcon} />
                            </span> */}
                        </div>
                    </div>
                ) : (
                    <div className={styles.contentNoCover}>
                        <div className={styles.metaRow}>
                            <span className={`${styles.metaItem} ${styles.metaItemFirst}`}>
                                <Folder className={styles.metaIcon} />
                                {category}
                            </span>
                            <span className={styles.metaItem}>
                            <Calendar className={styles.metaIcon} />
                                {date}
                            </span>
                        </div>
                        <h2 className={styles.title}>
                            <span>{title}</span>
                        </h2>
                        <p className={styles.excerpt}>
                            {excerpt}
                        </p>
                        {tags?.length ? (
                            <div className={`${styles.tagsRow} ${styles.tagsRowNoCover}`}>
                                {tags.map((tag) => (
                                    <span
                                        key={tag}
                                        className={styles.tagPill}
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        ) : null}
                        {/* <a
                            href={link}
                            className={styles.readMoreLink}
                        >
                            阅读全文
                            <ArrowRight className={styles.readMoreIcon} />
                        </a> */}
                    </div>
                )}
            </article>
        </div>
    );
};

const ToMoreBlogBtn: FC = () => {
    return (
        <div className={styles.moreButtonWrapper} >
            <InteractiveHoverButton>查看更多学习记录</InteractiveHoverButton>
        </div>
    );
};

import yellowTag from "@/assets/icon/tag/yellowTag.png"
export function BlogList() {
    // 模拟文章数据
    const articles = [
        {
            id: 1,
            title: "React + Tailwind CSS 搭建个人博客全流程（从0到1）",
            category: "前端技术",
            date: "2024-05-20",
            excerpt: "详细记录用 React + TypeScript + Tailwind CSS搭建个人博客的完整步骤，包括项目初始化、路由配置、组件封装、深色模式适配、响应式布局优化等核心知识点，适合前端新手参考。",
            link: "#",
            cover: "https://picsum.photos/600/400?random=1",
            tags: ["React", "TypeScript", "Tailwind", "Vite"]
        },
        {
            id: 2,
            title: "《深入理解JavaScript》读书笔记：闭包与作用域",
            category: "读书笔记",
            date: "2024-04-15",
            excerpt: "读完《深入理解JavaScript》后整理的闭包与作用域核心知识点，包括词法作用域、执行上下文、闭包的应用场景与内存泄漏问题，附实战代码示例。",
            link: "#",
            tags: ["JavaScript", "闭包", "作用域"]
        }
    ];

    return (
        <Card className={styles.cardRoot}>
            <div className={styles.tagStyle}>
                <div>
                    <img src={yellowTag} />
                    <span>学习记录</span>
                </div>
            </div>
            {articles.map(article => (
                <BlogListItems key={article.id} {...article} />
            ))}
            <ToMoreBlogBtn />
        </Card>
    );
}
