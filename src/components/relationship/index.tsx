import { Card } from "antd";
import styles from "./relationshipList.module.css";
import relationshipData from "@/data/js/relationship/index.json";
export const RelationshipCard = () => {
  const relationshipList = relationshipData;
  return (
    <Card className={styles.relationshipCard}>
      <div className={styles.relationshipContentContainer}>
        <div className={styles.relationshipHeader}>友链</div>
        <div className={styles.relationshipSubTitle}>和优秀的人一起成长，欢迎互访交流。</div>
        <div className={styles.relationshipList}>
          {relationshipList.map((item) => (
            <div
              key={item.id}
              className={styles.relationshipItem}
              onClick={() => window.open(`https://${item.url}`, "_blank", "noopener noreferrer")}
            >
              <div className={styles.itemTop}>
                <span className={styles.itemName}>{item.name}</span>
                <span className={styles.itemBadge}>友链</span>
              </div>
              <span className={styles.url}>{item.url}</span>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
};
