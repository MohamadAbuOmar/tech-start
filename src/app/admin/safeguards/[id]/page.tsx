import React from 'react'
import { notFound } from "next/navigation"
import db from "@/app/db/db"
import { SafeguardForm } from "../components/SafeguardForm"

export default async function EditSafeguardPage({
  params: { id },
}: {
  params: { id: string }
}) {
  const safeguard = await db.safeguard.findUnique({
    where: { id },
  })

  if (!safeguard) {
    notFound()
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Edit Safeguard</h1>
      <SafeguardForm
        initialData={safeguard}
        mode="edit"
        id={id}
        buttonText="Update Safeguard"
      />
    </div>
  )
}
