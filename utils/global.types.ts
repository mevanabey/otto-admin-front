import { Database, Tables, TablesInsert, TablesUpdate } from '@/utils/supabase/database.types';

export type Order = Database['public']['Tables']['cm_orders']['Row']
export type OrderItem = Database['public']['Tables']['cm_order_items']['Row']
export type DbOrderType = Database['public']['Tables']['cm_orders']['Row']

export type OrderStateType = Database['public']['Enums']['order_states']