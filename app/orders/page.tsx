import ProtectedPage from "@/components/layout/protected-page"
import OrdersTable from "./components/orders-table"
import NewOrderForm from "./components/order-form"

export default function Dashboard() {
  return (
    <ProtectedPage>
      <main className="flex min-h-screen w-full flex-col px-4 pb-24">
          <OrdersTable />
          <NewOrderForm />
      </main>
    </ProtectedPage>
  )
}
