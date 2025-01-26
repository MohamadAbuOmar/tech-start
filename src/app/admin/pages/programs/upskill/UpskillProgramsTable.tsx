import { getAdminPrograms } from "@/app/actions/pages/programs";
import { DataTable } from "@/components/ui/data-table";
import { columns } from "./columns";
import { Program } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";

interface UpskillProgramsTableProps {
  programs: Program[];
}

export function UpskillProgramsTable({ programs }: UpskillProgramsTableProps) {
  const upskillPrograms = programs?.filter(p => p.type === 'UPSKILL') ?? [];
  return <DataTable columns={columns} data={upskillPrograms} />;
}

export async function getUpskillPrograms() {
  const { data: programs } = await getAdminPrograms();
  return programs ?? [];
}
