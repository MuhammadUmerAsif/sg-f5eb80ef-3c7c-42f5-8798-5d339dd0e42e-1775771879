"use client";

import { ReactNode } from "react";

interface PermissionGuardProps {
  children: ReactNode;
  permission: string;
  fallback?: ReactNode;
  roles?: string[];
}

// Mock permission system - in production, this would come from auth context
const mockUserPermissions = [
  "tenants.view",
  "tenants.create",
  "tenants.edit",
  "tenants.delete",
  "subscriptions.manage",
  "invoices.view",
  "demo-requests.manage",
  "admins.manage",
  "inventory.manage",
  "warehouses.manage",
  "orders.manage",
  "shipments.manage",
  "employees.manage",
  "reports.view",
  "settings.edit",
  "*" // Super admin wildcard
];

const rolePermissions: Record<string, string[]> = {
  "Super Admin": ["*"],
  "Admin": [
    "tenants.view",
    "tenants.edit",
    "subscriptions.manage",
    "invoices.view",
    "demo-requests.manage",
    "admins.view"
  ],
  "Support": [
    "tenants.view",
    "demo-requests.manage",
    "invoices.view"
  ],
  "Manager": [
    "inventory.manage",
    "warehouses.manage",
    "orders.manage",
    "shipments.manage",
    "employees.view",
    "reports.view"
  ],
  "Picker": [
    "inventory.view",
    "orders.view",
    "shipments.view"
  ],
  "Viewer": [
    "inventory.view",
    "warehouses.view",
    "orders.view",
    "reports.view"
  ]
};

export function PermissionGuard({ children, permission, fallback = null, roles }: PermissionGuardProps) {
  const hasPermission = mockUserPermissions.includes("*") || mockUserPermissions.includes(permission);
  
  if (!hasPermission) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
}

export function usePermissions() {
  const permissions = mockUserPermissions;

  return {
    hasPermission: (permission: string) =>
      permissions.includes("*") || permissions.includes(permission),
    permissions,
    hasRole: (role: string) => {
      const userRoles = ["Super Admin"]; // Mock - would come from auth
      return userRoles.includes(role);
    },
    getRolePermissions: (role: string) => rolePermissions[role] || []
  };
}