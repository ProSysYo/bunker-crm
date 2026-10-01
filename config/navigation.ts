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

    bolts: "/bolts",
    boltsNew: "/bolts/new",
    boltsEdit: "/bolts/",

    peepholes: "/peepholes",
    peepholesNew: "/peepholes/new",
    peepholesEdit: "/peepholes/",

    paints: "/paints",
    paintsNew: "/paints/new",
    paintsEdit: "/paints/",

    ears: "/ears",
    earsNew: "/ears/new",
    earsEdit: "/ears/",

    packagings: "/packagings",
    packagingsNew: "/packagings/new",
    packagingsEdit: "/packagings/",

    jambHoles: "/jamb-holes",
    jambHolesNew: "/jamb-holes/new",
    jambHolesEdit: "/jamb-holes/",

    hinges: "/hinges",
    hingesNew: "/hinges/new",
    hingesEdit: "/hinges/",

    orderCurrent: "/order-current",
    orderPreview: "/order-preview",
    orderOld: "/order-old",
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
            {
                href: routes.bolts,
                label: "Засовы",
            },
            {
                href: routes.peepholes,
                label: "Глазки",
            },
            {
                href: routes.paints,
                label: "Цвета покраски",
            },
            {
                href: routes.ears,
                label: "Уши",
            },
            {
                href: routes.packagings,
                label: "Упаковки",
            },
            {
                href: routes.jambHoles,
                label: "Отверстия в коробе",
            },
            {
                href: routes.hinges,
                label: "Петли",
            },
        ],
    },
] as const;
