import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function timeAgo(createdAt: string): string {
  const createdDate = new Date(createdAt);
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - createdDate.getTime()) / 1000);

  const units = [
      { name: 'year', seconds: 31536000 },
      { name: 'month', seconds: 2592000 },
      { name: 'week', seconds: 604800 },
      { name: 'day', seconds: 86400 },
      { name: 'hour', seconds: 3600 },
      { name: 'minute', seconds: 60 },
      { name: 'second', seconds: 1 }
  ];

  for (const unit of units) {
      const quotient = Math.floor(diffInSeconds / unit.seconds);
      if (quotient > 0) {
          return `${quotient} ${unit.name}${quotient > 1 ? 's' : ''} ago`;
      }
  }

  return 'just now';
}

export function formatDateToString(isoString: string): string {
  const date = new Date(isoString);

  const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
  };

  return date.toLocaleDateString('en-US', options);
}

export function formatCurrency(amount: number, currency: string = 'LKR'): string {
  return `${currency} ${amount.toLocaleString('en-US')}`;
}

export function generateQuoteNumber(order_id: number): string {
  const currentMonth = new Date().getMonth() + 1;
  const randomNumber = Math.floor(Math.random() * 100) + 1;

  return `CMQ/${currentMonth}${randomNumber}/${order_id + 2000}`;
}

export function generateInvoiceNumber(order_id: number): string {
  const currentMonth = new Date().getMonth() + 1;
  const randomNumber = Math.floor(Math.random() * 100) + 1;

  return `CMI/${currentMonth}${randomNumber}/${order_id + 2000}`;
}

export function generateDispatchNoteNumber(order_id: number): string {
  const currentMonth = new Date().getMonth() + 1;
  const randomNumber = Math.floor(Math.random() * 100) + 1;

  return `CMDN/${currentMonth}${randomNumber}/${order_id + 2000}`;
}