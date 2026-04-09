---
title: Admin Dashboard - Core & Tenant Management
status: todo
priority: high
type: feature
tags: [admin, dashboard]
created_by: agent
created_at: 2026-04-09T21:13:43Z
position: 3
---

## Notes
Build the admin platform control panel for managing the entire SaaS platform. Dashboard overview with KPIs and comprehensive tenant lifecycle management (create, edit, suspend, delete, feature flags).

## Checklist
- [ ] Create admin layout with sidebar navigation
- [ ] Build dashboard overview page with KPIs: MRR, active tenants, trial users, churn rate
- [ ] Add revenue and growth charts
- [ ] Create tenant management page with DataTable (search, filters by status/plan)
- [ ] Build "Create Tenant" modal with form (name, subdomain, email, plan, trial toggle)
- [ ] Implement "Edit Tenant" modal
- [ ] Add "Suspend Tenant" confirmation dialog
- [ ] Build "Delete Tenant" danger modal with type-to-confirm
- [ ] Create tenant detail view with usage stats and feature flags
- [ ] Add tenant status badges (active, trial, suspended, cancelled)