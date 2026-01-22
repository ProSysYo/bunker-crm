import { Home, Lock, SquaresExclude } from "lucide-react";

export const routes = {
    home: "/",
    register: "/register",
    login: "/login",

    locks: "/locks",
    locksNew: "/locks/new",
    locksEdit: "/locks/",

    pads: "/pads",
    padsNew: "/pads/new",
    padsEdit: "/pads/",
};

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
    {
        href: routes.pads,
        label: "Накладки",
        icon: SquaresExclude,
    },
] as const;
