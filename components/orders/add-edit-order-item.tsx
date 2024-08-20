import QuoteGenerator from "@/utils/pdfgen/generate-quote"

import { ArrowUpDown, MoreHorizontal, SquarePen, SquarePlus, PlusCircle } from "lucide-react"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"

import { OrderDetailsForm } from "@/components/orders/order-details-form"
import { OrderItemsTable } from "@/components/orders/order-items-table"
import { OrderItemForm } from "@/components/orders/order-items-form" 
import { OrderType, CustomersType, OrderItemsType } from "@/utils/global.types"

export function AddEditOrderItem({ orderId, orderItem }: { orderId: number | undefined, orderItem?: OrderItemsType | undefined }) {
  return (
    <Dialog>
      <DialogTrigger>
        <Button size="sm" variant="ghost" className="gap-1">
          <PlusCircle className="h-3.5 w-3.5" />
          Add New Item
        </Button>
      </DialogTrigger>
      <DialogContent>
        {/* <OrderItemForm /> */}
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button type="button" variant="secondary" onClick={() => {}}>
              Save
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
