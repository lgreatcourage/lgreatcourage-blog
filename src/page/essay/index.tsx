import styles from "./essay.module.css";
import { MySmallInfoCard } from "@/components/mySmallInfoCard/index.tsx";
import { PaginationDemo } from "@/components/paginationDemo/index.tsx";
import EessayList from "@/data/js/essay/index.json";

export interface EssayListItemProps {
  id: number;
  date: string;
  content: string;
  photoList: string[];
}

export const EssayContainer = () => {
  const essayList = EessayList;
  return (
    <>
      <div className={styles.essayContainer}>
        <div className={styles.essayContainerLeft}>
          <MySmallInfoCard />
        </div>
        <div className={styles.essayContainerRight}>
          <div className={styles.essayContainerRight}>
            {essayList.map((item) => (
              <EssayListItem key={item.id} {...item} />
            ))}
          </div>
          <div>
            <PaginationDemo />
          </div>
        </div>
      </div>
    </>
  );
};

import LWYIMAGE from "@/assets/private/avatar.jpg";
import { Image } from 'antd';
const EssayListItem = ({
  date,
  content,
  photoList,
}: EssayListItemProps) => {
  return (
    <>
      <div className={styles.essayListItem}>
        <div className={styles.essayAvaterContainer}>
          <img src={LWYIMAGE} />
        </div>
        <div className={styles.essayContent}>
          <div className={styles.essayContentHeader}>
            <div className={styles.essayContentHeaderName}>LGreatCourage</div>
            <div className={styles.essayContentHeaderTime}>{date}</div>
          </div>
          <div className={styles.essayContentText}>{content}</div>
          <div className={styles.essayContentImg}>
            <div
              className={
                photoList.length === 1
                  ? styles.essayImg1
                  : photoList.length === 4
                    ? styles.essayImg3
                    : styles.essayImg2
              }
            >
              {photoList.map((path) => (
                <Image
                    src={path}
                />
                // <img src={path} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
