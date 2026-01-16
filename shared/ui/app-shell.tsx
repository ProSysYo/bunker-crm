"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Home, Lock, LogOut } from "lucide-react";
import { Button } from "@heroui/react";
import { signOutFunc } from "@/features/auth/actions/login";
import { useAuthStore } from "@/features/auth/store/auth.store";

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
    const router = useRouter();
    const { isAuth, session, setAuthState } = useAuthStore();

    const handleSignOut = async () => {
        try {
            await signOutFunc();
        } catch (error) {
            console.log(error);
        }
        setAuthState("unauthenticated", null);
        router.push("/login");
    };

    if (!isAuth) {
        return (
            <main className="flex-1 overflow-y-auto bg-muted/40 p-6 h-screen">
                <div className="mx-auto max-w-5xl">{children}</div>
            </main>
        );
    }

    return (
        <div className="flex h-screen bg-background text-foreground">
            <aside className="w-64 flex flex-col border-r bg-sidebar text-sidebar-foreground">
                <div className="flex h-14 items-center border-b px-4 shrink-0">
                    <span className="text-lg font-semibold tracking-tight">Bunker CRM</span>
                </div>

                <nav className="flex-1 overflow-y-auto p-4 flex flex-col gap-2">
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = pathname === item.href;

                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`flex items-center gap-2 rounded-md px-2 py-1.5 transition-colors ${
                                    isActive
                                        ? "bg-primary/10 text-primary font-medium"
                                        : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                                }`}
                            >
                                <Icon className="size-4" />
                                <span>{item.label}</span>
                            </Link>
                        );
                    })}
                </nav>
            </aside>

            <div className="flex flex-1 flex-col">
                <header className="flex h-14 items-center justify-between border-b bg-background/80 px-6 backdrop-blur shrink-0">
                    <div className="text-sm text-muted-foreground"></div>

                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                            {isAuth && (
                                <div className="flex flex-col leading-tight">
                                    <span className="text-xs text-muted-foreground">{session?.user?.email}</span>
                                </div>
                            )}
                        </div>

                        <div className="flex items-center gap-2">
                            {!isAuth ? (
                                <Link href="/login">Войти</Link>
                            ) : (
                                <Button variant="flat" onClick={handleSignOut} className="min-w-0">
                                    <LogOut size={16} />
                                </Button>
                            )}
                        </div>
                    </div>
                </header>

                <main className="flex-1 overflow-y-auto bg-muted/40 p-6">
                    <div className="mx-auto max-w-5xl">{children}</div>
                </main>
            </div>
        </div>
    );
};
