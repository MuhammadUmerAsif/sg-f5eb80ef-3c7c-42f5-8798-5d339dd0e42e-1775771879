import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Package, AlertTriangle, TrendingUp, DollarSign, Warehouse, ShoppingCart } from "lucide-react";
import { getMockData } from "@/lib/mock-data";

export default function TenantDashboardPage() {
  const { inventory, warehouses } = getMockData();
  
  const totalStock = inventory.reduce((sum, item) => sum + item.stockLevel, 0);
  const lowStockItems = inventory.filter(item => item.stockLevel <= item.minStockLevel);
  const totalWarehouses = warehouses.length;
  const activeWarehouses = warehouses.filter(w => w.status === "active").length;

  const recentActivity = [
    { id: 1, action: "Stock received", item: "Dell XPS 13 Laptop", qty: 50, time: "2 hours ago", type: "inbound" },
    { id: 2, action: "Order fulfilled", item: "Logitech MX Master 3", qty: 25, time: "4 hours ago", type: "outbound" },
    { id: 3, action: "Stock transfer", item: "Dell XPS 13 Laptop", qty: 20, time: "Yesterday", type: "transfer" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">Overview of your warehouse operations</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Inventory</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalStock.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Units in stock</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Low Stock Items</CardTitle>
            <AlertTriangle className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{lowStockItems.length}</div>
            <p className="text-xs text-muted-foreground">Require reorder</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Warehouses</CardTitle>
            <Warehouse className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {activeWarehouses}/{totalWarehouses}
            </div>
            <p className="text-xs text-muted-foreground">Locations operational</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Inventory Value</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$234,500</div>
            <p className="text-xs text-muted-foreground">Total valuation</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest stock movements and orders</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-center justify-between border-b pb-3 last:border-0">
                  <div className="flex items-center gap-3">
                    <div className={`rounded-full p-2 ${
                      activity.type === "inbound" ? "bg-accent/10 text-accent" :
                      activity.type === "outbound" ? "bg-primary/10 text-primary" :
                      "bg-secondary"
                    }`}>
                      {activity.type === "inbound" ? <TrendingUp className="h-4 w-4" /> :
                       activity.type === "outbound" ? <ShoppingCart className="h-4 w-4" /> :
                       <Package className="h-4 w-4" />}
                    </div>
                    <div>
                      <p className="font-medium text-sm">{activity.action}</p>
                      <p className="text-sm text-muted-foreground">{activity.item}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-sm">{activity.qty} units</p>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Low Stock Alerts</CardTitle>
            <CardDescription>Items requiring immediate attention</CardDescription>
          </CardHeader>
          <CardContent>
            {lowStockItems.length === 0 ? (
              <p className="text-sm text-muted-foreground">All items are well stocked</p>
            ) : (
              <div className="space-y-3">
                {lowStockItems.map((item) => (
                  <div key={item.id} className="flex items-center justify-between border-b pb-3 last:border-0">
                    <div>
                      <p className="font-medium text-sm">{item.name}</p>
                      <p className="text-xs text-muted-foreground">SKU: {item.sku}</p>
                    </div>
                    <div className="text-right">
                      <Badge variant="destructive">{item.stockLevel} units</Badge>
                      <p className="text-xs text-muted-foreground mt-1">Min: {item.minStockLevel}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}