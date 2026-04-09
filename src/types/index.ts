export type TenantStatus = "active" | "trial" | "suspended" | "cancelled";
export type PlanTier = "starter" | "growth" | "enterprise";
export type SubscriptionStatus = "active" | "trial" | "past_due" | "cancelled";
export type InvoiceStatus = "paid" | "pending" | "failed";
export type PaymentMethod = "card" | "bank";
export type AdminRole = "super_admin" | "admin" | "support";
export type TenantRole = "admin" | "manager" | "operator" | "viewer";
export type OrderStatus = "draft" | "confirmed" | "processing" | "completed" | "cancelled";
export type ShipmentStatus = "pending" | "in_transit" | "delivered" | "returned";
export type StockMovementType = "inbound" | "outbound" | "transfer" | "adjustment";

export interface Tenant {
  id: string;
  name: string;
  slug: string;
  companyEmail: string;
  planId: string;
  status: TenantStatus;
  createdAt: string;
  trialEndsAt: string | null;
  subscriptionId: string;
  featureFlags: string[];
}

export interface Plan {
  id: string;
  name: string;
  tier: PlanTier;
  price: number;
  billingCycle: "monthly" | "yearly";
  features: string[];
}

export interface Subscription {
  id: string;
  tenantId: string;
  planId: string;
  status: SubscriptionStatus;
  currentPeriodStart: string;
  currentPeriodEnd: string;
}

export interface Invoice {
  id: string;
  invoiceNumber: string;
  tenantId: string;
  subscriptionId: string;
  amount: number;
  status: InvoiceStatus;
  issuedAt: string;
  dueDate: string;
  paidAt: string | null;
}

export interface Payment {
  id: string;
  invoiceId: string;
  amount: number;
  method: PaymentMethod;
  status: InvoiceStatus;
  paidAt: string;
}

export interface DemoRequest {
  id: string;
  name: string;
  email: string;
  company: string;
  message: string;
  contacted: boolean;
  createdAt: string;
}

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: AdminRole;
  status: "active" | "inactive";
  createdAt: string;
}

export interface InventoryItem {
  id: string;
  sku: string;
  name: string;
  description: string;
  category: string;
  stockLevel: number;
  minStockLevel: number;
  unit: string;
  batchNumber: string | null;
  expiryDate: string | null;
  warehouseId: string;
  location: string;
  createdAt: string;
}

export interface Warehouse {
  id: string;
  name: string;
  code: string;
  address: string;
  capacity: number;
  currentUtilization: number;
  status: "active" | "inactive";
  totalRacks: number;
  totalBins: number;
}

export interface Order {
  id: string;
  orderNumber: string;
  type: "purchase" | "sale";
  customerId?: string;
  supplierId?: string;
  status: OrderStatus;
  totalAmount: number;
  items: OrderItem[];
  createdAt: string;
  confirmedAt: string | null;
  completedAt: string | null;
}

export interface OrderItem {
  id: string;
  productId: string;
  productName: string;
  quantity: number;
  unitPrice: number;
}

export interface StockMovement {
  id: string;
  type: StockMovementType;
  productId: string;
  productName: string;
  quantity: number;
  fromLocation: string | null;
  toLocation: string | null;
  reference: string;
  createdAt: string;
  createdBy: string;
}

export interface Shipment {
  id: string;
  shipmentNumber: string;
  orderId: string;
  customerId: string;
  status: ShipmentStatus;
  trackingNumber: string;
  carrier: string;
  shippedAt: string | null;
  deliveredAt: string | null;
  items: OrderItem[];
}

export interface Supplier {
  id: string;
  name: string;
  code: string;
  email: string;
  phone: string;
  address: string;
  contactPerson: string;
  rating: number;
  totalOrders: number;
  status: "active" | "inactive";
}

export interface Customer {
  id: string;
  name: string;
  code: string;
  email: string;
  phone: string;
  address: string;
  contactPerson: string;
  creditLimit: number;
  currentBalance: number;
  totalOrders: number;
  status: "active" | "inactive";
}

export interface Employee {
  id: string;
  name: string;
  email: string;
  role: TenantRole;
  department: string;
  status: "active" | "inactive";
  permissions: string[];
  createdAt: string;
}