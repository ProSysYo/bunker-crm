"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Lock } from "lucide-react";

type AppShellProps = {
    children: React.ReactNode;
};

const navItems = [
    {
        href: "/",
        label: "Главная",
        icon: Home,
    },
    {
        href: "/locks",
        label: "Замки",
        icon: Lock,
    },
] as const;

export const AppShell = ({ children }: AppShellProps) => {
    const pathname = usePathname();

    return (
        <div className="flex min-h-screen bg-background text-foreground">
            {/* Sidebar */}
            <aside className="flex h-screen w-64 flex-col border-r bg-sidebar text-sidebar-foreground">
                <div className="flex h-14 items-center border-b px-4">
                    <span className="text-lg font-semibold tracking-tight">Bunker CRM</span>
                </div>

                <nav className="flex flex-1 flex-col gap-2 p-4">
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = pathname === item.href;

                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={'flex items-center gap-2'}
                            >
                                <Icon className="size-4" />
                                <span>{item.label}</span>
                            </Link>
                        );
                    })}
                </nav>
            </aside>

            {/* Main area */}
            <div className="flex min-h-screen flex-1 flex-col">
                {/* Header */}
                <header className="flex h-14 items-center justify-between border-b bg-background/80 px-6 backdrop-blur">
                    <div className="text-sm text-muted-foreground">Панель управления</div>

                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                            <div className="flex size-8 items-center justify-center rounded-full bg-secondary text-sm font-medium">
                                BI
                            </div>
                            <div className="flex flex-col leading-tight">
                                <span className="text-sm font-medium">Пользователь</span>
                                <span className="text-xs text-muted-foreground">admin@bunker.crm</span>
                            </div>
                        </div>

                        <div className="flex items-center gap-2">
                            <Link href="/login">Войти</Link>
                            <Link href="/register">Регистрация</Link>
                        </div>
                    </div>
                </header>

                {/* Content */}
                <main className="flex-1 overflow-y-auto bg-muted/40 p-6">
                    <div className="mx-auto max-w-5xl">{children}</div>
                </main>
            </div>
        </div>
    );
};
