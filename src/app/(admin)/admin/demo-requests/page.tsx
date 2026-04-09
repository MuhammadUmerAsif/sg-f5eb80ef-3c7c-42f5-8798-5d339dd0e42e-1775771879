"use client";

import { useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/DataTable";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Trash } from "lucide-react";
import { getMockData, updateMockData } from "@/lib/mock-data";
import { mockApiCall } from "@/lib/mock-api";
import { useToast } from "@/hooks/useToast";
import type { DemoRequest } from "@/types";

export default function DemoRequestsPage() {
  const [requests, setRequests] = useState<DemoRequest[]>(
    getMockData().demoRequests
  );
  const { toast } = useToast();

  const handleMarkContacted = async (request: DemoRequest) => {
    try {
      await mockApiCall({ id: request.id });
      const updated = requests.map((r) =>
        r.id === request.id ? { ...r, contacted: true } : r
      );
      setRequests(updated);
      updateMockData("demoRequests", updated);

      toast({
        title: "Marked as contacted",
        description: `Request from ${request.name} updated`,
      });
    } catch (error) {
      toast({
        title: "Failed to update request",
        variant: "destructive",
      });
    }
  };

  const handleDelete = async (request: DemoRequest) => {
    if (!confirm("Delete this demo request?")) return;

    try {
      await mockApiCall({ id: request.id });
      const updated = requests.filter((r) => r.id !== request.id);
      setRequests(updated);
      updateMockData("demoRequests", updated);

      toast({
        title: "Request deleted",
      });
    } catch (error) {
      toast({
        title: "Failed to delete request",
        variant: "destructive",
      });
    }
  };

  const columns: ColumnDef<DemoRequest>[] = [
    {
      accessorKey: "name",
      header: "Name",
    },
    {
      accessorKey: "email",
      header: "Email",
    },
    {
      accessorKey: "company",
      header: "Company",
    },
    {
      accessorKey: "message",
      header: "Message",
      cell: ({ row }) => (
        <div className="max-w-xs truncate">
          {row.original.message || "No message"}
        </div>
      ),
    },
    {
      accessorKey: "contacted",
      header: "Status",
      cell: ({ row }) =>
        row.original.contacted ? (
          <Badge variant="default">Contacted</Badge>
        ) : (
          <Badge variant="secondary">Pending</Badge>
        ),
    },
    {
      accessorKey: "createdAt",
      header: "Date",
      cell: ({ row }) => new Date(row.original.createdAt).toLocaleDateString(),
    },
    {
      id: "actions",
      cell: ({ row }) => (
        <div className="flex gap-2">
          {!row.original.contacted && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleMarkContacted(row.original)}
            >
              <CheckCircle2 className="mr-2 h-4 w-4" />
              Mark Contacted
            </Button>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleDelete(row.original)}
          >
            <Trash className="h-4 w-4" />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Demo Requests</h1>
        <p className="text-muted-foreground">
          Manage incoming demo and contact requests
        </p>
      </div>

      <DataTable
        columns={columns}
        data={requests}
        searchKey="company"
        searchPlaceholder="Search by company..."
      />
    </div>
  );
}