"use client";

import { useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/DataTable";
import { UserCheck, Mail, Shield, PlusCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface Employee {
  id: string;
  name: string;
  email: string;
  role: "Admin" | "Manager" | "Picker" | "Viewer";
  department: string;
  status: "active" | "inactive";
  lastLogin: string;
}

export default function EmployeesPage() {
  const [employees] = useState<Employee[]>([
    {
      id: "emp_1",
      name: "John Doe",
      email: "john.doe@acme.com",
      role: "Admin",
      department: "Management",
      status: "active",
      lastLogin: "2026-04-09T08:30:00Z",
    },
    {
      id: "emp_2",
      name: "Jane Smith",
      email: "jane.smith@acme.com",
      role: "Manager",
      department: "Operations",
      status: "active",
      lastLogin: "2026-04-08T14:15:00Z",
    },
    {
      id: "emp_3",
      name: "Mike Johnson",
      email: "mike.j@acme.com",
      role: "Picker",
      department: "Warehouse A",
      status: "active",
      lastLogin: "2026-04-09T09:00:00Z",
    },
  ]);

  const columns: ColumnDef<Employee>[] = [
    {
      accessorKey: "name",
      header: "Employee Name",
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <UserCheck className="h-4 w-4 text-muted-foreground" />
          <span className="font-medium">{row.original.name}</span>
        </div>
      ),
    },
    {
      accessorKey: "email",
      header: "Email",
      cell: ({ row }) => (
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Mail className="h-3 w-3" />
          {row.original.email}
        </div>
      ),
    },
    {
      accessorKey: "role",
      header: "Role (RBAC)",
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <Shield className="h-3 w-3 text-primary" />
          <Badge variant={row.original.role === "Admin" ? "default" : "outline"}>
            {row.original.role}
          </Badge>
        </div>
      ),
    },
    {
      accessorKey: "department",
      header: "Department",
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => (
        <Badge variant={row.original.status === "active" ? "secondary" : "destructive"}>
          {row.original.status}
        </Badge>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Employees & Roles</h1>
          <p className="text-muted-foreground">Manage warehouse staff and RBAC permissions</p>
        </div>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Employee
        </Button>
      </div>

      <DataTable
        columns={columns}
        data={employees}
        searchKey="name"
        searchPlaceholder="Search employees..."
      />
    </div>
  );
}