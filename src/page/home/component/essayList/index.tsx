import { Card } from "@/components/ui/card";
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button"
import styles from "./essayList.module.css"
type MomentPost = {
    id: number
    author: string
    avatar: string
    time: string
    content: string
    images: string[]
}
import yellowTag from "@/assets/icon/tag/yellowTag.png"

export function EssayList() {
    const posts: MomentPost[] = [
        {
            id: 1,
            author: "LGreatCourage",
            avatar: "https://api.dicebear.com/9.x/identicon/svg?seed=lgreatcourage",
            time: "今天 10:21",
            content: "又把首页折腾了一轮：布局更干净了，接下来把文章和随笔的数据源接起来。",
            images: [
                "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.1.0",
                "https://images.unsplash.com/photo-1556761175-4b46a572b786?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.1.0",
                "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.1.0",
            ],
        },
        {
            id: 2,
            author: "LGreatCourage",
            avatar: "https://api.dicebear.com/9.x/identicon/svg?seed=lgreatcourage",
            time: "昨天 22:08",
            content: "晚上的一个小记录：把卡片组件的 hover 细节统一了，感觉顺眼多了。",
            images: ["https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.1.0"],
        },
    ];

    return (
        <Card className={styles.cardRoot}>
            <div className={styles.feedHeader}>
                <div>
                    <img src={yellowTag} />
                    <span>随笔</span>
                </div>
            </div>
            {posts.map((post) => (
                <div key={post.id} className={styles.postCard}>
                    <div className={styles.postLayout}>
                        <img className={styles.avatar} src={post.avatar} alt="" />
                        <div className={styles.postContent}>
                            <div className={styles.postHeaderRow}>
                                <div className={styles.author}>{post.author}</div>
                                <div className={styles.time}>{post.time}</div>
                            </div>
                            <div className={styles.content}>
                                {post.content}
                            </div>
                            {post.images.length > 0 ? (
                                <div className={styles.imagesWrapper}>
                                    {post.images.length === 1 ? (
                                        <img
                                            className={styles.singleImage}
                                            src={post.images[0]}
                                            alt=""
                                            loading="lazy"
                                            decoding="async"
                                        />
                                    ) : post.images.length === 4 ? (
                                        <div className={styles.imageGrid4}>
                                            {post.images.slice(0, 4).map((src, idx) => (
                                                <img
                                                    key={idx}
                                                    className={styles.gridImage}
                                                    src={src}
                                                    alt=""
                                                    loading="lazy"
                                                    decoding="async"
                                                />
                                            ))}
                                        </div>
                                    ) : (
                                        <div className={styles.imageGrid}>
                                            {post.images.slice(0, 9).map((src, idx) => (
                                                <img
                                                    key={idx}
                                                    className={styles.gridImage}
                                                    src={src}
                                                    alt=""
                                                    loading="lazy"
                                                    decoding="async"
                                                />
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ) : null}
                        </div>
                    </div>
                </div>
            ))}
            <div className={styles.moreButtonWrapper}>
                <InteractiveHoverButton>查看更多随笔</InteractiveHoverButton>
            </div>
        </Card>
    );
}
