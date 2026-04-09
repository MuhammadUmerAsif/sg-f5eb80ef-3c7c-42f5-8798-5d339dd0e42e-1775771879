"use client";

import { useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/DataTable";
import { Building2, Mail, Phone, PlusCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface Supplier {
  id: string;
  name: string;
  contactPerson: string;
  email: string;
  phone: string;
  status: "active" | "inactive";
  category: string;
  rating: number;
}

export default function SuppliersPage() {
  const [suppliers] = useState<Supplier[]>([
    {
      id: "sup_1",
      name: "Dell Technologies",
      contactPerson: "Michael Chang",
      email: "orders@dell.com",
      phone: "+1 (555) 123-4567",
      status: "active",
      category: "Electronics",
      rating: 4.8,
    },
    {
      id: "sup_2",
      name: "Logitech Global",
      contactPerson: "Sarah Jenkins",
      email: "b2b@logitech.com",
      phone: "+1 (555) 987-6543",
      status: "active",
      category: "Peripherals",
      rating: 4.5,
    },
  ]);

  const columns: ColumnDef<Supplier>[] = [
    {
      accessorKey: "name",
      header: "Supplier Name",
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <Building2 className="h-4 w-4 text-muted-foreground" />
          <span className="font-medium">{row.original.name}</span>
        </div>
      ),
    },
    {
      accessorKey: "contactPerson",
      header: "Contact",
      cell: ({ row }) => (
        <div className="text-sm">
          <div>{row.original.contactPerson}</div>
          <div className="text-muted-foreground flex items-center gap-1 mt-1">
            <Mail className="h-3 w-3" /> {row.original.email}
          </div>
          <div className="text-muted-foreground flex items-center gap-1">
            <Phone className="h-3 w-3" /> {row.original.phone}
          </div>
        </div>
      ),
    },
    {
      accessorKey: "category",
      header: "Category",
      cell: ({ row }) => <Badge variant="outline">{row.original.category}</Badge>,
    },
    {
      accessorKey: "rating",
      header: "Rating",
      cell: ({ row }) => (
        <div className="flex items-center gap-1">
          <span className="font-medium">{row.original.rating}</span>
          <span className="text-muted-foreground text-sm">/ 5.0</span>
        </div>
      ),
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
          <h1 className="text-3xl font-bold">Suppliers</h1>
          <p className="text-muted-foreground">Manage your vendor network and contacts</p>
        </div>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Supplier
        </Button>
      </div>

      <DataTable
        columns={columns}
        data={suppliers}
        searchKey="name"
        searchPlaceholder="Search suppliers..."
      />
    </div>
  );
}