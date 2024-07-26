import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import QueryProvider from "@/components/wrappers/query-provider";
import { ThemeProvider } from "@/components/wrappers/theme-provider"
import { TooltipProvider } from "@/components/ui/tooltip"
import Header from "@/components/layout/header"
import Navigation from "@/components/layout/navigation"


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Otto Admin - Crafting Magic",
  description: "Powered by Ottolabs Tech",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <QueryProvider>
      <html lang="en" suppressHydrationWarning>
        <body className={inter.className}>
            <ThemeProvider
              attribute="class"
              defaultTheme="dark"
              enableSystem
              disableTransitionOnChange
            >
              <TooltipProvider>
                <Header />
                
                {children}
                
                <Navigation />
                
              </TooltipProvider>
            </ThemeProvider>
        </body>
      </html>
    </QueryProvider>
  );
}
