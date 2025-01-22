import { getHeroSteps } from "@/app/actions/pages/hero"
import { HeroPageClient } from "@/components/admin/pages/HeroPageClient"

export default async function AdminHeroPage() {
  const result = await getHeroSteps()
  
  if (!result.success || !result.data) {
    return <div>Error loading hero steps: {'Unknown error'}</div>
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Manage Hero Steps</h1>
      <HeroPageClient initialSteps={result.data} />
    </div>
  )
}

