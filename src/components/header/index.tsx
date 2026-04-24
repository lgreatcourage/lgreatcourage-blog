import styles from './header.module.css'
import { NavLink, useLocation } from "react-router-dom"

import type { RouteItem } from "@/router/index"
import { routes } from "@/router/index"
import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler"
import LOGO from "@/assets/logo.png"
import {useEffect, useState} from "react";

type HeaderNavItem = {
    label: string
    to: string
    order: number
    children?: HeaderNavItem[]
}

function joinPaths(...segments: Array<string | undefined>) {
    const joined = segments
        .filter((s): s is string => typeof s === "string")
        .map((s) => s.replace(/^\/+|\/+$/g, ""))
        .filter(Boolean)
        .join("/")
    return "/" + joined
}

function getHeaderNavItems(rootChildren: RouteItem[]): HeaderNavItem[] {
    const headerRoutes = rootChildren
        .filter((r) => Boolean(r.meta?.header?.show))
        .filter((r) => typeof r.path === "string" && r.path.length > 0)
        .sort((a, b) => (a.meta?.header?.order ?? 0) - (b.meta?.header?.order ?? 0))

    return headerRoutes.map((r) => {
        const to = joinPaths(r.path as string)
        const label = r.meta?.title ?? r.name ?? (r.path as string)
        const order = r.meta?.header?.order ?? 0

        const children = r.children
            ?.filter((c) => Boolean(c.meta?.header?.show))
            .filter((c) => typeof c.path === "string" && c.path.length > 0)
            .sort((a, b) => (a.meta?.header?.order ?? 0) - (b.meta?.header?.order ?? 0))
            .map((c) => ({
                label: c.meta?.title ?? c.name ?? (c.path as string),
                to: joinPaths(r.path as string, c.path as string),
                order: c.meta?.header?.order ?? 0,
            }))

        return {
            label,
            to,
            order,
            children: children?.length ? children : undefined,
        }
    })
}
export function Header() {
    const location = useLocation()
    const root = routes.find((r) => r.path === "/")
    const items = getHeaderNavItems(root?.children ?? [])

    const [isScrolled, setScrolled] = useState(false)

    const handleScroll = () => {
        const scrollTop = window.scrollY
        setScrolled( scrollTop > 0 )
    }

    useEffect(() => {

        window.addEventListener("scroll", handleScroll)

        return () => {
            window.removeEventListener("scroll", handleScroll)
        }

    },[])


    return (
        <div className={`
            ${styles.headerStyle}
            ${isScrolled ? styles.headerBgColor : ''}
        `}>
            <div className={styles.navigationStyle}>
                <div className={styles.logoStyle}>
                    <NavLink to="/home" className={styles.logoLink} aria-label="首页">
                        <img className={styles.logoImg} src={LOGO} alt="logo" />
                    </NavLink>
                </div>
                <nav className={styles.menuContentStyle} aria-label="主导航">
                    <ul className={styles.menuList}>
                        {items.map((item) => {
                            const hasChildren = Boolean(item.children?.length)
                            const parentActive =
                                location.pathname === item.to ||
                                location.pathname.startsWith(item.to + "/")

                            if (hasChildren) {
                                return (
                                    <li
                                        key={item.to}
                                        className={`${styles.menuItem} ${parentActive ? styles.menuItemActive : ""}`}
                                    >
                                        <NavLink
                                            to={item.to}
                                            className={({ isActive }) =>
                                                `${styles.menuLink} ${styles.menuLinkWithArrow} ${isActive ? styles.menuLinkActive : ""}`
                                            }
                                        >
                                            {item.label}
                                        </NavLink>
                                        <div className={styles.dropdownMenu}>
                                            {item.children!.map((child) => (
                                                <NavLink
                                                    key={child.to}
                                                    to={child.to}
                                                    className={({ isActive }) =>
                                                        `${styles.dropdownLink} ${isActive ? styles.dropdownLinkActive : ""}`
                                                    }
                                                >
                                                    {child.label}
                                                </NavLink>
                                            ))}
                                        </div>
                                    </li>
                                )
                            }

                            return (
                                <li key={item.to} className={styles.menuItem}>
                                    <NavLink
                                        to={item.to}
                                        end
                                        className={({ isActive }) =>
                                            `${styles.menuLink} ${isActive ? styles.menuLinkActive : ""}`
                                        }
                                    >
                                        {item.label}
                                    </NavLink>
                                </li>
                            )
                        })}
                    </ul>
                </nav>
            </div>
        </div>
    )
}

