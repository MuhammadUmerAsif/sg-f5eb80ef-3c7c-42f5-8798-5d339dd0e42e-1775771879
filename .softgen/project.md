# WareSync Pro - Multi-Tenant WMS SaaS

## Vision
A complete frontend-only demonstration of a production-grade multi-tenant Warehouse Management System (WMS) SaaS platform. Simulates real SaaS platforms like Stripe, Vercel, and Shopify Admin with full tenant lifecycle management, billing, RBAC, and comprehensive warehouse operations.

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

## Features

### Marketing Site
- Hero landing page with clear value proposition
- Pricing tiers (Starter, Growth, Enterprise)
- Contact/demo request form

### Admin Dashboard (Platform Control Panel)
- Overview with KPIs (MRR, active tenants, growth charts)
- Tenant management (CRUD, suspend, feature flags)
- Subscription & billing management
- Plans administration
- Demo request handling
- Admin user management with RBAC
- Invoice & payment tracking

### Tenant Dashboard (WMS Product)
- Inventory management (SKU, stock levels, batches)
- Warehouse management (locations, racks, bins)
- Order management (purchase orders, sales orders)
- Stock movement tracking
- Shipment dispatch & tracking
- Supplier & customer management
- Employee management with RBAC
- Reports & analytics
- Settings & configuration

### RBAC System
- Permission-based UI rendering
- Role-based access control for both admin and tenant users
- Permission guards for actions and pages