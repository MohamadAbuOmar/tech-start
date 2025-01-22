"use client";

import { Program } from "@prisma/client";
import { updateProgram } from "@/app/actions/pages/programsAction";
import ProgramForm from "../../components/ProgramForm";

interface EditProgramFormProps {
  program: Program;
}

export default function EditProgramForm({ program }: EditProgramFormProps) {
  return (
    <ProgramForm 
      initialData={{
        name_en: program.name_en,
        name_ar: program.name_ar,
        description_en: program.description_en,
        description_ar: program.description_ar,
        nameColor: program.nameColor,
        descColor: program.descColor,
        order: program.order,
        imageUrl: program.imageUrl,
      }} 
      onSubmit={async (formData) => {
        const result = await updateProgram(program.id, formData);
        return result;
      }}
      buttonText="Update Program"
    />
  );
}
