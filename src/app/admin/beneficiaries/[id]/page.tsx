import { notFound } from "next/navigation"
import db from "@/app/db/db"
import { BeneficiaryForm } from "../components/BeneficiaryForm"

export default async function EditBeneficiaryPage({
  params: { id },
}: {
  params: { id: string }
}) {
  const [beneficiary, categories] = await Promise.all([
    db.beneficiary.findUnique({
      where: { id },
    }),
    db.category.findMany(),
  ])

  if (!beneficiary) {
    notFound()
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Edit Beneficiary</h1>
      <BeneficiaryForm
        categories={categories}
        initialData={beneficiary}
        mode="edit"
        id={id}
        buttonText="Update Beneficiary"
      />
    </div>
  )
}
