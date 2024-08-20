"use client"

import * as React from "react"
import { createClient } from "@/utils/supabase/server"
import { dehydrate, QueryClient, HydrationBoundary, UseQueryResult } from "@tanstack/react-query"
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { ArrowUpDown, MoreHorizontal, SquarePen, SquarePlus, UserPlusIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { AddNewOrder } from "@/components/orders/add-new-order"
import { PrepareQuote } from "@/components/common/ui-buttons"
import { Loader } from "@/components/ui/loader"
import { AttachCustomerButton } from "@/components/orders/select-customer"

import { useOrders, useUpdateOrder } from '@/hooks/useOrders'
import { useCustomers } from '@/hooks/useCustomers'

import { OrderListItem } from "@/components/orders/order-list-item"

import { OrderType as OrdersType, OrderInsertType, OrderUpdateType, ExtendedOrderType, CustomersType } from '@/utils/global.types';
type UpdateOrderData = Partial<Omit<OrdersType, 'id'>>;
type UseCustomersResultType = UseQueryResult<CustomersType[], Error>;
type UseOrdersResultType = UseQueryResult<OrdersType[], Error>;

export const OrderList = () => {
  const { data: orders, isLoading, error }: UseOrdersResultType = useOrders()
  const updateOrderMutation = useUpdateOrder();
  const { data: customers, isLoading: isLoadingCustomers, error: errorCustomers }: UseCustomersResultType = useCustomers()

  const handleUpdateOrder = async (orderId: number, newOrderData: OrderUpdateType) => {
    try {
      const updatedOrder = await updateOrderMutation.mutateAsync({
        id: orderId,
        ...newOrderData
      });
      console.log('Order updated successfully:', updatedOrder);
    } catch (error) {
      // Error is already logged in the mutation
    }
  };

  if (isLoading) return <Loader />
  if (error) return <Card className="p-8 text-center">Error: {error.message}</Card>

  return (
    <>
      {orders?.length ? (
        <div className="space-y-4">
          {orders.map(order => (
            <OrderListItem key={order.id} order={order} />
          ))}
        </div>) : (
          <Card className="p-8 text-center">No orders found.</Card>   
      )}
    </>
  )
}
