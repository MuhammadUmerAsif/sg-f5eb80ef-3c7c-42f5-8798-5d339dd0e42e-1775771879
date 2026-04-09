import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2 } from "lucide-react";
import { mockPlans } from "@/lib/mock-data";

export default function PricingPage() {
  return (
    <div className="py-20 px-4">
      <div className="container max-w-6xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Simple, Transparent Pricing</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Choose the plan that fits your business. All plans include core features with no hidden fees.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {mockPlans.map((plan, index) => (
            <Card 
              key={plan.id} 
              className={index === 1 ? "border-primary shadow-lg scale-105" : ""}
            >
              <CardHeader>
                {index === 1 && (
                  <Badge className="w-fit mb-2">Most Popular</Badge>
                )}
                <CardTitle className="text-2xl">{plan.name}</CardTitle>
                <CardDescription className="text-sm">
                  {plan.tier === "starter" && "Perfect for small warehouses"}
                  {plan.tier === "growth" && "For growing operations"}
                  {plan.tier === "enterprise" && "For large-scale operations"}
                </CardDescription>
                <div className="mt-4">
                  <span className="text-4xl font-bold">${plan.price}</span>
                  <span className="text-muted-foreground">/month</span>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button 
                  className="w-full" 
                  variant={index === 1 ? "default" : "outline"}
                  asChild
                >
                  <Link href="/contact">
                    {plan.tier === "enterprise" ? "Contact Sales" : "Start Free Trial"}
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="mt-16 text-center">
          <h3 className="text-2xl font-bold mb-4">All Plans Include</h3>
          <div className="grid md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {[
              "24/7 Customer Support",
              "99.9% Uptime SLA",
              "Regular Backups",
              "SSL Encryption",
              "Mobile Access",
              "API Access",
              "Custom Integrations",
              "Training & Onboarding",
            ].map((feature) => (
              <div key={feature} className="flex items-center gap-2 justify-center">
                <CheckCircle2 className="h-4 w-4 text-accent flex-shrink-0" />
                <span className="text-sm">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}