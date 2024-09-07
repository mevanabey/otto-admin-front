'use client'

import { useState } from 'react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { EyeIcon, CalendarClockIcon, EllipsisVerticalIcon, BadgePercentIcon, UserCircleIcon, CalendarDaysIcon, MonitorCogIcon, NotebookPenIcon, CogIcon, PrinterIcon, SendIcon, CheckCircleIcon, RefreshCwIcon } from "lucide-react"


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
import { Button } from '@/components/ui/button'
import { GenerateQuotateButton } from "@/components/pdf/quote-button"
import { GenerateInvoiceButton } from "@/components/pdf/invoice-button"
import { GenerateDispatchNoteButton } from "@/components/pdf/dispatch-note-button"

const navigation = [
  { name: 'Home', href: '#' },
  { name: 'Invoices', href: '#' },
  { name: 'Clients', href: '#' },
  { name: 'Expenses', href: '#' },
]


export const OrderDetails = ({ id }: { id: string }) => {
  const { data: order, isLoading, error }: any = useOrder(parseInt(id))

  if (isLoading) return <Loader />
  if (error) return <Card className="p-8 text-center m-4 sm:m-8">No order found.</Card>
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
                    <div className="flex items-center text-xl space-x-4">
                      Order <span className="text-foreground">{' '}#{order.id}</span>
                      <OrderState state={order.state} />
                    </div>
                  </div>
                </h1>
              </div>
            </div>
          </div>
        </header>

        <div className="mx-auto max-w-7xl p-4 sm:py-8 sm:px-6 lg:px-8">
          <div className="mx-auto flex flex-col-reverse sm:flex sm:flex-row sm:space-x-8">

            <div className="w-full shadow-sm ring-1 ring-gray-900/5 rounded-lg">
              {/* <OrderDetailsForm order={order} /> */}
              <OrderItemsTable orderId={order.id} orderItems={order.cm_order_items} />
              
              <Card className="p-4 mt-4">
                  <OrderHistory order={order} />
              </Card>  
            </div>

            <div className="w-full sm:w-5/12 mb-4 sm:mb-8">
              <h2 className="sr-only">Summary</h2>


              <div className="rounded-lg bg-card shadow-sm ring-1 ring-border pb-8">
                <dl className="flex flex-wrap">
                  <div className="flex-auto pl-6 pt-6">
                    <dt className="text-sm leading-6 text-card-foreground">Order Total</dt>
                    <dd className="mt-1 text-base font-semibold leading-6 text-card-foreground">{formatCurrency(order.total ?? 0)}</dd>
                  </div>
                  <div className="flex-none self-end px-6 pt-4">
                    <dt className="sr-only">Payment Status</dt>
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
                      <span className="sr-only">Created date</span>
                      <CalendarDaysIcon aria-hidden="true" className="h-6 w-5 text-muted-foreground" />
                    </dt>
                    <dd className="text-sm leading-6 text-muted-foreground">
                      <time dateTime="2023-01-31">{formatDateToString(order.created_at)}</time>
                    </dd>
                  </div>
                  <div className="mt-4 flex w-full flex-none gap-x-4 px-6">
                    <dt className="flex-none">
                      <span className="sr-only">Due date</span>
                      <CalendarClockIcon aria-hidden="true" className="h-6 w-5 text-muted-foreground" />
                    </dt>
                    <dd className="text-sm leading-6 text-muted-foreground">
                      <time dateTime="2023-01-31">{formatDateToString(order.created_at)}</time>
                    </dd>
                  </div>
                  <div className="mt-4 flex w-full flex-none gap-x-4 px-6">
                    <dt className="flex-none">
                      <span className="sr-only">Order Type</span>
                      <MonitorCogIcon aria-hidden="true" className="h-6 w-5 text-muted-foreground" />
                    </dt>
                    <dd className="text-sm leading-6 text-muted-foreground">
                      <OrderType type={order.order_type} />
                    </dd>
                  </div>
                  <div className="mt-4 flex w-full flex-none gap-x-4 px-6">
                    <dt className="flex-none">
                      <span className="sr-only">Discount</span>
                      <BadgePercentIcon aria-hidden="true" className="h-6 w-5 text-muted-foreground" />
                    </dt>
                    <dd className="text-sm leading-6 text-muted-foreground">
                      {order.discount}%
                    </dd>
                  </div>
                  <div className="mt-4 flex w-full flex-none gap-x-4 px-6">
                    <dt className="flex-none">
                      <span className="sr-only">Notes</span>
                      <NotebookPenIcon aria-hidden="true" className="h-6 w-5 text-muted-foreground" />
                    </dt>
                    {order.notes ? (
                      <dd className="text-sm leading-6 text-muted-foreground">
                        {order.notes}
                      </dd>
                    ) : (
                      <div className="w-full mt-2 text-xs underline pointer">
                        Add notes
                      </div>
                    )}
                    
                  </div>
                </dl>
              </div>
              
              <div className="rounded-lg bg-card shadow-sm ring-1 ring-border">
              <div className="border-t border-border px-6 py-6 mt-4">
                  <dt className="text-sm leading-6 text-card-foreground">Quotations</dt>
                  {order.cm_order_quotes.map((quote: any) => (
                    <dl className="border-b mb-2 flex justify-between py-2 cursor-pointer hover:underline">
                      <a href={quote.url} target="_blank" rel="noopener noreferrer">
                        <dt className="text-xs leading-6 text-card-foreground">
                          {quote.quote_no} - {' '}
                          <span className="text-muted-foreground">{formatDateToString(quote.created_at)}</span>
                        </dt>
                      </a>
                    </dl>
                  ))}
                  {order.quote_url && (
                    <>
                      <div className="grid grid-cols-2 gap-2 mt-2">
                        <DropdownMenu>
                          <DropdownMenuTrigger>
                            <Button variant="outline" className="w-full">
                            <SendIcon className="mr-2 h-4 w-4" />
                              Send
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent>
                            <DropdownMenuItem>WhatsApp</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>Email</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu> 
                        
                        <a href={order.quote_url} target="_blank" rel="noopener noreferrer">
                          <Button variant="outline" className="w-full">
                            <PrinterIcon className="mr-2 h-4 w-4" />
                            Print
                          </Button>
                        </a>
                      </div>
                    </>
                  )}
                  <GenerateQuotateButton order={order} />
                </div>

                {order.quote_sent && (
                  <div className="border-t border-border px-6 py-6">
                    <dt className="text-sm leading-6 text-card-foreground">Invoices</dt>
                    {order.cm_order_invoices.map((invoice: any) => (
                      <dl className="border-b mb-2 flex justify-between py-2 cursor-pointer hover:underline">
                        <a href={invoice.url} target="_blank" rel="noopener noreferrer">
                          <dt className="text-xs leading-6 text-card-foreground">
                            {invoice.invoice_no} - {' '}
                            <span className="text-muted-foreground">{formatDateToString(invoice.created_at)}</span>
                          </dt>
                        </a>
                      </dl>
                    ))}
                    {(order.final_invoice_url || order.partial_invoice_url) && (
                      <>
                        <div className="grid grid-cols-2 gap-2 mt-2"> 
                          <DropdownMenu>
                            <DropdownMenuTrigger>
                              <Button variant="outline" className="w-full">
                              <SendIcon className="mr-2 h-4 w-4" />
                                Send
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                              <DropdownMenuItem>WhatsApp</DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem>Email</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu> 
                          <a href={order.final_invoice_url || order.partial_invoice_url} target="_blank" rel="noopener noreferrer">
                            <Button variant="outline" className="w-full">
                              <PrinterIcon className="mr-2 h-4 w-4" />
                              Print
                            </Button>
                          </a>
                        </div>
                      </>
                    )}
                    <GenerateInvoiceButton order={order} />
                  </div>
                )}

                <div className="border-t border-border px-6 py-6">
                  <dt className="text-sm leading-6 text-card-foreground mb-4">Jobs</dt>
                  <dl className="border-b mb-2 flex justify-between py-2 cursor-pointer hover:underline">
                    <dt className="text-xs leading-6 text-card-foreground">
                      #3444 - {' '}
                      <span className="text-muted-foreground">{formatDateToString(order.created_at)}</span>
                    </dt>
                    <dd className="text-sm leading-6 text-muted-foreground">
                      <EyeIcon className="w-4 h-4" />
                      <span className="sr-only">View</span>
                    </dd>
                  </dl>
                  <dl className="border-b mb-2 flex justify-between py-2 cursor-pointer hover:underline">
                    <dt className="text-xs leading-6 text-card-foreground">
                      #3444 - {' '}
                      <span className="text-muted-foreground">{formatDateToString(order.created_at)}</span>
                    </dt>
                    <dd className="text-sm leading-6 text-muted-foreground">
                      <EyeIcon className="w-4 h-4" />
                      <span className="sr-only">View</span>
                    </dd>
                  </dl>
                  {/* <a href="#" className="text-sm font-semibold leading-6 text-primary">
                    Send quote<span aria-hidden="true">&rarr;</span>
                  </a> */}
                </div>
              </div>

            </div>
            
          </div>
        </div>
      </main>
    </>
  )
}
