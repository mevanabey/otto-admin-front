import QuoteGenerator from "@/utils/pdfgen/generate-quote"

import { ArrowUpDown, MoreHorizontal, SquarePen, SquarePlus, PrinterIcon } from "lucide-react"

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"

import { OrderDetailsForm } from "@/components/orders/order-details-form"
import { OrderItemsTable } from "@/components/orders/order-items-table"
import { SelectCustomerForm } from "@/components/orders/select-customer" 
import { GenerateQuotation } from "@/components/pdf/quote"
import { OrderType, CustomersType, ExtendedOrderType } from "@/utils/global.types"

export function PrepareQuote({ order, customers }: { order: ExtendedOrderType | undefined, customers: CustomersType[] | undefined }) {
  return (
    <Sheet>
      <SheetTrigger>
        <Button size="sm" variant="link" className="h-8 gap-2">
          <SquarePen className="h-3.5 w-3.5" />
          <span className="lg:sr-only xl:not-sr-only xl:whitespace-nowrap text-[0.7rem]">
            Prepare Quote
          </span>
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Prepare Quote</SheetTitle>
          {/* <SheetDescription>
            This action cannot be undone. This will permanently delete your account
            and remove your data from our servers.
          </SheetDescription> */}
        </SheetHeader>
        <ScrollArea className="h-full pt-8 pb-16 pr-4">
          <div className="space-y-4">
            <SelectCustomerForm selectedCustomer={order?.cm_customers?.name} customers={customers} />
            <OrderDetailsForm order={order} />
            <OrderItemsTable orderId={order?.id} orderItems={order?.cm_order_items} />
            {order && (<GenerateQuotation order={order} />)}
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  )
}

export function GenerateQuote() {
  return (
    <Button size="lg" variant="outline">
      <SquarePen className="h-4 w-4 mr-2" />
      <span className="lg:sr-only xl:not-sr-only xl:whitespace-nowrap">
        Generate Quotation
      </span>
    </Button>
  )
}

export function PrintButton({ link, labelSuffix }: { link: string, labelSuffix?: string }) {
  return (
    <Button size="lg" variant="outline">
      <PrinterIcon className="h-4 w-4 mr-2" />
      <span className="lg:sr-only xl:not-sr-only xl:whitespace-nowrap">
        Print {labelSuffix}
      </span>
    </Button>
  )
}
