"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

import { useUpdateOrder } from '@/hooks/useOrders'

import { OrderType, OrderUpdateType } from "@/utils/global.types"
import { ORDER_TYPES } from "@/lib/constants"
import { toast } from "sonner"

type FormDataType = {
  order_type: string;
  order_source: string;
  discount: number;
  notes: string;
}

export function OrderDetailsForm({ order }: { order: OrderType | undefined }) {
  const updateOrderMutation = useUpdateOrder();
  const [formData, setFormData] = useState<OrderUpdateType>({
    order_type: order?.order_type || 'system',
    discount: order?.discount || 0,
    notes: order?.notes || "",
  });

  const handleInputChange = (field: string, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleUpdateOrder = async () => {
    const orderId = order?.id;
    if(orderId) {
      try {
        const updatedOrder = await updateOrderMutation.mutateAsync({
          id: orderId,
          ...formData
        });
        toast.success('Order updated successfully!');
      } catch (error) {
        toast.error('Error updating order');
      }
    }
  };

  return (
    <div className="relative w-full flex-col items-start gap-8 md:flex">
      <fieldset className="w-full grid gap-6 rounded-lg border p-4">
        <legend className="-ml-1 px-1 text-sm font-medium">Order Details</legend>

        <div className="grid gap-6">
          <div className="grid gap-3 grid-cols-2">
            <div>
              <Label htmlFor="order_type">Order Type</Label>
              <Select onValueChange={(value) => handleInputChange('order_type', value)}>
                <SelectTrigger className="capitalize">
                  <SelectValue placeholder={formData.order_type || "Select order type"} />
                </SelectTrigger>
                <SelectContent>
                  {ORDER_TYPES.map((orderType: string) => (
                    <SelectItem value={orderType} key={orderType} className="capitalize">{orderType}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="grid gap-3 grid-cols-2">
            <div>
              <Label htmlFor="discount">Discount</Label>
              <Input
                id="discount"
                type="number"
                className="w-full"
                value={formData.discount || 0}
                step="1"
                onChange={(e) => handleInputChange('discount', parseFloat(e.target.value))}
              />
            </div>
            <div>
              <Label htmlFor="order_total">Order Total</Label>
              <Input
                id="order_total"
                type="number"
                className="w-fit"
                defaultValue={order?.total || 0}
                disabled
              />
            </div>
          </div>
          <div className="grid gap-3">
            <Label htmlFor="order_notes">Notes</Label>
            <Textarea
              id="order_notes"
              value={formData.notes || "Enter order notes"}
              className="min-h-32"
              onChange={(e) => handleInputChange('notes', e.target.value)}
            />
          </div>
        </div>
        <Button onClick={handleUpdateOrder}>Update Order Details</Button>
      </fieldset>
    </div>
  )
}