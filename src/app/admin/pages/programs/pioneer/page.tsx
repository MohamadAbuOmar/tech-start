import { Button } from "@/components/ui/button";
import Link from "next/link";
import { PlusIcon } from "lucide-react";
import { Suspense } from "react";
import { PioneerProgramsTable, getPioneerPrograms } from "./PioneerProgramsTable";



export default async function PioneerProgramsPage() {
  const programs = await getPioneerPrograms();

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Pioneer Programs</h1>
        <Button asChild>
          <Link href="/admin/pages/programs/pioneer/create">
            <PlusIcon className="mr-2 h-4 w-4" />
            Add Program
          </Link>
        </Button>
      </div>
      <Suspense fallback={<div>Loading...</div>}>
        <PioneerProgramsTable programs={programs} />
      </Suspense>
    </div>
  );
}
