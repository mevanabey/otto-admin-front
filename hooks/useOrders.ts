import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { Database, Tables, TablesInsert, TablesUpdate } from '@/utils/supabase/database.types';
import { supabase } from '@/utils/supabase/client';

// export type Order = Database['public']['Tables']['cm_orders']['Row']
export type OrderItem = Database['public']['Tables']['cm_order_items']['Row']
import { OrderType, ExtendedOrderType } from '@/utils/global.types';

export function useOrders() {
  return useQuery<(OrderType & { cm_order_items: OrderItem[] })[], Error>({
    queryKey: ['orders'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('cm_orders')
        .select(`
          *,
          cm_customers (
            id,
            name,
            phone
          ),
          cm_order_items (*)
        `)
        .order('created_at', { ascending: false })
      if (error) throw error
      
      return data.map(order => ({
        ...order,
        itemCount: order.cm_order_items.length,
        customerName: order.cm_customers?.name || '',
        customerPhone: order.cm_customers?.phone || ''
      }))
    },
  })
}

export function useOrder(id: number) {
  return useQuery<OrderType & { cm_order_items: OrderItem[] }, Error>({
    queryKey: ['order', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('cm_orders')
        .select(`
          *,
          cm_customers (
            id,
            name,
            phone
          ),
          cm_order_items (*),
          cm_order_invoices (*),
          cm_order_quotes (*)
        `)
        .eq('id', id)
        .single()
      if (error) throw error
      return data
    },
  })
}

export function useDeleteOrder(id: number) {
  return useMutation<void, Error, number>({
    mutationFn: async () => {
      const { error } = await supabase
        .from('cm_orders')
        .delete()
        .eq('id', id)

      if (error) throw error
    },
  })
}

export function useDeleteOrderItem(id: number) {
  return useMutation<void, Error, number>({
    mutationFn: async () => {
      const { error } = await supabase
        .from('cm_order_items')
        .delete()
        .eq('id', id)

      if (error) throw error
    },
  })
}

export function useOrderItems(orderId: number) {
  return useQuery<OrderItem[], Error>({
    queryKey: ['orderItems', orderId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('cm_order_items')
        .select('*')
        .eq('order_id', orderId)
      if (error) throw error
      return data
    },
  })
}

export function useCreateOrder() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (newOrder: TablesInsert<'cm_orders'>) => {
      const { data, error } = await supabase
        .from('cm_orders')
        .insert(newOrder)
        .single()
      if (error) throw error
      return data as Tables<'cm_orders'>
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] })
    },
  })
}

export function useUpdateOrder() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ id, ...updateData }: TablesUpdate<'cm_orders'> & { id: number }) => {
      const { data, error } = await supabase
        .from('cm_orders')
        .update(updateData)
        .eq('id', id)
        .select(`
          *,
          cm_customers (
            id,
            name,
            phone,
            address,
            company
          ),
          cm_order_items (*),
          cm_order_invoices (*),
          cm_order_quotes (*)
        `) // Select only the fields you need
        .single()
      
      if (error) throw error
      return data as Tables<'cm_orders'>
    },
    onSuccess: (updatedOrder) => {
      // Invalidate and refetch the specific order
      const newUpdatedOrder = {
        ...updatedOrder,
        // itemCount: updatedOrder.cm_order_items.length,
        // customerName: updatedOrder.cm_customers?.name || '',
        // customerPhone: updatedOrder.cm_customers?.phone || ''
      };

      queryClient.invalidateQueries({ queryKey: ['order', updatedOrder.id] })
      
      // Update the orders list query without refetching
      queryClient.setQueriesData({ queryKey: ['orders'] }, (oldData: any) => {
        if (!oldData) return oldData;
        return oldData.map((order: OrderType) => 
          order.id === updatedOrder.id ? { ...order, ...newUpdatedOrder } : order
        );
      })
    },
    onError: (error) => {
      console.error('Failed to update order:', error)
      // You can add more error handling here, like showing a toast notification
    }
  })
}

export function useCreateOrderItem() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (newOrderItem: TablesInsert<'cm_order_items'>) => {
      const { data, error } = await supabase
        .from('cm_order_items')
        .insert(newOrderItem)
        .select()
        .single()

      if (error) throw error
      return data as Tables<'cm_order_items'>
    },
    onSuccess: (data) => {
      console.log('ON SUCCESS: ', data)
      queryClient.invalidateQueries({ queryKey: ['orders'] })
      queryClient.invalidateQueries({ queryKey: ['order', data.order_id] })
      queryClient.invalidateQueries({ queryKey: ['orderItems', data.order_id] })
    },
  })
}

export function useUpdateOrderItem() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ id, ...updateData }: TablesUpdate<'cm_order_items'> & { id: number }) => {
      const { data, error } = await supabase
        .from('cm_order_items')
        .update(updateData)
        .eq('id', id)
        .select(`*`)
        .single()
      if (error) throw error
      return data as Tables<'cm_order_items'>
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['order', data.order_id] })
      queryClient.invalidateQueries({ queryKey: ['orders'] })
      queryClient.invalidateQueries({ queryKey: ['orderItems', data.order_id] })
    },
  })
}

// Additional hook for fetching orders with related customer data
// export function useOrdersWithCustomers() {
//   return useQuery<(Order & { cm_customers: Pick<Tables<'cm_customers'>, 'id' | 'name'> } & { cm_order_items: OrderItem[] })[], Error>({
//     queryKey: ['ordersWithCustomers'],
//     queryFn: async () => {
//       const { data, error } = await supabase
//         .from('cm_orders')
//         .select(`
//           *,
//           cm_customers (
//             id,
//             name
//           ),
//           cm_order_items (*)
//         `)
//       if (error) throw error
//       return data
//     },
//   })
// }