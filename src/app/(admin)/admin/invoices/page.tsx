"use client";

import { useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/DataTable";
import { StatusBadge } from "@/components/ui/status-badge";
import { Download } from "lucide-react";
import { getMockData } from "@/lib/mock-data";
import { useToast } from "@/hooks/useToast";
import type { Invoice, Tenant } from "@/types";

export default function InvoicesPage() {
  const [invoices] = useState<Invoice[]>(getMockData().invoices);
  const [tenants] = useState<Tenant[]>(getMockData().tenants);
  const { toast } = useToast();

  const handleDownload = (invoice: Invoice) => {
    toast({
      title: "Download started",
      description: `Downloading invoice ${invoice.invoiceNumber}`,
    });
  };

  const columns: ColumnDef<Invoice>[] = [
    {
      accessorKey: "invoiceNumber",
      header: "Invoice #",
    },
    {
      accessorKey: "tenantId",
      header: "Tenant",
      cell: ({ row }) => {
        const tenant = tenants.find((t) => t.id === row.original.tenantId);
        return tenant?.name || "Unknown";
      },
    },
    {
      accessorKey: "amount",
      header: "Amount",
      cell: ({ row }) => `$${row.original.amount.toFixed(2)}`,
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => (
        <StatusBadge status={row.original.status} type="invoice" />
      ),
    },
    {
      accessorKey: "issuedAt",
      header: "Issued",
      cell: ({ row }) => new Date(row.original.issuedAt).toLocaleDateString(),
    },
    {
      accessorKey: "dueDate",
      header: "Due Date",
      cell: ({ row }) => new Date(row.original.dueDate).toLocaleDateString(),
    },
    {
      id: "actions",
      cell: ({ row }) => (
        <Button
          variant="outline"
          size="sm"
          onClick={() => handleDownload(row.original)}
        >
          <Download className="mr-2 h-4 w-4" />
          PDF
        </Button>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Invoices</h1>
        <p className="text-muted-foreground">
          View and manage all customer invoices
        </p>
      </div>

      <DataTable
        columns={columns}
        data={invoices}
        searchKey="invoiceNumber"
        searchPlaceholder="Search invoices..."
      />
    </div>
  );
}