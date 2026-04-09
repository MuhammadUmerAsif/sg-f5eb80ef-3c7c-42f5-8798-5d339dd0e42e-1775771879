# WareSync Pro - Multi-Tenant Warehouse Management System SaaS

A complete **frontend-only demonstration** of a production-grade multi-tenant Warehouse Management System (WMS) built with Next.js. This project simulates a real SaaS platform similar to Stripe, Vercel, or Shopify Admin with comprehensive tenant lifecycle management, billing, RBAC, and full warehouse operations.

## 🎯 Project Overview

**Type:** Frontend-only demonstration (no real backend)  
**Purpose:** Showcase enterprise SaaS UI/UX patterns and multi-tenant architecture  
**Tech Stack:** Next.js 15 (App Router), TypeScript, Tailwind CSS, shadcn/ui

## 🏗️ Architecture

### Three Distinct Applications

1. **Marketing Site** (`/(marketing)`)
   - Landing page with value proposition
   - Pricing tiers (Starter, Growth, Enterprise)
   - Contact/demo request form

2. **Admin Dashboard** (`/(admin)`)
   - Platform control panel for SaaS administrators
   - Tenant lifecycle management (CRUD, suspend, delete)
   - Subscription & billing management
   - Demo request handling
   - Admin user management with RBAC
   - Revenue tracking and analytics

3. **Tenant Dashboard** (`/(tenant)`)
   - Complete WMS product for warehouse operations
   - Inventory management (SKU, stock levels, batches)
   - Warehouse management (locations, racks, bins)
   - Order management (purchase & sales orders)
   - Stock movement tracking
   - Shipment dispatch & tracking
   - Supplier & customer management
   - Employee management with RBAC
   - Reports & analytics
   - Settings & configuration

## ✨ Key Features

### 🔐 Role-Based Access Control (RBAC)

**Admin Roles:**
- Super Admin (full platform access)
- Admin (tenant & subscription management)
- Support (view-only, demo requests)

**Tenant Roles:**
- Admin (full WMS access)
- Manager (operations & reporting)
- Picker (warehouse floor operations)
- Viewer (read-only access)

### 💳 Subscription & Billing System

- Three pricing tiers with feature matrices
- Subscription lifecycle (active, trial, past_due, cancelled)
- Invoice generation and tracking
- Payment status management
- Plan upgrades/downgrades

### 📊 Tenant Lifecycle Management

**Complete tenant operations:**
- Create new tenant with company info & subdomain
- Edit tenant details and configuration
- Suspend/reactivate tenants
- Delete tenants (with confirmation)
- Feature flag toggles per tenant
- Usage statistics and metrics

### 🏭 Warehouse Management Features

**Inventory:**
- SKU creation and management
- Stock level tracking
- Low stock alerts
- Batch and expiry date tracking

**Warehouses:**
- Multi-location support
- Capacity tracking (racks, bins, utilization)
- Location code system

**Orders:**
- Purchase Orders (from suppliers)
- Sales Orders (to customers)
- Status flow: Pending → Confirmed → Shipped → Delivered
- Order line items with quantities

**Stock Movement:**
- Inbound/Outbound tracking
- Transfer between warehouses
- Activity logs with timestamps

**Shipments:**
- Dispatch management
- Tracking number generation
- Delivery status tracking

**Relationships:**
- Supplier management
- Customer database
- Contact information and history

## 🎨 Design System

**Color Palette:**
- Primary: Deep Navy (`#1e40af`) - Trust and stability
- Accent: Emerald (`#10b981`) - Growth and operational success
- Muted: Slate grays for secondary elements
- Background: Clean whites with subtle `#f8fafc` panels

**Typography:**
- Font: Inter (400, 500, 600, 700 weights)
- Hierarchy: Clear contrast between headings and body text

**UI Patterns:**
- Data-dense tables with search and filters
- Status badges throughout (Active, Trial, Suspended, In Stock, etc.)
- Sidebar navigation (Linear/Vercel style)
- Modal-driven workflows for CRUD operations
- Toast notifications for all actions
- Loading skeletons for async operations
- Empty states with actionable CTAs

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

### Navigation

- **Marketing:** `/` (landing), `/pricing`, `/contact`
- **Admin Portal:** `/admin/dashboard`, `/admin/tenants`, `/admin/subscriptions`, etc.
- **Tenant Dashboard:** `/tenant/dashboard`, `/tenant/inventory`, `/tenant/warehouses`, etc.

## 📁 Project Structure

