"use client";

import { Program } from "@prisma/client";
import { updateProgram } from "@/app/actions/pages/programs";
import { ProgramForm } from "../../components/ProgramForm";

interface EditProgramFormProps {
  program: Program;
}

export default function EditProgramForm({ program }: EditProgramFormProps) {
  return (
    <ProgramForm 
      initialData={{
        type: program.type,
        name_en: program.name_en,
        name_ar: program.name_ar,
        description_en: program.description_en,
        description_ar: program.description_ar,
        nameColor: program.nameColor,
        descColor: program.descColor,
        order: program.order,
        imageUrl: program.imageUrl,
        badge_en: program.badge_en,
        badge_ar: program.badge_ar,
        heroTitle_en: program.heroTitle_en,
        heroTitle_ar: program.heroTitle_ar,
        heroDesc_en: program.heroDesc_en,
        heroDesc_ar: program.heroDesc_ar,
        heroImage: program.heroImage,
        overview_en: program.overview_en,
        overview_ar: program.overview_ar,
        features: program.features ? JSON.parse(program.features.toString()) : [],
        faqs: program.faqs || []
      }} 
      onSubmit={async (formData) => {
        const result = await updateProgram(program.id, formData);
        return result;
      }}
      buttonText="Update Program"
    />
  );
}
