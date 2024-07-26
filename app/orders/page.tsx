import Breadcrumbs from "@/components/layout/breadcrumbs"
import OrdersTable from "./components/orders-table"
import NewOrderForm from "./components/order-form"

export default function Dashboard() {
  return (
    <main className="flex min-h-screen w-full flex-col px-4 pb-24">
        <Breadcrumbs />
        <OrdersTable />
				<NewOrderForm />
    </main>
  )
}
