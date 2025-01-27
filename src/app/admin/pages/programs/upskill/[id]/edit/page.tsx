import { getAdminProgramById } from "@/app/actions/pages/programs";
import { notFound } from "next/navigation";
import EditProgramForm from "../../../[id]/edit/EditProgramForm";

interface Props {
  params: {
    id: string;
  };
}

export default async function EditUpskillProgramPage({ params }: Props) {
  const { data: program } = await getAdminProgramById(params.id);

  if (!program || program.type !== 'UPSKILL') {
    notFound();
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Edit Upskill Program</h1>
      <EditProgramForm program={program} />
    </div>
  );
}
