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
import { Badge } from "@/components/ui/badge";
import { PlusCircle, Ban } from "lucide-react";
import { getMockData, updateMockData } from "@/lib/mock-data";
import { mockApiCall } from "@/lib/mock-api";
import { useToast } from "@/hooks/useToast";
import type { AdminUser } from "@/types";

export default function AdminsPage() {
  const [admins, setAdmins] = useState<AdminUser[]>(getMockData().adminUsers);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "admin" as AdminUser["role"],
  });

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const newAdmin: AdminUser = {
        id: `admin_${Date.now()}`,
        name: formData.name,
        email: formData.email,
        role: formData.role,
        status: "active",
        createdAt: new Date().toISOString(),
      };

      await mockApiCall(newAdmin);
      const updated = [...admins, newAdmin];
      setAdmins(updated);
      updateMockData("adminUsers", updated);

      setIsCreateOpen(false);
      setFormData({ name: "", email: "", role: "admin" });

      toast({
        title: "Admin user created",
        description: `${newAdmin.name} has been added`,
      });
    } catch (error) {
      toast({
        title: "Failed to create admin",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeactivate = async (admin: AdminUser) => {
    if (!confirm(`Deactivate ${admin.name}?`)) return;

    try {
      await mockApiCall({ id: admin.id });
      const updated = admins.map((a) =>
        a.id === admin.id ? { ...a, status: "inactive" as const } : a
      );
      setAdmins(updated);
      updateMockData("adminUsers", updated);

      toast({
        title: "Admin deactivated",
      });
    } catch (error) {
      toast({
        title: "Failed to deactivate admin",
        variant: "destructive",
      });
    }
  };

  const columns: ColumnDef<AdminUser>[] = [
    {
      accessorKey: "name",
      header: "Name",
    },
    {
      accessorKey: "email",
      header: "Email",
    },
    {
      accessorKey: "role",
      header: "Role",
      cell: ({ row }) => (
        <Badge variant="outline" className="capitalize">
          {row.original.role.replace("_", " ")}
        </Badge>
      ),
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => (
        <Badge
          variant={row.original.status === "active" ? "default" : "secondary"}
        >
          {row.original.status}
        </Badge>
      ),
    },
    {
      accessorKey: "createdAt",
      header: "Created",
      cell: ({ row }) => new Date(row.original.createdAt).toLocaleDateString(),
    },
    {
      id: "actions",
      cell: ({ row }) =>
        row.original.status === "active" && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleDeactivate(row.original)}
          >
            <Ban className="mr-2 h-4 w-4" />
            Deactivate
          </Button>
        ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Admin Users</h1>
          <p className="text-muted-foreground">
            Manage platform administrators and their roles
          </p>
        </div>

        <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
          <DialogTrigger asChild>
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Admin
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create Admin User</DialogTitle>
              <DialogDescription>
                Add a new administrator to the platform
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleCreate} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name *</Label>
                <Input
                  id="name"
                  required
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="role">Role *</Label>
                <Select
                  value={formData.role}
                  onValueChange={(value: AdminUser["role"]) =>
                    setFormData({ ...formData, role: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="super_admin">Super Admin</SelectItem>
                    <SelectItem value="admin">Admin</SelectItem>
                    <SelectItem value="support">Support</SelectItem>
                  </SelectContent>
                </Select>
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
                  {isLoading ? "Creating..." : "Create Admin"}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {admins.length === 0 ? (
        <EmptyState
          title="No admin users"
          description="Add your first administrator to get started"
          action={{
            label: "Add Admin",
            onClick: () => setIsCreateOpen(true),
          }}
        />
      ) : (
        <DataTable
          columns={columns}
          data={admins}
          searchKey="name"
          searchPlaceholder="Search admins..."
        />
      )}
    </div>
  );
}