import { Card } from "@/components/ui/card";
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button";
import styles from "./essayList.module.css";
import EssayData from "@/data/js/essay/index.json";
import { Image } from "antd";
import LWYIMAGE from  '@/assets/private/avatar.jpg'
import { useNavigate } from "react-router";
type MomentPost = {
  id: number;
  date: string;
  content: string;
  photoList: string[];
};
import yellowTag from "@/assets/icon/tag/yellowTag.png";

export function EssayList() {
  const posts: MomentPost[] = EssayData.reverse().slice(0, 3);
  const navigate = useNavigate();
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
            <img
              className={styles.avatar}
              src={LWYIMAGE}
              alt=""
            />
            <div className={styles.postContent}>
              <div className={styles.postHeaderRow}>
                <div className={styles.author}>LGreatCourage</div>
                <div className={styles.time}>{post.date}</div>
              </div>
              <div className={styles.content}>{post.content}</div>
              <div
                className={
                  post.photoList.length === 1
                    ? styles.essayImg1
                    : post.photoList.length === 4
                      ? styles.essayImg3
                      : styles.essayImg2
                }
              >
                {post.photoList.map((path) => (
                  <Image src={path} />
                ))}
              </div>
            </div>
          </div>
        </div>
      ))}
      <div className={styles.moreButtonWrapper}>
        <InteractiveHoverButton onClick={() => navigate("/category/essay")}>查看更多随笔</InteractiveHoverButton>
      </div>
    </Card>
  );
}
