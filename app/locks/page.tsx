import { tableLimits } from "@/config/table-limits";
import { getLocks } from "@/features/locks/actions/get-locks";
import LocksList from "../../features/locks/ui/pages/locks-list";


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
        limit: tableLimits.locks,
    });

    return <LocksList locks={locks} totalPages={pagination.totalPages} />;
}
