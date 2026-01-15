import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AppShell } from "@/shared/ui/app-shell";
import { Providers } from "./providers";
import { auth } from "@/features/auth/auth";
import { SessionProvider } from "next-auth/react";
import AppLoader from "@/shared/hoc/app-loader";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Bunker CRM",
    description: "Управление производственными процессами",
};

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const session = await auth();
    return (
        <html lang="en">
            <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
                <SessionProvider session={session}>
                    <Providers>
                        <AppLoader>
                            <AppShell>{children}</AppShell>
                        </AppLoader>
                    </Providers>
                </SessionProvider>
            </body>
        </html>
    );
}
