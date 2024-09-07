"use client"

import { useState } from "react";
import { CogIcon, CheckCircleIcon, RefreshCwIcon } from "lucide-react"

import { toast } from "sonner";

import { useUpdateOrder } from '@/hooks/useOrders'

import { Button } from "@/components/ui/button"
import { useCreateOrderQuote } from "@/hooks/useDocuments";

import { OrderType, OrderUpdateType } from "@/utils/global.types";

export function GenerateQuotateButton({ order }: { order: OrderType }) {
    const [loading, setLoading] = useState(false);
    const updateOrderMutation = useUpdateOrder();
    const createOrderQuoteMutation = useCreateOrderQuote();

    const handleMarkAsSent = async () => {
      setLoading(true);
      const orderId = order?.id;
      if(orderId) {
        try {
          const updatedOrder = await updateOrderMutation.mutateAsync({
            id: orderId,
            quote_sent: true,
          });
          toast.success('Quotation marked as sent!');
          setLoading(false);
        } catch (error) {
          toast.error('Error marking as sent.');
          setLoading(false);
        }
      }
    };

    const handleUpdateOrder = async (quoteUrl: string) => {
      const orderId = order?.id;
      if(orderId) {
        try {
          const updatedOrder = await updateOrderMutation.mutateAsync({
            id: orderId,
            quote_url: quoteUrl,
            quote_sent: false,
          });
          toast.success('Quotation generated successfully!');
        } catch (error) {
          toast.error('Error generating quotation');
        }
      }
    };

    const handleAddOrderQuote = async (quoteUrl: string, quoteNo: string) => {
      const orderId = order?.id;
      if(orderId) {
        try {
          const createdQuote = await createOrderQuoteMutation.mutateAsync({
            order_id: orderId,
            quote_no: quoteNo,
            url: quoteUrl,
          });
          toast.success('Added quote to order!');
        } catch (error) {
          toast.error('Error adding quote to order');
        }
      }
    };

  const generateQuote = async () => {
    setLoading(true);
    const response = await fetch("/api/create-quotation", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(order)
    });

    const data = await response.json();
    await handleUpdateOrder(`https://qskctdhltxjmimjaqezc.supabase.co/storage/v1/object/public/documents/${data.path}`);
    await handleAddOrderQuote(`https://qskctdhltxjmimjaqezc.supabase.co/storage/v1/object/public/documents/${data.path}`, data.docid);
    
    setLoading(false);
  };

  return order.quote_url ? (
      <>
      {!order.quote_sent && (
        <Button variant="outline" className="w-full mt-2" onClick={handleMarkAsSent} disabled={loading}>
          <CheckCircleIcon className="mr-2 h-4 w-4" />
          Mark Sent
        </Button>
      )}
      
      <Button variant="secondary" className="w-full mt-2" onClick={generateQuote} disabled={loading}>
        {loading ? <RefreshCwIcon className="mr-2 h-4 w-4 animate-spin" /> : <RefreshCwIcon className="mr-2 h-4 w-4" />}
        Regenerate Quote
      </Button>
      </>
    ) : (
      <Button variant="default" className="w-full mt-2" onClick={generateQuote} disabled={loading}>
        {loading ? <CogIcon className="mr-2 h-4 w-4 animate-spin" /> : <CogIcon className="mr-2 h-4 w-4" />}
        Generate Quote
      </Button>
    )
}
