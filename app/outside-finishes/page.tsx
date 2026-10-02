import { tableLimits } from "@/config/table-limits";
import { getOutsideFinishes } from "@/features/outside-finishes/actions/get-outside-finishes";
import OutsideFinishesList from "@/features/outside-finishes/pages/outside-finishes-list";

export default async function OutsideFinishesPage(props: {
    searchParams?: Promise<{
        query?: string;
        page?: string;
    }>;
}) {
    const searchParams = await props.searchParams;
    const query = searchParams?.query || '';
    const currentPage = Number(searchParams?.page) || 1;
    
    const { outsideFinishes, pagination } = await getOutsideFinishes({
        search: query,
        page: currentPage,
        limit: tableLimits.outsideFinishes,
    });

    return (
        <OutsideFinishesList
            items={outsideFinishes}
            totalPages={pagination.totalPages}
        />
    );
}