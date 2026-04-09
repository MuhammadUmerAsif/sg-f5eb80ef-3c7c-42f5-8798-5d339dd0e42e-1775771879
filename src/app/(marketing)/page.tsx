import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, CheckCircle2, Package, Warehouse, BarChart3, Users, Shield, Zap } from "lucide-react";

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-muted/50 to-background">
        <div className="container max-w-6xl">
          <div className="text-center space-y-6">
            <Badge variant="secondary" className="px-4 py-1.5">
              Multi-Tenant SaaS Platform
            </Badge>
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight">
              Modern Warehouse Management
              <br />
              <span className="text-primary">Built for Scale</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Complete WMS solution with inventory tracking, multi-warehouse support, 
              order management, and real-time analytics. Perfect for growing businesses.
            </p>
            <div className="flex items-center justify-center gap-4 pt-4">
              <Button size="lg" asChild>
                <Link href="/contact">
                  Request Demo
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/pricing">View Pricing</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4">
        <div className="container max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Everything You Need</h2>
            <p className="text-muted-foreground text-lg">
              Comprehensive warehouse management features designed for efficiency
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <Package className="h-10 w-10 text-primary mb-2" />
                <CardTitle>Inventory Management</CardTitle>
                <CardDescription>
                  Track SKUs, stock levels, batches, and expiry dates with precision
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <Warehouse className="h-10 w-10 text-primary mb-2" />
                <CardTitle>Multi-Warehouse</CardTitle>
                <CardDescription>
                  Manage multiple warehouse locations with rack and bin systems
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <BarChart3 className="h-10 w-10 text-primary mb-2" />
                <CardTitle>Advanced Reports</CardTitle>
                <CardDescription>
                  Real-time analytics and inventory valuation reports
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <Users className="h-10 w-10 text-primary mb-2" />
                <CardTitle>Team Management</CardTitle>
                <CardDescription>
                  Role-based access control for your entire warehouse team
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <Shield className="h-10 w-10 text-primary mb-2" />
                <CardTitle>Enterprise Security</CardTitle>
                <CardDescription>
                  Bank-level security with complete data isolation
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <Zap className="h-10 w-10 text-primary mb-2" />
                <CardTitle>Fast & Reliable</CardTitle>
                <CardDescription>
                  Lightning-fast performance with 99.9% uptime guarantee
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-4 bg-muted/50">
        <div className="container max-w-6xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl font-bold">
                Built for Growing Businesses
              </h2>
              <p className="text-lg text-muted-foreground">
                WareSync Pro scales with your business. Start with a single warehouse 
                and expand to unlimited locations as you grow.
              </p>
              <ul className="space-y-3">
                {[
                  "Real-time inventory tracking across all locations",
                  "Automated stock movement logging",
                  "Purchase and sales order management",
                  "Shipment tracking and dispatch",
                  "Supplier and customer relationship management",
                  "Comprehensive employee management with RBAC",
                ].map((benefit) => (
                  <li key={benefit} className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-card rounded-lg border p-8">
              <div className="space-y-6">
                <div>
                  <div className="text-4xl font-bold text-primary mb-1">99.9%</div>
                  <div className="text-sm text-muted-foreground">Uptime Guarantee</div>
                </div>
                <div>
                  <div className="text-4xl font-bold text-primary mb-1">500+</div>
                  <div className="text-sm text-muted-foreground">Companies Trust Us</div>
                </div>
                <div>
                  <div className="text-4xl font-bold text-primary mb-1">10M+</div>
                  <div className="text-sm text-muted-foreground">SKUs Managed</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container max-w-4xl">
          <Card className="bg-primary text-primary-foreground border-0">
            <CardContent className="p-12 text-center">
              <h2 className="text-3xl font-bold mb-4">
                Ready to Transform Your Warehouse?
              </h2>
              <p className="text-primary-foreground/90 text-lg mb-8 max-w-2xl mx-auto">
                Join hundreds of companies using WareSync Pro to streamline their 
                warehouse operations. Start your free trial today.
              </p>
              <div className="flex items-center justify-center gap-4">
                <Button size="lg" variant="secondary" asChild>
                  <Link href="/contact">
                    Request Demo
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary" asChild>
                  <Link href="/pricing">View Pricing</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}