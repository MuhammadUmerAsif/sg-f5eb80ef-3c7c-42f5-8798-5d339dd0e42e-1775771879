# WareSync Pro - Multi-Tenant WMS SaaS

## Vision
A complete frontend-only demonstration of a production-grade multi-tenant Warehouse Management System (WMS) SaaS platform. Simulates real SaaS platforms like Stripe, Vercel, and Shopify Admin with full tenant lifecycle management, billing, RBAC, and comprehensive warehouse operations.

**Status:** ✅ Complete - All core features implemented

## Design
**Colors:**
- `--primary: 217 91% 60%` (deep navy #1e40af)
- `--accent: 160 84% 39%` (emerald #10b981)
- `--background: 0 0% 100%` (pure white)
- `--foreground: 222 47% 11%` (dark slate)
- `--muted: 210 40% 96%` (light gray #f8fafc)
- `--destructive: 0 84% 60%` (red)
- `--border: 214 32% 91%` (light slate)

**Typography:**
- Headings: Inter 600/700
- Body: Inter 400

**Style:** Clean B2B SaaS aesthetic — Stripe's minimalism meets Shopify's operational density. Data-dense tables, status badges, sidebar navigation, modal workflows.

## Features Implemented

### ✅ Marketing Site
- Hero landing page with value proposition, features, social proof
- Pricing page with three tiers (Starter $99, Growth $299, Enterprise custom)
- Contact/demo request form with validation
- Responsive navigation and footer

### ✅ Admin Dashboard (Platform Control Panel)
- Overview with KPIs (MRR, active tenants, growth charts, activity feed)
- **Tenant Management:**
  - Full CRUD operations (create, edit, suspend, delete)
  - Tenant details with usage stats
  - Status management (active, trial, suspended, cancelled)
  - Search and filtering
- **Subscriptions & Billing:**
  - Subscription lifecycle management
  - Plan upgrades/downgrades
  - Invoice tracking with payment status
  - Billing history
- **Demo Requests:** Contact form submissions with status tracking
- **Admin Users:** Platform administrator management with RBAC
- **Feature Flags:** Per-tenant feature toggles

### ✅ Tenant Dashboard (WMS Product)
- **Dashboard Overview:** KPIs, recent activity, quick actions
- **Inventory Management:** SKU tracking, stock levels, low stock alerts
- **Warehouses:** Multi-location support, capacity tracking, rack/bin system
- **Orders:** Purchase Orders + Sales Orders with full status flow
- **Stock Movement:** Inbound/outbound tracking, transfers, activity logs
- **Shipments:** Dispatch management, tracking numbers
- **Suppliers & Customers:** Full relationship management
- **Employees:** Staff management with RBAC roles (Admin, Manager, Picker, Viewer)
- **Reports & Analytics:** Inventory valuation, turnover, fulfillment rates
- **Settings:** Company profile, warehouse defaults, notification preferences

### ✅ RBAC System
- Permission-based UI rendering with `<PermissionGuard>` component
- Role-to-permissions mapping for admin and tenant users
- Admin roles: Super Admin, Admin, Support
- Tenant roles: Admin, Manager, Picker, Viewer
- `usePermissions()` hook for programmatic access checks

### ✅ Global UX Components
- `DataTable` with search, filter, sort, pagination
- `StatusBadge` for all entity states
- `EmptyState` placeholders
- `LoadingSkeleton` for async operations
- Toast notifications (Sonner)
- Modal-driven CRUD workflows
- Form validation patterns
- Confirmation dialogs for destructive actions

## Tech Stack
- Next.js 15.2 (App Router)
- TypeScript
- Tailwind CSS 3.4
- shadcn/ui components
- TanStack Table v8
- Lucide React icons
- Sonner for notifications

## Mock Data System
- In-memory data store (`src/lib/mock-data.ts`)
- Simulated API client with delays (`src/lib/mock-api.ts`)
- Realistic success/error simulation
- Console logging for debugging
