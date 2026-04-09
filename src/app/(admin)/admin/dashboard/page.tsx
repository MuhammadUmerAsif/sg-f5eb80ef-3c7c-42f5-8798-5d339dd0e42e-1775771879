import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, DollarSign, TrendingUp, AlertCircle } from "lucide-react";
import { mockTenants, getMockData } from "@/lib/mock-data";
import { StatusBadge } from "@/components/ui/status-badge";

export default function AdminDashboard() {
  const { tenants } = getMockData();
  const activeTenants = tenants.filter((t) => t.status === "active").length;
  const trialTenants = tenants.filter((t) => t.status === "trial").length;
  const totalMRR = tenants
    .filter((t) => t.status === "active")
    .reduce((sum, t) => sum + 299, 0);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Platform Overview</h1>
        <p className="text-muted-foreground">
          Monitor your SaaS platform performance and tenant activity
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Tenants</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{tenants.length}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {activeTenants} active, {trialTenants} on trial
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Monthly Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalMRR.toLocaleString()}</div>
            <p className="text-xs text-accent mt-1">
              <TrendingUp className="inline h-3 w-3" /> +12.5% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Active Tenants</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeTenants}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {((activeTenants / tenants.length) * 100).toFixed(0)}% of total
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Trial Accounts</CardTitle>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{trialTenants}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Convert to boost MRR
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Tenants</CardTitle>
            <CardDescription>Latest tenant signups and activity</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {tenants.slice(0, 5).map((tenant) => (
                <div key={tenant.id} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary font-semibold">
                      {tenant.name.charAt(0)}
                    </div>
                    <div>
                      <div className="font-medium">{tenant.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {tenant.companyEmail}
                      </div>
                    </div>
                  </div>
                  <StatusBadge status={tenant.status} type="tenant" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common administrative tasks</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <a
                href="/admin/tenants"
                className="block rounded-lg border p-4 hover:bg-muted transition-colors"
              >
                <div className="font-medium">Create New Tenant</div>
                <div className="text-sm text-muted-foreground">
                  Provision a new customer account
                </div>
              </a>
              <a
                href="/admin/demo-requests"
                className="block rounded-lg border p-4 hover:bg-muted transition-colors"
              >
                <div className="font-medium">Review Demo Requests</div>
                <div className="text-sm text-muted-foreground">
                  Follow up with potential customers
                </div>
              </a>
              <a
                href="/admin/plans"
                className="block rounded-lg border p-4 hover:bg-muted transition-colors"
              >
                <div className="font-medium">Manage Plans</div>
                <div className="text-sm text-muted-foreground">
                  Edit pricing and features
                </div>
              </a>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}