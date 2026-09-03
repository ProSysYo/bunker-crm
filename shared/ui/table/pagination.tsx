"use client";
import { Pagination as HeroPagination } from "@heroui/react";
import { ChevronLeft, ChevronRight } from "lucide-react";
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

    if (totalPages <= 1) {
        return null;
    }

    const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

    return (
        <HeroPagination size="sm" aria-label="Пагинация" style={{ width: 'auto', flexShrink: 0, display: 'flex' }}>
            <HeroPagination.Content>
                <HeroPagination.Item>
                    <HeroPagination.Previous onPress={() => handlePageChange(currentPage - 1)} isDisabled={currentPage <= 1}>
                        <ChevronLeft size={16} />
                    </HeroPagination.Previous>
                </HeroPagination.Item>
                {pages.map((page) => (
                    <HeroPagination.Item key={page}>
                        <HeroPagination.Link isActive={page === currentPage} onPress={() => handlePageChange(page)}>
                            {page}
                        </HeroPagination.Link>
                    </HeroPagination.Item>
                ))}
                <HeroPagination.Item>
                    <HeroPagination.Next onPress={() => handlePageChange(currentPage + 1)} isDisabled={currentPage >= totalPages}>
                        <ChevronRight size={16} />
                    </HeroPagination.Next>
                </HeroPagination.Item>
            </HeroPagination.Content>
        </HeroPagination>
    );
};
