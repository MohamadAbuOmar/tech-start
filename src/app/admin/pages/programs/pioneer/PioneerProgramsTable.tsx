import { getAdminPrograms } from "@/app/actions/pages/programs";
import { DataTable } from "@/components/ui/data-table";
import { columns } from "./columns";
import { Program } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";

interface PioneerProgramsTableProps {
  programs: Program[];
}

export function PioneerProgramsTable({ programs }: PioneerProgramsTableProps) {
  const pioneerPrograms = programs?.filter(p => p.type === 'PIONEER') ?? [];
  return <DataTable columns={columns} data={pioneerPrograms} />;
}

export async function getPioneerPrograms() {
  const { data: programs } = await getAdminPrograms();
  return programs ?? [];
}
