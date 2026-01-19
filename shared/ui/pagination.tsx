"use client";
import { Pagination as PaginationHero } from "@heroui/react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

type Props = {
    totalPages: number;
};

export const Pagination = ({ totalPages }: Props) => {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const currentPage = Number(searchParams.get("page")) || 1;

    const handlePageChange = (page: number) => {
        const params = new URLSearchParams(searchParams);
        params.set("page", page.toString());
        const newURL = `${pathname}?${params.toString()}`;

        router.push(newURL);
    };

    if (totalPages > 1) {
        return (
            <PaginationHero
                total={totalPages}
                page={currentPage}
                onChange={handlePageChange}
                showControls
                color="primary"
                size="sm"
            />
        );
    }

    return null;
};
