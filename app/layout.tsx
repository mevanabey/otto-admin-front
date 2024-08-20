import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import QueryProvider from "@/components/wrappers/query-provider";
import { ThemeProvider } from "@/components/wrappers/theme-provider"
import { TooltipProvider } from "@/components/ui/tooltip"
import { Toaster } from "@/components/ui/sonner"


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
      <html lang="en" suppressHydrationWarning className="dark">
        <body className={inter.className}>
            <ThemeProvider
              attribute="class"
              defaultTheme="dark"
              disableTransitionOnChange
            >
              <TooltipProvider>
                
                {children}
                
              </TooltipProvider>
            </ThemeProvider>

            <Toaster expand={true} richColors />
        </body>
      </html>
    </QueryProvider>
  );
}
