import ProtectedPage from "@/components/layout/protected-page"
import OrdersTable from "./components/orders-table"
import NewOrderForm from "./components/order-form"

export default function Dashboard() {
  return (
    <ProtectedPage>
        <OrdersTable />
        <NewOrderForm />
    </ProtectedPage>
  )
}
