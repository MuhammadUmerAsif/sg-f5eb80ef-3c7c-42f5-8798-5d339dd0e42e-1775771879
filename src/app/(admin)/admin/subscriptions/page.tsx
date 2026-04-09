"use client";

import { useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/DataTable";
import { StatusBadge } from "@/components/ui/status-badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { getMockData, updateMockData, mockPlans } from "@/lib/mock-data";
import { mockApiCall } from "@/lib/mock-api";
import { useToast } from "@/hooks/useToast";
import type { Subscription, Tenant } from "@/types";

export default function SubscriptionsPage() {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>(
    getMockData().subscriptions
  );
  const [tenants] = useState<Tenant[]>(getMockData().tenants);
  const [selectedSub, setSelectedSub] = useState<Subscription | null>(null);
  const [isUpgradeOpen, setIsUpgradeOpen] = useState(false);
  const [newPlanId, setNewPlanId] = useState("");
  const { toast } = useToast();

  const handleUpgrade = async () => {
    if (!selectedSub || !newPlanId) return;

    try {
      await mockApiCall({ subscriptionId: selectedSub.id, planId: newPlanId });
      const updated = subscriptions.map((s) =>
        s.id === selectedSub.id ? { ...s, planId: newPlanId } : s
      );
      setSubscriptions(updated);
      updateMockData("subscriptions", updated);

      const plan = mockPlans.find((p) => p.id === newPlanId);
      toast({
        title: "Plan updated",
        description: `Subscription upgraded to ${plan?.name}`,
      });

      setIsUpgradeOpen(false);
      setSelectedSub(null);
    } catch (error) {
      toast({
        title: "Failed to update plan",
        variant: "destructive",
      });
    }
  };

  const handleCancel = async (subscription: Subscription) => {
    if (!confirm("Cancel this subscription? This will take effect at the end of the billing period.")) return;

    try {
      await mockApiCall({ id: subscription.id });
      const updated = subscriptions.map((s) =>
        s.id === subscription.id ? { ...s, status: "cancelled" as const } : s
      );
      setSubscriptions(updated);
      updateMockData("subscriptions", updated);

      toast({
        title: "Subscription cancelled",
        description: "Cancellation will take effect at period end",
      });
    } catch (error) {
      toast({
        title: "Failed to cancel subscription",
        variant: "destructive",
      });
    }
  };

  const columns: ColumnDef<Subscription>[] = [
    {
      accessorKey: "tenantId",
      header: "Tenant",
      cell: ({ row }) => {
        const tenant = tenants.find((t) => t.id === row.original.tenantId);
        return tenant?.name || "Unknown";
      },
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
        <StatusBadge status={row.original.status} type="subscription" />
      ),
    },
    {
      accessorKey: "currentPeriodStart",
      header: "Period Start",
      cell: ({ row }) =>
        new Date(row.original.currentPeriodStart).toLocaleDateString(),
    },
    {
      accessorKey: "currentPeriodEnd",
      header: "Period End",
      cell: ({ row }) =>
        new Date(row.original.currentPeriodEnd).toLocaleDateString(),
    },
    {
      id: "actions",
      cell: ({ row }) => (
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setSelectedSub(row.original);
              setNewPlanId(row.original.planId);
              setIsUpgradeOpen(true);
            }}
          >
            Change Plan
          </Button>
          {row.original.status !== "cancelled" && (
            <Button
              variant="destructive"
              size="sm"
              onClick={() => handleCancel(row.original)}
            >
              Cancel
            </Button>
          )}
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Subscriptions</h1>
        <p className="text-muted-foreground">
          Manage customer subscription plans and billing cycles
        </p>
      </div>

      <DataTable
        columns={columns}
        data={subscriptions}
        searchKey="tenantId"
        searchPlaceholder="Search by tenant..."
      />

      <Dialog open={isUpgradeOpen} onOpenChange={setIsUpgradeOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Change Subscription Plan</DialogTitle>
            <DialogDescription>
              Update the plan for this subscription
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Current Plan</Label>
              <div className="text-sm text-muted-foreground">
                {mockPlans.find((p) => p.id === selectedSub?.planId)?.name}
              </div>
            </div>
            <div className="space-y-2">
              <Label>New Plan</Label>
              <Select value={newPlanId} onValueChange={setNewPlanId}>
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
            <div className="flex gap-3 pt-4">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => setIsUpgradeOpen(false)}
              >
                Cancel
              </Button>
              <Button className="flex-1" onClick={handleUpgrade}>
                Update Plan
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}