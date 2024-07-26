'use client'

import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutDashboard, Package, Package2, Users2, Menu } from "lucide-react"

export default function MobileNavigation() {
  const pathname = usePathname()

  const isActive = (path: string) => {
    return pathname === path || pathname.startsWith(`${path}/`)
  }

  const navItems = [
    { href: "/dashboard", label: "Home", icon: LayoutDashboard },
    { href: "/orders", label: "Orders", icon: Package },
    { href: "/customers", label: "Customers", icon: Users2 },
    { href: "/inventory", label: "Inventory", icon: Package2, notification: true },
    { href: "/menu", label: "Menu", icon: Menu },
  ]

  return (
    <nav className="fixed sm:hidden bottom-0 left-0 right-0 bg-background border-t shadow-md">
      <div className="flex justify-around py-2">
        {navItems.map((item) => (
          <Link key={item.href} href={item.href} className="flex flex-col items-center gap-1">
            <div className={`relative flex flex-col items-center space-y-1 ${isActive(item.href) ? "text-primary" : "text-gray-500"}`}>
              <item.icon className="w-6 h-6" />
              <span className="text-[0.7rem]">{item.label}</span>
              {item.notification && (
                <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full" />
              )}
            </div>
          </Link>
        ))}
      </div>
    </nav>
  )
}