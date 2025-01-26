import { createProgram } from "@/app/actions/pages/programs";
import { ProgramForm } from "@/app/admin/pages/programs/components/ProgramForm";

export default function CreateUpskillProgramPage() {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Create Upskill Program</h1>
      <ProgramForm
        onSubmit={async (formData) => {
          const result = await createProgram({
            ...formData,
            type: 'UPSKILL'
          });
          return result;
        }}
        initialData={{
          type: 'UPSKILL',
          name_en: '',
          name_ar: '',
          description_en: '',
          description_ar: '',
          imageUrl: '',
          nameColor: '#1b316e',
          descColor: '#862996',
          order: 0,
          badge_en: '',
          badge_ar: '',
          heroTitle_en: '',
          heroTitle_ar: '',
          heroDesc_en: '',
          heroDesc_ar: '',
          heroImage: '',
          overview_en: '',
          overview_ar: '',
          features: [],
          faqs: []
        }}
      />
    </div>
  );
}
