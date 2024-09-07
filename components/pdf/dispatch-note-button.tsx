"use client"

import { useState } from "react";
import { CogIcon } from "lucide-react"

import { toast } from "sonner";

import { useUpdateOrder } from '@/hooks/useOrders'

import { Button } from "@/components/ui/button"
import { GenerateQuote, PrintButton } from "@/components/common/ui-buttons";

import { OrderType, OrderUpdateType } from "@/utils/global.types";

export function GenerateDispatchNoteButton({ order }: { order: OrderType }) {
    const [loading, setLoading] = useState(false);
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
          setLoading(false);
        } catch (error) {
          toast.error('Error generating quotation');
          setLoading(false);
        }
      }
    };

  const generateQuote = async () => {
    setLoading(true);
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
    // <div className="flex items-center space-x-2">
      <Button variant="default" className="w-full mt-2" onClick={generateQuote}>
        {loading ? <CogIcon className="mr-2 h-4 w-4 animate-spin" /> : <CogIcon className="mr-2 h-4 w-4" />}
        Generate Dispatch Note
      </Button>
      // <Button size="lg" variant="outline" onClick={generateQuote}>
      //   <CogIcon className="h-4 w-4 mr-2" />
      //   <span className="lg:sr-only xl:not-sr-only xl:whitespace-nowrap">
      //     Generate Quotation
      //   </span>
      // </Button>

      // {/* {order?.quote_url && (
      //   <a href={order.quote_url} target="_blank" rel="noopener noreferrer">
      //     <PrintButton link={order.quote_url} labelSuffix="Quotation" />
      //   </a>
      // )} */}
    // {/* </div> */}
  );
}
