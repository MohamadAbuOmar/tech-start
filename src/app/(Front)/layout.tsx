import type { Metadata } from "next";
import Preloader from "@/components/preloader/Preloader";
import { LoadingProvider } from "@/context/LoadingContext";
import LenisProvider from "@/components/lenis/ReactLenisW";
import { ConditionalNavbar } from "@/components/shared/Nav/ConditionalNavbar";
import Footer from "@/components/shared/Footer/Footer";
import { Toaster } from "@/components/ui/toaster";
import { LanguageProvider } from "@/context/LanguageContext";
import { getFooter } from "@/app/actions/pages/footer";
import { cookies } from "next/headers";

export const runtime = 'nodejs';

export const metadata: Metadata = {
  title: "Tech Start",
  description:
    "Tech Start is a tech company that provides advanced training programs.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const language = (cookieStore.get('NEXT_LOCALE')?.value || 'en') as 'en' | 'ar';
  const footerResponse = await getFooter(language);

  if (!footerResponse.success) {
    console.error('Failed to fetch footer:', footerResponse.error);
    return null;
  }

  return (
    <LanguageProvider initialLanguage={language}>
      <LoadingProvider>
        <Preloader>
          <LenisProvider>
            <div className="flex min-h-screen flex-col">
              <ConditionalNavbar />
              {children}
              <Footer footer={footerResponse.data} />
            </div>
            <Toaster />
          </LenisProvider>
        </Preloader>
        <div id="modal-root" />
      </LoadingProvider>
    </LanguageProvider>
  );
}
