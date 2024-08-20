import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { supabase } from '@/utils/supabase/client'
import { Tables, TablesInsert, TablesUpdate } from '@/utils/supabase/database.types';
import { MaterialInsertType, MaterialUpdateType, MaterialType, MaterialUsageType, MaterialUsageInsertType, MaterialUsageUpdateType } from '@/utils/global.types'

export function useMaterials() {
  return useQuery<MaterialType[], Error>({
    queryKey: ['materials'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('cm_materials')
        .select('*')

      if (error) throw error
      
      return data
    },
  })
}

export function useMaterial(id: number) {
  return useQuery<MaterialType, Error>({
    queryKey: ['materials', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('cm_materials')
        .select('*')
        .eq('id', id)
        .single()
      if (error) throw error
      return data
    },
  })
}

export function useMaterialUsage(materialId: number) {
  return useQuery<MaterialUsageType[], Error>({
    queryKey: ['materialUsage', materialId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('cm_material_usage')
        .select('*')
        .eq('material', materialId)
      if (error) throw error
      return data
    },
  })
}

export function useCreateMaterial() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (newMaterial: TablesInsert<'cm_materials'>) => {
      const { data, error } = await supabase
        .from('cm_materials')
        .insert(newMaterial)
        .single()
      if (error) throw error
      return data as Tables<'cm_materials'>
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['materials'] })
    },
  })
}

export function useUpdateMaterial() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ id, ...updateData }: TablesUpdate<'cm_materials'> & { id: number }) => {
      const { data, error } = await supabase
        .from('cm_materials')
        .update(updateData)
        .eq('id', id)
        .single()
      if (error) throw error
      return data as Tables<'cm_materials'>
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['materials'] })
      queryClient.invalidateQueries({ queryKey: ['materials', data.id] })
    },
  })
}

export function useCreateMaterialUsage() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (newMaterialUsage: TablesInsert<'cm_material_usage'>) => {
      const { data, error } = await supabase
        .from('cm_material_usage')
        .insert(newMaterialUsage)
        .single()
      if (error) throw error
      return data as Tables<'cm_material_usage'>
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['materials'] })
      queryClient.invalidateQueries({ queryKey: ['materials', data.material] })
      queryClient.invalidateQueries({ queryKey: ['materialUsage', data.material] })
    },
  })
}

export function useUpdateMaterialUsage() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ id, ...updateData }: TablesUpdate<'cm_material_usage'> & { id: number }) => {
      const { data, error } = await supabase
        .from('cm_material_usage')
        .update(updateData)
        .eq('id', id)
        .single()
      if (error) throw error
      return data as Tables<'cm_material_usage'>
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['materials'] })
      queryClient.invalidateQueries({ queryKey: ['materials', data.material] })
      queryClient.invalidateQueries({ queryKey: ['materialUsage', data.material] })
    },
  })
}