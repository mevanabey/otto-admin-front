import ProtectedPage from "@/components/layout/protected-page"
import { OrderDetails } from "@/components/orders/order-details"

export default function Page({ params }: { params: { id: string } }) {
  return (
    <ProtectedPage>
      <OrderDetails id={params.id} />
    </ProtectedPage>
  )
}