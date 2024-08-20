'use client'

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Package2, Search, CircleUser, LogOut } from "lucide-react"

import { Logomark } from "@/components/ottolabs/Logo"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"

export default function Header() {
  const pathname = usePathname()

  const isActive = (path: string) => {
    return pathname === path || pathname.startsWith(`${path}/`)
  }

  const navItems = [
    { href: "/dashboard", label: "Dashboard" },
    { href: "/customers", label: "Customers" },
    { href: "/orders", label: "Orders" },
    { href: "/inventory", label: "Inventory" },
    { href: "/jobs", label: "Jobs" },
    { href: "/reports", label: "Reports" },
  ]

  return (
    <header className="sticky top-0 z-50 flex h-16 items-center gap-4 border-b bg-background/60 backdrop-blur px-4 md:px-6">
      <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
        <Link
          href="/dashboard"
          className="flex items-center gap-2 text-lg font-semibold border rounded-full md:text-base"
        >
          <Logomark className="h-9 w-9" />
          <span className="sr-only">Otto Admin</span>
        </Link>
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`transition-colors hover:text-foreground ${
              isActive(item.href)
                ? "text-foreground font-semibold"
                : "text-muted-foreground"
            }`}
          >
            {item.label}
          </Link>
        ))}
      </nav>

      <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
        <form className="ml-auto flex-1 sm:flex-initial">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search..."
              className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
            />
          </div>
        </form>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="secondary" size="icon" className="rounded-full">
              <CircleUser className="h-5 w-5" />
              <span className="sr-only">Toggle user menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {/* <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuItem>Support</DropdownMenuItem>
            <DropdownMenuSeparator /> */}
            <DropdownMenuItem>
            <Link href="/auth/signout" className="flex items-center space-x-2">
              <LogOut size="16" />
              <span>Logout</span>
            </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
  </header>
  )
}