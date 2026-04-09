"use client";

import { useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/DataTable";
import { EmptyState } from "@/components/EmptyState";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
import { PlusCircle, Edit, Trash, Package, ShoppingCart } from "lucide-react";
import { useToast } from "@/hooks/useToast";

type OrderType = "purchase" | "sales";
type OrderStatus = "pending" | "confirmed" | "processing" | "shipped" | "delivered" | "cancelled";

interface Order {
  id: string;
  orderNumber: string;
  type: OrderType;
  status: OrderStatus;
  supplier?: string;
  customer?: string;
  items: number;
  totalAmount: number;
  orderDate: string;
  expectedDate: string;
}

export default function OrdersPage() {
  const [activeTab, setActiveTab] = useState<OrderType>("purchase");
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const [orders] = useState<Order[]>([
    {
      id: "po_1",
      orderNumber: "PO-2026-001",
      type: "purchase",
      status: "confirmed",
      supplier: "Dell Technologies",
      items: 50,
      totalAmount: 45000,
      orderDate: "2026-04-01",
      expectedDate: "2026-04-15",
    },
    {
      id: "so_1",
      orderNumber: "SO-2026-001",
      type: "sales",
      status: "shipped",
      customer: "Tech Solutions Inc",
      items: 25,
      totalAmount: 28000,
      orderDate: "2026-04-05",
      expectedDate: "2026-04-10",
    },
  ]);

  const [formData, setFormData] = useState({
    type: "purchase" as OrderType,
    supplier: "",
    customer: "",
    expectedDate: "",
  });

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 800));

      setIsCreateOpen(false);
      setFormData({
        type: "purchase",
        supplier: "",
        customer: "",
        expectedDate: "",
      });

      toast({
        title: "Order created",
        description: "New order has been created successfully",
      });
    } catch (error) {
      toast({
        title: "Failed to create order",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusBadge = (status: OrderStatus) => {
    const variants: Record<OrderStatus, "default" | "secondary" | "destructive" | "outline"> = {
      pending: "outline",
      confirmed: "secondary",
      processing: "default",
      shipped: "default",
      delivered: "secondary",
      cancelled: "destructive",
    };
    return <Badge variant={variants[status]}>{status}</Badge>;
  };

  const columns: ColumnDef<Order>[] = [
    {
      accessorKey: "orderNumber",
      header: "Order #",
    },
    {
      accessorKey: "supplier",
      header: activeTab === "purchase" ? "Supplier" : "Customer",
      cell: ({ row }) => row.original.supplier || row.original.customer,
    },
    {
      accessorKey: "items",
      header: "Items",
      cell: ({ row }) => `${row.original.items} items`,
    },
    {
      accessorKey: "totalAmount",
      header: "Total Amount",
      cell: ({ row }) => `$${row.original.totalAmount.toLocaleString()}`,
    },
    {
      accessorKey: "orderDate",
      header: "Order Date",
    },
    {
      accessorKey: "expectedDate",
      header: "Expected Date",
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => getStatusBadge(row.original.status),
    },
    {
      id: "actions",
      cell: ({ row }) => (
        <div className="flex gap-2">
          <Button variant="ghost" size="sm">
            <Edit className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm">
            <Trash className="h-4 w-4" />
          </Button>
        </div>
      ),
    },
  ];

  const filteredOrders = orders.filter(order => order.type === activeTab);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Orders</h1>
          <p className="text-muted-foreground">Manage purchase and sales orders</p>
        </div>

        <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
          <DialogTrigger asChild>
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" />
              Create Order
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Create New Order</DialogTitle>
              <DialogDescription>
                Create a new purchase or sales order
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleCreate} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="type">Order Type *</Label>
                <Select value={formData.type} onValueChange={(value: OrderType) => setFormData({ ...formData, type: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="purchase">Purchase Order</SelectItem>
                    <SelectItem value="sales">Sales Order</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {formData.type === "purchase" ? (
                <div className="space-y-2">
                  <Label htmlFor="supplier">Supplier *</Label>
                  <Input
                    id="supplier"
                    required
                    value={formData.supplier}
                    onChange={(e) => setFormData({ ...formData, supplier: e.target.value })}
                    placeholder="Select or add supplier"
                  />
                </div>
              ) : (
                <div className="space-y-2">
                  <Label htmlFor="customer">Customer *</Label>
                  <Input
                    id="customer"
                    required
                    value={formData.customer}
                    onChange={(e) => setFormData({ ...formData, customer: e.target.value })}
                    placeholder="Select or add customer"
                  />
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="expectedDate">Expected Delivery Date *</Label>
                <Input
                  id="expectedDate"
                  type="date"
                  required
                  value={formData.expectedDate}
                  onChange={(e) => setFormData({ ...formData, expectedDate: e.target.value })}
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
                  {isLoading ? "Creating..." : "Create Order"}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as OrderType)}>
        <TabsList>
          <TabsTrigger value="purchase" className="gap-2">
            <Package className="h-4 w-4" />
            Purchase Orders
          </TabsTrigger>
          <TabsTrigger value="sales" className="gap-2">
            <ShoppingCart className="h-4 w-4" />
            Sales Orders
          </TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="mt-6">
          {filteredOrders.length === 0 ? (
            <EmptyState
              title={`No ${activeTab} orders`}
              description="Create your first order to get started"
              action={{
                label: "Create Order",
                onClick: () => setIsCreateOpen(true),
              }}
            />
          ) : (
            <DataTable
              columns={columns}
              data={filteredOrders}
              searchKey="orderNumber"
              searchPlaceholder="Search orders..."
            />
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}