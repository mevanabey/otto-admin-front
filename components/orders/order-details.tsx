'use client'

import { useState } from 'react'
import {
  Label,
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from '@headlessui/react'
import { HandCoinsIcon, MoreHorizontalIcon, EllipsisVerticalIcon, SquarePenIcon, SquarePlusIcon, UserPlusIcon, UserCircleIcon, CalendarDaysIcon, CreditCardIcon, CheckCircleIcon, ScanFaceIcon, PaperclipIcon  } from "lucide-react"


import { useOrder } from '@/hooks/useOrders'

import { formatDateToString, formatCurrency } from "@/lib/utils"

import { cn } from '@/lib/utils'
import { OrderDetailsForm } from "./order-details-form"
import { OrderItemForm } from "./order-items-form"
import { OrderHistory } from "./order-history"
import { OrderItemsTable } from "./order-items-table"
import { PaymentState } from '@/components/common/payment-states'
import { OrderType } from "@/components/common/order-types"
import { OrderState } from "@/components/common/order-states"
import { Card } from '@/components/ui/card'
import { Loader } from '@/components/ui/loader'

const navigation = [
  { name: 'Home', href: '#' },
  { name: 'Invoices', href: '#' },
  { name: 'Clients', href: '#' },
  { name: 'Expenses', href: '#' },
]


export const OrderDetails = ({ id }: { id: string }) => {
  const { data: order, isLoading, error }: any = useOrder(parseInt(id))

  if (isLoading) return <Loader />
  if (error) return <Card className="p-8 text-center">Error: {error.message}</Card>
  if(!order) return <Card className="p-8 text-center">No order found.</Card>

  return (
    <>
      <main>
        <header className="relative isolate">
          <div aria-hidden="true" className="absolute inset-0 -z-10 overflow-hidden">
            <div className="absolute left-16 top-full -mt-16 transform-gpu opacity-50 blur-3xl xl:left-1/2 xl:-ml-80">
              <div
                style={{
                  clipPath:
                    'polygon(100% 38.5%, 82.6% 100%, 60.2% 37.7%, 52.4% 32.1%, 47.5% 41.8%, 45.2% 65.6%, 27.5% 23.4%, 0.1% 35.3%, 17.9% 0%, 27.7% 23.4%, 76.2% 2.5%, 74.2% 56%, 100% 38.5%)',
                }}
                className="aspect-[1154/678] w-[72.125rem] bg-gradient-to-br from-primary to-secondary"
              />
            </div>
            <div className="absolute inset-x-0 bottom-0 h-px bg-border" />
          </div>

          <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
            <div className="mx-auto flex max-w-2xl items-center justify-between gap-x-8 lg:mx-0 lg:max-w-none">
              <div className="flex items-center gap-x-6">
                <h1>
                  <div className="flex flex-col space-y-2 text-sm leading-6 text-muted-foreground">
                    <div>Order <span className="text-foreground">{' '}#{order.id}</span></div>
                    <OrderState state={order.state} />
                  </div>
                </h1>
              </div>
              <div className="flex items-center gap-x-4 sm:gap-x-6">
                <button type="button" className="hidden text-sm font-semibold leading-6 text-foreground sm:block">
                  Copy URL
                </button>
                <a href="#" className="hidden text-sm font-semibold leading-6 text-foreground sm:block">
                  Edit
                </a>
                <a
                  href="#"
                  className="rounded-md bg-primary px-3 py-2 text-sm font-semibold text-primary-foreground shadow-sm hover:bg-primary/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                >
                  Send
                </a>

                <Menu as="div" className="relative sm:hidden">
                  <MenuButton className="-m-3 block p-3">
                    <span className="sr-only">More</span>
                    <EllipsisVerticalIcon aria-hidden="true" className="h-5 w-5 text-muted-foreground" />
                  </MenuButton>

                  <MenuItems
                    transition
                    className="absolute right-0 z-10 mt-0.5 w-32 origin-top-right rounded-md bg-popover py-2 shadow-lg ring-1 ring-border transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                  >
                    <MenuItem>
                      <button
                        type="button"
                        className="block w-full px-3 py-1 text-left text-sm leading-6 text-popover-foreground data-[focus]:bg-accent"
                      >
                        Copy URL
                      </button>
                    </MenuItem>
                    <MenuItem>
                      <a href="#" className="block px-3 py-1 text-sm leading-6 text-popover-foreground data-[focus]:bg-accent">
                        Edit
                      </a>
                    </MenuItem>
                  </MenuItems>
                </Menu>
              </div>
            </div>
          </div>
        </header>

        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto sm:flex sm:space-x-8">

            {/* Invoice */}
            <div className="w-full shadow-sm ring-1 ring-gray-900/5 rounded-lg">

             <OrderDetailsForm order={order} />
             <OrderItemsTable orderId={order.id} orderItems={order.cm_order_items} />

            </div>

            <div>
            <div className="">
              <h2 className="sr-only">Summary</h2>
              <div className="rounded-lg bg-card shadow-sm ring-1 ring-border">
                <dl className="flex flex-wrap">
                  <div className="flex-auto pl-6 pt-6">
                    <dt className="text-sm font-semibold leading-6 text-card-foreground">Amount</dt>
                    <dd className="mt-1 text-base font-semibold leading-6 text-card-foreground">{formatCurrency(order.total ?? 0)}</dd>
                  </div>
                  <div className="flex-none self-end px-6 pt-4">
                    <dt className="sr-only">Status</dt>
                    <PaymentState state={order.payment_state} />
                  </div>
                  <div className="mt-6 flex w-full flex-none gap-x-4 border-t border-border px-6 pt-6">
                    <dt className="flex-none">
                      <span className="sr-only">Client</span>
                      <UserCircleIcon aria-hidden="true" className="h-6 w-5 text-muted-foreground" />
                    </dt>
                    <dd className="text-sm font-medium leading-6 text-card-foreground">{order.cm_customers?.name}</dd>
                  </div>
                  <div className="mt-4 flex w-full flex-none gap-x-4 px-6">
                    <dt className="flex-none">
                      <span className="sr-only">Due date</span>
                      <CalendarDaysIcon aria-hidden="true" className="h-6 w-5 text-muted-foreground" />
                    </dt>
                    <dd className="text-sm leading-6 text-muted-foreground">
                      <time dateTime="2023-01-31">{formatDateToString(order.created_at)}</time>
                    </dd>
                  </div>
                  <div className="mt-4 flex w-full flex-none gap-x-4 px-6">
                    <dt className="flex-none">
                      <span className="sr-only">Status</span>
                      <HandCoinsIcon aria-hidden="true" className="h-6 w-5 text-muted-foreground" />
                    </dt>
                    <dd className="text-sm leading-6 text-muted-foreground">Bank Transfer</dd>
                  </div>
                </dl>
                <div className="mt-6 border-t border-border px-6 py-6">
                  <a href="#" className="text-sm font-semibold leading-6 text-primary">
                    Download receipt <span aria-hidden="true">&rarr;</span>
                  </a>
                </div>
              </div>
            </div>
              <Card className="p-4 mt-4">
                <OrderHistory order={order} />
              </Card>      
            </div>
            
          </div>
        </div>
      </main>
    </>
  )
}
