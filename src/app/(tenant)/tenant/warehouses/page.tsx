"use client";

import { useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/DataTable";
import { EmptyState } from "@/components/EmptyState";
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
import { StatusBadge } from "@/components/ui/status-badge";
import { PlusCircle, Edit, Trash, MapPin } from "lucide-react";
import { getMockData, updateMockData } from "@/lib/mock-data";
import { mockApiCall } from "@/lib/mock-api";
import { useToast } from "@/hooks/useToast";
import type { Warehouse } from "@/types";

export default function WarehousesPage() {
  const [warehouses, setWarehouses] = useState<Warehouse[]>(getMockData().warehouses);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    name: "",
    code: "",
    address: "",
    city: "",
    country: "",
    totalRacks: 0,
    totalBins: 0,
  });

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const newWarehouse: Warehouse = {
        id: `wh_${Date.now()}`,
        ...formData,
        status: "active",
      };

      await mockApiCall(newWarehouse);
      const updated = [...warehouses, newWarehouse];
      setWarehouses(updated);
      updateMockData("warehouses", updated);

      setIsCreateOpen(false);
      setFormData({
        name: "",
        code: "",
        address: "",
        city: "",
        country: "",
        totalRacks: 0,
        totalBins: 0,
      });

      toast({
        title: "Warehouse added",
        description: `${newWarehouse.name} has been created`,
      });
    } catch (error) {
      toast({
        title: "Failed to add warehouse",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (warehouse: Warehouse) => {
    if (!confirm(`Delete ${warehouse.name}?`)) return;

    try {
      await mockApiCall({ id: warehouse.id });
      const updated = warehouses.filter((w) => w.id !== warehouse.id);
      setWarehouses(updated);
      updateMockData("warehouses", updated);

      toast({
        title: "Warehouse deleted",
      });
    } catch (error) {
      toast({
        title: "Failed to delete warehouse",
        variant: "destructive",
      });
    }
  };

  const columns: ColumnDef<Warehouse>[] = [
    {
      accessorKey: "name",
      header: "Warehouse Name",
    },
    {
      accessorKey: "code",
      header: "Code",
    },
    {
      accessorKey: "city",
      header: "Location",
      cell: ({ row }) => `${row.original.city}, ${row.original.country}`,
    },
    {
      accessorKey: "totalRacks",
      header: "Capacity",
      cell: ({ row }) => `${row.original.totalRacks} racks / ${row.original.totalBins} bins`,
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => <StatusBadge status={row.original.status} type="warehouse" />,
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
          <h1 className="text-3xl font-bold">Warehouses</h1>
          <p className="text-muted-foreground">Manage your warehouse locations and capacity</p>
        </div>

        <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
          <DialogTrigger asChild>
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Warehouse
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Add New Warehouse</DialogTitle>
              <DialogDescription>
                Create a new warehouse location
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleCreate} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Warehouse Name *</Label>
                  <Input
                    id="name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Main Distribution Center"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="code">Warehouse Code *</Label>
                  <Input
                    id="code"
                    required
                    value={formData.code}
                    onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                    placeholder="WH-NYC-01"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Address *</Label>
                <Input
                  id="address"
                  required
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  placeholder="123 Industrial Blvd"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="city">City *</Label>
                  <Input
                    id="city"
                    required
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    placeholder="New York"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="country">Country *</Label>
                  <Input
                    id="country"
                    required
                    value={formData.country}
                    onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                    placeholder="United States"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="totalRacks">Total Racks *</Label>
                  <Input
                    id="totalRacks"
                    type="number"
                    required
                    value={formData.totalRacks}
                    onChange={(e) => setFormData({ ...formData, totalRacks: parseInt(e.target.value) || 0 })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="totalBins">Total Bins *</Label>
                  <Input
                    id="totalBins"
                    type="number"
                    required
                    value={formData.totalBins}
                    onChange={(e) => setFormData({ ...formData, totalBins: parseInt(e.target.value) || 0 })}
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
                  {isLoading ? "Creating..." : "Create Warehouse"}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {warehouses.length === 0 ? (
        <EmptyState
          title="No warehouses configured"
          description="Add your first warehouse location to get started"
          action={{
            label: "Add Warehouse",
            onClick: () => setIsCreateOpen(true),
          }}
        />
      ) : (
        <DataTable
          columns={columns}
          data={warehouses}
          searchKey="name"
          searchPlaceholder="Search warehouses..."
        />
      )}
    </div>
  );
}