import { ReactNode } from 'react';
import { redirect } from 'next/navigation';
import { createClient } from '@/utils/supabase/server';

import Header from "@/components/layout/header"
import Breadcrumbs from "@/components/layout/breadcrumbs"
import Navigation from "@/components/layout/navigation"

interface ProtectedPageProps {
  children: ReactNode;
}

export default async function ProtectedPage({ children }: ProtectedPageProps) {
  const supabase = createClient();
  const { data, error } = await supabase.auth.getUser();

  if (error || !data?.user) {
    redirect('/login');
  }

  return (
    <>
      <Header />
      <Breadcrumbs />
        {children}
      <Navigation />
    </>
  );
}