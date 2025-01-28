import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';

export default function BeneficiariesPage() {
  const cookieStore = cookies();
  const pathname = cookieStore.get('NEXT_PATHNAME')?.value || '';
  const language = pathname.includes('/ar/') ? 'ar' : 'en';
  
  redirect(`/${language}/beneficiaries`);
}
