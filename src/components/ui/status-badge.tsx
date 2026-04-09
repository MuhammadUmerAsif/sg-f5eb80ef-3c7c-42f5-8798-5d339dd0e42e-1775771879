import { Badge } from "@/components/ui/badge";
import type { TenantStatus, SubscriptionStatus, InvoiceStatus, OrderStatus, ShipmentStatus } from "@/types";

interface StatusBadgeProps {
  status: TenantStatus | SubscriptionStatus | InvoiceStatus | OrderStatus | ShipmentStatus | string;
  type?: "tenant" | "subscription" | "invoice" | "order" | "shipment";
}

const statusConfig = {
  tenant: {
    active: { label: "Active", variant: "default" as const },
    trial: { label: "Trial", variant: "secondary" as const },
    suspended: { label: "Suspended", variant: "destructive" as const },
    cancelled: { label: "Cancelled", variant: "outline" as const }
  },
  subscription: {
    active: { label: "Active", variant: "default" as const },
    trial: { label: "Trial", variant: "secondary" as const },
    past_due: { label: "Past Due", variant: "destructive" as const },
    cancelled: { label: "Cancelled", variant: "outline" as const }
  },
  invoice: {
    paid: { label: "Paid", variant: "default" as const },
    pending: { label: "Pending", variant: "secondary" as const },
    failed: { label: "Failed", variant: "destructive" as const }
  },
  order: {
    draft: { label: "Draft", variant: "outline" as const },
    confirmed: { label: "Confirmed", variant: "secondary" as const },
    processing: { label: "Processing", variant: "default" as const },
    completed: { label: "Completed", variant: "default" as const },
    cancelled: { label: "Cancelled", variant: "destructive" as const }
  },
  shipment: {
    pending: { label: "Pending", variant: "outline" as const },
    in_transit: { label: "In Transit", variant: "secondary" as const },
    delivered: { label: "Delivered", variant: "default" as const },
    returned: { label: "Returned", variant: "destructive" as const }
  }
};

export function StatusBadge({ status, type = "tenant" }: StatusBadgeProps) {
  const typeConfig = statusConfig[type] as Record<string, { label: string, variant: "default" | "secondary" | "destructive" | "outline" }>;
  const config = typeConfig?.[status] || {
    label: status,
    variant: "outline" as const
  };

  return (
    <Badge variant={config.variant} className="font-medium">
      {config.label}
    </Badge>
  );
}