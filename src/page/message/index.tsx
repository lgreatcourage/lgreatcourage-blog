import styles from  "./message.module.css"
import { useCallback, useEffect, useRef } from 'react';
import { Input } from 'antd';
const { Search } = Input;
import Danmaku from 'rc-danmaku';
export const Message = () => {

    // 弹幕数据池：你从接口拿到的数据（或用户输入）都应该进入这里，这里才是“当前弹幕数据”的来源
    const danmakuDataRef = useRef<string[]>([]);
    // 当前循环到弹幕池的第几条（用于一轮一轮顺序播放）
    const danmakuIndexRef = useRef(0);
    // 一轮播放时的定时器：按随机间隔逐条 push 弹幕
    const sendTimerRef = useRef<number | null>(null);
    // 一轮播完后，延迟一会儿再开始下一轮（避免刚空屏就立刻重放）
    const restartTimerRef = useRef<number | null>(null);
    // 标记“这一轮已经播完”：只有在播完整轮之后，队列清空时才触发下一轮重播
    const playlistDoneRef = useRef(false);
    // 多轨道弹幕：每个轨道一个 rc-danmaku 实例。发送时随机选轨道 => 看起来位置随机
    const danmakuLanesRef = useRef<Danmaku[]>([]);
    const laneHeight = 44;
    const laneCount = 5;

    // 获取当前弹幕数据（从数据池中读）
    const getDanmaData = () => danmakuDataRef.current;

    const renderDanmakuNode = useCallback((text: string) => {
        const variants = [
            styles.danmakuVariantA,
            styles.danmakuVariantB,
            styles.danmakuVariantC,
            styles.danmakuVariantD,
        ];
        const idx = Math.floor(Math.random() * variants.length);
        return <span className={`${styles.danmakuItem} ${variants[idx]}`}>{text}</span>;
    }, []);

    const pushToRandomLane = useCallback((text: string) => {
        const lanes = danmakuLanesRef.current;
        if (!lanes.length) return;
        const idx = Math.floor(Math.random() * lanes.length);
        lanes[idx]?.push(renderDanmakuNode(text));
    }, [renderDanmakuNode]);

    // 发送一条新弹幕：
    // 1) 写入数据池（保存一份历史，后续也可以参与循环播放）
    // 2) 立即 push 到 rc-danmaku 显示
    const pushDanmaku = (text: string) => {
        const value = text.trim();
        if (!value) return;
        danmakuDataRef.current = [value, ...danmakuDataRef.current].slice(0, 200);
        pushToRandomLane(value);
    };

    useEffect(() => {
        const randomInt = (min: number, max: number) =>
            Math.floor(Math.random() * (max - min + 1)) + min;

        const getSendIntervalMs = () => randomInt(1000, 3000);
        const getLoopIntervalMs = () => randomInt(3000, 5000);

        const wrapperEl = document.querySelector('#danmaku-wrapper') as HTMLElement | null;
        const wrapperWidth = wrapperEl?.clientWidth ?? 1280;
        const danmakuSpeed = Math.max(110, Math.min(240, Math.round(wrapperWidth / 9)));

        danmakuLanesRef.current = Array.from({ length: laneCount }, (_, idx) => {
            return new Danmaku(`#danmaku-lane-${idx}`, {
                speed: danmakuSpeed,
                rowHeight: laneHeight,
                maxRow: 1,
                minGapWidth: 30,
            });
        });

        danmakuDataRef.current = [
            '欢迎来到留言板～',
            '请留言，欢迎大家交流～',
            'React + TypeScript + Vite',
            '人生没有白走的路，每一步都算数！',
        ];

        const pushNextFromPool = () => {
            const pool = danmakuDataRef.current;
            if (pool.length === 0) return;
            const next = pool[danmakuIndexRef.current];
            if (!next) return;
            danmakuIndexRef.current += 1;
            pushToRandomLane(next);
        };

        const scheduleRestart = () => {
            if (restartTimerRef.current) {
                window.clearTimeout(restartTimerRef.current);
            }
            restartTimerRef.current = window.setTimeout(() => {
                playlistDoneRef.current = false;
                danmakuIndexRef.current = 0;
                runCycle();
            }, getLoopIntervalMs());
        };

        const runCycle = () => {
            const pool = danmakuDataRef.current;
            if (!pool.length) return;

            if (danmakuIndexRef.current >= pool.length) {
                playlistDoneRef.current = true;
                scheduleRestart();
                return;
            }

            pushNextFromPool();

            if (danmakuIndexRef.current >= pool.length) {
                playlistDoneRef.current = true;
                scheduleRestart();
                return;
            }

            sendTimerRef.current = window.setTimeout(runCycle, getSendIntervalMs());
        };

        playlistDoneRef.current = false;
        danmakuIndexRef.current = 0;
        runCycle();

        return () => {
            if (sendTimerRef.current) {
                window.clearTimeout(sendTimerRef.current);
                sendTimerRef.current = null;
            }
            if (restartTimerRef.current) {
                window.clearTimeout(restartTimerRef.current);
                restartTimerRef.current = null;
            }
            danmakuLanesRef.current.forEach((ins) => ins.destroy?.());
            danmakuLanesRef.current = [];
        };
    }, [pushToRandomLane]);

    return (
        <div className={styles.messageContainer}>
            <div className={styles.messageShow}>
                <div id="danmaku-wrapper" className={styles.messageInter}>
                    {Array.from({ length: laneCount }, (_, idx) => (
                        <div
                            key={idx}
                            id={`danmaku-lane-${idx}`}
                            className={styles.danmakuLane}
                            style={{ top: `calc(${idx} * 20%)`, height: `${laneHeight}px` }}
                        />
                    ))}

                </div>

            </div>
            <div className={styles.messageInputContainer}>
                <Search
                    className={styles.search}
                    placeholder="快来给予我一点鼓励或建议吧~"
                    allowClear
                    enterButton="发送"
                    size="large"
                    onSearch={(value) => {
                        pushDanmaku(value);
                        getDanmaData();
                    }}
                />
            </div>
            
        </div>
    )
}
