"use client";

import { useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/DataTable";
import { StatusBadge } from "@/components/ui/status-badge";
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
import { Switch } from "@/components/ui/switch";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { PlusCircle, MoreHorizontal, Eye, Edit, Ban, Trash } from "lucide-react";
import { getMockData, updateMockData, mockPlans } from "@/lib/mock-data";
import { mockApiCall } from "@/lib/mock-api";
import { useToast } from "@/hooks/useToast";
import type { Tenant } from "@/types";

export default function TenantsPage() {
  const [tenants, setTenants] = useState<Tenant[]>(getMockData().tenants);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    companyEmail: "",
    planId: "plan_starter",
    enableTrial: false,
  });

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const newTenant: Tenant = {
        id: `tenant_${Date.now()}`,
        name: formData.name,
        slug: formData.slug,
        companyEmail: formData.companyEmail,
        planId: formData.planId,
        status: formData.enableTrial ? "trial" : "active",
        createdAt: new Date().toISOString(),
        trialEndsAt: formData.enableTrial
          ? new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
          : null,
        subscriptionId: `sub_${Date.now()}`,
        featureFlags: [],
      };

      await mockApiCall(newTenant);
      const updated = [...tenants, newTenant];
      setTenants(updated);
      updateMockData("tenants", updated);

      setIsCreateOpen(false);
      setFormData({
        name: "",
        slug: "",
        companyEmail: "",
        planId: "plan_starter",
        enableTrial: false,
      });

      toast({
        title: "Tenant created",
        description: `${newTenant.name} has been provisioned successfully.`,
      });
    } catch (error) {
      toast({
        title: "Failed to create tenant",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSuspend = async (tenant: Tenant) => {
    try {
      await mockApiCall({ ...tenant, status: "suspended" });
      const updated = tenants.map((t) =>
        t.id === tenant.id ? { ...t, status: "suspended" as const } : t
      );
      setTenants(updated);
      updateMockData("tenants", updated);

      toast({
        title: "Tenant suspended",
        description: `${tenant.name} has been suspended.`,
      });
    } catch (error) {
      toast({
        title: "Failed to suspend tenant",
        variant: "destructive",
      });
    }
  };

  const handleDelete = async (tenant: Tenant) => {
    if (!confirm(`Delete ${tenant.name}? This action cannot be undone.`)) return;

    try {
      await mockApiCall({ id: tenant.id });
      const updated = tenants.filter((t) => t.id !== tenant.id);
      setTenants(updated);
      updateMockData("tenants", updated);

      toast({
        title: "Tenant deleted",
        description: `${tenant.name} has been removed.`,
      });
    } catch (error) {
      toast({
        title: "Failed to delete tenant",
        variant: "destructive",
      });
    }
  };

  const columns: ColumnDef<Tenant>[] = [
    {
      accessorKey: "name",
      header: "Tenant",
      cell: ({ row }) => (
        <div>
          <div className="font-medium">{row.original.name}</div>
          <div className="text-sm text-muted-foreground">
            {row.original.slug}.waresync.com
          </div>
        </div>
      ),
    },
    {
      accessorKey: "companyEmail",
      header: "Email",
    },
    {
      accessorKey: "planId",
      header: "Plan",
      cell: ({ row }) => {
        const plan = mockPlans.find((p) => p.id === row.original.planId);
        return <Badge variant="outline">{plan?.name || "Unknown"}</Badge>;
      },
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => (
        <StatusBadge status={row.original.status} type="tenant" />
      ),
    },
    {
      accessorKey: "createdAt",
      header: "Created",
      cell: ({ row }) =>
        new Date(row.original.createdAt).toLocaleDateString(),
    },
    {
      id: "actions",
      cell: ({ row }) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Eye className="mr-2 h-4 w-4" />
              View Details
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Edit className="mr-2 h-4 w-4" />
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleSuspend(row.original)}>
              <Ban className="mr-2 h-4 w-4" />
              Suspend
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="text-destructive"
              onClick={() => handleDelete(row.original)}
            >
              <Trash className="mr-2 h-4 w-4" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Tenants</h1>
          <p className="text-muted-foreground">
            Manage customer accounts and provisioning
          </p>
        </div>

        <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
          <DialogTrigger asChild>
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" />
              Create Tenant
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Tenant</DialogTitle>
              <DialogDescription>
                Provision a new customer account with warehouse access
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleCreate} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Company Name *</Label>
                <Input
                  id="name"
                  required
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  placeholder="Acme Logistics"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="slug">Subdomain *</Label>
                <div className="flex items-center gap-2">
                  <Input
                    id="slug"
                    required
                    value={formData.slug}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        slug: e.target.value.toLowerCase().replace(/\s+/g, "-"),
                      })
                    }
                    placeholder="acme"
                  />
                  <span className="text-sm text-muted-foreground">
                    .waresync.com
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Contact Email *</Label>
                <Input
                  id="email"
                  type="email"
                  required
                  value={formData.companyEmail}
                  onChange={(e) =>
                    setFormData({ ...formData, companyEmail: e.target.value })
                  }
                  placeholder="admin@acme.com"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="plan">Plan *</Label>
                <Select
                  value={formData.planId}
                  onValueChange={(value) =>
                    setFormData({ ...formData, planId: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {mockPlans.map((plan) => (
                      <SelectItem key={plan.id} value={plan.id}>
                        {plan.name} - ${plan.price}/month
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center justify-between rounded-lg border p-3">
                <div>
                  <Label htmlFor="trial">Enable Trial Period</Label>
                  <p className="text-sm text-muted-foreground">
                    30-day free trial
                  </p>
                </div>
                <Switch
                  id="trial"
                  checked={formData.enableTrial}
                  onCheckedChange={(checked) =>
                    setFormData({ ...formData, enableTrial: checked })
                  }
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
                  {isLoading ? "Creating..." : "Create Tenant"}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {tenants.length === 0 ? (
        <EmptyState
          title="No tenants yet"
          description="Create your first tenant to get started with the platform"
          action={{
            label: "Create Tenant",
            onClick: () => setIsCreateOpen(true),
          }}
        />
      ) : (
        <DataTable
          columns={columns}
          data={tenants}
          searchKey="name"
          searchPlaceholder="Search tenants..."
        />
      )}
    </div>
  );
}