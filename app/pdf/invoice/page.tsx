"use client"

import { useState } from "react";

export default function GenerateInvoice() {
  const [invoiceUrl, setInvoiceUrl] = useState("");

  const generateInvoice = async () => {
    const invoice = {
      invoice_nr: 1234,
      subtotal: 8000,
      paid: 3000,
      shipping: {
        name: "John Doe",
        address: "123 Elm St",
        city: "Springfield",
        state: "IL",
        country: "USA"
      },
      items: [
        {
          item: "Widget",
          description: "A very nice widget",
          amount: 4000,
          quantity: 2
        }
      ]
    };

    const response = await fetch("/api/create-invoice", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(invoice)
    });

    const data = await response.json();
    setInvoiceUrl(data.url);
  };

  return (
    <div>
      <h1>Generate Invoice</h1>
      <button onClick={generateInvoice}>Generate Invoice</button>
      {invoiceUrl && (
        <div>
          <a href={invoiceUrl} target="_blank" rel="noopener noreferrer">
            Download Invoice
          </a>
        </div>
      )}
    </div>
  );
}
