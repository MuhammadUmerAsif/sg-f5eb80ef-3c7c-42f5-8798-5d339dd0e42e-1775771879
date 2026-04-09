"use client";

import { useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/DataTable";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PlusCircle, TrendingUp, TrendingDown, ArrowRightLeft } from "lucide-react";
import { useToast } from "@/hooks/useToast";
import { getMockData } from "@/lib/mock-data";

type MovementType = "inbound" | "outbound" | "transfer";

interface StockMovement {
  id: string;
  type: MovementType;
  productName: string;
  sku: string;
  quantity: number;
  from?: string;
  to: string;
  reason: string;
  performedBy: string;
  date: string;
}

export default function StockMovementPage() {
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { inventory, warehouses } = getMockData();

  const [movements] = useState<StockMovement[]>([
    {
      id: "mv_1",
      type: "inbound",
      productName: "Dell XPS 13 Laptop",
      sku: "LAPTOP-001",
      quantity: 50,
      to: "Main Warehouse - A-12-03",
      reason: "New stock arrival",
      performedBy: "John Doe",
      date: "2026-04-09 10:30",
    },
    {
      id: "mv_2",
      type: "outbound",
      productName: "Logitech MX Master 3",
      sku: "MOUSE-001",
      quantity: 25,
      to: "Customer Order SO-2026-001",
      reason: "Sales order fulfillment",
      performedBy: "Jane Smith",
      date: "2026-04-09 14:15",
    },
    {
      id: "mv_3",
      type: "transfer",
      productName: "Dell XPS 13 Laptop",
      sku: "LAPTOP-001",
      quantity: 20,
      from: "Main Warehouse - A-12-03",
      to: "Regional Warehouse - B-05-12",
      reason: "Stock redistribution",
      performedBy: "John Doe",
      date: "2026-04-08 16:45",
    },
  ]);

  const [formData, setFormData] = useState({
    type: "inbound" as MovementType,
    productId: "",
    quantity: 0,
    fromLocation: "",
    toLocation: "",
    reason: "",
  });

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 800));

      setIsCreateOpen(false);
      setFormData({
        type: "inbound",
        productId: "",
        quantity: 0,
        fromLocation: "",
        toLocation: "",
        reason: "",
      });

      toast({
        title: "Stock movement recorded",
        description: "The movement has been logged successfully",
      });
    } catch (error) {
      toast({
        title: "Failed to record movement",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getMovementIcon = (type: MovementType) => {
    if (type === "inbound") return <TrendingUp className="h-4 w-4 text-accent" />;
    if (type === "outbound") return <TrendingDown className="h-4 w-4 text-primary" />;
    return <ArrowRightLeft className="h-4 w-4 text-muted-foreground" />;
  };

  const getMovementBadge = (type: MovementType) => {
    const variants = {
      inbound: "default",
      outbound: "secondary",
      transfer: "outline",
    };
    return <Badge variant={variants[type] as any}>{type}</Badge>;
  };

  const columns: ColumnDef<StockMovement>[] = [
    {
      accessorKey: "date",
      header: "Date & Time",
    },
    {
      accessorKey: "type",
      header: "Type",
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          {getMovementIcon(row.original.type)}
          {getMovementBadge(row.original.type)}
        </div>
      ),
    },
    {
      accessorKey: "productName",
      header: "Product",
      cell: ({ row }) => (
        <div>
          <div className="font-medium">{row.original.productName}</div>
          <div className="text-sm text-muted-foreground">{row.original.sku}</div>
        </div>
      ),
    },
    {
      accessorKey: "quantity",
      header: "Quantity",
      cell: ({ row }) => `${row.original.quantity} units`,
    },
    {
      accessorKey: "from",
      header: "From/To",
      cell: ({ row }) => (
        <div className="text-sm">
          {row.original.from && <div className="text-muted-foreground">From: {row.original.from}</div>}
          <div>To: {row.original.to}</div>
        </div>
      ),
    },
    {
      accessorKey: "reason",
      header: "Reason",
    },
    {
      accessorKey: "performedBy",
      header: "Performed By",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Stock Movement</h1>
          <p className="text-muted-foreground">Track inventory movements across warehouses</p>
        </div>

        <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
          <DialogTrigger asChild>
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" />
              Record Movement
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Record Stock Movement</DialogTitle>
              <DialogDescription>
                Log a new stock movement transaction
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleCreate} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="type">Movement Type *</Label>
                <Select value={formData.type} onValueChange={(value: MovementType) => setFormData({ ...formData, type: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="inbound">Inbound (Receiving)</SelectItem>
                    <SelectItem value="outbound">Outbound (Dispatch)</SelectItem>
                    <SelectItem value="transfer">Transfer (Between Locations)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="product">Product *</Label>
                <Select value={formData.productId} onValueChange={(value) => setFormData({ ...formData, productId: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select product" />
                  </SelectTrigger>
                  <SelectContent>
                    {inventory.map((item) => (
                      <SelectItem key={item.id} value={item.id}>
                        {item.name} ({item.sku})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="quantity">Quantity *</Label>
                <Input
                  id="quantity"
                  type="number"
                  required
                  value={formData.quantity}
                  onChange={(e) => setFormData({ ...formData, quantity: parseInt(e.target.value) || 0 })}
                />
              </div>

              {formData.type === "transfer" && (
                <div className="space-y-2">
                  <Label htmlFor="fromLocation">From Location *</Label>
                  <Input
                    id="fromLocation"
                    required
                    value={formData.fromLocation}
                    onChange={(e) => setFormData({ ...formData, fromLocation: e.target.value })}
                    placeholder="A-12-03"
                  />
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="toLocation">To Location *</Label>
                <Input
                  id="toLocation"
                  required
                  value={formData.toLocation}
                  onChange={(e) => setFormData({ ...formData, toLocation: e.target.value })}
                  placeholder="B-05-12"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="reason">Reason *</Label>
                <Input
                  id="reason"
                  required
                  value={formData.reason}
                  onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                  placeholder="New stock arrival, Sales order, Redistribution, etc."
                />
              </div>

              <div className="flex gap-3 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  className="flex-1"
                  onClick={() => setIsCreateOpen(false)}
                  disabled={isLoading}
                >
                  Cancel
                </Button>
                <Button type="submit" className="flex-1" disabled={isLoading}>
                  {isLoading ? "Recording..." : "Record Movement"}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <DataTable
        columns={columns}
        data={movements}
        searchKey="productName"
        searchPlaceholder="Search movements..."
      />
    </div>
  );
}