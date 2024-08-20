import Image from "next/image"
import Link from "next/link"
import {
  ChevronLeft,
  ChevronRight,
  Copy,
  CreditCard,
  File,
  Home,
  LineChart,
  ListFilter,
  MoreVertical,
  Package,
  Package2,
  PanelLeft,
  Search,
  Settings,
  ShoppingCart,
  Truck,
  Users2,
  CircleUser,
  Menu,
  LayoutDashboard
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
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
import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from "@/components/ui/pagination"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import ProtectedPage from "@/components/layout/protected-page"
import { Logomark } from "@/components/ottolabs/Logo"
import OrdersOverviewCard from "@/components/common/orders-overview"
import { DataTable } from "@/components/common/data-table"
import { StatsCards } from "@/components/common/stats"

const statsData = [
  { name: 'Pending Jobs', value: '405' },
  { name: 'Active Jobs', value: '8' },
  { name: 'Completed Jobs', value: '3' },
  { name: 'Average Completion Time', value: '3.65', unit: 'mins' },
];

export default function Dashboard() {
  return (
    <ProtectedPage>
      <div className="my-4 mx-2 space-y-8 sm:mx-8">
        <Card>
          <StatsCards stats={statsData} />
        </Card>
      </div>
    </ProtectedPage>
  )
}
