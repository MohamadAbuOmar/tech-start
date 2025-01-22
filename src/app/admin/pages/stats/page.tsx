import { Suspense } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { StatsList } from "@/components/admin/pages/StatsList";
import { getStats } from "@/app/actions/pages/statActions";

export default async function AdminStatsPage() {
  const stats = await getStats();

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Manage Stats</h1>
        <Link href="/admin/pages/stats/create">
          <Button>Create New Stat</Button>
        </Link>
      </div>
      <Suspense fallback={<div>Loading stats...</div>}>
        <StatsList stats={stats} />
      </Suspense>
    </div>
  );
}
