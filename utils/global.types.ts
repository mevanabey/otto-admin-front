import { Database, Tables, TablesInsert, TablesUpdate } from '@/utils/supabase/database.types';

export type Order = Database['public']['Tables']['cm_orders']['Row']
export type OrderItem = Database['public']['Tables']['cm_order_items']['Row']
export type DbOrderType = Database['public']['Tables']['cm_orders']['Row']

export type OrderStateType = Database['public']['Enums']['order_states']

export type OrderType = Database['public']['Tables']['cm_orders']['Row']
export type OrderInsertType = Database['public']['Tables']['cm_orders']['Insert']
export type OrderUpdateType = Database['public']['Tables']['cm_orders']['Update']

export type OrderItemsType = Database['public']['Tables']['cm_order_items']['Row']
export type OrderItemsInsertType = Database['public']['Tables']['cm_order_items']['Insert']
export type OrderItemsUpdateType = Database['public']['Tables']['cm_order_items']['Update']
export interface ExtendedOrderType extends OrderType {
    cm_customers: CustomersType | null;
    cm_order_items: OrderItemsType[];
    cm_order_quotes: QuotesType[];
    cm_order_invoices: InvoicesType[];
}

export type QuotesType = Database['public']['Tables']['cm_order_quotes']['Row']
export type InvoicesType = Database['public']['Tables']['cm_order_invoices']['Row']

export type CustomersType = Database['public']['Tables']['cm_customers']['Row']
export type CustomersInsertType = Database['public']['Tables']['cm_customers']['Insert']
export type CustomersUpdateType = Database['public']['Tables']['cm_customers']['Update']

export type MaterialType = Database['public']['Tables']['cm_materials']['Row']
export type MaterialInsertType = Database['public']['Tables']['cm_materials']['Insert']
export type MaterialUpdateType = Database['public']['Tables']['cm_materials']['Update']

export type MaterialUsageType = Database['public']['Tables']['cm_material_usage']['Row']
export type MaterialUsageInsertType = Database['public']['Tables']['cm_material_usage']['Insert']
export type MaterialUsageUpdateType = Database['public']['Tables']['cm_material_usage']['Update']

export type TipsType = Database['public']['Tables']['cm_tips']['Row']
export type TipsInsertType = Database['public']['Tables']['cm_tips']['Insert']
export type TipsUpdateType = Database['public']['Tables']['cm_tips']['Update']

export type JobsType = Database['public']['Tables']['cm_print_jobs']['Row']
export type JobsInsertType = Database['public']['Tables']['cm_print_jobs']['Insert']
export type JobsUpdateType = Database['public']['Tables']['cm_print_jobs']['Update']
