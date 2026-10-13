import { tableLimits } from "@/config/table-limits";
import { getEars } from "@/features/ears/actions/get-ears";
import EarsList from "@/features/ears/pages/ears-list";

export default async function EarsPage(props: {
    searchParams?: Promise<{
        query?: string;
        page?: string;
    }>;
}) {
    const searchParams = await props.searchParams;
    const query = searchParams?.query || '';
    const currentPage = Number(searchParams?.page) || 1;
    
    const { ears, pagination } = await getEars({
        search: query,
        page: currentPage,
        limit: tableLimits.ears,
    });

    return (
        <EarsList
            items={ears}
            totalPages={pagination.totalPages}
        />
    );
}