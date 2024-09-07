import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { useCustomer, useUpdateCustomer } from '@/hooks/useCustomers'
import ProtectedPage from "@/components/layout/protected-page"

export default function CustomerDetail() {
  const router = useRouter()
  const { id } = router.query

  const { data: customer, isLoading, error } = useCustomer(Number(id))
  const updateCustomer = useUpdateCustomer()

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    company: '',
    phone: '',
    customer_discount: 0,
    customer_type: 'one_time',
    notes: '',
    // Add other fields as needed
  })

  useEffect(() => {
    if (customer) {
      setFormData({
        name: customer.name || '',
        email: customer.email || '',
        address: customer.address || '',
        company: customer.company || '',
        phone: customer.phone || '',
        customer_discount: customer.customer_discount || 0,
        customer_type: customer.customer_type,
        notes: customer.notes || '',
        // Add other fields as needed
      })
    }
  }, [customer])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }))
  }

  const handleUpdateCustomer = () => {
    if (customer) {
      updateCustomer.mutate({
        id: customer.id,
        ...formData,
      })
    }
  }

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>

  return (
    <ProtectedPage>
      <div>
        <h1>Customer Detail</h1>
        <form>
          <label>
            Name:
            <input type="text" name="name" value={formData.name} onChange={handleChange} />
          </label>
          <label>
            Email:
            <input type="email" name="email" value={formData.email} onChange={handleChange} />
          </label>
          <label>
            Address:
            <input type="text" name="address" value={formData.address} onChange={handleChange} />
          </label>
          <label>
            Company:
            <input type="text" name="company" value={formData.company} onChange={handleChange} />
          </label>
          <label>
            Phone:
            <input type="text" name="phone" value={formData.phone} onChange={handleChange} />
          </label>
          <label>
            Customer Discount:
            <input type="number" name="customer_discount" value={formData.customer_discount} onChange={handleChange} />
          </label>
          <label>
            Customer Type:
            <select name="customer_type" value={formData.customer_type} onChange={handleChange}>
              <option value="one_time">One Time</option>
              <option value="returning">Returning</option>
              <option value="high_value">High Value</option>
              <option value="low_value">Low Value</option>
            </select>
          </label>
          <label>
            Notes:
            <textarea name="notes" value={formData.notes} onChange={handleChange} />
          </label>
          {/* Add other fields as needed */}
          <button type="button" onClick={handleUpdateCustomer}>Update Customer</button>
        </form>
      </div>
    </ProtectedPage>
  )
}