"use client"

import { useState } from "react"

import { PlusCircle, MoreHorizontal, Pencil, Trash2, Plus, Package } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
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
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
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
  const [editItem, setEditItem] = useState<number | null>(null)
  const [deleteItem, setDeleteItem] = useState<number | null>(null)

  return (
    <div className="relative w-full flex-col items-start gap-8 md:flex">
      <div className="w-full grid gap-2 rounded-lg border p-4">
      <dt className="text-sm leading-6 text-card-foreground">Order Items</dt>
        <AnimatePresence>
            {orderItems && orderItems.length > 0 ? (
              <>
                    {orderItems?.map((item: any) => (
                <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="mb-2 overflow-hidden border-l-4 border-l-primary shadow-md hover:shadow-lg transition-shadow duration-300">
                  <CardContent className="p-2">
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4 items-center">
                      <div className="flex items-center space-x-2">
                        <Package className="w-5 h-5 text-primary" />
                        <div>
                          <Label className="text-xs font-medium text-muted-foreground">Qty</Label>
                          <p className="text-sm font-semibold">{item.quantity}</p>
                        </div>
                      </div>
                      <div className="md:col-span-2">
                        <Label className="text-xs font-medium text-muted-foreground">Description</Label>
                        <p className="text-sm font-semibold truncate">{item.description}</p>
                      </div>
                      <div>
                        <Label className="text-xs font-medium text-muted-foreground">Unit Price</Label>
                        <p className="text-sm font-semibold">{item.unit_price} LKR</p>
                      </div>
                      <div>
                        <Label className="text-xs font-medium text-muted-foreground">Total</Label>
                        <p className="text-sm font-semibold text-primary">{item.item_total} LKR</p>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="bg-muted/30 p-2 mt-2">
                    <div className="flex flex-wrap justify-between w-full gap-2">
                      {item.job_id ? (
                        <div className="">
                          <Label className="text-xs font-medium text-muted-foreground">Job ID</Label>
                          <p className="text-sm font-semibold">{item.job_id}</p>
                        </div>
                      ) : (
                        <Button size="sm" variant="outline" className="flex-1" onClick={() => {}}>
                          <Plus className="w-4 h-4 mr-2" /> Add Job
                        </Button>
                      )}
                      
                      <div className="flex space-x-2 flex-1 justify-end">
                        <Button size="sm" variant="outline" onClick={() => setEditItem(item.id)}>
                          <Pencil className="w-4 h-4 mr-2" /> Edit
                        </Button>
                        <Button size="sm" variant="destructive" onClick={() => setDeleteItem(item.id)}>
                          <Trash2 className="w-4 h-4 mr-2" /> Delete
                        </Button>
                      </div>
                    </div>
                  </CardFooter>
                </Card>
              </motion.div>
              ))}
              </>
            ) : (
              <div className="text-center pt-8">No Items Added</div>
            )}
        </AnimatePresence>


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
        {/* Edit Modal */}
      <Dialog open={!!editItem} onOpenChange={() => setEditItem(null)}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Item</DialogTitle>
            <DialogDescription>Make changes to the order item here.</DialogDescription>
          </DialogHeader>
          {editItem && (
            <OrderItemForm orderId={orderId} onAfterSubmit={() => setEditItem(null)} />
          )}
        </DialogContent>
      </Dialog>

      {/* Delete Modal */}
      <Dialog open={!!deleteItem} onOpenChange={() => setDeleteItem(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this item? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteItem(null)}>Cancel</Button>
            <Button variant="destructive" onClick={() => setDeleteItem(null)}>Delete</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
