
import LockPageClient from "./locks-client"
import { getLocks } from "@/features/locks/actions"

export default async function LocksPage(props: {
    searchParams?: Promise<{
        query?: string;
        page?: string;
    }>;
}) {
    const searchParams = await props.searchParams;
    const query = searchParams?.query || '';
    const currentPage = Number(searchParams?.page) || 1;
    
    const { locks, pagination } = await getLocks({
        search: query,
        page: currentPage,
        limit: 10,
    });

    return (
        <LockPageClient
            locks={locks}
            totalPages={pagination.totalPages}
        />
    );
}
