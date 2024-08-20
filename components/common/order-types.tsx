import React from 'react';
import { Badge } from "@/components/ui/badge"

type OrderType = "website" | "system" | "vendor" | "partner" | "internal";

interface OrderTypeProps {
  type: OrderType;
  className?: string;
}

export const orderTypes: OrderType[] = [
  "website",
  "system",
  "vendor",
  "partner",
  "internal"
];

export const OrderType: React.FC<OrderTypeProps> = ({ type, className }) => {
  const getTypeColor = (type: OrderType): string => {
    switch (type) {
      case 'website':
        return 'bg-teal-100 text-teal-800 hover:bg-teal-200';
      case 'system':
        return 'bg-cyan-100 text-cyan-800 hover:bg-cyan-200';
      case 'vendor':
        return 'bg-sky-100 text-sky-800 hover:bg-sky-200';
      case 'partner':
        return 'bg-violet-100 text-violet-800 hover:bg-violet-200';
      case 'internal':
        return 'bg-fuchsia-100 text-fuchsia-800 hover:bg-fuchsia-200';
      default:
        return 'bg-gray-100 text-gray-800 hover:bg-gray-200';
    }
  };

  const getTypeLabel = (type: OrderType): string => {
    return type.charAt(0).toUpperCase() + type.slice(1);
  };

  return (
    <Badge className={`${getTypeColor(type)} ${className}`}>
      {getTypeLabel(type)}
    </Badge>
  );
};