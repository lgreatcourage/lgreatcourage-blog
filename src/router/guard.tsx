
import type { ReactNode } from "react";
import type { RouteItemMeta } from "@/router/index";

interface RouteGuardProps {
    element: ReactNode;
    meta: RouteItemMeta
}

export const routeGuard = ({element , meta}: RouteGuardProps) => {

    if (meta.requiresAuth === true) {
        const isLogin = !localStorage.getItem("token");
        if (!isLogin) {
            return '404'
        }
    }
    return <>{element}</>

}


