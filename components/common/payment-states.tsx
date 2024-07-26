import React from 'react';
import { Badge } from "@/components/ui/badge"

type PaymentState = "pending_payment" | "partial_payment" | "payment_complete" | "payment_refunded";

interface PaymentStateProps {
  state: PaymentState;
  className?: string;
}

export const paymentStates: PaymentState[] = [
  "pending_payment",
  "partial_payment",
  "payment_complete",
  "payment_refunded"
];

export const PaymentState: React.FC<PaymentStateProps> = ({ state, className }) => {
  const getStateColor = (state: PaymentState): string => {
    switch (state) {
      case 'pending_payment':
        return 'bg-rose-100 text-rose-800';
      case 'partial_payment':
        return 'bg-amber-100 text-amber-800';
      case 'payment_complete':
        return 'bg-emerald-100 text-emerald-800';
      case 'payment_refunded':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStateLabel = (state: PaymentState): string => {
    return state.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  };

  return (
    <Badge className={`${getStateColor(state)} ${className}`}>
      {getStateLabel(state)}
    </Badge>
  );
};