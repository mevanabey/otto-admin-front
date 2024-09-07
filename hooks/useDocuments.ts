import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { Database, Tables, TablesInsert, TablesUpdate } from '@/utils/supabase/database.types';
import { supabase } from '@/utils/supabase/client';

export type OrderQuotesType = Database['public']['Tables']['cm_order_quotes']['Row']
export type OrderInvoicesType = Database['public']['Tables']['cm_order_quotes']['Row']
export type OrderItem = Database['public']['Tables']['cm_order_items']['Row']

export function useOrderQuotes(order_id: number) {
  return useQuery({
    queryKey: ['quotes', order_id],
    queryFn: async () => {
      const { data: orderQuotes, error } = await supabase
        .from('cm_order_quotes')
        .select(`
          *,
        `)
        .eq('order_id', order_id)

      if (error) throw error
      
      return orderQuotes
    },
  })
}

export function useCreateOrderQuote() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (newJob: TablesInsert<'cm_order_quotes'>) => {
      const { data, error } = await supabase
        .from('cm_order_quotes')
        .insert(newJob)
        .single()
      if (error) throw error
      return data as Tables<'cm_order_quotes'>
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cm_order_quotes'] })
    },
  })
}

export function useOrderInvoices(order_id: number) {
    return useQuery({
      queryKey: ['invoices', order_id],
      queryFn: async () => {
        const { data: orderInvoices, error } = await supabase
          .from('cm_order_invoices')
          .select(`
            *,
          `)
          .eq('order_id', order_id)
  
        if (error) throw error
        
        return orderInvoices
      },
    })
  }
  
  export function useCreateOrderInvoice() {
    const queryClient = useQueryClient()
  
    return useMutation({
      mutationFn: async (newInvoice: TablesInsert<'cm_order_invoices'>) => {
        const { data, error } = await supabase
          .from('cm_order_invoices')
          .insert(newInvoice)
          .single()
        if (error) throw error
        return data as Tables<'cm_order_invoices'>
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['cm_order_invoices'] })
      },
    })
  }
