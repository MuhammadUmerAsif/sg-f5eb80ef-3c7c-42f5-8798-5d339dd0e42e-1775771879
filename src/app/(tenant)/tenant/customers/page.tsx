"use client";

import { useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/DataTable";
import { Users, Mail, Phone, PlusCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface Customer {
  id: string;
  name: string;
  type: "B2B" | "B2C";
  email: string;
  phone: string;
  status: "active" | "inactive";
  totalOrders: number;
  lifetimeValue: number;
}

export default function CustomersPage() {
  const [customers] = useState<Customer[]>([
    {
      id: "cus_1",
      name: "Tech Solutions Inc",
      type: "B2B",
      email: "procurement@techsolutions.com",
      phone: "+1 (555) 234-5678",
      status: "active",
      totalOrders: 15,
      lifetimeValue: 125000,
    },
    {
      id: "cus_2",
      name: "Global Retail",
      type: "B2B",
      email: "purchasing@globalretail.com",
      phone: "+1 (555) 876-5432",
      status: "active",
      totalOrders: 42,
      lifetimeValue: 450000,
    },
  ]);

  const columns: ColumnDef<Customer>[] = [
    {
      accessorKey: "name",
      header: "Customer Name",
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <Users className="h-4 w-4 text-muted-foreground" />
          <span className="font-medium">{row.original.name}</span>
        </div>
      ),
    },
    {
      accessorKey: "type",
      header: "Type",
      cell: ({ row }) => <Badge variant="outline">{row.original.type}</Badge>,
    },
    {
      accessorKey: "contact",
      header: "Contact",
      cell: ({ row }) => (
        <div className="text-sm">
          <div className="text-muted-foreground flex items-center gap-1">
            <Mail className="h-3 w-3" /> {row.original.email}
          </div>
          <div className="text-muted-foreground flex items-center gap-1 mt-1">
            <Phone className="h-3 w-3" /> {row.original.phone}
          </div>
        </div>
      ),
    },
    {
      accessorKey: "totalOrders",
      header: "Total Orders",
      cell: ({ row }) => `${row.original.totalOrders} orders`,
    },
    {
      accessorKey: "lifetimeValue",
      header: "LTV",
      cell: ({ row }) => `$${row.original.lifetimeValue.toLocaleString()}`,
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => (
        <Badge variant={row.original.status === "active" ? "default" : "secondary"}>
          {row.original.status}
        </Badge>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Customers</h1>
          <p className="text-muted-foreground">Manage your client base and sales history</p>
        </div>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Customer
        </Button>
      </div>

      <DataTable
        columns={columns}
        data={customers}
        searchKey="name"
        searchPlaceholder="Search customers..."
      />
    </div>
  );
}