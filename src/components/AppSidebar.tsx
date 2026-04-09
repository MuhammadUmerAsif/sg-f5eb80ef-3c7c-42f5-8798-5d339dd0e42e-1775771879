"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Package, LayoutDashboard, Users, CreditCard, FileText, MessageSquare, UserCog, Settings, PackageSearch, Warehouse, ShoppingCart, TrendingUp, Truck, Building2, UserCheck } from "lucide-react";

const adminNavItems = [
  { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/tenants", label: "Tenants", icon: Users },
  { href: "/admin/subscriptions", label: "Subscriptions", icon: CreditCard },
  { href: "/admin/invoices", label: "Invoices", icon: FileText },
  { href: "/admin/demo-requests", label: "Demo Requests", icon: MessageSquare },
  { href: "/admin/admins", label: "Admin Users", icon: UserCog },
];

const tenantNavItems = [
  { href: "/tenant/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/tenant/inventory", label: "Inventory", icon: PackageSearch },
  { href: "/tenant/warehouses", label: "Warehouses", icon: Warehouse },
  { href: "/tenant/orders", label: "Orders", icon: ShoppingCart },
  { href: "/tenant/stock-movement", label: "Stock Movement", icon: TrendingUp },
  { href: "/tenant/shipments", label: "Shipments", icon: Truck },
  { href: "/tenant/suppliers", label: "Suppliers", icon: Building2 },
  { href: "/tenant/customers", label: "Customers", icon: Users },
  { href: "/tenant/employees", label: "Employees", icon: UserCheck },
  { href: "/tenant/reports", label: "Reports", icon: FileText },
  { href: "/tenant/settings", label: "Settings", icon: Settings },
];

export function AppSidebar({ type = "admin" }: { type?: "admin" | "tenant" }) {
  const pathname = usePathname();
  const navItems = type === "admin" ? adminNavItems : tenantNavItems;

  return (
    <div className="flex h-full w-64 flex-col border-r bg-card">
      <div className="flex h-16 items-center border-b px-6">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Package className="h-5 w-5" />
          </div>
          <div>
            <div className="font-bold text-lg">WareSync Pro</div>
            <div className="text-xs text-muted-foreground">
              {type === "admin" ? "Admin Portal" : "Warehouse"}
            </div>
          </div>
        </Link>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        <nav className="space-y-1">
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
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="border-t p-4">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-primary">
            {type === "admin" ? "A" : "U"}
          </div>
          <div className="flex-1 overflow-hidden">
            <div className="font-medium text-sm">
              {type === "admin" ? "Admin User" : "John Doe"}
            </div>
            <div className="text-xs text-muted-foreground truncate">
              {type === "admin" ? "admin@waresync.com" : "john@acme.com"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}