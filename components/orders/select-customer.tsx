"use client"

import { useState } from "react"
import { UserPlusIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
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
import { useCustomers } from "@/hooks/useCustomers"
import { CustomersType, OrderUpdateType } from "@/utils/global.types"


interface SelectCustomerFormProps {
  selectedCustomer?: string
  customers?: CustomersType[]
  onSelectCustomer?: (customerId: number) => void
}

interface AttachCustomerButtonProps {
  orderId: number
  customers?: CustomersType[]
  onAttachCustomer: (orderId: number, { customer_id }: OrderUpdateType) => void
}

export function SelectCustomerForm({ selectedCustomer, customers = [], onSelectCustomer = () => {} }: SelectCustomerFormProps) {
  return (
    <div className="relative w-full flex-col items-start gap-8 md:flex mt-4">
      <fieldset className="w-full grid gap-6 rounded-lg border p-4">
        <legend className="-ml-1 px-1 text-sm font-medium">Customer</legend>
        <Select onValueChange={(value) => onSelectCustomer(parseInt(value))}>
          <SelectTrigger>
            <SelectValue placeholder={ selectedCustomer ? selectedCustomer : "Select a customer" } />
          </SelectTrigger>
          <SelectContent>
            {customers?.map((customer) => (
              <SelectItem value={customer.id.toString()} key={customer.id}>
                {customer.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </fieldset>
    </div>
  )
}

export function AttachCustomerButton({ orderId, customers = [], onAttachCustomer }: AttachCustomerButtonProps) {
  const [selectedCustomerId, setSelectedCustomerId] = useState<number | null>(null)

  return (
    <Dialog>
      <DialogTrigger>
        <Button size="sm" variant="outline" className="h-8 gap-2">
          <UserPlusIcon className="h-3.5 w-3.5" />
          <span className="lg:sr-only xl:not-sr-only xl:whitespace-nowrap text-[0.7rem]">
            Attach Customer
          </span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <SelectCustomerForm customers={customers} onSelectCustomer={(id) => setSelectedCustomerId(id)} />

        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button type="button" variant="secondary" onClick={() => onAttachCustomer(orderId, { customer_id: selectedCustomerId })} disabled={!selectedCustomerId}>
              Confirm
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
