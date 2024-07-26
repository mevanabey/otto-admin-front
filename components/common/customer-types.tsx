import React from 'react';
import { Badge } from "@/components/ui/badge"

type CustomerType = "one_time" | "returning" | "high_value" | "low_value";

interface CustomerTypeProps {
  type: CustomerType;
  className?: string;
}

export const CustomerTypes: CustomerType[] = [
  "one_time",
  "returning",
  "high_value",
  "low_value"
];

export const CustomerTypeBadge: React.FC<CustomerTypeProps> = ({ type, className }) => {
  const getTypeColor = (type: CustomerType): string => {
    switch (type) {
      case 'one_time':
        return 'bg-orange-100 text-orange-800';
      case 'returning':
        return 'bg-green-100 text-green-800';
      case 'high_value':
        return 'bg-purple-100 text-purple-800';
      case 'low_value':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeLabel = (type: CustomerType): string => {
    return type.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  };

  return (
    <Badge className={`${getTypeColor(type)} ${className}`}>
      {getTypeLabel(type)}
    </Badge>
  );
};

// Other Potential Customer Types:
// - high_value
// - low_value
// - returning
// - one_time
// - recurring
// - subscription
// - gift_card
// - referral
// - partner
// - vendor
// - internal
// - website
// case 'one_time': return 'bg-orange-100 text-orange-800';
// case 'returning': return 'bg-green-100 text-green-800';
// case 'high_value': return 'bg-purple-100 text-purple-800';
// case 'low_value': return 'bg-gray-100 text-gray-800';
// case 'new': return 'bg-blue-100 text-blue-800';
// case 'loyal': return 'bg-indigo-100 text-indigo-800';
// case 'vip': return 'bg-yellow-100 text-yellow-800';
// case 'at_risk': return 'bg-red-100 text-red-800';
// case 'churned': return 'bg-rose-100 text-rose-800';
// case 'seasonal': return 'bg-amber-100 text-amber-800';
// case 'business': return 'bg-cyan-100 text-cyan-800';
// case 'influencer': return 'bg-pink-100 text-pink-800';
// case 'discount_driven': return 'bg-lime-100 text-lime-800';
// case 'early_adopter': return 'bg-emerald-100 text-emerald-800';
// default: return 'bg-gray-100 text-gray-800';