import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

import useSupabase from "@/hooks/useSupabase";
import { Database, Tables, TablesInsert, TablesUpdate } from '@/utils/supabase/database.types';
import { supabase } from '@/utils/supabase/client';

// const supabase = getSupabaseBrowserClient();

// export type CustomerType = Database['public']['Tables']['cm_customers']['Row']
import { CustomersType } from '@/utils/global.types';

export function useCustomers() {
  return useQuery<CustomersType[], Error>({
    queryKey: ['customers'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('cm_customers')
        .select(`
          *
        `)

      if (error) throw error
      return data
    },
  })
}

export function useCustomer(id: number) {
  return useQuery({
    queryKey: ['customers', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('cm_customers')
        .select('*')
        .eq('id', id)
        .single()
      if (error) throw error
      return data as Tables<'cm_customers'>
    },
  })
}

export function useCreateCustomer() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (newCustomer: TablesInsert<'cm_customers'>) => {
      const { data, error } = await supabase
        .from('cm_customers')
        .insert(newCustomer)
        .single()
      if (error) throw error
      return data as Tables<'cm_customers'>
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['customers'] })
    },
  })
}

export function useUpdateCustomer() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ id, ...updateData }: TablesUpdate<'cm_customers'> & { id: number }) => {
      const { data, error } = await supabase
        .from('cm_customers')
        .update(updateData)
        .eq('id', id)
        .single()
      if (error) throw error
      return data as Tables<'cm_customers'>
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['customers'] })
      queryClient.invalidateQueries({ queryKey: ['customers', data.id] })
    },
  })
}