import Link from "next/link"
import { CalendarIcon, EyeIcon, FilePenIcon, TrashIcon, MaximizeIcon, CogIcon } from "lucide-react"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ExtendedOrderType } from "@/utils/global.types"

import { formatDateToString, formatCurrency } from "@/lib/utils"

import { OrderState } from "@/components/common/order-states"
import { PaymentState } from "@/components/common/payment-states"
import { OrderType } from "@/components/common/order-types"

export const OrderListItem = ({ order }: { order: any }) => {
  return (
    <Card className="w-full">
        <div className="grid gap-4">
          <div className="grid gap-4 bg-muted/20 p-4 rounded-lg">

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold"><span className="text-muted-foreground font-normal">Order</span> #{order.id}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CalendarIcon className="w-4 h-4 text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">{formatDateToString(order.created_at)}</span>
                </div>
              </div>
              <OrderState state={order.state} />
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              <div className="grid">
                <span className="text-xs text-muted-foreground">Customer</span>
                <div className="text-sm">{order.cm_customers?.name}</div>
              </div>
              <div className="grid">
                <span className="text-xs text-muted-foreground">Phone</span>
                <div className="text-sm">{order.cm_customers?.phone}</div>
              </div>
              <div className="grid">
                <span className="text-xs text-muted-foreground">Total</span>
                <div className="text-sm">{formatCurrency(order.total ?? 0)}</div>
              </div>
              <div className="grid">
                <span className="text-xs text-muted-foreground">Items</span>
                <div className="text-sm">{order.cm_order_items?.length} Items</div>
              </div>
            </div>

            <div className="sm:flex items-center justify-between">
              <div className="flex gap-2 space-x-4">
                <div className="grid">
                  <span className="text-xs text-muted-foreground">Source</span>
                  <OrderType type={order.order_type} />
                </div>
                <div className="grid">
                  <span className="text-xs text-muted-foreground">Payment</span>
                  <PaymentState state={order.payment_state} />
                </div>
                <div className="grid">
                  <span className="text-xs text-muted-foreground">Job State</span>
                  <PaymentState state={order.payment_state} />
                </div>
              </div>

              <div className="mt-6 sm:mt-0 flex items-center justify-end gap-2">
                <Button variant="outline" size="sm" className="gap-2">
                  <CogIcon className="w-4 h-4" />
                  Generate Quote
                </Button>
                <Link href={`/orders/${order.id}`}>
                  <Button variant="outline" size="sm">
                    <EyeIcon className="w-4 h-4" />
                    <span className="sr-only">View</span>
                  </Button>
                </Link>
                <Link href={`/orders/${order.id}`}>
                  <Button variant="outline" size="sm">
                    <FilePenIcon className="w-4 h-4" />
                    <span className="sr-only">Edit</span>
                  </Button>
                </Link>
                <Button variant="destructive"  size="sm">
                  <TrashIcon className="w-4 h-4" />
                  <span className="sr-only">Delete</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
    </Card>
  )
}