import type { FC } from "react";
import { Card } from "@/components/ui/card";
import { Folder, Calendar } from "lucide-react";
import { useNavigate } from "react-router";

interface ArticleProps {
  id: number;
  title: string;
  date: string;
  category: string;
  coverUrl?: string;
  markdown: string;
  summary: string;
  tags: string[];
}
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button";
import styles from "./blogList.module.css";
const BlogListItems: FC<ArticleProps> = ({
  id,
  title,
  date,
  category,
  coverUrl,
  markdown,
  summary,
  tags,
}) => {
  const navigate = useNavigate();
  return (
    <div className={styles.blogItemWrapper}>
      <article className={styles.article}>
        {coverUrl ? (
          <div
            className={styles.coverLayout}
            onClick={() =>
              navigate(`/category/learn/${id}`, {
                state: {
                  id,
                  title,
                  date,
                  category,
                  coverUrl,
                  markdown,
                  summary,
                  tags,
                },
              })
            }
          >
            <div className={styles.coverContainer}>
              <img
                src={coverUrl}
                alt={title}
                className={styles.coverImage}
                loading="lazy"
              />
            </div>
            <div className={styles.contentWithCover}>
              <div>
                <div className={styles.metaRow}>
                  <span
                    className={`${styles.metaItem} ${styles.metaItemFirst}`}
                  >
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
                <p className={styles.excerpt}>{summary}</p>
                {tags?.length ? (
                  <div className={styles.tagsRow}>
                    {tags.map((tag) => (
                      <span key={tag} className={styles.tagPill}>
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
          <div
            className={styles.contentNoCover}
            onClick={() =>
              navigate(`/category/learn/${id}`, {
                state: {
                  id,
                  title,
                  date,
                  category,
                  coverUrl,
                  markdown,
                  summary,
                  tags,
                },
              })
            }
          >
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
            <p className={styles.excerpt}>{summary}</p>
            {tags?.length ? (
              <div className={`${styles.tagsRow} ${styles.tagsRowNoCover}`}>
                {tags.map((tag) => (
                  <span key={tag} className={styles.tagPill}>
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
  const navigate = useNavigate();
  return (
    <div className={styles.moreButtonWrapper}>
      <InteractiveHoverButton onClick={() => navigate("/category/learn")}>
        查看更多学习记录
      </InteractiveHoverButton>
    </div>
  );
};

import yellowTag from "@/assets/icon/tag/yellowTag.png";
import learnRecordlist from "@/data/js/learnRecode/index.json";
export function BlogList() {
  // 模拟文章数据
  const articles: ArticleProps[] = learnRecordlist.reverse().slice(0, 3);

  return (
    <Card className={styles.cardRoot}>
      <div className={styles.tagStyle}>
        <div>
          <img src={yellowTag} />
          <span>学习记录</span>
        </div>
      </div>
      {articles.map((article) => (
        <BlogListItems key={article.id} {...article} />
      ))}
      <ToMoreBlogBtn />
    </Card>
  );
}
