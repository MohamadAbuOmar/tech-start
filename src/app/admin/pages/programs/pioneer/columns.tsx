"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "@/hooks/use-toast";
import { deleteProgram } from "@/app/actions/pages/programs";
import { ColumnDef } from "@tanstack/react-table";

interface Program {
  id: string;
  name_en: string;
  name_ar: string;
  order: number;
  type: "PIONEER" | "UPSKILL";
}

export const columns: ColumnDef<Program>[] = [
  {
    accessorKey: "name_en",
    header: "Name (English)",
  },
  {
    accessorKey: "name_ar",
    header: "Name (Arabic)",
  },
  {
    accessorKey: "order",
    header: "Order",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const program = row.original;
      const [isDeleting, setIsDeleting] = useState(false);
      const router = useRouter();

      const handleDelete = async () => {
        setIsDeleting(true);
        try {
          const result = await deleteProgram(program.id);
          if (result.success) {
            toast({
              title: "Success",
              description: "Program deleted successfully",
              variant: "default",
            });
            router.refresh();
          } else {
            toast({
              title: "Error",
              description: result.error || "Failed to delete program",
              variant: "destructive",
            });
          }
        } catch (error) {
          toast({
            title: "Error",
            description: "Failed to delete program",
            variant: "destructive",
          });
        } finally {
          setIsDeleting(false);
        }
      };

      return (
        <div className="flex items-center gap-2">
          <Button asChild variant="outline" size="sm">
            <Link href={`/admin/pages/programs/pioneer/${program.id}/edit`}>
              Edit
            </Link>
          </Button>
          <Button
            variant="destructive"
            size="sm"
            onClick={handleDelete}
            disabled={isDeleting}
          >
            {isDeleting ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              "Delete"
            )}
          </Button>
        </div>
      );
    },
  },
];
