import { DoorOpen, SquareTerminal } from "lucide-react";

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

    knobs: "/knobs",
    knobsNew: "/knobs/new",
    knobsEdit: "/knobs/",

    orderCurrent: "/order-current",
    orderPreview: "/order-preview",
    orderOld: "/order-old"
};

export const navItems = [
    {
        title: "Заказы",
        url: "#",
        icon: DoorOpen,
        items: [
            {
                href: routes.orderCurrent,
                label: "Текущие",
            },
            {
                href: routes.orderPreview,
                label: "Предварительные",
            },
            {
                href: routes.orderOld,
                label: "Отгруженные",
            },
        ],
    },
    {
        title: "Таблицы",
        url: "#",
        icon: SquareTerminal,
        items: [
            {
                href: routes.locks,
                label: "Замки",
            },
            {
                href: routes.pads,
                label: "Накладки",
            },
            {
                href: routes.knobs,
                label: "Ручки",
            },
        ],
    },
] as const;
