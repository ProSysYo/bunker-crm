import { tableLimits } from "@/config/table-limits";
import { getCustomers } from "@/features/customers/actions/get-customers";
import CustomersList from "@/features/customers/pages/customers-list";

export default async function CustomersPage(props: {
    searchParams?: Promise<{
        query?: string;
        page?: string;
    }>;
}) {
    const searchParams = await props.searchParams;
    const query = searchParams?.query || '';
    const currentPage = Number(searchParams?.page) || 1;
    
    const { customers, pagination } = await getCustomers({
        search: query,
        page: currentPage,
        limit: tableLimits.customers,
    });

    return (
        <CustomersList
            items={customers}
            totalPages={pagination.totalPages}
        />
    );
}