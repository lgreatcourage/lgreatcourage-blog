import { createElement } from "react";
import type { IndexRouteObject, NonIndexRouteObject } from "react-router-dom";
import { createBrowserRouter, Navigate, Outlet } from "react-router-dom";

import { LayoutFramework } from "@/page/layout";
import { Home } from "@/page/home/index.tsx";
import { LearnRecord } from "@/page/learnRecord/index.tsx"
import { LearnRecordDetails } from "@/page/learnRecord/details.tsx"
import { EssayContainer } from  "@/page/essay/index.tsx"
import { AboutMe } from "@/page/about/index.tsx"
import { Message } from "@/page/message";
import { Archive } from "@/page/archive/index.tsx"
export interface RouteItemMeta {
    title?: string;
    icon?: string;
    requiresAuth?: boolean;
    header?: {
        show?: boolean;
        order?: number;
    };
}

export interface RouteItemExtra {
    name?: string;
    redirect?: string;
    meta?: RouteItemMeta;
}
export type RouteItem =
    | (IndexRouteObject & RouteItemExtra)
    | (Omit<NonIndexRouteObject, 'children'> & RouteItemExtra & { children?: RouteItem[] });

// function SimplePage({ title }: { title: string }) {
//     return createElement(
//         "div",
//         { style: { padding: 24, width: "100%" } },
//         title,
//     );
// }

function CategoryLayout() {
    return createElement(Outlet);
}

export const routes: RouteItem[] = [
    {
        path: "/",
        element: createElement(LayoutFramework),
        children: [
            {
                index: true,
                element: createElement(Navigate, { to: "/home", replace: true }),
            },
            {
                path: "home",
                name: "home",
                element: createElement(Home),
                meta: {
                    requiresAuth: false,
                    title: "首页",
                    header: {
                        show: true,
                        order: 1,
                    },
                },
            },
            {
                path: "category",
                name: "category",
                element: createElement(CategoryLayout),
                meta: {
                    requiresAuth: false,
                    title: "文章分类",
                    header: {
                        show: true,
                        order: 2,
                    },
                },
                children: [
                    {
                        index: true,
                        element: createElement(Navigate, { to: "learn", replace: true }),
                    },
                    {
                        path: "learn",
                        name: "category-learn",
                        element: createElement(LearnRecord),
                        meta: {
                            requiresAuth: false,
                            title: "学习记录",
                            header: {
                                show: true,
                                order: 1,
                            },
                        },
                    },
                    {
                        path: "learn/:id",
                        name: "category-learn-details",
                        element: createElement(LearnRecordDetails),
                        meta: {
                            requiresAuth: false,
                            title: "学习记录详情",
                        },
                    },
                    {
                        path: "essay",
                        name: "category-essay",
                        element: createElement(EssayContainer),
                        meta: {
                            requiresAuth: false,
                            title: "随笔",
                            header: {
                                show: true,
                                order: 2,
                            },
                        },
                    },
                    // {
                    //     path: "project",
                    //     name: "category-project",
                    //     element: createElement(SimplePage, { title: "项目" }),
                    //     meta: {
                    //         requiresAuth: false,
                    //         title: "项目",
                    //         header: {
                    //             show: true,
                    //             order: 3,
                    //         },
                    //     },
                    // },
                ],
            },
            {
                path: "archive",
                name: "archive",
                element: createElement(Archive),
                meta: {
                    requiresAuth: false,
                    title: "归档",
                    header: {
                        show: true,
                        order: 3,
                    },
                },
            },
            {
                path: "message",
                name: "message",
                element: createElement(Message),
                meta: {
                    requiresAuth: false,
                    title: "留言",
                    header: {
                        show: true,
                        order: 4,
                    },
                },
            },
            {
                path: "about",
                name: "about-me",
                element: createElement(AboutMe),
                meta: {
                    requiresAuth: false,
                    title: "关于我",
                    header: {
                        show: true,
                        order: 5,
                    },
                },
            },
        ],
    }
]

export const router = createBrowserRouter(routes);
