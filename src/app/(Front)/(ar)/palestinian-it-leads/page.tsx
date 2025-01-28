import { cookies } from 'next/headers'
import { BeneficiariesSection } from "@/components/beneficiary/beneficiaries-section";
import { getBeneficiaries } from "@/app/actions/pages/beneficiaries";

export const revalidate = 30;

export default async function PalestinianITleads() {
  const cookieStore = cookies()
  const language = (cookieStore.get('NEXT_LOCALE')?.value || 'en') as 'en' | 'ar'
  
  const beneficiariesResponse = await getBeneficiaries(language)
  
  if (!beneficiariesResponse.success) {
    return <div>Error loading beneficiaries data</div>
  }

  return <BeneficiariesSection data={beneficiariesResponse.data} />;
}
