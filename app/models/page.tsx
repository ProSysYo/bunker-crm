import { tableLimits } from "@/config/table-limits";
import { getModels } from "@/features/models/actions/get-models";
import ModelsList from "@/features/models/pages/models-list";

export default async function ModelsPage(props: {
    searchParams?: Promise<{
        query?: string;
        page?: string;
    }>;
}) {
    const searchParams = await props.searchParams;
    const query = searchParams?.query || '';
    const currentPage = Number(searchParams?.page) || 1;
    
    const { models, pagination } = await getModels({
        search: query,
        page: currentPage,
        limit: tableLimits.models,
    });

    return (
        <ModelsList
            items={models}
            totalPages={pagination.totalPages}
        />
    );
}