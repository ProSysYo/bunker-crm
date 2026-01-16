"use client";
import { useDebouncedCallback } from "@/shared/hooks/use-debounced-callback";
import { Input } from "@heroui/react";
import { Search } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useState } from "react";

export const LocksSearch = () => {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const query = searchParams.get("query") || "";

    const [searchTerm, setSearchTerm] = useState(query);

    const updateSearchURL = useCallback(
        (term: string) => {
            const params = new URLSearchParams(searchParams.toString());

            params.set("page", "1");

            if (term) {
                params.set("query", term);
            } else {
                params.delete("query");
            }

            const newURL = `${pathname}?${params.toString()}`;
            router.replace(newURL);
        },
        [pathname, router, searchParams]
    );

    const debouncedUpdateURL = useDebouncedCallback(updateSearchURL as (...args: unknown[]) => void, 300);

    const handleSearchChange = (value: string) => {
        setSearchTerm(value);
        debouncedUpdateURL(value);
    };
    return (
        <Input
            placeholder="Поиск по названию или типу..."
            value={searchTerm}
            onValueChange={handleSearchChange}
            startContent={<Search className="w-4 h-4 text-default-400" />}
            size="lg"
            className="max-w-md"
        />
    );
};
