import { ReactNode } from 'react';
import { redirect } from 'next/navigation';

import { createClient } from '@/utils/supabase/server';

import { cn } from "@/lib/utils"
import Header from "@/components/layout/header"
import Breadcrumbs from "@/components/layout/breadcrumbs"
import Navigation from "@/components/layout/navigation"

interface ProtectedPageProps {
  children: ReactNode;
  className?: string;
}

export default async function ProtectedPage({ children, className }: ProtectedPageProps) {
  const supabase = createClient();
  const { data, error } = await supabase.auth.getUser();

  if (error || !data?.user) {
    redirect('/login');
  }

  return (
    <main className={cn("flex min-h-screen w-full flex-col pb-32", className)}>
      <Header />
      <Breadcrumbs />
        {children}
      <Navigation />
    </main>
  );
}