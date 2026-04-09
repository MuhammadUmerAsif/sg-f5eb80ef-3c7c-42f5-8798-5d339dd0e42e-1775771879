"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Users,
  Package,
  Warehouse,
  ShoppingCart,
  TruckIcon,
  UserCircle,
  BarChart3,
  Settings,
  CreditCard,
  FileText,
  MessageSquare,
  Shield,
  Box,
} from "lucide-react";

interface NavItem {
  title: string;
  href: string;
  icon: React.ElementType;
}

interface AppSidebarProps {
  type: "admin" | "tenant";
}

const adminNavItems: NavItem[] = [
  { title: "Overview", href: "/admin/dashboard", icon: LayoutDashboard },
  { title: "Tenants", href: "/admin/tenants", icon: Users },
  { title: "Plans", href: "/admin/plans", icon: CreditCard },
  { title: "Subscriptions", href: "/admin/subscriptions", icon: FileText },
  { title: "Invoices", href: "/admin/invoices", icon: FileText },
  { title: "Payments", href: "/admin/payments", icon: CreditCard },
  { title: "Demo Requests", href: "/admin/demo-requests", icon: MessageSquare },
  { title: "Admin Users", href: "/admin/users", icon: Shield },
];

const tenantNavItems: NavItem[] = [
  { title: "Dashboard", href: "/tenant/dashboard", icon: LayoutDashboard },
  { title: "Inventory", href: "/tenant/inventory", icon: Package },
  { title: "Warehouses", href: "/tenant/warehouses", icon: Warehouse },
  { title: "Orders", href: "/tenant/orders", icon: ShoppingCart },
  { title: "Shipments", href: "/tenant/shipments", icon: TruckIcon },
  { title: "Stock Movement", href: "/tenant/stock-movement", icon: Box },
  { title: "Suppliers", href: "/tenant/suppliers", icon: UserCircle },
  { title: "Customers", href: "/tenant/customers", icon: UserCircle },
  { title: "Employees", href: "/tenant/employees", icon: Users },
  { title: "Reports", href: "/tenant/reports", icon: BarChart3 },
  { title: "Settings", href: "/tenant/settings", icon: Settings },
];

export function AppSidebar({ type }: AppSidebarProps) {
  const pathname = usePathname();
  const navItems = type === "admin" ? adminNavItems : tenantNavItems;

  return (
    <div className="flex h-full w-64 flex-col border-r bg-card">
      <div className="flex h-16 items-center border-b px-6">
        <Link href={type === "admin" ? "/admin/dashboard" : "/tenant/dashboard"} className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold text-sm">
            WS
          </div>
          <div>
            <div className="font-semibold text-sm">WareSync Pro</div>
            <div className="text-xs text-muted-foreground">
              {type === "admin" ? "Platform Admin" : "Warehouse Management"}
            </div>
          </div>
        </Link>
      </div>

      <nav className="flex-1 space-y-1 p-4">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <Icon className="h-4 w-4" />
              {item.title}
            </Link>
          );
        })}
      </nav>

      <div className="border-t p-4">
        <div className="flex items-center gap-3 rounded-lg bg-muted px-3 py-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-semibold">
            AD
          </div>
          <div className="flex-1 text-sm">
            <div className="font-medium">Admin User</div>
            <div className="text-xs text-muted-foreground">admin@waresync.com</div>
          </div>
        </div>
      </div>
    </div>
  );
}