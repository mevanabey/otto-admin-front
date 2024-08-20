"use client"

import { useState } from "react";
import { SquarePen } from "lucide-react"

import { toast } from "sonner";

import { useUpdateOrder } from '@/hooks/useOrders'

import { Button } from "@/components/ui/button"
import { GenerateQuote, PrintButton } from "@/components/common/ui-buttons";

import { OrderType, OrderUpdateType } from "@/utils/global.types";

export function GenerateQuotation({ order }: { order: OrderType }) {
    const updateOrderMutation = useUpdateOrder();

    const handleUpdateOrder = async (quoteUrl: string) => {
      const orderId = order?.id;
      if(orderId) {
        try {
          const updatedOrder = await updateOrderMutation.mutateAsync({
            id: orderId,
            quote_url: quoteUrl,
          });
          toast.success('Quotation generated successfully!');
        } catch (error) {
          toast.error('Error generating quotation');
        }
      }
    };

  const generateQuote = async () => {
    const response = await fetch("/api/create-invoice", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(order)
    });

    const data = await response.json();
    handleUpdateOrder(`https://qskctdhltxjmimjaqezc.supabase.co/storage/v1/object/public/documents/${data.path}`);
  };

  return (
    <div className="flex items-center space-x-2">
      <Button size="lg" variant="outline" onClick={generateQuote}>
        <SquarePen className="h-4 w-4 mr-2" />
        <span className="lg:sr-only xl:not-sr-only xl:whitespace-nowrap">
          Generate Quotation
        </span>
      </Button>

      {order?.quote_url && (
        <a href={order.quote_url} target="_blank" rel="noopener noreferrer">
          <PrintButton link={order.quote_url} labelSuffix="Quotation" />
        </a>
      )}
    </div>
  );
}
