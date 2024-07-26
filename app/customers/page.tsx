import React from 'react'

import { useCustomers, useCreateCustomer, useUpdateCustomer } from '@/hooks/useCustomers'

import ProtectedPage from "@/components/layout/protected-page"
import CustomersTable from './components/customers-table'

export default function Dashboard() {
  // const { data: customers, isLoading, error } = useCustomers()
  // const { data: orderStats, isLoading: isLoadingOrderStats, error: errorOrderStats } = useOrderStats()

  // const createCustomer = useCreateCustomer()
  // const updateCustomer = useUpdateCustomer()

  // const handleCreateCustomer = () => {
  //   createCustomer.mutate({
  //     name: 'New Customer',
  //     customer_type: 'one_time',
  //   })
  // }

  // const handleUpdateCustomer = (id: number) => {
  //   updateCustomer.mutate({
  //     id,
  //     name: 'Updated Customer Name',
  //   })
  // }

  // if (isLoading) return <div>Loading...</div>
  // if (error) return <div>Error: {error.message}</div>

  
  // console.log(customers)
  return (
    <ProtectedPage>
      <CustomersTable />
    </ProtectedPage>
  )
}
