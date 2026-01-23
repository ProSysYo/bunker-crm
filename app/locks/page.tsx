import { lableLimits } from "@/config/table-limits";
import Locks from "../../features/locks/ui/pages/locks";
import { getLocks } from "@/features/locks/actions/get-locks";


export default async function LocksPage(props: {
    searchParams?: Promise<{
        query?: string;
        page?: string;
    }>;
}) {
    const searchParams = await props.searchParams;
    const query = searchParams?.query || "";
    const currentPage = Number(searchParams?.page) || 1;

    const { locks, pagination } = await getLocks({
        search: query,
        page: currentPage,
        limit: lableLimits.locks,
    });

    return <Locks locks={locks} totalPages={pagination.totalPages} />;
}
