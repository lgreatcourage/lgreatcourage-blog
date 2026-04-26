import styles from  "./message.module.css"
import { useCallback, useEffect, useRef, useState } from 'react';
import { Input, message as antdMessage } from 'antd';
const { Search } = Input;
import Danmaku from 'rc-danmaku';
import { getMessageList as getMessageListApi ,addMessage as addMessageApi} from "@/utils/axios/model/message";
export const Message = () => {
    type GitHubIssueComment = {
        body?: string | null;
    };

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
    const getLaneConfig = (width: number) => {
        if (width <= 767) return { count: 3, gap: 8 };
        if (width <= 1024) return { count: 4, gap: 10 };
        return { count: 5, gap: 12 };
    };
    const [laneConfig, setLaneConfig] = useState(() => getLaneConfig(window.innerWidth));

    const [messageText, setMessageText] = useState('');
    const canSendRemote = Boolean((import.meta.env.VITE_GITHUB_TOKEN || '').trim());

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


    let fallbackMessages: string[] = [
            '欢迎来到留言板～',
            '欢迎大家交流～',
            'React + TypeScript + Vite',
            '人生没有白走的路，每一步都算数！',
        ];

    const getMessageList = () => {
        getMessageListApi()
            .then((res) => {
                const list = Array.isArray(res) ? res : [];
                fallbackMessages = list
                    .map((item: GitHubIssueComment) => String(item?.body ?? '').trim())
                    .filter(Boolean);
                if (fallbackMessages.length) {
                    danmakuDataRef.current = [...fallbackMessages].slice(0, 200);
                }
            })
            .catch(() => {});
    }

    const pushToRandomLane = useCallback((text: string) => {
        const lanes = danmakuLanesRef.current;
        if (!lanes.length) return;
        const idx = Math.floor(Math.random() * lanes.length);
        lanes[idx]?.push(renderDanmakuNode(text));
    }, [renderDanmakuNode]);

    useEffect(() => {
        const onResize = () => {
            const next = getLaneConfig(window.innerWidth);
            setLaneConfig((prev) => {
                if (prev.count === next.count && prev.gap === next.gap) return prev;
                return next;
            });
        };
        window.addEventListener("resize", onResize, { passive: true });
        return () => {
            window.removeEventListener("resize", onResize);
        };
    }, []);

    // 发送一条新弹幕：
    // 1) 写入数据池（保存一份历史，后续也可以参与循环播放）
    // 2) 立即 push 到 rc-danmaku 显示
    const pushDanmaku = (text: string) => {
        addMessageApi(text)
        .then(() => {
            antdMessage.success("发送成功");
            getMessageList();
            const value = text.trim();
            if (!value) return;
            danmakuDataRef.current = [value, ...danmakuDataRef.current].slice(0, 200);
            pushToRandomLane(value);
        })
        .catch((error) => {
            const status = error?.response?.status;
            if (!canSendRemote) {
                antdMessage.error("未配置 VITE_GITHUB_TOKEN，当前环境无法发送到 GitHub。");
                return;
            }
            if (status === 401) {
                antdMessage.error("Token 无效或权限不足，请检查 GitHub Token。");
                return;
            }
            antdMessage.error("发送失败，请稍后重试。");
        });
        
    };


    useEffect(() => {
        const randomInt = (min: number, max: number) =>
            Math.floor(Math.random() * (max - min + 1)) + min;

        const getSendIntervalMs = () => randomInt(500, 3000);
        const getLoopIntervalMs = () => randomInt(3000, 5000);

        const wrapperEl = document.querySelector('#danmaku-wrapper') as HTMLElement | null;
        const wrapperWidth = wrapperEl?.clientWidth ?? 1280;
        const wrapperHeight = wrapperEl?.clientHeight ?? 380;
        const danmakuSpeed = Math.max(110, Math.min(240, Math.round(wrapperWidth / 9)));
        const laneHeight = Math.max(
            28,
            Math.floor((wrapperHeight - laneConfig.gap * (laneConfig.count - 1)) / laneConfig.count),
        );

        danmakuLanesRef.current = Array.from({ length: laneConfig.count }, (_, idx) => {
            return new Danmaku(`#danmaku-lane-${idx}`, {
                speed: danmakuSpeed,
                rowHeight: laneHeight,
                maxRow: 1,
                minGapWidth: 30,
            });
        });

        
        danmakuDataRef.current = fallbackMessages;

        getMessageList();

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
    }, [pushToRandomLane, laneConfig]);

    return (
        <div className={styles.messageContainer}>
            <div className={styles.pageHeader}>
                <div className={styles.pageTitle}>留言板</div>
                <div className={styles.pageSubTitle}>写下你的鼓励、建议或想法，都会变成一条弹幕飞过屏幕</div>
            </div>

            <div className={styles.messageStage}>
                <div className={styles.messageShow}>
                    <div
                        id="danmaku-wrapper"
                        className={styles.messageInter}
                        style={{ ['--lane-gap' as string]: `${laneConfig.gap}px` }}
                    >
                        {Array.from({ length: laneConfig.count }, (_, idx) => (
                            <div
                                key={idx}
                                id={`danmaku-lane-${idx}`}
                                className={styles.danmakuLane}
                            />
                        ))}
                    </div>
                </div>
            </div>

            <div className={styles.messageInputPanel}>
                <div className={styles.inputHint}>
                    {canSendRemote ? "按回车或点击发送即可发布弹幕" : "当前未配置发送 Token，仅可浏览留言"}
                </div>
                <div className={styles.messageInputContainer}>
                    <Search
                        className={styles.search}
                        placeholder="快来给予我一点鼓励或建议吧~"
                        allowClear
                        value={messageText}
                        enterButton="发送"
                        size="large"
                        onChange={(e) => setMessageText(e.target.value)}
                        onSearch={(value) => {
                            const text = value.trim();
                            if (!text) return;
                            pushDanmaku(text);
                            setMessageText('');
                        }}
                    />
                </div>
            </div>
            
        </div>
    )
}
