"use client"

import React from 'react';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { useForm } from '@tanstack/react-form';
import { useCreateOrder } from '@/hooks/useOrders';
import { useCustomers } from '@/hooks/useCustomers';
import { Database } from '@/utils/supabase/database.types';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { TablesInsert } from '@/utils/supabase/database.types';

export default function OrderForm() {
  const { data: customers, isLoading: isLoadingCustomers } = useCustomers();
  const createOrder = useCreateOrder();

  const handleCreateOrder = async () => {
    const newOrder: TablesInsert<'cm_orders'> = {
      order_type: 'system',
      state: 'pending',
      total: 0,
      // Add any other required fields here
    };

    try {
      const createdOrder = await createOrder.mutateAsync(newOrder);
      console.log('Order created:', createdOrder);
      // You can add additional logic here, like showing a success message
    } catch (error) {
      console.error('Error creating order:', error);
      // Handle the error, perhaps by showing an error message to the user
    }
  };

  // const { data: customers, isLoading, error } = useCustomers()
  // const createCustomer = useCreateCustomer()
  // const updateCustomer = useUpdateCustomer()
  // const handleCreateCustomer = () => {
  //   createCustomer.mutate({
  //     name: 'New Customer',
  //     customer_type: 'one_time',
  //     // ... other required fields
  //   })
  // }

  // const handleUpdateCustomer = (id: number) => {
  //   updateCustomer.mutate({
  //     id,
  //     name: 'Updated Customer Name',
  //     // ... other fields to update
  //   })
  // }

  const form = useForm({
    defaultValues: {
      fullName: '',
      order_type: 'system',
      state: 'pending',
    },
    onSubmit: async (values) => {
      // Do something with form data
      console.log(values)
    },
  })

  // const form = useForm<OrderInsert>({
  //   defaultValues: {
  //     customer_id: null,
  //     order_type: 'system',
  //     state: 'pending',
  //     total: 0,
  //   },
  //   onSubmit: async (values) => {
  //     await createOrder.mutateAsync(values);
  //   },
  // });

  if (isLoadingCustomers) {
    return <div>Loading customers...</div>;
  }

  return (
    <Sheet>
      <SheetTrigger>Open</SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Create New Order</SheetTitle>
          <SheetDescription>
            This action cannot be undone. This will permanently delete your account
            and remove your data from our servers.
          </SheetDescription>
        </SheetHeader>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              e.stopPropagation();
              form.handleSubmit();
            }}
          >
            <div>
            <form.Field name="fullName">
              {(field) => (
                <div>
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input
                    id="fullName"
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                </div>
              )}
            </form.Field>
            </div>
            <button type="submit">Submit</button>
          </form>
          <Button 
            onClick={handleCreateOrder}
            disabled={createOrder.isPending}
          >
            {createOrder.isPending ? 'Creating Order...' : 'Create New Order'}
          </Button>
      </SheetContent>
    </Sheet>
  );
}