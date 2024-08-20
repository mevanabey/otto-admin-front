"use client"

import { toast } from "sonner"
import { ArrowUpDown, MoreHorizontal, SquarePen, SquarePlus, UserPlusIcon } from "lucide-react"

import { useCreateOrder, useCreateOrderItem } from '@/hooks/useOrders'
import { Button } from "@/components/ui/button"
import { Database, TablesInsert } from '@/utils/supabase/database.types';

export type OrderTypeDb = Database['public']['Tables']['cm_orders']['Row']
export type OrderItemTypeDb = Database['public']['Tables']['cm_order_items']['Row']

export function AddNewOrder() {
  const orderData = {
    order_type: 'system',
    state: 'pending',
  }

  const createOrder = useCreateOrder()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await createOrder.mutateAsync(orderData as TablesInsert<'cm_orders'>);

      toast.success("Successfully added new order.")
    } catch (error) {
      console.error('Error creating order:', error)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Button type="submit" className="gap-2">
        <SquarePlus className="h-4 w-4" />
        Add Order
      </Button>
    </form>
  )
}