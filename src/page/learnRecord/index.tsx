import  styles  from "./learnRecord.module.css"
import { Index } from "./components/learnRecordList"
export const LearnRecord = () => {
    return (
        <div className={styles.learnRecordStyle}>
            <Index />
        </div>
    )
}

