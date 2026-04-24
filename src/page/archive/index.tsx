import { Flex, Timeline, Typography } from 'antd';
import type { TimelineProps } from 'antd';
import styles from './archive.module.css'

const items: TimelineProps['items'] = [
  { title: '05:10', content: 'Create a services' },
  { title: '09:03', content: 'Solve initial network problems' },
  { content: 'Technical testing' },
  { title: '11:28', content: 'Network problems being solved' },
];
export const Archive = () => { 
    return <>
        <div className={styles.archiveStyle}>
            <div className={styles.archiveTitle}>
                归档
            </div>
            <div className={styles.archiveContent}>
                
                <Timeline items={items} titleSpan="100px" />
                {/* <Typography.Title level={5} style={{ margin: 0 }}>
                    titleSpan = 25%
                </Typography.Title>
                <Timeline items={items} titleSpan="25%" /> */}
            </div>
        </div>
    </>
}

