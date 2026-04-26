import { Empty, Spin, Timeline } from "antd";
import type { TimelineProps } from "antd";
import styles from './archive.module.css'
import { useCallback, useEffect, useState } from 'react';
import { getArchiveList as getArchiveListApi } from '../../utils/axios/model/archive';

export const Archive = () => { 

    const [items, setItems] = useState<NonNullable<TimelineProps['items']>>([]);
    const [loading, setLoading] = useState(true);

    const getArchiveList = useCallback(() => {
        type GitHubCommit = {
            commit?: {
                message?: string | null;
                author?: {
                    date?: string | null;
                } | null;
            } | null;
        };
        function formatDateTime(dateStr: string): string {
            if (!dateStr) return '';

            const date = new Date(dateStr);

            // 补零工具
            const pad = (num: number) => num.toString().padStart(2, '0');

            const year = date.getFullYear();
            const month = pad(date.getMonth() + 1);
            const day = pad(date.getDate());
            const hours = pad(date.getHours());
            const minutes = pad(date.getMinutes());

            return `${year}年${month}月${day}日 ${hours}:${minutes}`;
        }
        
        setLoading(true);
        getArchiveListApi()
            .then((res) => {
                const list = Array.isArray(res) ? res : [];
                const nextItems: NonNullable<TimelineProps['items']> = list.map((item: GitHubCommit) => {
                    const title = formatDateTime(item?.commit?.author?.date || '') || '未知时间';
                    const content = item?.commit?.message?.trim() || '无提交说明';
                    return {
                        children: (
                            <div className={styles.timelineItem}>
                                <div className={styles.timelineTime}>{title}</div>
                                <div className={styles.timelineContent}>{content}</div>
                            </div>
                        ),
                    };
                });
                setItems(nextItems);
            })
            .catch(() => {})
            .finally(() => {
                setLoading(false);
            });
    }, []);

    useEffect(() => { 
        getArchiveList()
    }, [getArchiveList])
    return <>
        <div className={styles.archiveStyle}>
            <div className={styles.archiveHeader}>
                <div className={styles.archiveTitle}>归档</div>
                <div className={styles.archiveSubTitle}>记录每一次提交与成长</div>
                <div className={styles.archiveMeta}>共 {items.length} 条记录</div>
            </div>
            <div className={styles.archivePanel}>
                {loading ? (
                    <div className={styles.loadingWrap}>
                        <Spin />
                    </div>
                ) : items.length ? (
                    <Timeline className={styles.archiveTimeline} items={items} />
                ) : (
                    <div className={styles.emptyWrap}>
                        <Empty description="暂无归档记录" />
                    </div>
                )}
            </div>
        </div>
    </>
}
