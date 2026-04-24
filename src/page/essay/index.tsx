
import styles from  "./essay.module.css"
import { MySmallInfoCard } from  "@/components/mySmallInfoCard/index.tsx"
import { PaginationDemo } from  "@/components/paginationDemo/index.tsx"
export const EssayContainer = () => {
    return <>
        <div className={styles.essayContainer}>
            <div className={styles.essayContainerLeft}>
                <MySmallInfoCard />
            </div>
            <div className={styles.essayContainerRight}>
                <div className={styles.essayContainerRight}>
                    <EssayListItem />
                    <EssayListItem />
                    <EssayListItem />
                    <EssayListItem />
                    <EssayListItem />
                    <EssayListItem />
                    <EssayListItem />
                    <EssayListItem />
                    <EssayListItem />
                    <EssayListItem />
                </div>
                <div>
                    <PaginationDemo />
                </div>

            </div>
        </div>
    </>
}

import LWYIMAGE from  '@/assets/private/R-C.jpg'

const EssayListItem = () => {

    return <>
        <div className={styles.essayListItem}>
            <div className={styles.essayAvaterContainer}>
                <img src={LWYIMAGE} />
            </div>
            <div className={styles.essayContent}>
                <div className={styles.essayContentHeader}>
                    <div className={styles.essayContentHeaderName}>LGreatCourage</div>
                    <div className={styles.essayContentHeaderTime}>2026年1月3日</div>
                </div>
                <div className={styles.essayContentText}>
                    这是一个朋友圈
                </div>
                <div className={styles.essayContentImg}>
                    <div className={styles.essayImg1}>
                       <img src={LWYIMAGE} />
                    </div>
                    {/* <div className={styles.essayImg2}>
                       <img src={LWYIMAGE} />
                       <img src={LWYIMAGE} />
                       <img src={LWYIMAGE} />
                       <img src={LWYIMAGE} />
                       <img src={LWYIMAGE} />
                    </div>
                    <div className={styles.essayImg3}>
                       <img src={LWYIMAGE} />
                       <img src={LWYIMAGE} />
                       <img src={LWYIMAGE} />
                       <img src={LWYIMAGE} />
                    </div> */}

                </div>
            </div>
        </div>
    </>
}
