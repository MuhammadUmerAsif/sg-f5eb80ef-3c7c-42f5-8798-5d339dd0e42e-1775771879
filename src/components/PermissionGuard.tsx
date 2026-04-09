"use client";

import { ReactNode } from "react";

interface PermissionGuardProps {
  children: ReactNode;
  permission: string;
  role?: string;
  fallback?: ReactNode;
}

const mockPermissions = {
  super_admin: ["*"],
  admin: [
    "tenants.view",
    "tenants.create",
    "tenants.edit",
    "tenants.delete",
    "plans.view",
    "plans.create",
    "plans.edit",
    "plans.delete",
    "demo.view",
    "demo.edit",
    "invoices.view",
    "payments.view",
  ],
  support: [
    "tenants.view",
    "demo.view",
    "demo.edit",
  ],
  tenant_admin: ["*"],
  manager: [
    "inventory.view",
    "inventory.create",
    "inventory.edit",
    "warehouses.view",
    "warehouses.create",
    "orders.view",
    "orders.create",
    "orders.edit",
    "shipments.view",
    "shipments.create",
  ],
  operator: [
    "inventory.view",
    "warehouses.view",
    "orders.view",
    "shipments.view",
  ],
  viewer: [
    "inventory.view",
    "warehouses.view",
    "orders.view",
  ],
};

export function PermissionGuard({
  children,
  permission,
  role = "admin",
  fallback = null,
}: PermissionGuardProps) {
  const userRole = role as keyof typeof mockPermissions;
  const permissions = mockPermissions[userRole] || [];

  const hasPermission =
    permissions.includes("*") || permissions.includes(permission);

  if (!hasPermission) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
}

export function usePermissions(role: string = "admin") {
  const userRole = role as keyof typeof mockPermissions;
  const permissions = mockPermissions[userRole] || [];

  return {
    can: (permission: string) =>
      permissions.includes("*") || permissions.includes(permission),
    permissions,
  };
}