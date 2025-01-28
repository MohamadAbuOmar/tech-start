import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';

export default function RootPage({
  params: { lang },
}: {
  params: { lang: string };
}) {
  if (!['en', 'ar'].includes(lang)) {
    redirect('/en');
  }

  const cookieStore = cookies();
  cookieStore.set('NEXT_LOCALE', lang);
  
  return redirect(`/${lang}/home`);
}
