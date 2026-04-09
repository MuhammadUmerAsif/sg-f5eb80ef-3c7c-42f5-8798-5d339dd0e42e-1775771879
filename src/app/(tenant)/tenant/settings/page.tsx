"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Save } from "lucide-react";
import { toast } from "sonner";

export default function SettingsPage() {
  const handleSave = () => {
    toast.success("Settings saved successfully");
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-muted-foreground">Manage your company profile and WMS preferences</p>
      </div>

      <Tabs defaultValue="general" className="space-y-6">
        <TabsList>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="warehouse">Warehouse Defaults</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
        </TabsList>

        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle>Company Profile</CardTitle>
              <CardDescription>Update your tenant business information.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="companyName">Company Name</Label>
                  <Input id="companyName" defaultValue="Acme Logistics" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="subdomain">Tenant Subdomain</Label>
                  <Input id="subdomain" defaultValue="acme" disabled />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Contact Email</Label>
                  <Input id="email" defaultValue="admin@acme.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" defaultValue="+1 (555) 000-0000" />
                </div>
              </div>
              <div className="pt-4">
                <Button onClick={handleSave}>
                  <Save className="mr-2 h-4 w-4" />
                  Save Changes
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="warehouse">
          <Card>
            <CardHeader>
              <CardTitle>Global Defaults</CardTitle>
              <CardDescription>Configure standard operational settings.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="currency">Default Currency</Label>
                  <Input id="currency" defaultValue="USD ($)" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="weight">Weight Unit</Label>
                  <Input id="weight" defaultValue="kg" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dimension">Dimension Unit</Label>
                  <Input id="dimension" defaultValue="cm" />
                </div>
              </div>
              <div className="pt-4">
                <Button onClick={handleSave}>
                  <Save className="mr-2 h-4 w-4" />
                  Save Preferences
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Email Notifications</CardTitle>
              <CardDescription>Choose what alerts you want to receive.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <Label className="text-base">Low Stock Alerts</Label>
                    <p className="text-sm text-muted-foreground">Receive emails when SKUs fall below minimum threshold.</p>
                  </div>
                  <input type="checkbox" className="h-4 w-4 rounded border-gray-300" defaultChecked />
                </div>
                <div className="flex items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <Label className="text-base">Order Confirmations</Label>
                    <p className="text-sm text-muted-foreground">Receive emails when new orders are created.</p>
                  </div>
                  <input type="checkbox" className="h-4 w-4 rounded border-gray-300" defaultChecked />
                </div>
              </div>
              <div className="pt-4">
                <Button onClick={handleSave}>
                  <Save className="mr-2 h-4 w-4" />
                  Update Notifications
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}