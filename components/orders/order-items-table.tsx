"use client"

import { useState } from "react"

import { PlusCircle, MoreHorizontal, Pencil } from "lucide-react"

import { Button } from "@/components/ui/button"
import { CardFooter } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
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
import { OrderItemForm } from "@/components/orders/order-items-form"
import { OrderItemsType } from "@/utils/global.types"

interface OrderItemsTableProps {
  orderId: number | undefined
  orderItems: OrderItemsType[] | undefined
}

export function OrderItemsTable({ orderId, orderItems }: OrderItemsTableProps) {
  const [dialogType, setDialogType] = useState<'edit' | 'delete'>('edit')
  const [editDeleteDialogState, setEditDeleteDialogState] = useState(false);
  const [addDialogState, setAddDialogState] = useState(false);

  return (
    <div className="relative w-full flex-col items-start gap-8 md:flex">
      <div className="w-full grid gap-6 rounded-lg border p-4">
      {/* <dt className="text-sm leading-6 text-card-foreground">Order Total</dt> */}
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Qty</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Unit Price</TableHead>
                <TableHead className="text-right">Total</TableHead>
                <TableHead className="text-right"></TableHead>
              </TableRow>
            </TableHeader>
            {orderItems && orderItems.length > 0 ? (
              <>
                <TableBody>
                  {orderItems.map((orderItem: any) => (
                    <TableRow key={orderItem.id}>
                      <TableCell className="font-medium">{orderItem.quantity}</TableCell>
                      <TableCell>{orderItem.description}</TableCell>
                      <TableCell>{orderItem.unit_price}</TableCell>
                      <TableCell className="text-right">{orderItem.item_total}</TableCell>
                      <TableCell className="text-right">
                        <Dialog open={editDeleteDialogState} onOpenChange={setEditDeleteDialogState}>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Open menu</span>
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>
                                <DialogTrigger>
                                    <button onClick={() => setDialogType('edit')}>Edit Item</button>
                                </DialogTrigger>
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem>
                                <DialogTrigger>
                                  <button onClick={() => setDialogType('delete')}>Delete Item</button>
                                </DialogTrigger>
                              </DropdownMenuItem>
                              {/* <DropdownMenuLabel>Actions</DropdownMenuLabel> */}
                            </DropdownMenuContent>
                          </DropdownMenu>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>{dialogType === 'edit' ? 'Edit Order Item' : 'Delete Order Item'}</DialogTitle>
                              <DialogDescription>
                                {dialogType === 'edit' ? (
                                  <>
                                    Make changes to the order item here. Click save when you&apos;re done.
                                  </>
                                ) : (
                                  <>
                                    Are you sure you want to delete this order item?
                                  </>
                                )}
                              </DialogDescription>
                            </DialogHeader>
                            {dialogType === 'edit' ? (
                              <OrderItemForm orderId={orderId} orderItem={orderItem} onAfterSubmit={() => setEditDeleteDialogState(false)} />
                            ) : (
                              <div className="space-x-2">
                              <DialogClose asChild>
                                <Button size="sm" variant="secondary">
                                  Cancel
                                </Button>
                              </DialogClose>
                              <Button variant="destructive" size="sm" className="gap-1">
                                Confirm
                              </Button>
                            </div>)}
                            {/* <OrderItemForm orderId={orderId} /> */}
                          </DialogContent>
                        </Dialog>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
                {/* <TableFooter>
                  <TableRow>
                    <TableCell colSpan={4}>Total</TableCell>
                    <TableCell className="text-right">$2,500.00</TableCell>
                  </TableRow>
                </TableFooter> */}
              </>
            ) : (
              <TableBody>
                <TableRow>
                  <TableCell colSpan={5} className="text-center pt-8">No Items Added</TableCell>
                </TableRow>
              </TableBody>
            )}
          </Table>
          <CardFooter className="justify-center border-t p-4">
            <Dialog open={addDialogState} onOpenChange={setAddDialogState}>
              <DialogTrigger>
                <Button size="sm" variant="ghost" className="gap-1">
                  <PlusCircle className="h-3.5 w-3.5" />
                  Add New Item
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add Order Item</DialogTitle>
                  <DialogDescription>
                    Add new order item details. Click save when you&apos;re done.
                  </DialogDescription>
                </DialogHeader>
                <OrderItemForm orderId={orderId} onAfterSubmit={() => setAddDialogState(false)} />
              </DialogContent>
            </Dialog>
          </CardFooter>
        </div>
    </div>
  )
}
