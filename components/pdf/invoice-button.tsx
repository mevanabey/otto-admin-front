"use client"

import { useState } from "react";
import { CogIcon, CheckCircleIcon, RefreshCwIcon } from "lucide-react"

import { toast } from "sonner";

import { useUpdateOrder } from '@/hooks/useOrders'

import { Button } from "@/components/ui/button"
import { useCreateOrderInvoice } from "@/hooks/useDocuments";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import { OrderType, OrderUpdateType } from "@/utils/global.types";

export function GenerateInvoiceButton({ order }: { order: OrderType }) {
    const [invoicePercentage, setInvoicePercentage] = useState<number | null>(null);
    const [loading, setLoading] = useState(false);
    const updateOrderMutation = useUpdateOrder();
    const createOrderInvoiceMutation = useCreateOrderInvoice();

    const handleMarkAsSent = async () => {
      setLoading(true);
      const invoiceType = order.final_invoice_url ? 'final_invoice' : 'partial_invoice';
      const orderId = order?.id;
      if(orderId) {
        try {
          const updatedOrder = await updateOrderMutation.mutateAsync({
            id: orderId,
            [`${invoiceType}_sent`]: true,
          });
          toast.success('Invoice marked as sent!');
          setLoading(false);
        } catch (error) {
          toast.error('Error marking invoice as sent.');
          setLoading(false);
        }
      }
    };

    const handleUpdateOrder = async (quoteUrl: string, invoiceType: string) => {
      const orderId = order?.id;
      if(orderId) {
        try {
          const updatedOrder = await updateOrderMutation.mutateAsync({
            id: orderId,
            [`${invoiceType}_invoice_url`]: quoteUrl,
            [`${invoiceType}_invoice_sent`]: false,
          });
          toast.success('Invoice generated successfully!');
        } catch (error) {
          toast.error('Error generating invoice');
        }
      }
    };

    const handleAddOrderInvoice = async (quoteUrl: string, quoteNo: string) => {
      const orderId = order?.id;
      if(orderId) {
        try {
          const createdQuote = await createOrderInvoiceMutation.mutateAsync({
            order_id: orderId,
            invoice_no: quoteNo,
            url: quoteUrl,
            percentage: invoicePercentage ? invoicePercentage : 100 - (order?.invoiced_percentage ?? 200),
          });
          toast.success('Added invoice to order!');
        } catch (error) {
          toast.error('Error adding invoice to order');
        }
      }
    };

  const generateInvoice = async (invoiceType: string) => {
    setLoading(true);
    const response = await fetch("/api/create-invoice", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ order, invoicePercentage: invoicePercentage })
    });

    const data = await response.json();
    await handleUpdateOrder(`https://qskctdhltxjmimjaqezc.supabase.co/storage/v1/object/public/documents/${data.path}`, invoiceType);
    await handleAddOrderInvoice(`https://qskctdhltxjmimjaqezc.supabase.co/storage/v1/object/public/documents/${data.path}`, data.docid);
    
    setInvoicePercentage(null);
    setLoading(false);
  };

  return order.partial_invoice_url ? (
      <>
        {(!order.partial_invoice_sent || (!order.final_invoice_sent && order.final_invoice_url)) && (
          <Button variant="outline" className="w-full mt-2" onClick={handleMarkAsSent} disabled={loading}>
            <CheckCircleIcon className="mr-2 h-4 w-4" />
            Mark As Sent
          </Button>
        )}

        {!order.final_invoice_url && (  
          <Button variant="default" className="w-full mt-2" onClick={() => generateInvoice('final')} disabled={loading}>
            {loading ? <CogIcon className="mr-2 h-4 w-4 animate-spin" /> : <CogIcon className="mr-2 h-4 w-4" />}
            Generate Final Invoice
          </Button>
        )}
      </>
    ) : (
      <Dialog>
      <DialogTrigger asChild>
        <Button variant="default" className="w-full mt-2" disabled={loading}>
          {loading ? <CogIcon className="mr-2 h-4 w-4 animate-spin" /> : <CogIcon className="mr-2 h-4 w-4" />}
          Generate Invoice
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Invoice Percentage</DialogTitle>
          <DialogDescription>
            Enter the percentage of the invoice to generate.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Percentage
            </Label>
            <Input
              id="percentage"
              type="number"
              step="10"
              defaultValue={100}
              className="col-span-3"
              onChange={(e) => setInvoicePercentage(parseFloat(e.target.value))}
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="default" className="w-full mt-2" onClick={() => generateInvoice('partial')} disabled={loading}>
            Generate Invoice
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
    )
}
