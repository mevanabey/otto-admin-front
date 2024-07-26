// components/Breadcrumbs.tsx

'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

interface BreadcrumbItem {
  label: string;
  href: string;
}

const Breadcrumbs: React.FC = () => {
  const pathname = usePathname();
  
  const breadcrumbs = React.useMemo(() => generateBreadcrumbs(pathname), [pathname]);

  return (
    <Breadcrumb className="px-8 pt-4">
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link href="/">Home</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        {breadcrumbs.map((item, index) => (
          <React.Fragment key={item.href}>
            <BreadcrumbItem>
              {index === breadcrumbs.length - 1 ? (
                <BreadcrumbPage>{item.label}</BreadcrumbPage>
              ) : (
                <BreadcrumbLink asChild>
                  <Link href={item.href}>{item.label}</Link>
                </BreadcrumbLink>
              )}
            </BreadcrumbItem>
            {index < breadcrumbs.length - 1 && <BreadcrumbSeparator />}
          </React.Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

const generateBreadcrumbs = (path: string): BreadcrumbItem[] => {
  const parts = path.split('/').filter(Boolean);
  return parts.map((part, index) => ({
    label: part.charAt(0).toUpperCase() + part.slice(1),
    href: '/' + parts.slice(0, index + 1).join('/'),
  }));
};

export default Breadcrumbs;