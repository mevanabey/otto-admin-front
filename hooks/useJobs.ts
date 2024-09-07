import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { Database, Tables, TablesInsert, TablesUpdate } from '@/utils/supabase/database.types';
import { supabase } from '@/utils/supabase/client';

export type JobType = Database['public']['Tables']['cm_print_jobs']['Row']
export type OrderItem = Database['public']['Tables']['cm_order_items']['Row']

export function useJobs() {
  return useQuery<JobType[], Error>({
    queryKey: ['jobs'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('cm_print_jobs')
        .select(`
          *,
          cm_order_items (*)
        `)

      if (error) throw error
      
      return data
    },
  })
}

export function useJob(id: number) {
  return useQuery<JobType, Error>({
    queryKey: ['job', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('cm_print_jobs')
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

export function useCreateJob() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (newJob: TablesInsert<'cm_print_jobs'>) => {
      const { data, error } = await supabase
        .from('cm_print_jobs')
        .insert(newJob)
        .single()
      if (error) throw error
      return data as Tables<'cm_print_jobs'>
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cm_print_jobs'] })
    },
  })
}

export function useUpdateJob() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ id, ...updateData }: TablesUpdate<'cm_print_jobs'> & { id: number }) => {
      const { data, error } = await supabase
        .from('cm_print_jobs')
        .update(updateData)
        .eq('id', id)
        .single()
      if (error) throw error
      return data as Tables<'cm_print_jobs'>
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['cm_print_jobs'] })
      queryClient.invalidateQueries({ queryKey: ['cm_print_jobs', data.id] })
    },
  })
}
