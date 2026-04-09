"use client";

import { useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/DataTable";
import { Badge } from "@/components/ui/badge";
import { Truck, MapPin, Search } from "lucide-react";
import { EmptyState } from "@/components/EmptyState";
import { StatusBadge } from "@/components/ui/status-badge";

interface Shipment {
  id: string;
  trackingNumber: string;
  orderNumber: string;
  carrier: string;
  status: "pending" | "in_transit" | "delivered" | "returned";
  origin: string;
  destination: string;
  estimatedDelivery: string;
  actualDelivery?: string;
}

export default function ShipmentsPage() {
  const [shipments] = useState<Shipment[]>([
    {
      id: "shp_1",
      trackingNumber: "TRK-987654321",
      orderNumber: "SO-2026-001",
      carrier: "FedEx",
      status: "in_transit",
      origin: "Main Warehouse - NY",
      destination: "Tech Solutions Inc - CA",
      estimatedDelivery: "2026-04-12",
    },
    {
      id: "shp_2",
      trackingNumber: "TRK-123456789",
      orderNumber: "SO-2026-002",
      carrier: "UPS",
      status: "delivered",
      origin: "Regional Warehouse - TX",
      destination: "Global Retail - NV",
      estimatedDelivery: "2026-04-05",
      actualDelivery: "2026-04-04",
    },
  ]);

  const columns: ColumnDef<Shipment>[] = [
    {
      accessorKey: "trackingNumber",
      header: "Tracking Number",
      cell: ({ row }) => (
        <div className="font-medium text-primary hover:underline cursor-pointer">
          {row.original.trackingNumber}
        </div>
      ),
    },
    {
      accessorKey: "orderNumber",
      header: "Order #",
    },
    {
      accessorKey: "carrier",
      header: "Carrier",
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <Truck className="h-4 w-4 text-muted-foreground" />
          {row.original.carrier}
        </div>
      ),
    },
    {
      accessorKey: "destination",
      header: "Route",
      cell: ({ row }) => (
        <div className="text-sm">
          <div className="text-muted-foreground">From: {row.original.origin}</div>
          <div>To: {row.original.destination}</div>
        </div>
      ),
    },
    {
      accessorKey: "estimatedDelivery",
      header: "Delivery Date",
      cell: ({ row }) => (
        <div className="text-sm">
          <div>Est: {row.original.estimatedDelivery}</div>
          {row.original.actualDelivery && (
            <div className="text-muted-foreground">Actual: {row.original.actualDelivery}</div>
          )}
        </div>
      ),
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => <StatusBadge status={row.original.status} type="shipment" />,
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Shipments</h1>
          <p className="text-muted-foreground">Track outbound deliveries and shipping status</p>
        </div>
        <Button>
          <Search className="mr-2 h-4 w-4" />
          Track Shipment
        </Button>
      </div>

      {shipments.length === 0 ? (
        <EmptyState
          title="No shipments found"
          description="Your dispatched orders will appear here"
        />
      ) : (
        <DataTable
          columns={columns}
          data={shipments}
          searchKey="trackingNumber"
          searchPlaceholder="Search tracking numbers..."
        />
      )}
    </div>
  );
}