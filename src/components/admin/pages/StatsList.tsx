"use client";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { deleteStat } from "@/app/actions/pages/statActions";
import { useRouter } from "next/navigation";
import { AVAILABLE_ICONS, type IconName } from "@/config/icons";

type Stat = {
  id: string;
  name_en: string;
  name_ar: string;
  value: number;
  icon: string;
};

export function StatsList({ stats }: { stats: Stat[] }) {
  const router = useRouter();

  const handleDelete = async (id: string) => {
    await deleteStat(id);
    router.refresh();
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>English Name</TableHead>
          <TableHead>Arabic Name</TableHead>
          <TableHead>Value</TableHead>
          <TableHead>Icon</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {stats.map((stat) => {
          const Icon = AVAILABLE_ICONS[stat.icon as IconName];
          return (
            <TableRow key={stat.id}>
              <TableCell>{stat.name_en}</TableCell>
              <TableCell dir="rtl">{stat.name_ar}</TableCell>
              <TableCell>{stat.value}</TableCell>
              <TableCell>
                {Icon && <Icon className="h-6 w-6" />}
              </TableCell>
              <TableCell>
                <Button
                  variant="destructive"
                  onClick={() => handleDelete(stat.id)}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}
