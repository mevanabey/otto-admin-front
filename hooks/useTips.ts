import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { Database, Tables, TablesInsert, TablesUpdate } from '@/utils/supabase/database.types';
import { supabase } from '@/utils/supabase/client';

export type Order = Database['public']['Tables']['cm_orders']['Row']
export type OrderItem = Database['public']['Tables']['cm_order_items']['Row']

export function useOrders() {
  return useQuery<(Order & { cm_order_items: OrderItem[] })[], Error>({
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

      if (error) throw error
      
      return data.map(order => ({
        ...order,
        itemCount: order.cm_order_items.length,
        customerName: order.cm_customers?.name || '',
        customerPhone: order.cm_customers?.phone || '',
        cm_customers: undefined
      }))
    },
  })
}

export function useOrder(id: number) {
  return useQuery<Order & { cm_order_items: OrderItem[] }, Error>({
    queryKey: ['orders', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('cm_orders')
        .select(`
          *,
          cm_order_items (*)
        `)
        .eq('id', id)
        .single()
      if (error) throw error
      return data
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
        .single()
      if (error) throw error
      return data as Tables<'cm_orders'>
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['orders'] })
      queryClient.invalidateQueries({ queryKey: ['orders', data.id] })
    },
  })
}

export function useCreateOrderItem() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (newOrderItem: TablesInsert<'cm_order_items'>) => {
      const { data, error } = await supabase
        .from('cm_order_items')
        .insert(newOrderItem)
        .single()
      if (error) throw error
      return data as Tables<'cm_order_items'>
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['orders'] })
      queryClient.invalidateQueries({ queryKey: ['orders', data.order_id] })
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
        .single()
      if (error) throw error
      return data as Tables<'cm_order_items'>
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['orders'] })
      queryClient.invalidateQueries({ queryKey: ['orders', data.order_id] })
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