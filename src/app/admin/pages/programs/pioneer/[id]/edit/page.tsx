import { getAdminProgramById, updateProgram } from "@/app/actions/pages/programs";
import { ProgramForm } from "@/app/admin/pages/programs/components/ProgramForm";
import { notFound } from "next/navigation";

interface Props {
  params: {
    id: string;
  };
}

export default async function EditPioneerProgramPage({ params }: Props) {
  const { data: program } = await getAdminProgramById(params.id);

  if (!program || program.type !== 'PIONEER') {
    notFound();
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Edit Pioneer Program</h1>
      <ProgramForm
        mode="edit"
        onSubmit={async (formData) => {
          const result = await updateProgram(params.id, {
            ...formData,
            type: 'PIONEER'
          });
          return result;
        }}
        initialData={{
          ...program,
          features: program.features ? JSON.parse(program.features.toString()) : [],
        }}
      />
    </div>
  );
}
