import { tableLimits } from "@/config/table-limits";
import { getPackagings } from "@/features/packagings/actions/get-packagings";
import PackagingsList from "@/features/packagings/pages/packagings-list";

export default async function PackagingsPage(props: {
    searchParams?: Promise<{
        query?: string;
        page?: string;
    }>;
}) {
    const searchParams = await props.searchParams;
    const query = searchParams?.query || '';
    const currentPage = Number(searchParams?.page) || 1;
    
    const { packagings, pagination } = await getPackagings({
        search: query,
        page: currentPage,
        limit: tableLimits.packagings,
    });

    return (
        <PackagingsList
            items={packagings}
            totalPages={pagination.totalPages}
        />
    );
}