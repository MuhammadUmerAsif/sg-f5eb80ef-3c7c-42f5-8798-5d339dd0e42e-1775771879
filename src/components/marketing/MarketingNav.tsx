"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Package } from "lucide-react";

export function MarketingNav() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Package className="h-5 w-5" />
          </div>
          <span className="font-bold text-xl">WareSync Pro</span>
        </Link>

        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          <Link href="/#features" className="text-muted-foreground hover:text-foreground transition-colors">
            Features
          </Link>
          <Link href="/pricing" className="text-muted-foreground hover:text-foreground transition-colors">
            Pricing
          </Link>
          <Link href="/contact" className="text-muted-foreground hover:text-foreground transition-colors">
            Contact
          </Link>
          <Link href="/admin/dashboard" className="text-muted-foreground hover:text-foreground transition-colors">
            Admin Demo
          </Link>
          <Link href="/tenant/dashboard" className="text-muted-foreground hover:text-foreground transition-colors">
            Tenant Demo
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <Button variant="ghost" asChild>
            <Link href="/admin/dashboard">Sign In</Link>
          </Button>
          <Button asChild>
            <Link href="/contact">Request Demo</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}