```
src/
├── app/
│   ├── (marketing)/          # Public marketing site
│   │   ├── page.tsx          # Landing page
│   │   ├── pricing/
│   │   └── contact/
│   ├── (admin)/              # Admin platform dashboard
│   │   └── admin/
│   │       ├── dashboard/
│   │       ├── tenants/
│   │       ├── subscriptions/
│   │       ├── invoices/
│   │       ├── demo-requests/
│   │       └── admins/
│   ├── (tenant)/             # Tenant WMS dashboard
│   │   └── tenant/
│   │       ├── dashboard/
│   │       ├── inventory/
│   │       ├── warehouses/
│   │       ├── orders/
│   │       ├── stock-movement/
│   │       ├── shipments/
│   │       ├── suppliers/
│   │       ├── customers/
│   │       ├── employees/
│   │       ├── reports/
│   │       └── settings/
│   └── layout.tsx
├── components/
│   ├── ui/                   # shadcn/ui components
│   ├── marketing/            # Marketing site components
│   ├── AppSidebar.tsx        # Shared sidebar navigation
│   ├── AppHeader.tsx         # Shared header with user menu
│   ├── DataTable.tsx         # Reusable table with search/filter/sort
│   ├── PermissionGuard.tsx   # RBAC component
│   ├── EmptyState.tsx        # Empty state placeholder
│   └── LoadingSkeleton.tsx   # Loading state component
├── lib/
│   ├── mock-api.ts           # Simulated API client
│   ├── mock-data.ts          # Mock data store
│   └── utils.ts
├── types/
│   └── index.ts              # TypeScript interfaces
└── styles/
    └── globals.css           # Global styles & design tokens
```

## 🛠️ Tech Stack Details

- **Framework:** Next.js 15.2 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS 3.4
- **UI Components:** shadcn/ui (Radix UI primitives)
- **Tables:** TanStack Table v8
- **Icons:** Lucide React
- **Notifications:** Sonner
- **Forms:** React Hook Form (ready to integrate)

## 🎭 Mock Data System

All data is simulated in-memory using:

- `src/lib/mock-data.ts` - Initial seed data
- `src/lib/mock-api.ts` - Simulated API delays and responses
- Local state management in components

**Features:**
- Realistic delays (800ms) to simulate network latency
- Success/error simulation for testing UI states
- Console logging of all API calls
- Data persistence within session (resets on refresh)

## 🔒 Security & Permissions

While this is a frontend-only demo, it demonstrates proper security patterns:

- Permission-based UI rendering (`<PermissionGuard>`)
- Role-to-permission mapping system
- Conditional action visibility based on roles
- Confirmation modals for destructive actions

**Note:** In production, all permission checks must be enforced server-side.

## 📝 Development Guidelines

### Adding New Features

1. Define TypeScript interfaces in `src/types/index.ts`
2. Add mock data to `src/lib/mock-data.ts`
3. Create page component in appropriate route group
4. Use `DataTable` component for list views
5. Implement CRUD modals with form validation
6. Add permission guards where needed
7. Include loading skeletons and empty states

### Design Consistency

- Use shadcn/ui components exclusively
- Follow the established color palette (navy primary, emerald accent)
- Maintain Inter font throughout
- Use status badges for all state indicators
- Implement toast notifications for user feedback
- Add confirmation dialogs for destructive actions

## 🎯 Use Cases

This project is ideal for:

- **Portfolio/Demo:** Showcase enterprise SaaS development skills
- **UI/UX Reference:** Learn modern B2B dashboard patterns
- **Prototyping:** Rapid mockup creation for stakeholder demos
- **Component Library:** Extract reusable components for real projects
- **Architecture Study:** Understand multi-tenant SaaS structure

## 📊 Metrics & Analytics

The demo includes realistic metrics across dashboards:

**Admin Dashboard:**
- Total Tenants, Active Tenants, MRR, Trials
- Revenue growth charts
- Tenant creation timeline

**Tenant Dashboard:**
- Inventory valuation
- Stock turnover rate
- Order fulfillment rate
- Stockout incidents
- Warehouse utilization

## 🚧 Production Considerations

To convert this demo into a production application:

1. **Backend API:** Replace mock API with real REST/GraphQL endpoints
2. **Database:** Implement actual multi-tenant database architecture
3. **Authentication:** Add NextAuth.js or similar (JWT, OAuth)
4. **Authorization:** Server-side permission enforcement
5. **State Management:** Add React Query or Zustand for global state
6. **Form Validation:** Integrate Zod with React Hook Form
7. **Error Handling:** Implement error boundaries and retry logic
8. **Testing:** Add unit tests (Jest), integration tests (Playwright)
9. **Deployment:** Configure CI/CD pipeline (Vercel, AWS, etc.)
10. **Monitoring:** Add Sentry, LogRocket, or similar

## 📄 License

This is a demonstration project. Feel free to use the code as a reference for your own projects.

## 🙏 Credits

Built with:
- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Lucide Icons](https://lucide.dev/)
- [TanStack Table](https://tanstack.com/table)

---

**WareSync Pro** - Enterprise Warehouse Management, Simplified. 📦