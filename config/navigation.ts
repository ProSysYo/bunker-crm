import { Home, Lock } from "lucide-react";

export const routes = {
    home: '/',
    register: '/register',
    login: '/login',
    locks: '/locks',
    locksNew: '/locks/new',
    locksEdit: '/locks/'
}

export const navItems = [
    {
        href: routes.home,
        label: "Главная",
        icon: Home,
    },
    {
        href: routes.locks,
        label: "Замки",
        icon: Lock,
    },
] as const;