import ProtectedPage from "@/components/layout/protected-page"
import { OrderList } from "@/components/orders/order-list"

export default function Dashboard() {
  return (
    <ProtectedPage>
      <div className="my-4 mx-2 space-y-8 sm:mx-8">
        <OrderList />
      </div>
    </ProtectedPage>
  )
}
