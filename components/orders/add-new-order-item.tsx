"use client"

import { toast } from "sonner"
import { ArrowUpDown, MoreHorizontal, SquarePen, SquarePlus, UserPlusIcon } from "lucide-react"

import { useCreateOrder, useCreateOrderItem } from '@/hooks/useOrders'
import { Button } from "@/components/ui/button"
import { Database, TablesInsert } from '@/utils/supabase/database.types';

export type OrderTypeDb = Database['public']['Tables']['cm_orders']['Row']
export type OrderItemTypeDb = Database['public']['Tables']['cm_order_items']['Row']

export function AddNewOrderItem({ order_id }: { order_id: number }) {
  const orderItemsData:TablesInsert<'cm_order_items'>  = {
    artwork_cost: 2222.2,
    artwork_url: 'https://example.com/image.png',
    complexity: 20,
    description: 'Custom Cldding Design Sheet',
    isArtworkProvided: true,
    isMaterialProvided: false,
    item_total: 4444,
    material: 2,
    order_id: order_id,
    // pattern_data?: Json | null
    // product?: number | null
    product_type: 'custom',	
    quantity: 2,
    unit_price: 2222.2,
  }

  const createOrder = useCreateOrderItem()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await createOrder.mutateAsync(orderItemsData as TablesInsert<'cm_order_items'>);

      toast.success("Successfully added new order.")
    } catch (error) {
      console.error('Error creating order:', error)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Button type="submit" className="gap-2">
        <SquarePlus className="h-4 w-4" />
        Add Order Item
      </Button>
    </form>
  )
}