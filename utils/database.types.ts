export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      cm_audit_log: {
        Row: {
          created_at: string
          id: number
        }
        Insert: {
          created_at?: string
          id?: number
        }
        Update: {
          created_at?: string
          id?: number
        }
        Relationships: []
      }
      cm_customers: {
        Row: {
          address: string | null
          ai_data: Json | null
          company: string | null
          created_at: string
          customer_discount: number | null
          customer_type: Database["public"]["Enums"]["customer_types"]
          email: string | null
          id: number
          name: string | null
          notes: string | null
          phone: string | null
        }
        Insert: {
          address?: string | null
          ai_data?: Json | null
          company?: string | null
          created_at?: string
          customer_discount?: number | null
          customer_type?: Database["public"]["Enums"]["customer_types"]
          email?: string | null
          id?: number
          name?: string | null
          notes?: string | null
          phone?: string | null
        }
        Update: {
          address?: string | null
          ai_data?: Json | null
          company?: string | null
          created_at?: string
          customer_discount?: number | null
          customer_type?: Database["public"]["Enums"]["customer_types"]
          email?: string | null
          id?: number
          name?: string | null
          notes?: string | null
          phone?: string | null
        }
        Relationships: []
      }
      cm_material_usage: {
        Row: {
          created_at: string
          id: number
          material: number
          order_item_id: number
          quantity_used: number
          remaining_quantity: number
        }
        Insert: {
          created_at?: string
          id?: number
          material: number
          order_item_id: number
          quantity_used: number
          remaining_quantity: number
        }
        Update: {
          created_at?: string
          id?: number
          material?: number
          order_item_id?: number
          quantity_used?: number
          remaining_quantity?: number
        }
        Relationships: [
          {
            foreignKeyName: "cm_material_usage_material_fkey"
            columns: ["material"]
            isOneToOne: false
            referencedRelation: "cm_materials"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "cm_material_usage_order_item_id_fkey"
            columns: ["order_item_id"]
            isOneToOne: false
            referencedRelation: "cm_order_items"
            referencedColumns: ["id"]
          },
        ]
      }
      cm_materials: {
        Row: {
          base_price: number
          created_at: string
          dimensions: string | null
          finish: string | null
          id: number
          stock_quantity: number
          thickness: number | null
          type: string
        }
        Insert: {
          base_price?: number
          created_at?: string
          dimensions?: string | null
          finish?: string | null
          id?: number
          stock_quantity?: number
          thickness?: number | null
          type: string
        }
        Update: {
          base_price?: number
          created_at?: string
          dimensions?: string | null
          finish?: string | null
          id?: number
          stock_quantity?: number
          thickness?: number | null
          type?: string
        }
        Relationships: []
      }
      cm_order_items: {
        Row: {
          artwork_cost: number | null
          artwork_url: string | null
          complexity: number | null
          created_at: string
          custom_work: Json | null
          description: string | null
          id: number
          isArtworkProvided: boolean
          isMaterialProvided: boolean
          item_total: number
          material: number | null
          order_id: number | null
          pattern_data: Json | null
          product: number | null
          product_type: Database["public"]["Enums"]["product_types"]
          quantity: number
          unit_price: number
        }
        Insert: {
          artwork_cost?: number | null
          artwork_url?: string | null
          complexity?: number | null
          created_at?: string
          custom_work?: Json | null
          description?: string | null
          id?: number
          isArtworkProvided?: boolean
          isMaterialProvided?: boolean
          item_total: number
          material?: number | null
          order_id?: number | null
          pattern_data?: Json | null
          product?: number | null
          product_type?: Database["public"]["Enums"]["product_types"]
          quantity?: number
          unit_price: number
        }
        Update: {
          artwork_cost?: number | null
          artwork_url?: string | null
          complexity?: number | null
          created_at?: string
          custom_work?: Json | null
          description?: string | null
          id?: number
          isArtworkProvided?: boolean
          isMaterialProvided?: boolean
          item_total?: number
          material?: number | null
          order_id?: number | null
          pattern_data?: Json | null
          product?: number | null
          product_type?: Database["public"]["Enums"]["product_types"]
          quantity?: number
          unit_price?: number
        }
        Relationships: [
          {
            foreignKeyName: "cm_order_items_material_fkey"
            columns: ["material"]
            isOneToOne: false
            referencedRelation: "cm_materials"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "cm_order_items_product_fkey"
            columns: ["product"]
            isOneToOne: false
            referencedRelation: "cm_products"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "order_items_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "cm_orders"
            referencedColumns: ["id"]
          },
        ]
      }
      cm_orders: {
        Row: {
          artwork_cost: number | null
          created_at: string
          customer_id: number | null
          discount: number | null
          dispatch_note: Json | null
          id: number
          invoice: Json | null
          is_purged: boolean
          job_card: Json | null
          job_price: number | null
          material_cost: number | null
          notes: string | null
          order_type: Database["public"]["Enums"]["order_types"]
          payment_state: Database["public"]["Enums"]["payment_states"]
          quote: Json | null
          state: Database["public"]["Enums"]["order_states"]
          state_history: Json | null
          total: number | null
          update_history: Json | null
          updated_at: string | null
        }
        Insert: {
          artwork_cost?: number | null
          created_at?: string
          customer_id?: number | null
          discount?: number | null
          dispatch_note?: Json | null
          id?: number
          invoice?: Json | null
          is_purged?: boolean
          job_card?: Json | null
          job_price?: number | null
          material_cost?: number | null
          notes?: string | null
          order_type: Database["public"]["Enums"]["order_types"]
          payment_state?: Database["public"]["Enums"]["payment_states"]
          quote?: Json | null
          state: Database["public"]["Enums"]["order_states"]
          state_history?: Json | null
          total?: number | null
          update_history?: Json | null
          updated_at?: string | null
        }
        Update: {
          artwork_cost?: number | null
          created_at?: string
          customer_id?: number | null
          discount?: number | null
          dispatch_note?: Json | null
          id?: number
          invoice?: Json | null
          is_purged?: boolean
          job_card?: Json | null
          job_price?: number | null
          material_cost?: number | null
          notes?: string | null
          order_type?: Database["public"]["Enums"]["order_types"]
          payment_state?: Database["public"]["Enums"]["payment_states"]
          quote?: Json | null
          state?: Database["public"]["Enums"]["order_states"]
          state_history?: Json | null
          total?: number | null
          update_history?: Json | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "orders_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "cm_customers"
            referencedColumns: ["id"]
          },
        ]
      }
      cm_print_jobs: {
        Row: {
          created_at: string
          id: number
          notes: Json | null
          order_id: number | null
        }
        Insert: {
          created_at?: string
          id?: number
          notes?: Json | null
          order_id?: number | null
        }
        Update: {
          created_at?: string
          id?: number
          notes?: Json | null
          order_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "cm_print_jobs_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "cm_orders"
            referencedColumns: ["id"]
          },
        ]
      }
      cm_products: {
        Row: {
          created_at: string
          id: number
        }
        Insert: {
          created_at?: string
          id?: number
        }
        Update: {
          created_at?: string
          id?: number
        }
        Relationships: []
      }
      cm_stock_updates: {
        Row: {
          created_at: string
          id: number
          material_id: number | null
          note: string
        }
        Insert: {
          created_at?: string
          id?: number
          material_id?: number | null
          note: string
        }
        Update: {
          created_at?: string
          id?: number
          material_id?: number | null
          note?: string
        }
        Relationships: [
          {
            foreignKeyName: "cm_stock_updates_material_id_fkey"
            columns: ["material_id"]
            isOneToOne: false
            referencedRelation: "cm_materials"
            referencedColumns: ["id"]
          },
        ]
      }
      cm_tips: {
        Row: {
          created_at: string
          id: number
          name: string | null
          stock: number | null
          tip_usage: number | null
        }
        Insert: {
          created_at?: string
          id?: number
          name?: string | null
          stock?: number | null
          tip_usage?: number | null
        }
        Update: {
          created_at?: string
          id?: number
          name?: string | null
          stock?: number | null
          tip_usage?: number | null
        }
        Relationships: []
      }
      cm_ui_data: {
        Row: {
          created_at: string
          id: number
        }
        Insert: {
          created_at?: string
          id?: number
        }
        Update: {
          created_at?: string
          id?: number
        }
        Relationships: []
      }
      cm_website_content: {
        Row: {
          created_at: string
          id: number
        }
        Insert: {
          created_at?: string
          id?: number
        }
        Update: {
          created_at?: string
          id?: number
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      customer_types: "one_time" | "returning" | "high_value" | "low_value"
      order_states:
        | "pending"
        | "quote_prepared"
        | "quote_generated"
        | "quote_sent"
        | "quote_amended"
        | "partial_invoice_generated"
        | "partial_invoice_sent"
        | "job_created"
        | "job_in_progress"
        | "job_complete"
        | "final_invoice_generated"
        | "final_invoice_sent"
        | "dispatch_note_generated"
        | "dispatched"
        | "complete"
      order_types: "website" | "system" | "vendor" | "partner" | "internal"
      payment_states:
        | "pending_payment"
        | "partial_payment"
        | "payment_complete"
        | "payment_refunded"
      product_types: "pre_crafted" | "custom"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never
