"use client";

import { useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/DataTable";
import { EmptyState } from "@/components/EmptyState";
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
import { PlusCircle, Edit, Trash, AlertTriangle } from "lucide-react";
import { getMockData, updateMockData } from "@/lib/mock-data";
import { mockApiCall } from "@/lib/mock-api";
import { useToast } from "@/hooks/useToast";
import type { InventoryItem } from "@/types";

export default function InventoryPage() {
  const [inventory, setInventory] = useState<InventoryItem[]>(getMockData().inventory);
  const [warehouses] = useState(getMockData().warehouses);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    sku: "",
    name: "",
    description: "",
    category: "",
    stockLevel: 0,
    minStockLevel: 0,
    unit: "pcs",
    warehouseId: "wh_1",
    location: "",
  });

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const newItem: InventoryItem = {
        id: `inv_${Date.now()}`,
        ...formData,
        batchNumber: null,
        expiryDate: null,
        createdAt: new Date().toISOString(),
      };

      await mockApiCall(newItem);
      const updated = [...inventory, newItem];
      setInventory(updated);
      updateMockData("inventory", updated);

      setIsCreateOpen(false);
      setFormData({
        sku: "",
        name: "",
        description: "",
        category: "",
        stockLevel: 0,
        minStockLevel: 0,
        unit: "pcs",
        warehouseId: "wh_1",
        location: "",
      });

      toast({
        title: "Product added",
        description: `${newItem.name} has been added to inventory`,
      });
    } catch (error) {
      toast({
        title: "Failed to add product",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (item: InventoryItem) => {
    if (!confirm(`Delete ${item.name}?`)) return;

    try {
      await mockApiCall({ id: item.id });
      const updated = inventory.filter((i) => i.id !== item.id);
      setInventory(updated);
      updateMockData("inventory", updated);

      toast({
        title: "Product deleted",
      });
    } catch (error) {
      toast({
        title: "Failed to delete product",
        variant: "destructive",
      });
    }
  };

  const columns: ColumnDef<InventoryItem>[] = [
    {
      accessorKey: "sku",
      header: "SKU",
    },
    {
      accessorKey: "name",
      header: "Product Name",
    },
    {
      accessorKey: "category",
      header: "Category",
      cell: ({ row }) => (
        <Badge variant="outline">{row.original.category}</Badge>
      ),
    },
    {
      accessorKey: "stockLevel",
      header: "Stock",
      cell: ({ row }) => {
        const isLow = row.original.stockLevel <= row.original.minStockLevel;
        return (
          <div className="flex items-center gap-2">
            {isLow && <AlertTriangle className="h-4 w-4 text-destructive" />}
            <span className={isLow ? "text-destructive font-medium" : ""}>
              {row.original.stockLevel} {row.original.unit}
            </span>
          </div>
        );
      },
    },
    {
      accessorKey: "location",
      header: "Location",
    },
    {
      accessorKey: "warehouseId",
      header: "Warehouse",
      cell: ({ row }) => {
        const warehouse = warehouses.find(w => w.id === row.original.warehouseId);
        return warehouse?.name || "Unknown";
      },
    },
    {
      id: "actions",
      cell: ({ row }) => (
        <div className="flex gap-2">
          <Button variant="ghost" size="sm">
            <Edit className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleDelete(row.original)}
          >
            <Trash className="h-4 w-4" />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Inventory</h1>
          <p className="text-muted-foreground">Manage your product catalog and stock levels</p>
        </div>

        <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
          <DialogTrigger asChild>
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Product
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Add New Product</DialogTitle>
              <DialogDescription>
                Add a new item to your inventory
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleCreate} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="sku">SKU *</Label>
                  <Input
                    id="sku"
                    required
                    value={formData.sku}
                    onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
                    placeholder="LAPTOP-001"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category">Category *</Label>
                  <Input
                    id="category"
                    required
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    placeholder="Electronics"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="name">Product Name *</Label>
                <Input
                  id="name"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Dell XPS 13 Laptop"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Input
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="13-inch ultrabook with 16GB RAM"
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="stockLevel">Stock Level *</Label>
                  <Input
                    id="stockLevel"
                    type="number"
                    required
                    value={formData.stockLevel}
                    onChange={(e) => setFormData({ ...formData, stockLevel: parseInt(e.target.value) || 0 })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="minStockLevel">Min Stock *</Label>
                  <Input
                    id="minStockLevel"
                    type="number"
                    required
                    value={formData.minStockLevel}
                    onChange={(e) => setFormData({ ...formData, minStockLevel: parseInt(e.target.value) || 0 })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="unit">Unit *</Label>
                  <Select value={formData.unit} onValueChange={(value) => setFormData({ ...formData, unit: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pcs">Pieces</SelectItem>
                      <SelectItem value="box">Boxes</SelectItem>
                      <SelectItem value="kg">Kilograms</SelectItem>
                      <SelectItem value="ltr">Liters</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="warehouse">Warehouse *</Label>
                  <Select value={formData.warehouseId} onValueChange={(value) => setFormData({ ...formData, warehouseId: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {warehouses.map((warehouse) => (
                        <SelectItem key={warehouse.id} value={warehouse.id}>
                          {warehouse.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location">Storage Location *</Label>
                  <Input
                    id="location"
                    required
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    placeholder="A-12-03"
                  />
                </div>
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
                  {isLoading ? "Adding..." : "Add Product"}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {inventory.length === 0 ? (
        <EmptyState
          title="No products in inventory"
          description="Start by adding your first product"
          action={{
            label: "Add Product",
            onClick: () => setIsCreateOpen(true),
          }}
        />
      ) : (
        <DataTable
          columns={columns}
          data={inventory}
          searchKey="name"
          searchPlaceholder="Search products..."
        />
      )}
    </div>
  );
}