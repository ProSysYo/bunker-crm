import { getOrderFormOptions } from "@/features/orders/actions/get-order-form-options";
import OrderNew from "@/features/orders/pages/order-new";

export default async function OrderNewPage() {
    const options = await getOrderFormOptions();

    return <OrderNew options={options} />;
}
