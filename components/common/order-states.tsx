import React from 'react';

import { Badge } from "@/components/ui/badge"

import { OrderStateType } from "@/utils/global.types"

interface OrderStateProps {
  state: OrderStateType;
  className?: string
}

export const orderStates: OrderStateType[] = [
    'pending',
    'quote_prepared',
    'quote_generated',
    'quote_sent',
    'quote_amended',
    'partial_invoice_generated',
    'partial_invoice_sent',
    'job_created',
    'job_in_progress',
    'job_complete',
    'final_invoice_generated',
    'final_invoice_sent',
    'dispatch_note_generated',
    'dispatched',
    'complete'
];

export const OrderState: React.FC<OrderStateProps> = ({ state, className }) => {
  const getStateColor = (state: OrderStateType): string => {
    switch (state) {
      case 'pending':
        return 'text-yellow-400 bg-yellow-400/10 ring-yellow-400/20 hover:bg-yellow-400/30';
      case 'quote_prepared':
      case 'quote_generated':
        return 'bg-blue-100 text-blue-800 hover:bg-blue-200';
      case 'quote_sent':
      case 'quote_amended':
        return 'bg-indigo-100 text-indigo-800 hover:bg-indigo-200';
      case 'partial_invoice_generated':
      case 'partial_invoice_sent':
        return 'bg-purple-100 text-purple-800 hover:bg-purple-200';
      case 'job_created':
        return 'bg-pink-100 text-pink-800 hover:bg-pink-200';
      case 'job_in_progress':
        return 'bg-red-100 text-red-800 hover:bg-red-200';
      case 'job_complete':
        return 'bg-orange-100 text-orange-800 hover:bg-orange-200';
      case 'final_invoice_generated':
      case 'final_invoice_sent':
        return 'bg-amber-100 text-amber-800 hover:bg-amber-200';
      case 'dispatch_note_generated':
        return 'bg-lime-100 text-lime-800 hover:bg-lime-200';
      case 'dispatched':
        return 'bg-green-100 text-green-800 hover:bg-green-200';
      case 'complete':
        return 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200';
      default:
        return 'bg-gray-100 text-gray-800 hover:bg-gray-200';
    }
  };

  const getStateLabel = (state: OrderStateType): string => {
    return state.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  };

  return (
    <Badge className={`${getStateColor(state)} ${className}`}>
      {getStateLabel(state)}
    </Badge>
  );
};