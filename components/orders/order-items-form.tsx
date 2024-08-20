"use client"

import { useState, useEffect } from "react"
import { PlusCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { OrderItemsType, OrderItemsInsertType, OrderItemsUpdateType, MaterialType } from "@/utils/global.types"

import { toast } from "sonner"
import { useUpdateOrderItem, useCreateOrderItem } from '@/hooks/useOrders'
import { useMaterials } from '@/hooks/useMaterials'

interface OrderItemsFormProps {
  orderId: number | undefined
  orderItem?: OrderItemsType | undefined
  onAfterSubmit: () => void
}

export function OrderItemForm({ orderId, orderItem, onAfterSubmit }: OrderItemsFormProps) {
  const [isMaterialProvided, setIsMaterialProvided] = useState(false)
  const [isArtworkProvided, setIsArtworkProvided] = useState(false)

  const { data: materials, isLoading, error } = useMaterials();
  const updateOrderItemMutation = useUpdateOrderItem();
  const createOrderItem = useCreateOrderItem();

  const [formData, setFormData] = useState<OrderItemsUpdateType>({
    artwork_cost: 0,
    artwork_url: '',
    complexity: 0,
    custom_work_cost: 0,
    description: '',
    isArtworkProvided: true,
    isMaterialProvided: true,
    item_total: 0,
    material: 1,
    sheet_qty: 1,
    pattern_data: {},
    quantity: 1,
  });

  useEffect(() => {
    if (orderItem) {
      setFormData(orderItem);
      setIsMaterialProvided(orderItem.isMaterialProvided);
      setIsArtworkProvided(orderItem.isArtworkProvided);
    }
  }, [orderItem]);

  const handleInputChange = (field: string, value: string | number | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const calculateTotal = (data: OrderItemsUpdateType) => {
    const total = data?.quantity && data?.unit_price ? data.quantity * data.unit_price : 0;
    setFormData(prev => ({ ...prev, item_total: total }));
  };

  const handleCreateOrderItem = async () => {
    if (!orderId) {
      toast.error('Order ID is required');
      return;
    }
    try {
      const quantity = formData.quantity || 1;
      const artworkCost = formData.artwork_cost || 0;
      const selectedMaterial = materials?.find((material: MaterialType) => material.id === formData.material);
      const materialCost = selectedMaterial ? selectedMaterial.base_price * (formData?.sheet_qty || 1) : 0;

      const subTotal = artworkCost + materialCost;
      
      const createdOrderItem = await createOrderItem.mutateAsync({
        order_id: orderId,
        ...formData as OrderItemsInsertType,
        quantity,
        unit_price: subTotal,
        item_total: subTotal * quantity
      });
      toast.success('Order item added successfully!');
      onAfterSubmit();
    } catch (error) {
      console.error('Error adding order item:', error)
      toast.error('Error adding order item');
    }
  }

  const handleUpdateOrderItem = async () => {
    if (orderItem) {
      try {
        const quantity = formData.quantity || 1;
        const artworkCost = formData.artwork_cost || 0;
        const selectedMaterial = materials?.find((material: MaterialType) => material.id === formData.material);
      const materialCost = selectedMaterial ? selectedMaterial.base_price * (formData?.sheet_qty || 1) : 0;

        const subTotal = artworkCost + materialCost;

        const updatedOrderItem = await updateOrderItemMutation.mutateAsync({
          id: orderItem.id,
          ...formData,
          quantity,
          unit_price: subTotal,
          item_total: subTotal * quantity
        });
        toast.success('Order item updated successfully!');
        onAfterSubmit();
      } catch (error) {
        console.error('Error updating order item:', error);
        toast.error('Error updating order item');
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (orderItem) {
      handleUpdateOrderItem();
    } else {
      handleCreateOrderItem();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="grid gap-6">
      <div className="grid gap-3 grid-cols-3">
        <div className="col-span-3">
          <Label htmlFor="description">Item Description</Label>
          <Input
            id="description"
            type="text"
            className="w-full"
            value={formData.description || ''}
            onChange={(e) => handleInputChange('description', e.target.value)}
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="flex items-center space-x-2">
          <Checkbox 
            id="materialProvided" 
            checked={isMaterialProvided}
            onCheckedChange={(checked) => {
              setIsMaterialProvided(!!checked);
              handleInputChange('isMaterialProvided', !!checked);
            }} 
          />
          <label
            htmlFor="materialProvided"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Material Provided by Customer
          </label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox 
            id="artwork" 
            checked={isArtworkProvided}
            onCheckedChange={(checked) => {
              setIsArtworkProvided(!!checked);
              handleInputChange('isArtworkProvided', !!checked);
            }}
          />
          <label
            htmlFor="artwork"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Artwork Provided by Customer
          </label>
        </div>
      </div>

      {!isMaterialProvided && (
        <div className="grid grid-cols-2 gap-3">
          <div>
            <Label htmlFor="material">Material</Label>
            <Select
              value={formData?.material?.toString() || ''}
              onValueChange={(value) => handleInputChange('material', parseInt(value))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a material" />
              </SelectTrigger>
              <SelectContent>
                {materials?.map((material: MaterialType) => (
                  <SelectItem key={material.id} value={material.id.toString()}>{material.type} {material.thickness}mm</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-3">
            <Label htmlFor="sheet_qty">Sheet Quantity</Label>
            <Input
              id="sheet_qty"
              type="number"
              className="w-full"
              value={formData.sheet_qty || 0}
              onChange={(e) => handleInputChange('sheet_qty', parseFloat(e.target.value))}
              step="0.5"
            />
          </div>
        </div>
      )}

      <div className="grid grid-cols-2 gap-3">
        <div className="grid w-full max-w-sm items-center gap-1.5 cursor-pointer">
          <Label htmlFor="artwork_file">Attach Artwork</Label>
          <Input 
            id="artwork_file" 
            type="file" 
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                handleInputChange('artwork_url', URL.createObjectURL(file));
              }
            }}
          />
        </div>
        <div className="grid gap-3">
          <Label htmlFor="artwork_cost">Artwork Cost</Label>
          <Input
            id="artwork_cost"
            type="number"
            className="w-full"
            value={formData.artwork_cost || 0}
            onChange={(e) => handleInputChange('artwork_cost', parseFloat(e.target.value))}
            step="1000"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="grid w-full max-w-sm items-center gap-1.5 cursor-pointer">
          <Label htmlFor="item_quantity">Item Quantity</Label>
          <Input
            id="item_quantity"
            type="number"
            className="w-full"
            value={formData.quantity}
            onChange={(e) => handleInputChange('quantity', parseInt(e.target.value))}
            step="1"
          />
        </div>
        <div className="grid gap-3">
          <Label htmlFor="complexity">Item Complexity</Label>
          <Input
            id="complexity"
            type="number"
            className="w-full"
            value={formData.complexity || 0}
            onChange={(e) => handleInputChange('complexity', parseInt(e.target.value))}
            step="10"
          />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <Label htmlFor="custom" className="col-span-3">Custom Addons</Label>
        <div className="grid col-span-2 w-full max-w-sm items-center gap-1.5 cursor-pointer">
          <Input
            type="text"
            className="w-full"
            placeholder="Description"
          />
        </div>
        <div className="grid gap-3">
          <Input
            type="number"
            className="w-full"
            placeholder="Cost"
            step="10"
          />
        </div>
        <div className="grid col-span-2 w-full max-w-sm items-center gap-1.5 cursor-pointer">
          <Input
            type="text"
            className="w-full"
            placeholder="Description"
          />
        </div>
        <div className="grid gap-3">
          <Input
            type="number"
            className="w-full"
            placeholder="Cost"
            step="10"
          />
        </div>
        <div className="grid col-span-2 w-full max-w-sm items-center gap-1.5 cursor-pointer">
          <Input
            type="text"
            className="w-full"
            placeholder="Description"
          />
        </div>
        <div className="grid gap-3">
          <Input
            type="number"
            className="w-full"
            placeholder="Cost"
            step="10"
          />
        </div>
      </div>
      <Button type="submit" variant="default">{orderItem ? 'Update' : 'Save'}</Button>
    </form>
  )
}