import type {
  Tenant,
  Plan,
  Subscription,
  Invoice,
  Payment,
  DemoRequest,
  AdminUser,
  InventoryItem,
  Warehouse,
  Order,
  StockMovement,
  Shipment,
  Supplier,
  Customer,
  Employee
} from "@/types";

export const mockPlans: Plan[] = [
  {
    id: "plan_starter",
    name: "Starter",
    tier: "starter",
    price: 99,
    billingCycle: "monthly",
    features: [
      "Up to 1,000 SKUs",
      "1 warehouse location",
      "Basic reporting",
      "Email support",
      "5 team members"
    ]
  },
  {
    id: "plan_growth",
    name: "Growth",
    tier: "growth",
    price: 299,
    billingCycle: "monthly",
    features: [
      "Up to 10,000 SKUs",
      "5 warehouse locations",
      "Advanced reporting",
      "Priority support",
      "20 team members",
      "API access",
      "Custom integrations"
    ]
  },
  {
    id: "plan_enterprise",
    name: "Enterprise",
    tier: "enterprise",
    price: 999,
    billingCycle: "monthly",
    features: [
      "Unlimited SKUs",
      "Unlimited warehouses",
      "Real-time analytics",
      "24/7 dedicated support",
      "Unlimited team members",
      "Advanced API access",
      "Custom development",
      "SSO & SAML",
      "SLA guarantees"
    ]
  }
];

export const mockTenants: Tenant[] = [
  {
    id: "tenant_1",
    name: "Acme Logistics",
    slug: "acme",
    companyEmail: "admin@acme.com",
    planId: "plan_growth",
    status: "active",
    createdAt: "2026-01-15T10:00:00Z",
    trialEndsAt: null,
    subscriptionId: "sub_1",
    featureFlags: ["advanced_reports", "api_access"]
  },
  {
    id: "tenant_2",
    name: "TechWarehouse Co",
    slug: "techwarehouse",
    companyEmail: "contact@techwarehouse.com",
    planId: "plan_starter",
    status: "trial",
    createdAt: "2026-03-20T14:30:00Z",
    trialEndsAt: "2026-04-20T14:30:00Z",
    subscriptionId: "sub_2",
    featureFlags: []
  },
  {
    id: "tenant_3",
    name: "Global Supply Chain",
    slug: "globalsupply",
    companyEmail: "ops@globalsupply.com",
    planId: "plan_enterprise",
    status: "active",
    createdAt: "2025-11-05T09:15:00Z",
    trialEndsAt: null,
    subscriptionId: "sub_3",
    featureFlags: ["advanced_reports", "api_access", "sso", "custom_fields"]
  }
];

export const mockDemoRequests: DemoRequest[] = [
  {
    id: "demo_1",
    name: "John Smith",
    email: "john@startup.io",
    company: "Startup Inc",
    message: "Interested in WMS for our growing ecommerce business",
    contacted: false,
    createdAt: "2026-04-08T15:20:00Z"
  },
  {
    id: "demo_2",
    name: "Sarah Johnson",
    email: "sarah@logistics.com",
    company: "FastShip Logistics",
    message: "Need multi-warehouse support for 10 locations",
    contacted: true,
    createdAt: "2026-04-07T10:45:00Z"
  }
];

export const mockAdminUsers: AdminUser[] = [
  {
    id: "admin_1",
    name: "Admin User",
    email: "admin@waresync.com",
    role: "super_admin",
    status: "active",
    createdAt: "2025-01-01T00:00:00Z"
  },
  {
    id: "admin_2",
    name: "Support Team",
    email: "support@waresync.com",
    role: "support",
    status: "active",
    createdAt: "2025-06-15T00:00:00Z"
  }
];

export const mockInventory: InventoryItem[] = [
  {
    id: "inv_1",
    sku: "LAPTOP-001",
    name: "Dell XPS 13 Laptop",
    description: "13-inch ultrabook with 16GB RAM",
    category: "Electronics",
    stockLevel: 45,
    minStockLevel: 10,
    unit: "pcs",
    batchNumber: "BATCH-2026-01",
    expiryDate: null,
    warehouseId: "wh_1",
    location: "A-12-03",
    createdAt: "2026-01-10T00:00:00Z"
  },
  {
    id: "inv_2",
    sku: "MOUSE-001",
    name: "Logitech MX Master 3",
    description: "Wireless ergonomic mouse",
    category: "Accessories",
    stockLevel: 150,
    minStockLevel: 30,
    unit: "pcs",
    batchNumber: null,
    expiryDate: null,
    warehouseId: "wh_1",
    location: "B-05-12",
    createdAt: "2026-02-05T00:00:00Z"
  }
];

export const mockWarehouses: Warehouse[] = [
  {
    id: "wh_1",
    name: "Main Distribution Center",
    code: "MDC-01",
    address: "1234 Industrial Pkwy, San Francisco, CA 94107",
    capacity: 50000,
    currentUtilization: 32500,
    status: "active",
    totalRacks: 200,
    totalBins: 2400
  },
  {
    id: "wh_2",
    name: "East Coast Warehouse",
    code: "ECW-02",
    address: "5678 Commerce Dr, New York, NY 10013",
    capacity: 30000,
    currentUtilization: 18000,
    status: "active",
    totalRacks: 120,
    totalBins: 1440
  }
];

let mockDataStore = {
  tenants: [...mockTenants],
  demoRequests: [...mockDemoRequests],
  adminUsers: [...mockAdminUsers],
  inventory: [...mockInventory],
  warehouses: [...mockWarehouses],
  plans: [...mockPlans]
};

export const getMockData = () => mockDataStore;

export const updateMockData = (key: keyof typeof mockDataStore, data: any[]) => {
  mockDataStore = { ...mockDataStore, [key]: data };
};

export const resetMockData = () => {
  mockDataStore = {
    tenants: [...mockTenants],
    demoRequests: [...mockDemoRequests],
    adminUsers: [...mockAdminUsers],
    inventory: [...mockInventory],
    warehouses: [...mockWarehouses],
    plans: [...mockPlans]
  };
};